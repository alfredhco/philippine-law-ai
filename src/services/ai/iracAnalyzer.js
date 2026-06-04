import { buildSystemPrompt, callClaude, streamClaude, streamMock, pickRandom } from './base.js'

const SYSTEM_EXTRA = `You are an expert IRAC EVALUATOR for Philippine bar examinations.
Analyze the student's IRAC answer and provide detailed, constructive feedback.

EVALUATION CRITERIA:
- Issue: Is it precisely framed as a legal question?
- Rule: Correct citation? Complete? Missing jurisprudence?
- Application: Does it bridge ALL rule elements to specific facts?
- Conclusion: Does it directly answer the issue?

FORMAT:
Score each section 0-25 (total 100). For each section:
1. What the student got RIGHT (✅)
2. What is MISSING or WRONG (❌)
3. Model improvement suggestion

End with: Overall score, grade, and 1 actionable tip.
Use encouraging Taglish tone — motivate the student while being honest.`

const MOCK_FEEDBACK = [
  `**IRAC ANALYSIS FEEDBACK** ✍️

Magandang gawa, Counsel! Let me break down ang iyong answer:

---

**ISSUE (Score: 20/25)**
✅ Correctly identified ang main legal question
✅ Framed it as a legal issue (not a factual question)
❌ **Missing:** The issue should specify the *applicable provision* — "Whether [party] is liable for [act] under **Article [X]** of [law]"

*Suggested revision:* "Whether A is liable for damages to B for breach of contract under **Article 1170** of the Civil Code."

---

**RULE (Score: 18/25)**
✅ Stated the general rule correctly
✅ Mentioned the relevant provision
❌ **Missing:** You forgot to include the **exception** — ang bar examiners ay laging nagtatanong tungkol sa exceptions!
❌ **Missing:** No case citation — at least one landmark case should be mentioned

*Tip:* For every rule, memorize: Rule → Exception → Exception to the Exception (kung meron)

---

**APPLICATION (Score: 16/25)**
✅ Applied the rule to the facts
❌ **Weak application:** You applied the rule generally but didn't address EACH ELEMENT specifically
❌ **Missing:** Counter-argument analysis — acknowledge the opposing position then rebut it

*The bar wants to see:* "Element 1 is present because [specific fact]. Element 2 is present because [specific fact]. Element 3, however, may be debated because..."

---

**CONCLUSION (Score: 22/25)**
✅ Directly answered the issue — magaling!
✅ Clear and definitive
❌ Minor: Should briefly state the legal basis for the conclusion

---

**OVERALL SCORE: 76/100** 📊
**Grade: Good — Above Passing Level**

**One actionable tip:** Sa IRAC, ang pinaka-weak na bahagi ng karamihan ng bar candidates ay ang **APPLICATION**. Practice the "element-by-element" approach: list each element of the rule, then explicitly connect it to a specific fact. Mataas ang score kapag ginawa mo ito. 💪`,

  `**IRAC EVALUATION** ⚖️

Counsel, in-analyze ko na ang iyong sagot. Detailed feedback below:

---

**✅ STRENGTHS:**
- Malinaw ang pagka-identify ng legal issue
- May citation ng relevant provision
- Ang conclusion ay nagdirectly sa issue

**❌ AREAS FOR IMPROVEMENT:**

**1. Missing case law in the RULE section**
Ang Philippine bar exams require jurisprudence citations, hindi lang statutory provisions.
- Add at least one landmark SC case
- Cite the G.R. number if you know it

**2. Application is too brief**
Ang examiners ay nagbibigay ng mataas na points sa comprehensive na application.
- Each element of the rule = one sentence of application
- Use the facts of the problem, hindi hypothetical situations

**3. Conclusion lacks legal basis**
End with: "THEREFORE, [party] is/is not liable for [cause], having satisfied/not satisfied the elements under [provision]."

---

**SCORE ESTIMATE: 65-70/100**

**GRADE: Average — Borderline Passing**

This score is improvable! Ang pinaka-effective na pag-aaral: write 3 IRAC answers per day sa different subjects. Sa loob ng 2 weeks, mapapansin mo na nag-iimprove ang structure at depth ng iyong analysis.

Gusto mo bang i-try ulit with revisions? 📝`,
]

export async function analyzeIRAC({ question, iracAnswer, subject = 'all', onChunk, onDone, onError } = {}) {
  const system = buildSystemPrompt(subject, SYSTEM_EXTRA)
  const content = `QUESTION:\n${question}\n\nSTUDENT'S IRAC ANSWER:\n${
    Object.entries(iracAnswer).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join('\n\n')
  }\n\nPlease evaluate this IRAC answer comprehensively.`

  const messages = [{ role: 'user', content }]
  const ok = await streamClaude({ system, messages, onChunk, onDone, onError })
  if (!ok) await streamMock(pickRandom(MOCK_FEEDBACK), onChunk, onDone)
}

export async function analyzeIRACSync({ question, iracAnswer, subject = 'all' } = {}) {
  const system   = buildSystemPrompt(subject, SYSTEM_EXTRA)
  const content  = `QUESTION:\n${question}\n\nSTUDENT'S IRAC:\n${JSON.stringify(iracAnswer)}`
  const result   = await callClaude({ system, messages: [{ role: 'user', content }] })
  return result ?? pickRandom(MOCK_FEEDBACK)
}
