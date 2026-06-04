export const FLASHCARDS = [
  {
    id: 'fl-001',
    subject: 'civil-law',
    topic: 'Obligations and Contracts',
    difficulty: 'medium',
    front: 'What are the essential requisites of a valid contract under the Civil Code?',
    back: `Under Article 1318 of the Civil Code, there is no contract unless the following concur:
1. **Consent** of the contracting parties
2. **Object** certain which is the subject matter of the contract
3. **Cause** of the obligation which is established

*Absence of any essential element renders the contract void ab initio.*`,
    tags: ['contracts', 'essentials', 'Art. 1318'],
    mastered: false,
  },
  {
    id: 'fl-002',
    subject: 'civil-law',
    topic: 'Obligations and Contracts',
    difficulty: 'hard',
    front: 'Distinguish between a void contract and a voidable contract.',
    back: `**Void Contract:**
- Has no effect from the very beginning (void ab initio)
- Cannot be ratified
- Action to declare nullity does not prescribe
- Cannot be the source of rights

**Voidable Contract:**
- Valid until annulled
- Can be ratified by the injured party
- Subject to a prescriptive period (4 years)
- Produces effects until annulled

*Key: Void = dead from birth; Voidable = sick but alive until annulled*`,
    tags: ['contracts', 'void', 'voidable', 'distinction'],
    mastered: false,
  },
  {
    id: 'fl-003',
    subject: 'criminal-law',
    topic: 'Revised Penal Code — Book I',
    difficulty: 'easy',
    front: 'What are the elements of dolo (deceit) in criminal law?',
    back: `**Dolo (Intentional Felony) requires:**
1. **Freedom** — the act was done voluntarily
2. **Intelligence** — the actor understood the nature of the act
3. **Intent** — the actor desired the result of the act

*Distinguished from Culpa (Fault): In culpa, the element of intent is replaced by negligence, imprudence, lack of foresight, or lack of skill.*`,
    tags: ['felonies', 'dolo', 'intent', 'Book I'],
    mastered: true,
  },
  {
    id: 'fl-004',
    subject: 'political-law',
    topic: 'Constitutional Law I',
    difficulty: 'medium',
    front: 'What is the Doctrine of Constitutional Supremacy?',
    back: `The **Doctrine of Constitutional Supremacy** states that the Constitution is the fundamental law of the land.

All laws, executive orders, and judicial decisions must conform to it. Any law that conflicts with the Constitution is **null and void**.

*Basis: The Constitution represents the sovereign will of the Filipino people and is the supreme source of all governmental authority. (Sec. 1, Art. II, 1987 Constitution)*`,
    tags: ['constitutional-supremacy', 'fundamental-law'],
    mastered: false,
  },
  {
    id: 'fl-005',
    subject: 'remedial-law',
    topic: 'Civil Procedure',
    difficulty: 'hard',
    front: 'What is the rule on exhaustion of administrative remedies and its exceptions?',
    back: `**General Rule:** Before a party may seek judicial intervention, they must first exhaust all available administrative remedies.

**Exceptions (PURE-FE-VA):**
- **P**ure question of law
- **U**rgent need for judicial intervention
- **R**espondent is a department secretary (alter ego doctrine)
- **E**stoppel on the part of the government
- **F**undamental rights are being violated
- **E**xhaustibility is futile or vain
- **V**iolation of due process
- **A**dministrative action is patently illegal

*Remember: The doctrine is NOT absolute.*`,
    tags: ['administrative-remedies', 'exhaustion', 'exceptions'],
    mastered: false,
  },
  {
    id: 'fl-006',
    subject: 'legal-ethics',
    topic: 'Code of Professional Responsibility',
    difficulty: 'easy',
    front: 'State the lawyer\'s oath in its essential elements.',
    back: `A lawyer swears to:
1. Maintain allegiance to the **Republic of the Philippines**
2. Support the **Constitution** and obey the laws
3. **Not** do falsehood nor consent to doing any
4. Not wittingly or willingly promote groundless, false, or unlawful suits
5. **Delay no man** for money or malice
6. Conduct himself as a **lawyer** with all good fidelity to courts and clients
7. Impose upon himself these voluntary obligations without mental reservation

*The Lawyer's Oath is not mere ceremony — it is a continuing obligation.*`,
    tags: ['lawyer-oath', 'CPR', 'ethics'],
    mastered: true,
  },
  {
    id: 'fl-007',
    subject: 'commercial-law',
    topic: 'Corporation Code',
    difficulty: 'medium',
    front: 'What is the Business Judgment Rule in corporation law?',
    back: `The **Business Judgment Rule** protects corporate directors and officers from personal liability for decisions made in good faith in the exercise of honest judgment.

**Elements:**
1. Decision was made **in good faith**
2. Director/officer was **not tainted by self-interest**
3. Decision was made on an **informed basis**

**Effect:** Courts will not substitute their judgment for that of the board when these elements are present.

*Exception: Fraud, bad faith, or gross negligence removes this protection.*`,
    tags: ['corporation', 'business-judgment', 'directors'],
    mastered: false,
  },
  {
    id: 'fl-008',
    subject: 'taxation-law',
    topic: 'General Principles',
    difficulty: 'easy',
    front: 'Enumerate the inherent limitations on the power of taxation.',
    back: `**PINE-P** (Inherent Limitations):
1. **P**ublic purpose — taxes must benefit the public, not private individuals
2. **I**nternational comity — foreign governments are exempt from taxation
3. **N**on-delegability — power to tax cannot be delegated (except to LGUs)
4. **E**xemption of government entities — government is generally exempt
5. **P**rescription/Territoriality — limited to persons, property, and transactions within the jurisdiction

*These limitations exist even without constitutional provision.*`,
    tags: ['taxation', 'inherent-limitations', 'general-principles'],
    mastered: false,
  },
]

export const getDueFlashcards = () => FLASHCARDS.filter(f => !f.mastered)
export const getFlashcardsBySubject = (subjectId) =>
  FLASHCARDS.filter(f => f.subject === subjectId)
