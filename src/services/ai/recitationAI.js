import { buildSystemPrompt, callClaude, streamClaude, streamMock, pickRandom } from './base.js'

const QUESTION_SYSTEM = `You are a tough but fair Philippine law professor conducting oral recitation.
Generate a single challenging recitation question based on the subject and difficulty specified.
The question should:
- Test conceptual understanding, not just memorization
- Require application of a specific provision or doctrine
- Be phrased as a professor would ask in class
- Include 1-2 follow-up probing questions
Format: Main question, then "FOLLOW-UP:" with the probing question.
Use formal English for the questions (professors speak formally). Keep it concise.`

const EVALUATION_SYSTEM = `You are evaluating a bar candidate's oral recitation answer.
Score 0-100. Be direct and use Taglish feedback style.
Format:
- Score: [X]/100
- What was correct: [brief]
- What was missing: [specific missing elements, provisions, cases]
- Model answer excerpt: [key points they should have mentioned]
- One improvement tip`

const MOCK_QUESTIONS = {
  'civil-law': [
    { question: 'Counsel, explain the principle of relativity of contracts under Article 1311. Who is bound by a contract, and who may benefit from it?', followUp: 'You mentioned the general rule. Now — what are the EXCEPTIONS where third persons may be affected by or entitled to benefits under a contract?' },
    { question: 'A and B agreed that A would not compete with B\'s business for 5 years anywhere in the Philippines. Is this stipulation valid? Analyze under the Civil Code.', followUp: 'If the restriction is found to be unreasonable, what is the effect on the rest of the contract? Discuss Art. 1306 in relation to the partial invalidity doctrine.' },
    { question: 'Distinguish between a contract of sale and a contract to sell. Why does the distinction matter for remedies?', followUp: 'A buyer under a contract to sell defaults on the last installment. May the seller rescind under Art. 1592? Explain.' },
  ],
  'criminal-law': [
    { question: 'Counsel, what is the "proximate cause" doctrine in criminal law? How does it determine criminal liability when the victim\'s own act contributed to his death?', followUp: 'A stabbed B. B refused blood transfusion on religious grounds and died. Is A liable for homicide? Apply the proximate cause doctrine.' },
    { question: 'Explain the concept of "complex crime" under Art. 48 of the RPC. How does it differ from a "special complex crime"?', followUp: 'A, while discharging a firearm, accidentally hit two persons. Is this a complex crime? Apply Art. 48.' },
    { question: 'When does the Revised Penal Code apply to crimes committed outside the Philippines? Enumerate the instances.', followUp: 'A Filipino citizen committed estafa against another Filipino in Japan. Does Philippine law apply? Which provision governs?' },
  ],
  'political-law': [
    { question: 'What is the doctrine of operative fact? When does it apply in constitutional law?', followUp: 'A law is declared unconstitutional by the SC. What happens to government acts performed under that law before the declaration? Apply the operative fact doctrine.' },
    { question: 'Counsel, distinguish between the power of judicial review and the power of judicial supremacy.', followUp: 'Can the SC strike down a constitutional amendment? What standard does the Court apply when reviewing the process of constitutional amendments?' },
    { question: 'Explain the concept of "political question" and its limits under the 1987 Constitution.', followUp: 'Is the validity of a proclamation of martial law a political question? Has the SC addressed this? What is the current doctrine?' },
  ],
  'remedial-law': [
    { question: 'Counsel, what is the doctrine of "forum non conveniens"? When may a Philippine court invoke it?', followUp: 'A foreign corporation filed a case in a Philippine court. The defendant moves to dismiss on forum non conveniens grounds. What factors should the court consider?' },
    { question: 'Distinguish between a demurrer to evidence in civil cases and in criminal cases. What is the effect of filing a demurrer without leave of court in a criminal case?', followUp: 'The court grants the demurrer in a criminal case. Can the prosecution appeal the order? Why or why not?' },
    { question: 'What is the effect of a judgment of acquittal on the civil liability of the accused? Does it matter why the accused was acquitted?', followUp: 'A was acquitted because the prosecution failed to prove guilt beyond reasonable doubt. May the victim still file a civil action for damages? Under what theory?' },
  ],
}

const MOCK_EVALUATION = `**RECITATION EVALUATION** 📊

**Score: 72/100**

**What you got right ✅:**
- Correctly identified the main legal principle
- Mentioned the relevant article number
- Gave a basic application to the facts

**What was missing ❌:**
- No citation of landmark SC case (should mention at least one G.R. No.)
- The exception to the rule was not discussed — examiners specifically test this
- Application was too general — needed element-by-element analysis
- Prescriptive period was not mentioned

**Model answer key points:**
*"Under Art. [X], the rule is [Y]. The exception is [Z], established in [Case Name] (G.R. No. [___]). Applied to the facts: [Element 1] is satisfied because [Fact A]. [Element 2] is satisfied because [Fact B]. Therefore, [Conclusion]."*

**One improvement tip 💡:**
Sa oral recitation, lagi mong isipin: **R-E-C** = Rule → Exception → Case citation. Kapag nasabi mo ang tatlong ito, mataas na ang posibilidad na makapasa ka sa recitation. Practice this formula hanggang maging automatic. 🎯`

export async function generateQuestion({ subject = 'civil-law', difficulty = 'medium', topic = null } = {}) {
  const system = buildSystemPrompt(subject, QUESTION_SYSTEM)
  const prompt = `Generate a ${difficulty} recitation question on ${subject}${topic ? ` specifically about ${topic}` : ''}. Include one follow-up probing question.`

  const result = await callClaude({ system, messages: [{ role: 'user', content: prompt }] })
  if (result) {
    const [main, ...rest] = result.split('FOLLOW-UP:')
    return { question: main.trim(), followUp: rest.join('').trim() || null }
  }

  // Mock fallback
  const bank = MOCK_QUESTIONS[subject] ?? MOCK_QUESTIONS['civil-law']
  return pickRandom(bank)
}

export async function evaluateAnswer({ question, answer, subject = 'all', onChunk, onDone, onError } = {}) {
  const system = buildSystemPrompt(subject, EVALUATION_SYSTEM)
  const content = `QUESTION: ${question}\n\nSTUDENT'S ANSWER: ${answer}\n\nEvaluate this recitation answer.`
  const ok = await streamClaude({ system, messages: [{ role: 'user', content }], onChunk, onDone, onError })
  if (!ok) await streamMock(MOCK_EVALUATION, onChunk, onDone)
}
