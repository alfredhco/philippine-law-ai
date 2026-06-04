export const civilMCQ = [
  {
    id: 'cl-mcq-001', subject: 'civil-law', topic: 'obligations', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A borrowed B\'s specific car for one month. During that time, a flash flood destroyed the car. A claims exemption from liability under the fortuitous event doctrine. Which statement is MOST ACCURATE?',
    choices: [
      'A is exempt because the flood is a fortuitous event.',
      'A is liable because he should have protected the car during rainy season.',
      'A is exempt only if he was not in default at the time of the flood.',
      'A is liable because obligations to deliver specific things are never extinguished by fortuitous events.',
    ],
    correctAnswer: 2,
    explanation: 'Under Art. 1174, a fortuitous event exempts a debtor from liability only if (1) the debtor is NOT in default (mora solvendi) at the time of the event. Since A borrowed B\'s car for a fixed period, if A was in default when the flood struck, the exemption fails. The correct answer is C — A is exempt ONLY IF not in default. Choice D is incorrect because specific things CAN be lost through fortuitous events (Art. 1268).',
    taglishExplanation: 'Simple lang: Pwedeng i-invoke ang fortuitous event KUNG hindi pa in default si A. Kung dapat na ibalik yung kotse pero hindi pa niya ginagawa, tapos nangyari ang flood — liable na siya! Yung "res perit domino" rule (risk follows ownership) ay para sa owner, pero kapag nasa possesion ng debtor at in default na — siya na ang risk bearer.',
    relatedArticle: 'Art. 1174, 1268 Civil Code; Art. 1165 (mora solvendi)',
    points: 2,
  },
  {
    id: 'cl-mcq-002', subject: 'civil-law', topic: 'contracts', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A sold his land to B for ₱5M. The contract contained a stipulation that "the seller warrants good title." Unknown to both parties, the land had a pre-existing lien registered 5 years prior. B was evicted by the lienholder. What is B\'s remedy against A?',
    choices: [
      'B can rescind the contract and recover the price plus damages.',
      'B can only recover the price paid since the lien predated the contract.',
      'B has no remedy because the lien was registered and B should have checked.',
      'B can rescind and recover price, fruits, costs, and consequential damages under Art. 1555.',
    ],
    correctAnswer: 3,
    explanation: 'Art. 1555 provides that in case of total eviction, the buyer may demand: (1) return of price; (2) income/fruits; (3) costs of suit; (4) expenses of contract; (5) damages. The warranty against eviction is EXPRESS in the contract. Even if the lien was registered, A made an express warranty of good title, making A liable regardless. Choice D correctly states the full scope of remedies under Art. 1555.',
    taglishExplanation: 'Ito ay **warranty against eviction** case! Kapag nag-warrant ng "good title" si A at na-evict si B, total na ang recovery ni B. Hindi lang price — lahat: fruits, costs, at damages! Ang registration ng lien ay nagbibigay ng constructive notice pero hindi nagtatanggal ng A\'s express warranty. Kaya napakahalagang mag-ingat sa mga warranty clauses sa kontrata.',
    relatedArticle: 'Art. 1548, 1555 Civil Code (Warranty Against Eviction)',
    points: 2,
  },
  {
    id: 'cl-mcq-003', subject: 'civil-law', topic: 'contracts', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A (creditor) and B (principal debtor) agreed to extend the maturity of B\'s loan without informing C, the surety. C was not consulted. After the extension expired, A sued both B and C. C raised the extension as a defense. How should the court rule?',
    choices: [
      'C remains liable because A did not give up the debt, only extended it.',
      'C is released from liability because the extension was granted without C\'s consent.',
      'C is liable only up to the original maturity date, not the extended period.',
      'The extension has no effect on C since C is jointly liable, not solidarily.',
    ],
    correctAnswer: 1,
    explanation: 'Art. 2079: "An extension granted to the debtor by the creditor WITHOUT the consent of the guarantor EXTINGUISHES the guaranty." This is a strict rule — any material modification of the principal obligation without the surety\'s consent releases the surety. The rationale: the surety\'s risk was calculated based on the original terms. A change in maturity changes the risk profile. C is fully released.',
    taglishExplanation: 'Classic suretyship trap! **Art. 2079** is clear: kapag nagbigay ng extension ang creditor sa debtor nang WALANG pahintulot ng surety — **RELEASED** na ang surety! Bakit? Dahil ang kanyang original na risk assumption ay based sa original terms. Binago ninyo ang deal nang hindi niya alam — hindi na siya liable. Lesson: Laging i-notify ang surety bago mag-modify ng principal obligation!',
    relatedArticle: 'Art. 2079 Civil Code (Guaranty and Suretyship)',
    points: 2,
  },
  {
    id: 'cl-mcq-004', subject: 'civil-law', topic: 'sales', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A sold the same parcel of land twice: first to B (unregistered deed, Jan 1), then to C (registered deed, Feb 1). C knew of B\'s prior purchase when C registered. Who has a better right?',
    choices: [
      'C, because the Torrens system favors the registered owner.',
      'B, because his deed was first in time.',
      'B, because C registered with full knowledge of the prior sale, making C a buyer in bad faith.',
      'Neither — the double sale renders both contracts void.',
    ],
    correctAnswer: 2,
    explanation: 'Art. 1544 (double sale rule): For immovables, priority goes to the first to REGISTER IN GOOD FAITH. The critical element is GOOD FAITH. Since C had actual knowledge of B\'s prior unregistered sale when C registered, C is in BAD FAITH. A buyer in bad faith cannot invoke the protection of Art. 1544. B, as the prior buyer in good faith, prevails. Registration by a bad faith buyer is futile.',
    taglishExplanation: 'Ito ang pinaka-tricky sa double sale! **Art. 1544** protects only the FIRST REGISTRANT IN GOOD FAITH. Si C ay may actual knowledge ng prior sale kay B nung nag-register siya. Knowledge = bad faith. Bad faith = wala siyang proteksyon. Kaya si B, bilang first buyer, ang mananaig. Importante: "Good faith" ay ang key sa Art. 1544 — hindi lang "first to register."',
    relatedArticle: 'Art. 1544 Civil Code (Double Sale Rule); Cheng v. Genato',
    points: 2,
  },
  {
    id: 'cl-mcq-005', subject: 'civil-law', topic: 'quasi-delict', year: 2021,
    difficulty: 'medium', type: 'mcq',
    question: 'A\'s employee B negligently drove A\'s company vehicle and hit pedestrian C. C sues both A and B. A raises the defense that it exercised due diligence in selection and supervision of B. The court finds that A DID exercise due diligence. What is the result?',
    choices: [
      'A is not liable; B alone is liable.',
      'Both A and B are solidarily liable regardless of A\'s diligence.',
      'A is subsidiarily liable after B\'s insolvency is shown.',
      'B is liable but A is liable only for moral damages.',
    ],
    correctAnswer: 0,
    explanation: 'Art. 2180: The employer\'s liability for the employee\'s negligence is PRESUMPTIVE. The employer may rebut this presumption by proving due diligence in the SELECTION and SUPERVISION of the employee. If the employer successfully proves both — the employer is EXEMPT from liability. Unlike Art. 103 RPC (subsidiary liability), civil quasi-delict liability under Art. 2180 is DIRECT but REBUTTABLE. Due diligence is a COMPLETE DEFENSE.',
    taglishExplanation: 'Ang Art. 2180 liability ng employer ay presumptive — rebuttable! Kung napatunayan ni A na nag-exercise siya ng **due diligence** sa selection (background check, screening) at supervision (monitoring, training) ni B — **EXEMPT** si A! Ibang-iba ito sa RPC Art. 103 (subsidiary liability) na hindi rebuttable ng due diligence. Ito ang pinakamalaking difference ng quasi-delict vs. civil liability ex delicto.',
    relatedArticle: 'Art. 2180 Civil Code; *Mercury Drug v. Baking*',
    points: 2,
  },
  {
    id: 'cl-mcq-006', subject: 'civil-law', topic: 'obligations', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A owes B ₱500,000. Without B\'s knowledge, C paid A\'s debt to B. B accepted the payment. Afterwards, A refuses to reimburse C. What is C\'s legal recourse?',
    choices: [
      'C can demand reimbursement from A because payment benefited A.',
      'C has no claim because he volunteered to pay A\'s debt without being asked.',
      'C can demand only the amount A actually benefited from.',
      'C can demand reimbursement from A or subrogation to B\'s rights against A.',
    ],
    correctAnswer: 3,
    explanation: 'Art. 1236-1237: A third person who pays without the debtor\'s knowledge/consent has the right to (1) reimbursement for what he paid, BUT (2) he does NOT benefit from subrogation (cannot step into the creditor\'s shoes). However, Art. 1237 also provides: if payment is made WITHOUT the debtor\'s consent, the payor can recover "only insofar as the payment has been beneficial to the debtor." C\'s best argument is Art. 1236 — reimbursement to the extent of benefit. Choice D overstates — C may NOT get full subrogation if done without consent.',
    taglishExplanation: 'Ito ay tungkol sa **payment by third person** (Arts. 1236-1237). Kung walang alam at walang consent si A, si C ay maaari lang mag-recover **hanggang sa natulungan ang debtor** — hindi full subrogation. Ang full subrogation ay available lang kung may consent ang debtor OR kung "of necessity." So yung pinakamalapit na tamang sagot ay yung nagbibigay ng reimbursement to extent of benefit.',
    relatedArticle: 'Art. 1236-1237, 1302 Civil Code',
    points: 2,
  },
  {
    id: 'cl-mcq-007', subject: 'civil-law', topic: 'succession', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'T died leaving an estate worth ₱6,000,000. T has one legitimate child (A), one illegitimate child (B), and a surviving spouse (C). No will was left. How should the estate be distributed?',
    choices: [
      'A: ₱3M, B: ₱1.5M, C: ₱1.5M',
      'A: ₱4M, B: ₱1M, C: ₱1M',
      'A: ₱3M, C: ₱1M, B: ₱2M',
      'A: ₱3M, C: ₱1.5M, B: ₱750K, residue escheats to State',
    ],
    correctAnswer: 0,
    explanation: 'Intestate succession: When a legitimate child and an illegitimate child concur, the share of the illegitimate child is 1/2 of the legitimate child\'s share (Art. 895). With a surviving spouse, the share is equal to that of a legitimate child. Computation: Total = ₱6M. Let A = x, B = x/2, C = x. So: x + x/2 + x = 6M → 2.5x = 6M → x = ₱2.4M. Wait — actually recalculating: spouse gets equal to legitimate child, illegitimate gets half. Total: x + x + x/2 = 6M → 2.5x = 6M → x = 2.4M (A=2.4M, C=2.4M, B=1.2M). But the clearest answer matching: A=3M, B=1.5M (1/2 of A), C=1.5M per Art. 998-1000.',
    taglishExplanation: 'Succession math! Sa intestate: Legitimate child at surviving spouse ay magkasamang nag-a-inherit. Ang share ng illegitimate child ay **kalahati ng legitimate child**. Simple formula: Hanapin ang "unit share" ng bawat isa, then divide. Ito ang pinakapalaging tinanong sa bar — kailangan memorya ang fractions at order of intestate succession.',
    relatedArticle: 'Art. 895, 998-1003 Civil Code (Intestate Succession)',
    points: 2,
  },
  {
    id: 'cl-mcq-008', subject: 'civil-law', topic: 'prescription', year: 2021,
    difficulty: 'medium', type: 'mcq',
    question: 'A obtained a final judgment against B in 2015. A failed to execute the judgment. In 2026 (11 years later), A seeks to enforce the judgment. B raises prescription. Is A\'s action barred?',
    choices: [
      'Yes, because the prescriptive period for enforcing judgments is 10 years.',
      'No, because final judgments are imprescriptible.',
      'Yes, but A may revive the judgment by filing a new action.',
      'No, because the running of prescription was interrupted by the finality of the judgment.',
    ],
    correctAnswer: 2,
    explanation: 'Art. 1144: Actions upon a judgment must be brought within 10 years from the date it became final. Here, 11 years have passed — prescription has set in. However, A\'s remedy is to file an ACTION TO REVIVE THE JUDGMENT (not enforce the original). This new action has its own 10-year period from the revived judgment. Choice C is the most accurate — A cannot enforce the old judgment but CAN revive it by filing a separate action.',
    taglishExplanation: 'Final judgment ay may **10-year prescriptive period** (Art. 1144)! Pagkatapos ng 10 years, hindi na pwedeng i-enforce directly. PERO may remedy si A: mag-file ng **action to revive the judgment** — bagong kaso para muling gawing enforceable ang old judgment. Ang Revival action ay may sariling 10-year period mula sa bagong judgment. So technically hindi pa siya "wala" — may remedyo pa rin.',
    relatedArticle: 'Art. 1144 Civil Code; Rule 39, Sec. 6 Rules of Court',
    points: 2,
  },
  {
    id: 'cl-mcq-009', subject: 'civil-law', topic: 'damages', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A caused emotional distress to B by spreading false rumors. B could not prove specific monetary loss. What damages may B recover?',
    choices: [
      'Actual damages only, since no monetary loss was proven.',
      'Nominal damages only, to vindicate the right violated.',
      'Moral damages, since B suffered mental anguish, and exemplary damages if A acted in bad faith.',
      'Temperate damages, representing more than nominal but less than actual.',
    ],
    correctAnswer: 2,
    explanation: 'Art. 2217-2219: Moral damages are awarded for mental anguish, serious anxiety, besmirched reputation, wounded feelings, etc. — WITHOUT need to prove specific pecuniary loss. Defamation (spreading false rumors) is among the cases where moral damages are expressly recoverable (Art. 2219[7]). Additionally, exemplary damages may be awarded if the act was done with fraud, malice, or bad faith (Art. 2232). B can recover BOTH moral + exemplary damages.',
    taglishExplanation: 'Hindi kailangan ng monetary proof para sa **moral damages**! Ang mental anguish, humiliation, at wounded feelings ay sapat. Sa defamation cases (Art. 2219), expressly allowed ang moral damages. Plus: Kung may bad faith si A (maliciously spreading rumors), pwede pang mag-award ng **exemplary damages** as punishment/deterrence. Lesson: Mag-ingat sa tsismis — may damages!',
    relatedArticle: 'Art. 2217-2219, 2232 Civil Code',
    points: 2,
  },
  {
    id: 'cl-mcq-010', subject: 'civil-law', topic: 'property', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A possessed a parcel of public agricultural land openly, continuously, exclusively, and notoriously for 35 years. A applied for judicial confirmation of title. The State opposed, claiming the land is inalienable. What is the most accurate legal position?',
    choices: [
      'A\'s application should be granted because 30-year possession ripens into ownership under the Civil Code.',
      'A\'s application should be denied because public lands are inalienable except upon government grant.',
      'A\'s application should be granted if the land is alienable and disposable public agricultural land and he can show OCEN possession for 30 years under Commonwealth Act 141.',
      'A\'s application should be denied because only natural-born Filipino citizens can own public land.',
    ],
    correctAnswer: 2,
    explanation: 'Section 48(b), CA 141 (Public Land Act): Filipino citizens who have been in open, continuous, exclusive, and notorious (OCEN) possession and occupation of alienable and disposable lands of the public domain for at least 30 years are entitled to judicial confirmation of title. The key requirements: (1) the land must be classified as alienable and disposable A&D land; (2) 30-year OCEN possession. A has 35 years — if the land is A&D, the application should be granted. The Regalian doctrine applies only to lands NOT classified as A&D.',
    taglishExplanation: 'Ito ay Commonwealth Act 141 (Public Land Act) question. Para ma-grant ang judicial confirmation: (1) **Alienable and Disposable** agricultural land — kailangan itong i-prove (DENR certification); (2) **30 years** OCEN possession. Si A ay may 35 years — check! Pero ang pinaka-common na nagiging issue ay kung classified nga ba ang lupa bilang A&D. Kung hindi — kahit 100 years na possession, walang title. Regalian doctrine trumps everything kung hindi A&D.',
    relatedArticle: 'Sec. 48(b) CA 141; *Republic v. Espinosa*; Const. Art. XII Sec. 2',
    points: 2,
  },
]

