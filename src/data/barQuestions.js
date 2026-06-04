export const BAR_QUESTIONS = [
  {
    id: 'bq-001',
    year: 2023,
    subject: 'civil-law',
    topic: 'Obligations and Contracts',
    type: 'essay',
    difficulty: 'hard',
    question: `A and B entered into a contract of sale where A sold his land to B for ₱5,000,000. At the time of the contract, A was under undue influence exerted by B. A later discovered this and wants to annul the contract. Meanwhile, B had already sold the land to C, a buyer in good faith and for value.

(a) Can A annul the contract of sale between A and B? Explain.
(b) Will the annulment, if granted, affect C's ownership of the land? Explain.`,
    modelAnswer: `(a) YES, A can annul the contract.

The contract between A and B is voidable under Art. 1390(1) of the Civil Code because consent was vitiated by undue influence, which deprives the party of reasonable freedom of choice (Art. 1337). The action for annulment must be brought within 4 years from the time the defect ceases (Art. 1391).

(b) NO, the annulment will not affect C's ownership.

Under Art. 1397, the action for annulment may be brought only by the party whose consent was vitiated, not by third persons. More critically, under the Torrens system (P.D. 1529), a buyer in good faith and for value who relies on a clean certificate of title acquires valid title. The principle of indefeasibility of Torrens title protects C.

*Note: If A had annotated a notice of lis pendens before C's purchase, the result might differ.*`,
    tags: ['contracts', 'voidable', 'annulment', 'Torrens', 'good-faith-purchaser'],
    attemptedAt: null,
    score: null,
  },
  {
    id: 'bq-002',
    year: 2022,
    subject: 'criminal-law',
    topic: 'Crimes Against Persons',
    type: 'mcq',
    difficulty: 'medium',
    question: `X stabbed Y intending only to inflict physical injuries. Y, however, died due to a pre-existing heart condition aggravated by the stabbing. What crime did X commit?`,
    choices: [
      'Homicide, because death resulted from the act',
      'Physical injuries only, because X lacked intent to kill',
      'Homicide under the "proximate cause" doctrine',
      'Reckless imprudence resulting in homicide',
    ],
    correctAnswer: 2,
    explanation: `Under the **praeter intentionem** doctrine (Art. 4, RPC), a person is criminally responsible for all consequences of his felonious act, even if the result is different from what he intended. The rule is: "The one who is the cause of the cause is the cause of the evil caused."

Since X's stabbing was the **proximate cause** of Y's death — even if aggravated by a pre-existing condition — X is liable for **Homicide** (Art. 249, RPC). The pre-existing condition of the victim does not insulate X from liability.`,
    tags: ['praeter-intentionem', 'proximate-cause', 'homicide', 'Art. 4'],
    attemptedAt: null,
    userAnswer: null,
  },
  {
    id: 'bq-003',
    year: 2023,
    subject: 'political-law',
    topic: 'Constitutional Law II',
    type: 'essay',
    difficulty: 'hard',
    question: `Congress passed RA 9999 requiring all persons earning above ₱2 million annually to contribute 5% of their income to a "National Legal Aid Fund." The funds would be managed by a private foundation chosen by the DOJ Secretary. Atty. P challenges the law as unconstitutional.

Resolve the constitutionality of RA 9999.`,
    modelAnswer: `RA 9999 is **unconstitutional** on two grounds:

**1. Violation of the Non-Appropriation Rule / Public Purpose Doctrine**
While legal aid may be a valid public purpose, turning over management to a **private foundation** violates the requirement that public funds must be used for public purposes and managed by the government. (Art. VI, Sec. 29(1); *Kilosbayan v. Guingona*, G.R. No. 113375)

**2. Violation of Equal Protection**
The law arbitrarily singles out a class of income earners without rational basis beyond income level. The classification must be: (a) based on substantial distinctions, (b) germane to the law's purpose, (c) not limited to existing conditions, and (d) apply equally to all members of the same class. (*Ichong v. Hernandez*)

The law also raises **due process** concerns (deprivation of property without due process) since the 5% levy is not clearly a tax and lacks the hallmarks of a valid exercise of the taxation power.

*Conclusion: The law is void for violating the non-delegation doctrine, equal protection, and due process.*`,
    tags: ['public-purpose', 'taxation', 'equal-protection', 'constitutional-law'],
    attemptedAt: null,
    score: null,
  },
]

export const getQuestionsBySubject = (subjectId) =>
  BAR_QUESTIONS.filter(q => q.subject === subjectId)

export const getQuestionsByYear = (year) =>
  BAR_QUESTIONS.filter(q => q.year === year)

export const BAR_YEARS = [...new Set(BAR_QUESTIONS.map(q => q.year))].sort((a, b) => b - a)
