export const laborMCQ = [
  {
    id: 'lab-mcq-001', subject: 'labor-law', topic: 'illegal-dismissal', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A was dismissed for habitual tardiness — she was late 10 times in one month. The company\'s code of conduct states that 5 instances of tardiness in one month constitutes a dismissable offense. Was the dismissal valid?',
    choices: [
      'No — habitual tardiness is not a valid ground for dismissal under the Labor Code.',
      'Yes — the company followed its code of conduct and A clearly violated the rule.',
      'No — dismissal requires two written notices and an opportunity to be heard; the facts do not mention this.',
      'Yes — tardiness constitutes serious misconduct justifying dismissal.',
    ],
    correctAnswer: 2,
    explanation: 'Even if the company has a valid ground for dismissal (habitual tardiness under company policy), PROCEDURAL DUE PROCESS must be observed: (1) FIRST NOTICE — a written notice specifying the act or omission charged and giving the employee an opportunity to explain/respond (5-day period); (2) HEARING/CONFERENCE — an opportunity to be heard; (3) SECOND NOTICE — a written notice of the decision to dismiss. Without these two notices (and an opportunity to be heard), the dismissal is PROCEDURALLY INVALID even if substantively valid. The employee may be entitled to nominal damages (₱30,000) for violation of procedural due process per *Jaka Food Processing*.',
    taglishExplanation: 'Kahit may valid na ground (habitual tardiness violating company policy) — kailangan pa rin ng **two-notice rule**! (1) First notice: Ipaalam ang charge, bigyan ng pagkakataon na tumugon (5 days); (2) Hearing/conference; (3) Second notice: Desisyon ng dismissal. Kung wala ito — **procedurally invalid** ang dismissal kahit may valid na substantive ground. Remedy: Nominal damages ng ₱30,000 (*Jaka Food* doctrine).',
    relatedArticle: 'Art. 292-299 Labor Code; Sec. 2 Rule I Book VI IRR; Two-notice rule; *Agabon v. NLRC*; *Jaka Food v. Pacot*',
    points: 2,
  },
  {
    id: 'lab-mcq-002', subject: 'labor-law', topic: 'labor-standards', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'A driver works from 8am to 6pm but spends 2 hours of his shift waiting for passengers at a terminal (on-call but free to rest). Are those 2 waiting hours compensable?',
    choices: [
      'No — waiting time where the employee is completely free is not hours worked.',
      'Yes — all time spent at the employer\'s premises during the shift is compensable.',
      'Yes — waiting time is compensable if the employee cannot use the time effectively for personal purposes.',
      'No — only actual driving time is compensable for drivers.',
    ],
    correctAnswer: 2,
    explanation: 'Under the Omnibus Rules implementing the Labor Code (Book III, Rule I): WAITING TIME is compensable as hours worked IF: the employee is required to wait at a prescribed place and CANNOT use the time effectively for his own purposes. The test is whether the employee can use the waiting time for his own benefit. If a driver is at the terminal and CAN use the time (sleep, eat, read freely) without being called — NOT compensable. But if he must remain ready/alert and CANNOT effectively use the time for personal purposes — COMPENSABLE. The facts say the driver is "free to rest" but still at the terminal — depends on whether he can truly use the time for his own purposes.',
    taglishExplanation: 'Ang waiting time ay compensable kung ang empleyado ay **hindi epektibong magamit ang oras para sa sarili**. Test: Pwede ba siyang umalis, mantulog, kumain, o gawin ang sariling gusto? Kung nasa terminal pa rin at kailangan maging available — compensable. Kung talaga namang libre at walang restriction — hindi compensable. Sa kaso ng driver na "free to rest" pero nasa terminal pa rin — fact-specific ito; likely compensable kung hindi siya pwedeng umalis.',
    relatedArticle: 'Art. 83-90 Labor Code; Omnibus Rules Book III Rule I Sec. 5; compensable waiting time',
    points: 2,
  },
  {
    id: 'lab-mcq-003', subject: 'labor-law', topic: 'security-of-tenure', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A company hired B as a project employee for a 6-month project. When the project was completed, the company rehired B for 5 more consecutive projects over 3 years. The company then refused to renew. Did B become a regular employee?',
    choices: [
      'No — B was always hired as a project employee; continuous rehiring for projects does not create regular status.',
      'Yes — continuous rehiring for projects exceeding 1 year converts project employees to regular employees.',
      'Yes — the continuous rehiring for 3 years, making B perform work that is necessary and desirable in the usual business, establishes regular employment.',
      'No — project employees can never acquire regular status under the Labor Code.',
    ],
    correctAnswer: 2,
    explanation: 'Under Art. 295 Labor Code and DOLE DO 19-93 (Construction): While project employees may be repeatedly rehired without automatically becoming regular, the SC has recognized that continuous rehiring over an extended period performing tasks NECESSARY AND DESIRABLE to the employer\'s usual business may establish REGULAR STATUS. The test is not just the length of service but whether (1) the activity is necessary/desirable in the business; and (2) the continuous rehiring shows the employer\'s reliance on the employee\'s continued service beyond any specific project. After 3 years of consecutive rehirings for related work, B likely acquired regular status.',
    taglishExplanation: 'Ang regular employment test: Ang trabaho ba ay **necessary and desirable** sa usual business ng employer? Ang paulit-ulit na pag-rehire sa loob ng 3 taon, kahit project basis, ay nagpapakita na si B ay hindi talaga para sa specific project lang — kailangan siya ng kumpanya sa kanyang regular operations. **3 years of continuous rehiring** + necessary and desirable work = regular employee. Hindi pwedeng gamitin ang "project" label para iwasan ang security of tenure.',
    relatedArticle: 'Art. 295 Labor Code; *Integrated Contractor v. Abaya*; *Maraguinot v. NLRC*; project to regular employee',
    points: 2,
  },
  {
    id: 'lab-mcq-004', subject: 'labor-law', topic: 'labor-relations', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'During CBA negotiations, the union filed a notice of strike. The employer moved to the NLRC to declare the strike illegal. The DOLE Secretary assumed jurisdiction. The union proceeded with the strike. What is the effect on union members who continued to strike?',
    choices: [
      'They may only be suspended — dismissal for continuing a strike is disproportionate.',
      'They may be dismissed — defying a DOLE Secretary\'s assumption order is grounds for termination.',
      'They cannot be punished — going on strike is a constitutionally protected right.',
      'They may only be dismissed if they committed acts of violence during the strike.',
    ],
    correctAnswer: 1,
    explanation: 'Under Art. 278(g) Labor Code: When the DOLE Secretary assumes jurisdiction over a labor dispute or certifies it to the NLRC, ALL STRIKING EMPLOYEES MUST IMMEDIATELY RETURN TO WORK. The assumption order has the effect of an INJUNCTION against the strike. Any employee who DEFIES the return-to-work order commits an act of DEFIANCE of a lawful order — this constitutes SERIOUS MISCONDUCT and/or willful disobedience, which are valid grounds for dismissal (Art. 297). The SC has consistently upheld dismissals of workers who defy assumption orders.',
    taglishExplanation: 'Ang DOLE Secretary assumption order ay may epektong **injunction** laban sa strike — return-to-work order agad! Ang sinumang sumunod sa strike pagkatapos ng assumption order ay lumalabag sa batas. Ground para sa dismissal: **Serious misconduct at willful disobedience** ng lawful order. Hindi protektado ng right to strike ang defiance ng valid government order. Maraming SC cases ang nagpapatunay na pwedeng i-dismiss ang mga striking worker na defied ang assumption order.',
    relatedArticle: 'Art. 278(g) Labor Code; *St. Scholastica\'s College v. Torres*; *Telefunken Semiconductors v. CA*',
    points: 2,
  },
  {
    id: 'lab-mcq-005', subject: 'labor-law', topic: 'illegal-dismissal', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A employee was found guilty of theft of company property valued at ₱200. The company dismissed her. She argues the penalty is disproportionate to the offense. Should the NLRC uphold the dismissal?',
    choices: [
      'No — dismissal for ₱200 theft is too harsh; suspension is more appropriate.',
      'Yes — theft of company property, regardless of value, is a valid cause for dismissal as it constitutes serious misconduct.',
      'No — the company should have applied progressive discipline first.',
      'Yes — but the company must refund the proportional part of the theft value.',
    ],
    correctAnswer: 1,
    explanation: 'Under Art. 297 Labor Code and SC jurisprudence: THEFT or DISHONESTY against the employer constitutes SERIOUS MISCONDUCT and/or LOSS OF TRUST AND CONFIDENCE — both valid grounds for dismissal under Art. 297(a) and (c). The VALUE stolen does not determine validity of dismissal. The SC has consistently held that theft — even for a small amount — destroys the trust relationship between employer and employee, which is the basis of the employment relationship. Courts do not substitute their judgment for the employer\'s on the severity of the penalty for dishonest acts against the employer.',
    taglishExplanation: 'Sa theft ng company property — ang **halaga ay hindi determinative**! Kahit maliit (₱200), ang pagnanakaw laban sa employer ay: (1) Serious misconduct; at (2) Loss of trust and confidence — parehong valid grounds para sa dismissal (Art. 297). Ang kawalan ng trust — hindi ang halaga ng ninakaw — ang pangunahing consideration. SC jurisprudence: Hindi gagawin ng court na parang arbiter ng "tamang" parusa sa dishonesty laban sa employer.',
    relatedArticle: 'Art. 297(a)(c) Labor Code; *Philippine Long Distance v. NLRC*; theft as ground for dismissal',
    points: 2,
  },
  {
    id: 'lab-mcq-006', subject: 'labor-law', topic: 'separation-pay', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A company retrenched 50 employees due to serious business losses. The company paid separation pay of 1/2 month per year of service. Retrenched employees demand 1 month per year. Which is correct?',
    choices: [
      '1 month per year — retrenchment separation pay is always 1 month per year of service.',
      '1/2 month per year is correct for retrenchment — this is the legal minimum.',
      '1/2 month per year — but only if the company has proof of serious losses.',
      '1 month per year — the 1/2 month rate is only for closure due to irreversible losses.',
    ],
    correctAnswer: 1,
    explanation: 'Under Art. 298 Labor Code (Retrenchment): In case of retrenchment to prevent losses, the separation pay is the HIGHER OF: (1) ONE MONTH pay; or (2) at least ONE-HALF (1/2) MONTH PAY for every year of service, whichever is higher. The minimum is 1/2 month per year for retrenchment — NOT 1 month. The 1-month rate applies to: (1) installation of labor-saving devices; (2) redundancy. For RETRENCHMENT: 1/2 month is the legal minimum. For CLOSURE not due to serious losses: 1 month. For closure due to serious losses: No required separation pay. The company paid the correct legal minimum.',
    taglishExplanation: 'Separation pay matrix! **Retrenchment** (dahil sa losses): **1/2 month per year**. Redundancy at labor-saving devices: 1 month per year. Closure NOT due to losses: 1 month per year. Closure DUE TO LOSSES: Wala — exempt ang employer. Kaya tama ang kumpanya na nagbayad ng 1/2 month per year para sa retrenchment. Ang employees ay maling humiling ng 1 month. Ito ang isa sa mga standard na tanong sa bar.',
    relatedArticle: 'Art. 298-299 Labor Code; separation pay rates; retrenchment vs. redundancy vs. closure',
    points: 2,
  },
  {
    id: 'lab-mcq-007', subject: 'labor-law', topic: 'labor-standards', year: 2021,
    difficulty: 'medium', type: 'mcq',
    question: 'An employer paid all employees a 13th month pay of ₱5,000 as a fixed amount for 20 years. The company now wants to reduce it to the statutory minimum (1/12 of basic annual pay). Can the company validly reduce the 13th month pay?',
    choices: [
      'Yes — 13th month pay cannot exceed the statutory amount; excess is voluntary.',
      'No — the ₱5,000 fixed amount has ripened into a company policy/practice that cannot be unilaterally reduced.',
      'Yes — the employer may adjust benefits as long as the statutory minimum is met.',
      'No — all pay increases are permanent under the Labor Code.',
    ],
    correctAnswer: 1,
    explanation: 'Under the doctrine of NON-DIMINUTION OF BENEFITS (Art. 100 Labor Code): Employers CANNOT unilaterally reduce, diminish, or eliminate benefits that have ripened into COMPANY PRACTICE. A benefit becomes a company practice when it is (1) given over a considerable period of time; (2) consistently and deliberately done; (3) not merely a product of error. The ₱5,000 fixed 13th month pay for 20 consecutive years has RIPENED INTO COMPANY PRACTICE — it cannot be reduced unilaterally even if it exceeds the statutory minimum. Reduction would constitute DIMINUTION OF BENEFITS, which is prohibited.',
    taglishExplanation: '**Non-diminution of benefits** (Art. 100 Labor Code)! Ang ₱5,000 na fixed 13th month pay sa loob ng 20 taon ay naging **company practice** na — hindi pwedeng bawasan nang unilaterally! Kahit higit pa sa statutory minimum, kapag naging established practice na — protektado ito. Ang employer ay kailangan mag-negotiate sa union (kung mayroon) o makakuha ng employee consent. Hindi lang basta pwedeng babaan ng employer ang established benefits.',
    relatedArticle: 'Art. 100 Labor Code; Non-diminution of benefits; *Sevilla Trading v. Semana*',
    points: 2,
  },
  {
    id: 'lab-mcq-008', subject: 'labor-law', topic: 'social-legislation', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A domestic worker (kasambahay) worked for a family for 5 years. She was dismissed without cause. What benefits is she entitled to under RA 10361 (Kasambahay Law)?',
    choices: [
      'Separation pay of 1 month per year of service, plus unpaid wages.',
      'Separation pay equivalent to 15 days per year of service, since she is a domestic worker.',
      'Severance pay of 5 months (1 month per year), SSS/PhilHealth/Pag-IBIG benefits, and 13th month pay.',
      'No separation pay — kasambahay are excluded from the Labor Code separation pay provisions.',
    ],
    correctAnswer: 0,
    explanation: 'Under RA 10361 (Kasambahay Law), Sec. 32: If a DOMESTIC WORKER is dismissed without just cause, the employer must pay SEVERANCE PAY of 15 DAYS PAY for every year of service. However, if the kasambahay was dismissed without cause under the general rule, Sec. 32 provides for pay. SEPARATELY, under Sec. 25: Kasambahay who have rendered service for one year are entitled to an ANNUAL SERVICE INCENTIVE LEAVE. Also entitled to: SSS, PhilHealth, Pag-IBIG coverage, and 13th month pay. The most accurate answer to illegal dismissal: Severance pay (15 days/year), plus unpaid wages and benefits.',
    taglishExplanation: 'Kasambahay Law (RA 10361) ay may sariling rules! Severance pay for illegal dismissal: **15 days per year of service** — hindi 1 month katulad ng regular employees. Plus: Unpaid wages, SSS/PhilHealth/Pag-IBIG contributions, 13th month pay, at service incentive leave (kung 1+ year). Importante: Kasambahay ay may proteksyon sa ilalim ng espesyal na batas — hindi excluded sa labor protections.',
    relatedArticle: 'RA 10361 (Kasambahay Law) Secs. 25, 29-32; domestic worker entitlements',
    points: 2,
  },
]