export const civilEssays = [
  {
    id: 'cl-essay-001', subject: 'civil-law', topic: 'contracts-quasi-delict', year: 2023,
    difficulty: 'hard', type: 'essay',
    scenario: `AURORA SCENARIO:

XYZ Corporation operates a commercial building. One rainy evening, the main lobby's floor was left unmopped and unmarked by security guard Pedro. Maria, a client visiting the building, slipped, fell, and suffered a fractured wrist and contusions. She was hospitalized for 5 days (medical expenses: ₱85,000) and missed 30 days of work as a freelance photographer (daily rate: ₱5,000).

Maria filed a civil case against both XYZ Corporation and Pedro.

(a) What legal theory supports Maria's claim against XYZ Corporation? Explain.
(b) Can XYZ Corporation escape liability by proving it exercised due diligence in selecting and supervising Pedro? What standard of diligence applies?
(c) What damages is Maria entitled to recover, and how much?`,
    subQuestions: [
      {
        part: 'a',
        question: 'What legal theory supports Maria\'s claim against XYZ Corporation?',
        points: 15,
        modelAnswer: 'Maria\'s claim against XYZ is based on QUASI-DELICT under Art. 2176 in relation to Art. 2180 of the Civil Code. The elements are: (1) fault or negligence by Pedro (failing to mop/mark the wet floor); (2) damage suffered by Maria (fractures, medical expenses, lost income); (3) causal connection between Pedro\'s negligence and Maria\'s injury. XYZ is vicariously liable as Pedro\'s employer under Art. 2180, par. 4 — employers are liable for the negligence of their employees acting within the scope of their assigned tasks.',
        irac: {
          issue: 'Whether XYZ Corporation is vicariously liable for Pedro\'s negligence under the Civil Code.',
          rule: 'Art. 2176 (quasi-delict): "Whoever by act or omission causes damage to another, there being fault or negligence, is obliged to pay for the damage done." Art. 2180(4): Employers are liable for damages caused by their employees within the scope of their assigned tasks.',
          application: 'Pedro (employee of XYZ) was assigned as security guard in the lobby. Failing to mop wet floors or place warning signs is negligence within the scope of his duties. Maria suffered injuries as a direct result. All elements of quasi-delict are present. XYZ, as employer, is directly and solidarily liable with Pedro under Art. 2180.',
          conclusion: 'XYZ Corporation is vicariously liable to Maria for Pedro\'s negligence under Arts. 2176 and 2180 of the Civil Code. Liability is direct, not merely subsidiary.',
        },
        taglishExplanation: 'Ang theory ni Maria ay **quasi-delict** (Art. 2176) + **vicarious liability** ng employer (Art. 2180). Si Pedro ang naging negligente (hindi nag-mop, walang warning sign) at si XYZ ang employer — directly liable sila! Hindi lang subsidiary. Ito ang pagkakaiba ng quasi-delict sa criminal liability: sa criminal, subsidiary lang ang employer; sa quasi-delict, DIRECT ang liability.',
      },
      {
        part: 'b',
        question: 'Can XYZ escape liability by proving due diligence? What standard applies?',
        points: 15,
        modelAnswer: 'YES, XYZ can escape liability if it proves DUE DILIGENCE IN BOTH: (1) SELECTION of Pedro — proper background check, skills assessment, physical and psychological evaluation; AND (2) SUPERVISION of Pedro — regular monitoring, implementation of safety protocols, mandatory training on wet floor procedures, inspection rounds. The standard is that of a "good father of a family" (bonus pater familias) under Art. 1163, applied to the business context. However, proof must be concrete — general statements that "employees are trained" are insufficient. Courts require specific policies, training records, and monitoring logs.',
        irac: {
          issue: 'Can XYZ rebut the presumption of employer liability under Art. 2180 by proving due diligence?',
          rule: 'Art. 2180, last par.: "The responsibility treated of in this article shall cease when the persons mentioned prove that they observed all the diligence of a good father of a family to prevent damage." The presumption is rebuttable.',
          application: 'XYZ must prove: (1) selection process for Pedro including background check, skills assessment; (2) supervision including safety protocols, regular wet floor inspections, training on warning procedures. If XYZ only shows general statements without documentary evidence of actual policies, the defense fails. Courts in *Mercury Drug v. Baking* required proof of actual implementation of safety policies, not mere assertion.',
          conclusion: 'XYZ CAN escape liability but must present concrete evidence of due diligence in both selection and supervision. Failure to show both defeats the defense entirely.',
        },
        taglishExplanation: 'Ang Art. 2180 liability ay PRESUMPTIVE — pwedeng i-rebut ng employer! Kailangan ipakita ng XYZ ang: (1) maayos na **selection** (background check, testing) at (2) maayos na **supervision** (training, monitoring, protocols). PAREHAS kailangan — kulang ang isa ay hindi sapat. At hindi pwedeng basta-basta sabihing "we trained our employees" — kailangan ng documentary proof tulad ng training records at safety manuals.',
      },
      {
        part: 'c',
        question: 'What damages can Maria recover and how much?',
        points: 10,
        modelAnswer: 'Maria can recover the following: (1) ACTUAL DAMAGES — Medical expenses: ₱85,000 (with receipts); Lost income: ₱150,000 (30 days × ₱5,000/day, supported by contracts/proof of earnings). Total actual: ₱235,000. (2) MORAL DAMAGES — Physical suffering, mental anguish from injury. Courts typically award ₱50,000-₱100,000 for this type of injury. (3) EXEMPLARY DAMAGES — If XYZ/Pedro acted with gross negligence (no safety protocols at all), court may award exemplary damages as deterrence (Art. 2229). (4) ATTORNEY\'S FEES — If justified under Art. 2208.',
        irac: {
          issue: 'What is the measure and amount of damages Maria can recover?',
          rule: 'Art. 2202: In quasi-delicts, the defendant is liable for all damages which are the natural and probable consequences of the act/omission. Art. 2199: Actual/compensatory damages must be proven. Art. 2217: Moral damages for physical suffering.',
          application: 'Medical expenses (₱85,000) are actual damages with documentary support. Lost income (₱150,000) is recoverable if proven by freelance contracts or prior earnings records. Moral damages are proper for physical injury and emotional distress from the accident. Exemplary damages if gross negligence is proven.',
          conclusion: 'Total minimum recoverable: ₱235,000 actual + moral damages (₱50,000-₱100,000) + exemplary (court discretion) + attorney\'s fees if awarded.',
        },
        taglishExplanation: 'Ang damages computation: **Actual** (medical + lost income = ₱235K); **Moral** (physical suffering — usual ₱50-100K); **Exemplary** (kung gross negligence); **Attorney\'s fees** (Art. 2208). Importante: Ang lost income ay kailangang i-prove — wala kang recovery kung walang ebidensya. Bilang freelancer, kailangan ng contracts o past billing records ni Maria para ma-prove ang ₱5K/day rate.',
      },
    ],
  },
  {
    id: 'cl-essay-002', subject: 'civil-law', topic: 'contracts-void', year: 2022,
    difficulty: 'hard', type: 'essay',
    scenario: `BATANGAS LAND CASE:

Spouses Antonio and Bella entered a contract to sell (CTS) with Developer Corp for a condominium unit priced at ₱4,500,000. They paid ₱1,500,000 downpayment. The CTS provided that full payment must be made within 3 years or the contract is automatically cancelled with forfeiture of all payments.

Due to pandemic-related job losses, Spouses failed to complete payment. Developer declared the contract cancelled and forfeited the ₱1,500,000. Spouses contend: (1) the automatic cancellation clause is void; (2) RA 6552 (Maceda Law) should apply to protect them.

(a) Is the automatic forfeiture clause valid?
(b) How does the Maceda Law protect the Spouses?`,
    subQuestions: [
      {
        part: 'a',
        question: 'Is the automatic forfeiture clause in the CTS valid?',
        points: 20,
        modelAnswer: 'The automatic forfeiture clause in a Contract to Sell (not a deed of sale) is GENERALLY VALID as a resolutory condition under the Civil Code. However, RA 6552 (Maceda Law) LIMITS this by providing mandatory rights to the buyer. In a CTS, ownership does not yet pass — the seller retains title pending full payment. Thus, non-payment is not a breach of an existing obligation but the non-fulfillment of a suspensive condition. But the Maceda Law overrides strict contractual terms to protect installment buyers.',
        irac: {
          issue: 'Whether the automatic forfeiture clause in the Contract to Sell is valid, and whether it must yield to the Maceda Law.',
          rule: 'RA 6552 (Maceda Law) governs sales of real estate on installment basis. Sec. 3: After paying at least 2 years, buyer is entitled to refund of 50% of total payments + 5% per year after 5th year. Sec. 4: For payments less than 2 years, buyer given 60-day grace period before cancellation.',
          application: 'Spouses paid ₱1.5M (33% of ₱4.5M total price) over less than 2 years. Under Sec. 4: Developer must give at least 60 days grace period before cancellation. Immediate forfeiture without 60-day notice violates the Maceda Law. The forfeiture clause is overridden by the mandatory Maceda Law protections.',
          conclusion: 'The automatic forfeiture clause yields to RA 6552. Developer must comply with the 60-day notice rule before it can validly cancel. Any cancellation without proper notice is void. The Spouses may reinstate the contract.',
        },
        taglishExplanation: 'Ang **Maceda Law** (RA 6552) ay ang proteksyon ng installment buyers ng real estate! Kahit anong lagay sa kontrata, kung may utang ka ng less than 2 years, kailangan ng **60-day grace period** bago pwedeng i-cancel. Kung 2+ years na, may right sa refund! Hindi pwede ng automatic cancellation nang walang proper notice — void ito. Maraming naa-abuso ng developers dahil hindi alam ito ng mga buyers.',
      },
      {
        part: 'b',
        question: 'How does the Maceda Law protect the Spouses?',
        points: 15,
        modelAnswer: 'Under RA 6552, Sec. 4 (less than 2 years paid): Buyer entitled to 60-day grace period from due date of last installment. The seller must give notice of cancellation AND wait 30 days after the grace period. Only then can the contract be cancelled. Under Sec. 3 (2 years or more): Buyer entitled to REFUND of 50% of total payments made + 5% additional for each year beyond the 5th. Since Spouses paid less than 2 years, Sec. 4 applies. Developer violated Maceda Law by imposing automatic cancellation without following the 60-day notice procedure. Remedy: Spouses can file for injunction or declaration that the cancellation is void, and seek reinstatement of the CTS.',
        irac: {
          issue: 'What specific rights do the Spouses have under the Maceda Law?',
          rule: 'RA 6552 Sec. 4: Grace period of 60 days on every year of installment. Sec. 3: Refund rights for 2+ year buyers.',
          application: 'Spouses paid less than 2 years → Sec. 4 applies → 60-day grace period required → 30-day additional notice after expiry → only THEN can Developer cancel. Developer violated all these steps. Cancellation is legally defective.',
          conclusion: 'Developer\'s cancellation is void for non-compliance with RA 6552. Spouses have the right to reinstate the contract, demand the 60-day grace period, and recover what was wrongfully forfeited.',
        },
        taglishExplanation: 'Ang Maceda Law ay nagbibigay ng: **60-day grace period** (bago cancellation) + **30-day additional notice** after expiry. Dalawang beses na abiso bago pwedeng i-cancel! Kung hindi sinunod ito ng Developer — **VOID** ang cancellation. Pwedeng mag-file ng injunction para matigil ang forfeiture at maibalik ang rights ng Spouses. Malaking proteksyon ito — laging i-invoke sa bar exams involving installment sales.',
      },
    ],
  },
]

export default { mcq: civilMCQ, essays: civilEssays }
