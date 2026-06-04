import { buildSystemPrompt, callClaude, streamClaude, streamMock, pickRandom } from './base.js'

const SYSTEM_EXTRA = `You are a creative mnemonic generator for Philippine bar exam concepts.
Create memorable, Taglish mnemonics (acronyms, stories, rhymes, or word associations) that help law students remember legal rules.

REQUIREMENTS:
- The mnemonic must be in Taglish (Filipino-English mix)
- Make it CATCHY and memorable — funny, relatable, or absurd is good!
- After the mnemonic, explain each element it represents
- Include a "usage" section showing how to use it in a bar exam answer
- Keep it practical for someone studying for the Philippine bar

Format:
**MNEMONIC: [NAME]**
[The actual mnemonic phrase/acronym/story]

**What it means:**
[Each letter/element explained]

**How to use it in an exam:**
[Brief example]`

const MNEMONIC_BANK = {
  'self-defense': {
    concept: 'Elements of Self-Defense (Art. 11, RPC)',
    mnemonic: `**MNEMONIC: "UNREAL"** 🛡️

*"UNREAListically, nag-self defense siya?"*
- **UN** = **UN**lawful aggression (present and continuing)
- **RE** = **RE**asonable necessity of means employed
- **AL** = L**A**ck of sufficient provocation

**Breaking it down:**
- *Unlawful aggression* — dapat aktual o imminent; HINDI pwedeng threatening lang
- *Reasonable necessity* — proportional response sa attack; hindi kailangan exact na equal
- *Lack of provocation* — hindi dapat ikaw ang nag-provoke ng sapat na provocacion

**How to use sa exam:**
"For self-defense under Art. 11(1) RPC, all three elements must concur — remember UNREAL: Unlawful aggression (present), Reasonable necessity (satisfied because [facts]), And Lack of provocation (no evidence A provoked)."

**Memory tip:** *"Hindi UNREAL ang self-defense ni A — lahat ng elements ay present!"* 😄`,
  },
  'fortuitous-event': {
    concept: 'Elements of Fortuitous Event (Art. 1174, Civil Code)',
    mnemonic: `**MNEMONIC: "UPIN"** 🌪️

*"UPIN lang ang fortuitous event — hindi mo siya makontrol!"*
- **U** = **U**nforeseeable OR unavoidable
- **P** = **P**roximate cause ng loss (it caused the loss, NOT the debtor's negligence)
- **I** = **I**ndependence from debtor's will (hindi kasalanan niya)
- **N** = **N**ot in default (debtor must NOT be in mora when it happened)

**The killer rule — ang N na palagi nakaligtaan:**
*Kung nasa mora ka na bago pa mag-fortuitous event = WALA kang protection!* Ang art. 1174 ay clear: the debtor must not be in default.

**How to use sa exam:**
"A cannot invoke the fortuitous event doctrine because, under UPIN, the fourth element (N — Not in default) is absent. A was already in mora solvendi when the flood occurred. Therefore, A remains liable."

**Taglish memory trick:** *"UPIN hindi umaapaw, pero pag IN DEFAULT ka — liability mo pa rin 'yan!"* 🌊`,
  },
  'contract-elements': {
    concept: 'Essential Requisites of a Contract (Art. 1318)',
    mnemonic: `**MNEMONIC: "COC" o mas masaya — "COCOMO"** 📜

*"Walang COC, walang contract!"*
- **CO** = **CO**nsent (freely given, intelligent)
- **C** = **C**ause/consideration (lawful, not contrary to law/morals)
- **O** = **O**bject (lawful, possible, determinate or determinable)
- **MO** = **MO**dality (form, when required by law)

**Extended version for Art. 1318 + Art. 1305:**
Ang tatlong ESSENTIAL requisites:
1. **Consent** — walang vitiation (fraud, mistake, violence, intimidation, undue influence)
2. **Object** — licit, possible, determinate/determinable
3. **Cause** — lawful, not contrary to law, morals, public order/policy

**For memory:** *"COC — Consent, Object, Cause. Absent ang isa? VOID o VOIDABLE ang contract!"*

**Bar trap:** Kapag **walang cause** = void. Kapag **vitiated consent** = voidable (not void!). Eto ang distinction na palaging tinatanong! 🎯`,
  },
  'dying-declaration': {
    concept: 'Requisites of Dying Declaration (Rule 130)',
    mnemonic: `**MNEMONIC: "DEAD TALK"** ☠️

*"Para ma-admit ang DEAD TALK, 4 requirements!"*
- **D** = **D**ying — declarant actually **D**IED (hindi pwedeng buhay pa!)
- **E** = **E**xpecting death — conscious of **E**xpending death at time of declaration
- **A** = **A**bout the cause — declaration concerns the **A**ct/circumstances of his death
- **D** = **D**ead or Dying competent — competent to testify had he survived

**DEAD TALK rule in action:**
*"Ang DEAD TALK ay kailangan na DEAD talaga — kung nabuhay, hindi na dying declaration. Pwede pang i-testify as live witness pero hindi na hearsay exception ito."*

**Alternative use:**
Kung hindi ma-admit as dying declaration pero buhay siya — pwedeng **res gestae** (spontaneous exclamation at time of startling event) kung lahat ng requisites ng res gestae ay present.

**Quick comparison:**
- Dying declaration: Declarant MUST die ❌ (if survives)
- Res gestae: Declarant need NOT die ✅

Memorize: *"DEAD TALK = D-E-A-D. If alive = no talk as dying declaration."* 👻`,
  },
  'two-notice-rule': {
    concept: 'Two-Notice Rule in Dismissal (Labor Law)',
    mnemonic: `**MNEMONIC: "CHEF"** 👨‍🍳

*"Para valid ang dismissal, may CHEF ka ba?"*
- **C** = **C**harge sheet (First notice — written notice specifying the act + 5 days to explain)
- **H** = **H**earing/conference (opportunity to be heard)
- **E** = **E**valuation (employer evaluates the explanation)
- **F** = **F**inal notice (Second notice — written notice of decision to dismiss)

**Critical details:**
- First notice: At least **5 days** para sagutin ng employee
- Hearing: Hindi kailangan na formal — pwedeng written submissions
- Second notice: Must state grounds + reason for decision

**What happens if violated:**
- May SUBSTANTIVE cause pero NO procedural compliance → **Nominal damages** (₱30,000 per Agabon, or ₱50,000 for authorized cause per Jaka Food)
- Valid procedure PERO no just/authorized cause → **Illegal dismissal** → reinstatement + backwages

**Memory trick:** *"CHEF — Charge, Hearing, Evaluation, Final. Kung kulang ang isang hakbang, may nominal damages ang employer!"* 💼`,
  },
  'default': {
    concept: 'General Legal Mnemonics',
    mnemonic: `**BONUS MNEMONICS — Key bar concepts** 🎯

---

**1. VOID vs. VOIDABLE contracts:**
*"VOID = Wala talagang buhay — IMPRESCRIPTIBLE ang action!"*
*"VOIDABLE = May buhay pero may sakit — 4 years to annul!"*

---

**2. Stages of execution (Art. 6 RPC):**
*"APA — Attempted, Performed-but-not-produced, Accomplished"*
- **A**ttempted = Not all acts performed, didn't produce felony
- **P**erformed (Frustrated) = All acts done, felony not produced by INDEPENDENT cause
- **A**ccomplished (Consummated) = Felony actually produced

*Memory: "APA ito — Attempted, Parang frustrated, At consummated"* 😄

---

**3. Requisites of Preliminary Injunction:**
*"CREAM:"*
- **C**lear and unmistakable right
- **R**ight invaded/violated
- **E**mergent need (irreparable injury if not enjoined)
- **A**dequate remedy must be absent at law
- **M**erit of the main case (apparent)

---

**4. Bar exam tip for ALL subjects:**
*"R-E-C = Rule, Exception, Citation"*
Every answer: State the rule → State the exception → Cite a case or article number. 💪

Want a mnemonic for a specific concept? Just tell me the topic! 📚`,
  },
}

