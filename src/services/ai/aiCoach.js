import { buildSystemPrompt, createHistory, streamClaude, streamMock, detectSubject, pickRandom } from './base.js'

// ─── Mock knowledge base ──────────────────────────────────────────────────────
const MOCK_RESPONSES = [
  {
    patterns: ['fortuitous', 'force majeure', '1174', 'flash flood', 'typhoon', 'calamity'],
    response: `Magandang tanong, Counsel! 🔥 Ito ang **fortuitous event doctrine** under **Art. 1174** ng Civil Code.

**Ang rule:**
> "Except in cases expressly specified by the law, or when it is otherwise declared by stipulation, or when the nature of the obligation requires the assumption of risk, no person shall be responsible for those events which could not be foreseen, or which, though foreseen, were inevitable."

**Para ma-invoke ang fortuitous event, kailangan ng TATLONG elements (lahat dapat present!):**
- **Unforeseeable or unavoidable** — hindi maiiwasan kahit mag-ingat ka
- **Proximate cause** — ito talaga ang cause ng loss, hindi ka
- **Debtor was NOT in default (mora solvendi)** — pinaka-common na trap ito sa bar!

**Ang trap sa bar exams:**
Kung ang debtor ay nasa **mora** na bago pa mag-fortuitous event — **liable pa rin siya!** Wala siyang protection. Ang logic: kung naibigay niya na ang obligasyon sa tamang oras, hindi sana affected.

**Example application:**
*A borrowed B's specific car. Dapat ibalik October 1 pero hindi pa ibinabalik ni A noong October 5 nang may baha. Liable si A — because he was already in default.*

**Related provisions:**
- **Art. 1165** — for specific obligations, debtor is liable in case of loss through fortuitous events if in delay
- **Art. 1262** — specific thing lost through fortuitous event extinguishes obligation (pero may exceptions!)
- **Res perit domino** — risk follows ownership (for generic: *genus nunquam perit*)

Ano pa ang gusto mong i-explore dito? 😊`,
  },
  {
    patterns: ['self-defense', 'defense of strangers', 'unlawful aggression', 'art. 11', 'justifying'],
    response: `Counsel, ito ang isa sa pinakapalaging tinatanong sa bar — **Art. 11 RPC (Justifying Circumstances)**.

**SELF-DEFENSE — Tatlong elements (LAHAT kailangan!):**

**1. Unlawful Aggression** — *ang pinaka-indispensable*
- Must be **actual** (ongoing) or **imminent** (about to happen)
- *Mere threatening attitude* ≠ unlawful aggression
- Aggression must be **continuing** at the time of defense — kapag tumigil ang aggression, wala nang right to defend

**2. Reasonable Necessity of the Means Employed**
- Proportionality ng defense sa attack
- Hindi kailangan exact na equality ng weapons — **rational equivalence** ang test
- *Example: Kutsilyo vs. gun — pwede pa rin ang self-defense*

**3. Lack of Sufficient Provocation**
- Ang nagdefend ay hindi nag-provoke ng sapat na provocacion
- *"Sufficient" ≠ "any"* — kailangan na causally connected sa aggression

**IMPORTANT JURISPRUDENCE:**
- **People v. Cabungcal** — unlawful aggression must be CONTINUING
- **People v. Alconga** — once aggressor is disarmed/helpless, self-defense ceases

**INCOMPLETE SELF-DEFENSE (Art. 69):**
Kung lahat ng elements ay hindi present PERO nandoon ang unlawful aggression — **privileged mitigating circumstance** ito. Reduces penalty by 1-2 degrees (hindi lang to minimum period).

**Bar trap:** "A stabbed B 10 times after B dropped the weapon." — **Wala nang unlawful aggression** pagkatapos na mahulog ang sandata. Ang 10 stabs = aggression na ni A, hindi defense.

May specific scenario ba kang gusto nating i-analyze? 🔍`,
  },
  {
    patterns: ['dying declaration', 'hearsay', 'rule 130', 'evidence', 'res gestae'],
    response: `Tara, Counsel! Pag-aralan natin ang **exceptions to the hearsay rule** — palaging lumalabas sa bar!

**DYING DECLARATION (Rule 130, Sec. 37) — 4 Elements:**
- **1.** Declaration concerns the **cause and circumstances** of declarant's death
- **2.** Declarant was **conscious of impending death** at time of statement
- **3.** Declarant was **competent to testify** had he survived
- **4.** Declarant **actually died** ← *napakahalaga ito!*

**Bar trap:** "What if the declarant survived?" — Hindi na dying declaration! Pero pwedeng i-admit as **res gestae** (spontaneous exclamation) or call the declarant as a **live witness**.

---

**RES GESTAE (Rule 130, Sec. 42) — 2 types:**

*Spontaneous Exclamation:*
- Startling event occurred
- Statement made while under stress of excitement
- Statement relates to the startling event

*Verbal Acts:*
- Statement accompanies an equivocal act
- The verbal act characterizes the physical act

---

**COMMON BAR SCENARIOS:**

> *"Tulungan niyo ako, si Juan ang pumatay sa akin!"* — Potential dying declaration + res gestae

**Key distinction:** Dying declaration requires **actual death**; res gestae does NOT.

**2019 Changes:** Ang 2019 Rules on Evidence pinalit ang "Best Evidence Rule" ng **"Original Document Rule."** Mas malawak na ang coverage — covers electronic documents na rin!

Anong specific evidence question ang nasa isip mo? 📚`,
  },
  {
    patterns: ['double sale', 'article 1544', '1544', 'two buyers', 'prior registration'],
    response: `Classic bar question ito, Counsel! **Art. 1544 — Double Sale Rule** (The crown jewel of civil law bar questions)

**THE RULE:**
For **IMMOVABLES** — priority goes to the buyer who:
1. **First registers in good faith**, or
2. If none registered — **first to possess in good faith**, or
3. If neither — **oldest title in good faith**

**THE CRUCIAL ELEMENT: GOOD FAITH**

Good faith = absence of notice or knowledge of any prior sale **at the time of registration** (not at the time of purchase!).

**Classic scenario sa bar:**
- B buys land from A (unregistered, January)
- C buys same land from A (registers February, but KNEW of B's prior sale)
- **B wins** — C is in bad faith, cannot invoke Art. 1544 protection!

**Landmark case: *Cheng v. Genato***
*Registration by a buyer in bad faith = no priority. Knowledge of prior unregistered sale = bad faith.*

**For MOVABLES — Art. 1544:**
Priority: First to possess in good faith.
If neither: Oldest title (in good faith).

**BAR TRAP — Personal Property:**
*A sold his car to B (delivered), then to C (delivered with B's knowledge). B wins — C is in bad faith!*

**Hindi covered ng Art. 1544:**
- Unilateral promise to sell
- Right of first refusal
- Contracts to sell (no transfer of ownership until full payment)

Gusto mo bang pag-aralan ang related topic — *nemo dat quod non habet*? 🤔`,
  },
  {
    patterns: ['warrantless arrest', 'arrest without warrant', 'in flagrante', 'hot pursuit'],
    response: `**VALID WARRANTLESS ARRESTS** under Rule 113, Sec. 5 — tatlong grounds:

**1. IN FLAGRANTE DELICTO** *(Section 5[a])*
- Offense committed **in the presence or within view** of the officer
- Two elements: (1) the person committed the crime; (2) the officer had personal knowledge
- *Text message tip alone ≠ flagrante delicto* (People v. Racho)

**2. HOT PURSUIT** *(Section 5[b])*
- Offense has **just been committed**
- Officer has **personal knowledge of facts** indicating the suspect committed it
- "Just been committed" = few minutes to hours, fact-specific
- *Tip from informant ≠ personal knowledge* ← bar trap!

**3. ESCAPEE** *(Section 5[c])*
- Person escaped from penal establishment or custody

---

**WAIVER OF ILLEGAL ARREST:**
Kahit invalid ang arrest — if the accused **fails to raise the objection BEFORE ARRAIGNMENT** (via motion to quash), it is **deemed waived**.

*But note:* Waiver of illegal arrest ≠ waiver of illegal search. Evidence from an illegal search may still be challenged even after arraignment!

---

**RIGHTS DURING CUSTODIAL INVESTIGATION (Art. III Sec. 12):**
- Right to remain silent
- Right to counsel (preferably own choice, or appointed)
- Right to be informed of these rights
- Waiver: must be **in WRITING + in the PRESENCE OF COUNSEL**

*Signed waiver without counsel = invalid = confession inadmissible*

May specific arrest/search scenario ka? 🔍`,
  },
  {
    patterns: ['corporation', 'piercing', 'veil', 'alter ego', 'stockholder', 'director', 'board'],
    response: `**CORPORATE LAW** — let's break it down, Counsel!

**PIERCING THE CORPORATE VEIL** — Alter Ego Doctrine
Tatlong elements, LAHAT dapat present:
- **1. Complete Control** — parent so dominates the subsidiary that it has no separate will
- **2. Control Used for Fraud/Wrong** — to perpetuate a violation of legal duty or defraud
- **3. Proximate Causation** — the control and breach caused the plaintiff's injury

*Key case: Concept Builders v. NLRC* — corporation set up to evade labor obligations = pierced.

---

**BOARD OF DIRECTORS — Key Rules (RA 11232):**

*Quorum:* **Majority of the entire board** (not just present directors)
- 10-member board → quorum = 6

*Voting:* Majority of quorum (for ordinary matters)
- *Exception:* Some acts require 2/3 of outstanding capital stock (e.g., amendment of AOI, dissolution, sale of substantially all assets)

---

**SUBSTANTIALLY ALL ASSETS (Sec. 39 RCC):**
Requires BOTH: (1) Board approval + (2) **2/3 stockholder vote**
Without stockholder ratification = **VOID**

---

**DIRECTOR'S CONFLICT OF INTEREST (Sec. 31):**
- Must **disclose** the interest to the board
- Must **abstain from voting**
- Non-disclosure = contract is **voidable** at corporation's option

**BUSINESS JUDGMENT RULE:**
Courts will not substitute their judgment for the board's on business decisions — UNLESS the decision was: tainted by fraud, made in bad faith, or exceeded corporate powers.

Specific corporate law topic? 💼`,
  },
  {
    patterns: ['illegal dismissal', 'dismissal', 'separation pay', 'backwages', 'reinstatement', 'labor'],
    response: `**LABOR LAW** na tayo, Counsel! Isa sa pinaka-common sa bar exams.

**VALID DISMISSAL — Dalawang requirements, BOTH needed:**

**1. SUBSTANTIVE DUE PROCESS** — Just or Authorized Cause
- *Just causes (Art. 297):* Serious misconduct, willful disobedience, gross neglect, fraud, crime against employer, analogous causes
- *Authorized causes (Arts. 298-299):* Installation of labor-saving devices, redundancy, retrenchment, closure, disease

**2. PROCEDURAL DUE PROCESS — Two-Notice Rule:**
- **First Notice:** Written notice specifying acts + give employee **at least 5 days** to explain
- **Hearing/Conference** (opportunity to be heard)
- **Second Notice:** Written notice of decision to dismiss

---

**EFFECTS OF ILLEGAL DISMISSAL:**
- **Reinstatement** without loss of seniority + **full backwages** from dismissal to reinstatement
- If reinstatement not feasible (strained relations): **Separation pay** in lieu (1 month/year) + full backwages

---

**SEPARATION PAY RATES:**
| Cause | Rate |
|---|---|
| Redundancy | 1 month/year |
| Labor-saving devices | 1 month/year |
| Retrenchment | 1/2 month/year |
| Closure (not losses) | 1 month/year |
| Closure (serious losses) | None required |

---

**AGABON DOCTRINE:**
If dismissal is substantively valid BUT procedurally defective → **nominal damages** (₱30,000) only. No reinstatement.

**JAKA FOOD DOCTRINE:**
If dismissal is for authorized cause BUT no procedural compliance → **₱50,000** nominal damages.

Specific scenario? 💼`,
  },
  {
    patterns: ['prescriptive period', 'prescription', 'extinctive prescription', 'laches', 'time bar'],
    response: `**PRESCRIPTIVE PERIODS** — memorize itong table, Counsel! Palagi sa bar!

**CIVIL CODE — Key periods:**
- **30 years** — written contracts, real actions over immovables, mortgages
- **10 years** — oral contracts, quasi-contracts (solutio indebiti, negotiorum gestio), judgments
- **6 years** — quasi-delict/torts
- **4 years** — annulment (vitiated consent — fraud, violence, intimidation, undue influence)
- **1 year** — forcible entry/unlawful detainer (from demand or last illegal act)

**Actions that are IMPRESCRIPTIBLE:**
- Actions to declare a **void contract** null
- **Reconveyance** based on void title (*Vda. de Cabrera v. Lagman* — actual fraud: 10 years; void title: imprescriptible!)
- Actions to recover land with **Torrens title** (indefeasibility)

---

**CRIMINAL — Key periods (Art. 90 RPC):**
- **20 years** — afflictive penalties (reclusion perpetua/temporal, perpetual disqualification)
- **15 years** — correctional penalties
- **10 years** — prision correccional, suspension, destierro
- **5 years** — arresto mayor, fine > ₱40,000
- **1 year** — arresto menor, fine ≤ ₱40,000

**Note:** Crimes penalized by death/RP = **20 years** (not imprescriptible!)

---

**INTERRUPTION vs. SUSPENSION:**
- **Interruption** (civil) = period starts again from zero
- **Suspension** (civil) = period merely pauses, resumes where it stopped

*Art. 1155 interruptions:* Filing of action in court, written extrajudicial demand, written acknowledgment by debtor

Specific prescription question? ⏰`,
  },
  {
    patterns: ['due process', 'procedural', 'substantive due process', 'art. iii', 'equal protection'],
    response: `**CONSTITUTIONAL LAW** tayo, Counsel! Due Process at Equal Protection — paborito ng bar.

**DUE PROCESS — Article III, Section 1:**

*Two kinds:*
**1. Procedural Due Process**
- *Criminal cases:* Accused must have notice of charge + opportunity to be heard, right to counsel, impartial tribunal
- *Administrative cases:* Notice + Opportunity to be heard (pwedeng written submissions lang — hindi kailangan formal hearing)
- *"Cardinal Primary Rights" (Ang Tibay v. CIR):* 7 requirements for administrative due process

**2. Substantive Due Process**
- Requires that the law itself be fair, reasonable, and just
- Test: Is the law *arbitrary, oppressive, or unreasonable*?
- Standard: Reasonable means for a lawful objective

---

**EQUAL PROTECTION — Three standards of review:**

| Standard | When Applied | Test |
|---|---|---|
| **Strict Scrutiny** | Suspect classifications (race, religion, nationality), fundamental rights | Compelling state interest + narrowly tailored |
| **Intermediate** | Gender, quasi-suspect classes | Substantially related to important state interest |
| **Rational Basis** | Economic/social regulation, tax laws | Rationally related to legitimate state interest |

**4 Requisites for Valid Classification:**
- Rests on **substantial distinction**
- **Germane** to the purpose of the law
- Not limited to **existing conditions** only
- Applies **equally to all members** of the same class

*Ito ang pinakaklasikong formula sa bar: "A law satisfies equal protection if it is based on substantial distinctions..."*

Constitutional law question pa? 🏛️`,
  },
  {
    patterns: ['income tax', 'nirc', 'bir', 'tax', 'vat', 'estate tax', 'train law'],
    response: `**TAXATION LAW** tayo, Counsel!

**INCOME TAX — Basic Framework:**

*Taxability by taxpayer type (Sec. 23 NIRC):*
| Taxpayer | PH-Source | Foreign-Source |
|---|---|---|
| Resident Citizen | ✅ Taxable | ✅ Taxable |
| Non-resident Citizen | ✅ Taxable | ❌ Exempt |
| Resident Alien | ✅ Taxable | ❌ Exempt |
| Non-resident Alien (NETB) | ✅ 25% final tax | ❌ Exempt |
| Domestic Corporation | ✅ Taxable | ✅ Taxable |

**TRAIN LAW (RA 10963) Key changes:**
- Income tax: New graduated rates (0% for ≤₱250K)
- VAT threshold: ₱3M (up from ₱1.9M)
- Standard deduction (estate tax): **₱5M**
- Donor's tax: **6%** on all donations exceeding ₱250K annual exemption (flat rate!)
- Estate tax: **6%** flat rate on net estate
- 8% flat tax option for self-employed

---

**VAT FORMULA:**
Output VAT − Input VAT = **VAT Payable** (credit-invoice method)
- If Input VAT > Output VAT = VAT refund/TCC

---

**TAX REMEDIES — Critical deadlines:**
- **Assessment:** within 3 years from deadline of filing (general); 10 years for fraud/no return
- **Protest:** 30 days from receipt of **FAN** (Formal Assessment Notice)
- **BIR decision on protest:** 180 days; if no action → taxpayer has **30 days** to appeal to CTA
- **CTA appeal:** 30 days from BIR decision/lapse of 180-day period

Tax topic na gusto mong i-deepen? 💰`,
  },
  {
    patterns: ['legal ethics', 'disbarment', 'privilege', 'attorney-client', 'cpr', 'canon'],
    response: `**LEGAL ETHICS** — an often underestimated subject sa bar, Counsel!

**ATTORNEY-CLIENT PRIVILEGE (Rule 130, Sec. 24[b]):**
- Covers **confidential communications** made in the professional relationship
- Extends to ALL officers, clerks, and employees of the lawyer
- Client can invoke privilege even after attorney-client relationship ends

**EXCEPTIONS — Hindi covered ng privilege:**
- **Future crimes/frauds** — ang plano para sa future crime ay hindi protected!
- **Claimants through same deceased client** — both parties claiming through decedent
- **Breach of duty** — when client sues the lawyer

---

**CANONS ng CPR — Key provisions:**

*Canon 16 (Handling Client's Funds):*
- Rule 16.01: Keep client funds in TRUST
- Rule 16.02: Separate from personal funds — **client trust account** required
- Rule 16.03: Deliver funds/properties promptly
- **Misappropriation = Disbarment** palagi

*Canon 15 (Conflicts of Interest):*
- Rule 15.03: Lawyer shall not represent conflicting interests **EXCEPT** with written consent of all parties after full disclosure
- **Substantial Relation Test** — check if new matter is substantially related to prior representation

---

**DISBARMENT — Grounds (Sec. 27, Rule 138):**
- Deceit, malpractice, gross misconduct
- Conviction of crime involving moral turpitude
- Violation of oath
- Grossly immoral conduct

**PARDON vs. REINSTATEMENT TO BAR:**
Presidential pardon ≠ automatic reinstatement. Must file **separate petition** with SC. Bar membership = exclusive SC jurisdiction.

Ethics scenario to analyze? ⚖️`,
  },
]

