import { buildSystemPrompt, callClaude, streamClaude, streamMock, pickRandom } from './base.js'

const SYSTEM_EXTRA = `You are a Philippine law case digest simplifier.
Given a case name or legal concept, explain it in plain Taglish so a bar candidate can understand and remember it quickly.

FORMAT:
**[Case Name] (G.R. No. / Year)**
*One-sentence Taglish summary*

**Ang nangyari (Facts sa 3 sentences):**
[Simple Taglish narration of facts]

**Ang sinabi ng SC (Holding):**
[The legal doctrine/holding in clear terms]

**Bakit important ito sa bar:**
[Why examiners ask about this case]

**The take-away rule:**
> [One memorable sentence they should memorize]

Keep it conversational, practical, and under 300 words.`

const CASE_LIBRARY = {
  'valenzuela': `**Valenzuela v. People (G.R. No. 160188, 2007)** 🚗
*"Kapag nasa kamay na ng magnanakaw ang stolen item — consummated na ang theft, kahit hindi pa siya nakaalis!"*

**Ang nangyari:**
Si Valenzuela ay nagnakaw ng mga de-lata sa supermarket at hinuli bago pa siya lumabas. Sinabi niya na frustrated theft lang ang kaso, hindi consummated, dahil hindi pa siya nakaalis.

**Ang sinabi ng SC:**
**CONSUMMATED THEFT** — ang SC ay definitively ruled na walang frustrated stage sa theft. Ang theft ay complete the moment the thief acquires dominion and control over the stolen property — kahit hindi pa siya nakalabas ng establishment!

**Bakit important sa bar:**
Every bar exam may tanong tungkol sa stages ng theft. Ito ang landmark case na sinabing "walang frustrated theft."

> **Take-away rule:** *"Theft = consummated the moment dominion acquired. Walang frustrated theft sa Pilipinas."*`,

  'nacar': `**Nacar v. Gallery Frames (G.R. No. 189871, 2013)** 💰
*"6% per annum na lang ang legal interest — wala nang 12%!"*

**Ang nangyari:**
Nagdemanda si Nacar ng illegal dismissal. Ang issue ay: anong interest rate ang applicable sa monetary judgment?

**Ang sinabi ng SC:**
Binago ng SC ang interest rate rule. **Effective July 1, 2013:**
- Legal interest = **6% per annum** (lahat ng monetary obligations)
- Wala nang 6% vs. 12% distinction

**Kapag may final judgment — 6% per annum** mula sa finality of judgment hanggang full payment.

**Bakit important sa bar:**
Lahat ng cases involving money judgments + legal interest — cite Nacar. Palagi itong tinatanong sa Remedial Law at Civil Law.

> **Take-away rule:** *"Nacar = 6% lang. Simple formula: 6% from finality of judgment."*`,

  'abakada': `**Abakada Guro v. Ermita (G.R. No. 168056, 2005)** 📜
*"Kapag na-enact na ang batas — wala nang power si Congress na i-veto ang implementing rules!"*

**Ang nangyari:**
Ang TRAIN Law had a provision allowing a Congressional Committee to suspend or stop implementation of the VAT rate increase. Challenged ito as unconstitutional.

**Ang sinabi ng SC:**
**LEGISLATIVE VETO IS UNCONSTITUTIONAL.** Once a law is enacted and signed, it passes from Congress to the Executive for implementation. Congress cannot reserve to itself the power to approve or disapprove implementing rules — ito ay separation of powers violation.

**Bakit important sa bar:**
Palaging may constitutional law question tungkol sa separation of powers at legislative veto. Ito ang pinaka-important na case.

> **Take-away rule:** *"Abakada = walang legislative veto. After enactment, hands off na si Congress."*`,

  'concept-builders': `**Concept Builders v. NLRC (G.R. No. 108734, 1996)** 🏢
*"Kapag ginagamit ng corporation ang sarili para dayain ang mga workers — pierce ang corporate veil!"*

**Ang nangyari:**
Nag-set up ng dalawang magkaibang corporations ang grupo para maiwasan ang labor obligations. Parehong companies ay may parehong owners, opisina, at operations.

**Ang sinabi ng SC:**
**ALTER EGO DOCTRINE** — ang corporate veil ay pwedeng i-pierce kapag:
1. Complete control ng parent/owner (no separate existence)
2. Control used to commit fraud or perpetuate wrong
3. The control proximately caused the injury

**Bakit important sa bar:**
Labor law + Corporate law crossover question. Bawat bar exam may question tungkol sa piercing.

> **Take-away rule:** *"Concept Builders = alter ego = pierce the veil kapag ginamit ang corporation para dayain ang workers."*`,

  'default': `**IMPORTANT PHILIPPINE BAR EXAM CASES** 📚

Hindi ko specific nahanap ang case na hinahanap mo, pero narito ang mga pinaka-important na cases sa bar:

**CIVIL LAW:**
- *Valenzuela v. People* — No frustrated theft, consummated upon dominion
- *Nacar v. Gallery Frames* — 6% legal interest rate
- *Cheng v. Genato* — Art. 1544 double sale, good faith required

**CRIMINAL LAW:**
- *People v. Lim* — Chain of custody, saving clause
- *People v. Lizada* — Frustrated vs. attempted stages
- *People v. Pugay* — Treachery elements

**POLITICAL LAW:**
- *Abakada Guro v. Ermita* — No legislative veto
- *Marcos v. Manglapus* — Residual powers of President
- *De Castro v. JBC* — Judiciary exempt from midnight appointments ban

**REMEDIAL LAW:**
- *Agabon v. NLRC* — Nominal damages for procedural violations
- *Jaka Food v. Pacot* — ₱50,000 for authorized cause without procedure

Sabihin mo ang specific case title o G.R. number at i-simplify ko para sa iyo! 🎯`,
}

function findCase(input) {
  const t = input.toLowerCase()
  if (/valenzuela|theft|no frustrated/.test(t)) return CASE_LIBRARY['valenzuela']
  if (/nacar|gallery|interest rate|6%/.test(t)) return CASE_LIBRARY['nacar']
  if (/abakada|ermita|legislative veto|vat/.test(t)) return CASE_LIBRARY['abakada']
  if (/concept builders|alter ego|pierce/.test(t)) return CASE_LIBRARY['concept-builders']
  return CASE_LIBRARY['default']
}

export async function simplifyCase({ caseNameOrConcept, subject = 'all', onChunk, onDone, onError } = {}) {
  const system = buildSystemPrompt(subject, SYSTEM_EXTRA)
  const messages = [{ role: 'user', content: `Simplify this case/concept in Taglish: "${caseNameOrConcept}". Make it memorable and bar-exam focused.` }]

  const ok = await streamClaude({ system, messages, onChunk, onDone, onError })
  if (!ok) await streamMock(findCase(caseNameOrConcept), onChunk, onDone)
}

export async function simplifyCaseSync({ caseNameOrConcept, subject = 'all' } = {}) {
  const system = buildSystemPrompt(subject, SYSTEM_EXTRA)
  const result = await callClaude({ system, messages: [{ role: 'user', content: `Simplify: "${caseNameOrConcept}"` }] })
  return result ?? findCase(caseNameOrConcept)
}