function findMnemonic(input) {
  const t = input.toLowerCase()
  if (/self.?defense|art\.?\s*11|justifying/.test(t)) return MNEMONIC_BANK['self-defense']
  if (/fortuitous|force.?majeure|1174/.test(t)) return MNEMONIC_BANK['fortuitous-event']
  if (/contract.?element|requisite.?contract|1318/.test(t)) return MNEMONIC_BANK['contract-elements']
  if (/dying.?declaration|rule 130|hearsay/.test(t)) return MNEMONIC_BANK['dying-declaration']
  if (/dismissal|two.?notice|labor|chef/.test(t)) return MNEMONIC_BANK['two-notice-rule']
  return MNEMONIC_BANK['default']
}

export async function generateMnemonic({ concept, subject = 'all', onChunk, onDone, onError } = {}) {
  const system = buildSystemPrompt(subject, SYSTEM_EXTRA)
  const messages = [{ role: 'user', content: `Create a memorable Taglish mnemonic for: "${concept}". Make it catchy and practical for bar exam review.` }]

  const ok = await streamClaude({ system, messages, onChunk, onDone, onError })
  if (!ok) {
    const found = findMnemonic(concept)
    await streamMock(found.mnemonic, onChunk, onDone)
  }
}

export async function generateMnemonicSync({ concept, subject = 'all' } = {}) {
  const system = buildSystemPrompt(subject, SYSTEM_EXTRA)
  const result = await callClaude({ system, messages: [{ role: 'user', content: `Create a memorable Taglish mnemonic for: "${concept}"` }] })
  if (result) return result
  return findMnemonic(concept).mnemonic
}
