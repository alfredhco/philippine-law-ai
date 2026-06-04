import { buildSystemPrompt, callClaude, streamClaude, streamMock, pickRandom } from './base.js'

const SYSTEM_EXTRA = `You are an expert ISSUE SPOTTER for Philippine bar exams.
Given a fact pattern, identify ALL legal issues systematically.

FORMAT your response as:
1. Brief scan of the facts (2-3 sentences)
2. List of issues using this format:
   **[Issue Name]** — [One-sentence why this issue arises from the facts]
3. Indicate which issues are PRIMARY (exam-scoring) vs SECONDARY
4. Flag any TRAPS or COUNTER-ARGUMENTS examiners might test

Always in Taglish. Be comprehensive — bar examiners reward spotting obscure issues.`

const MOCK_ANALYSIS = [
  `**ISSUE SPOTTING ANALYSIS** 🔍

Basahin natin ang mga facts nang maingat. May ilang legal issues na lumalabas dito:

---

**PRIMARY ISSUES (mataas na value sa bar):**

**1. Validity of the Contract** — Kailangan suriin kung may consent, object, at cause (Art. 1318 CC). May vitiation ba ng consent? Fraud? Mistake? Undue influence?

**2. Obligations of the Parties** — Ano ang specific obligations ng bawat party? In-perform ba ang lahat? May breach?

**3. Remedies Available** — Rescission? Specific performance? Damages? Magkakaibang remedies ang available depende sa nature ng breach.

---

**SECONDARY ISSUES (bonus points):**

**4. Prescriptive Period** — Nakapag-file pa ba ng action sa loob ng prescriptive period? (Written contracts: 10 years; Oral: 6 years)

**5. Damages** — Kung may breach — actual, moral, exemplary, nominal, temperate? Ang proximate cause test ay kailangan.

---

**⚠️ BAR TRAPS to watch:**
- Ang examiners ay laging nagtatanong tungkol sa **prescription** — palaging i-check ang dates sa facts!
- **Void vs. Voidable** — ang distinction ay crucial sa remedies available
- Check kung may **third parties** involved — baka may issue sa relativity of contracts (Art. 1311)

I-provide mo ang actual fact pattern para mas specific ang analysis ko! 📋`,

  `**LEGAL ISSUES IDENTIFIED** ⚖️

Mabilis na i-scan ang facts. Nakakita ako ng mga sumusunod na issues:

---

**ISSUE 1: Criminal Liability** 🚨
Ano ang crime na nacommit? Check: stages of execution (attempted/frustrated/consummated), qualifying/aggravating circumstances, justifying/exempting circumstances.

**ISSUE 2: Civil Liability ex delicto**
Under Art. 100 RPC — every person criminally liable is also civilly liable. Sino ang accountable for damages?

**ISSUE 3: Procedural Issues**
- Valid arrest? (warrantless arrest grounds under Rule 113)
- Admissibility of evidence? (chain of custody, exclusionary rule)
- Jurisdiction? (which court handles this crime?)

---

**SECONDARY ISSUES:**

**ISSUE 4: Defense of Third Parties**
May nagbigay ba ng third-party statement na pwedeng hearsay exception? Dying declaration? Res gestae?

**ISSUE 5: Mitigating/Aggravating Circumstances**
Sino ang mga circumstances present? Treachery? Evident premeditation? Voluntary surrender?

---

**RECOMMENDED APPROACH for this scenario:**
1. Determine the crime first
2. Then check liability of all parties (principal, accomplice, accessory)
3. Check procedural validity of arrest and evidence
4. Check prescriptive period

Ilagay mo ang exact facts, Counsel — makakapag-give ako ng mas targeted analysis! 🎯`,
]

export async function spotIssues({ factPattern, subject = 'all', onChunk, onDone, onError } = {}) {
  const system = buildSystemPrompt(subject, SYSTEM_EXTRA)
  const messages = [
    { role: 'user', content: `Identify all legal issues in the following fact pattern:\n\n${factPattern}\n\nBe comprehensive and flag bar exam traps.` }
  ]

  const ok = await streamClaude({ system, messages, onChunk, onDone, onError })
  if (!ok) await streamMock(pickRandom(MOCK_ANALYSIS), onChunk, onDone)
}

export async function spotIssuesSync({ factPattern, subject = 'all' } = {}) {
  const system = buildSystemPrompt(subject, SYSTEM_EXTRA)
  const messages = [
    { role: 'user', content: `Identify all legal issues:\n\n${factPattern}` }
  ]
  const result = await callClaude({ system, messages })
  return result ?? pickRandom(MOCK_ANALYSIS)
}