export const laborEssays = [
  {
    id: 'lab-essay-001', subject: 'labor-law', topic: 'illegal-dismissal-reinstatement', year: 2023,
    difficulty: 'hard', type: 'essay',
    scenario: `THE MANAGERIAL EMPLOYEE DILEMMA:

Ana was a Sales Manager at Sunshine Corp. for 8 years earning ₱80,000/month. In January 2023, the company dismissed her after alleging she had been sharing confidential pricing information with a competitor. The company issued a first notice (charge sheet), gave Ana 5 days to respond, held a conference, and issued a second notice of dismissal.

Ana filed a case for illegal dismissal. She argues: (1) She never shared any confidential information; the accusation is based solely on an unverified tip; (2) The company failed to prove the charge; (3) Even if the charge were true, dismissal is too harsh.

The Labor Arbiter ruled that the dismissal was illegal for lack of sufficient evidence.

(a) Did the company observe procedural due process?
(b) Was the dismissal substantively valid? What evidence standard applies?
(c) Assuming the dismissal was illegal, what are Ana's remedies?`,
    subQuestions: [
      {
        part: 'a',
        question: 'Did the company observe procedural due process?',
        points: 10,
        modelAnswer: 'YES. The company observed the TWO-NOTICE RULE under Art. 297 and the implementing rules: (1) FIRST NOTICE — a charge sheet was issued specifying the offense (sharing confidential information) giving Ana 5 days to respond — this satisfies the requirement of notice and opportunity to explain; (2) HEARING/CONFERENCE — a conference was held, giving Ana an opportunity to be heard; (3) SECOND NOTICE — a written notice of dismissal was issued. All three steps of procedural due process were followed. The company is not liable for nominal damages for procedural violation.',
        irac: {
          issue: 'Whether the company followed the two-notice rule for procedural due process.',
          rule: 'Art. 297 Labor Code; Sec. 2 Rule I Book VI IRR: First notice (charge + 5 days to respond) + hearing/conference + second notice (decision to dismiss).',
          application: 'Company issued: (1) Charge sheet with 5-day period → First notice. (2) Held a conference → Hearing. (3) Issued dismissal notice → Second notice. All three steps completed.',
          conclusion: 'Procedural due process was observed. No nominal damages for procedural violations.',
        },
        taglishExplanation: 'Three-step procedural due process: (1) **First notice** (charge sheet + 5 days to respond) ✓; (2) **Hearing/conference** ✓; (3) **Second notice** (dismissal decision) ✓. Lahat ay sinunod ng kumpanya — walang procedural violation. Kaya walang basis para sa nominal damages dahil sa procedural defect.',
      },
      {
        part: 'b',
        question: 'Was the dismissal substantively valid? What evidence standard applies?',
        points: 10,
        modelAnswer: 'SUBSTANTIVELY INVALID. The charge of sharing confidential information — if true — would constitute serious misconduct and/or breach of trust and confidence (Art. 297[a][c]). As a Sales Manager, Ana is a MANAGERIAL EMPLOYEE — for whom the standard for loss of trust and confidence is LESS STRINGENT. However, the SC requires SUBSTANTIAL EVIDENCE — not mere suspicion or unverified tip. An accusation based solely on an unverified tip, without corroborating evidence, does NOT meet the substantial evidence standard. The employer bears the burden of proof of just cause. Dismissal based on unsubstantiated allegations is illegal.',
        irac: {
          issue: 'Whether an unverified tip constitutes sufficient evidence for dismissal on loss of trust and confidence.',
          rule: 'Art. 297 Labor Code: Just cause required. Loss of trust and confidence for managerial employees requires substantial evidence — not proof beyond reasonable doubt. Employer bears burden of proof.',
          application: 'Ana is a managerial employee — lower standard for loss of trust. BUT even the lower standard requires substantial evidence. An unverified tip alone does not meet this standard. No corroborating evidence presented.',
          conclusion: 'Dismissal is substantively invalid — not supported by substantial evidence. Illegal dismissal.',
        },
        taglishExplanation: '**Substantial evidence** ang standard sa illegal dismissal — hindi beyond reasonable doubt (criminal), pero higit sa suspicion. Para sa **managerial employee** katulad ni Ana — lower standard ng loss of trust. PERO kahit lower standard — kailangan ng actual evidence, hindi lang unverified tip. Ang employer ang may burden of proof. Walang ebidensya? → Illegal dismissal.',
      },
      {
        part: 'c',
        question: 'What are Ana\'s remedies for illegal dismissal?',
        points: 10,
        modelAnswer: 'Under Art. 294 Labor Code, Ana is entitled to: (1) REINSTATEMENT — to her former position without loss of seniority rights and other privileges; AND (2) FULL BACKWAGES — computed from the time of dismissal until actual reinstatement, inclusive of allowances and other benefits. If reinstatement is no longer feasible (due to strained relations or position no longer existing), Ana may opt for SEPARATION PAY in lieu of reinstatement at 1 month per year of service. For 8 years at ₱80,000/month: Separation pay = ₱640,000. Ana may also claim moral damages if bad faith in dismissal is proven, and exemplary damages if the dismissal was effected in a wanton manner.',
        irac: {
          issue: 'What remedies are available for an illegally dismissed employee?',
          rule: 'Art. 294 Labor Code: Reinstatement + full backwages. Separation pay in lieu of reinstatement if strained relations. Moral and exemplary damages if bad faith proven.',
          application: 'Ana = 8 years service, ₱80,000/month. Entitled to: reinstatement or separation pay (₱640,000) + full backwages from January 2023 to reinstatement/finality + allowances + 13th month pay pro-rated.',
          conclusion: 'Ana is entitled to reinstatement + full backwages (or separation pay ₱640,000 + backwages if reinstatement infeasible) + possible moral/exemplary damages.',
        },
        taglishExplanation: 'Illegal dismissal remedies (Art. 294): (1) **Reinstatement** sa dating position without loss of seniority; at (2) **Full backwages** mula dismissal hanggang reinstatement. Kung hindi feasible ang reinstatement (strained relations) → **Separation pay** (1 month per year × 8 years × ₱80K = ₱640K) + full backwages. Moral at exemplary damages: kung may bad faith. Total exposure ng kumpanya ay malaki — kaya importante ang due process at substantial evidence bago mag-dismiss.',
      },
    ],
  },
]

export default { mcq: laborMCQ, essays: laborEssays }