const FALLBACK_RESPONSES = [
  `Magandang tanong, Counsel! 🔥 Let me break that down para sa iyo.

Ang subject na ito ay napaka-important sa bar exams. Kailangan mong memorize hindi lang ang rule, kundi pati na rin ang **exceptions** at ang **application** sa specific facts.

Para sa mas precise na sagot, i-specify mo ang:
- **Specific provision** (article number, rule number)
- **Fact pattern** — may specific scenario ka bang gusto mong i-analyze?
- **Which subject** ang pinag-uusapan

Handa akong i-break down ang anumang legal concept sa IRAC format, complete with jurisprudence at Taglish explanations. 💪

Ano specifically ang gusto mong pag-aralan, Counsel?`,

  `Counsel, magandang tanong! Pero para makapagbigay ako ng mas precise at comprehensive na sagot, kailangan ko ng kaunti pang context.

Pwede mo bang i-specify:
1. **Anong subject** — Civil, Criminal, Political, etc.?
2. **Specific doctrine o provision** ang tanong mo?
3. **May fact pattern ba** para ma-apply natin ang rule?

Ang approach ko: Rule → Exception → Application → Bar Trap. Lagi akong nagdadagdag ng **"what the examiners are actually looking for"** para hindi ka masurpresa sa actual bar.

Itanong mo lang, Counsel — nandito ako! 📚`,
]

// ─── Mock response picker ─────────────────────────────────────────────────────
function getMockResponse(messages) {
  const lastUser = [...messages].reverse().find(m => m.role === 'user')?.content?.toLowerCase() ?? ''
  for (const entry of MOCK_RESPONSES) {
    if (entry.patterns.some(p => lastUser.includes(p))) return entry.response
  }
  return pickRandom(FALLBACK_RESPONSES)
}

// ─── AI Coach factory ─────────────────────────────────────────────────────────
export function createCoach({ subject = 'all' } = {}) {
  const history = createHistory()

  async function send(userMessage, { onChunk, onDone, onError } = {}) {
    history.add('user', userMessage)
    const messages = history.get()
    const system   = buildSystemPrompt(subject)

    const ok = await streamClaude({ system, messages, onChunk, onDone, onError })
    if (!ok) {
      const mock = getMockResponse(messages)
      await streamMock(mock, onChunk, onDone)
    }
  }

  function addAssistantMessage(content) { history.add('assistant', content) }

  return { send, addAssistantMessage, history, getSubject: () => subject }
}
