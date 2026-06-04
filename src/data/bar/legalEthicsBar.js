export const ethicsMCQ = [
  {
    id: 'eth-mcq-001', subject: 'legal-ethics', topic: 'privileged-communication', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A client told his lawyer that he plans to kill his wife next week. The lawyer reported this to the police. The client filed a disbarment complaint for breach of attorney-client privilege. How should the IBP rule?',
    choices: [
      'Sustain the complaint — attorney-client privilege is absolute and covers all communications.',
      'Dismiss the complaint — the lawyer was obligated to report to prevent a future crime.',
      'Dismiss the complaint — the privilege does not cover client communications regarding future crimes.',
      'Sustain — but impose only a warning since the lawyer acted in good faith.',
    ],
    correctAnswer: 2,
    explanation: 'The attorney-client privilege (Rule 130 Sec. 24[b] Rules of Evidence; Rule 21.01 CPR) protects CONFIDENTIAL communications made in the professional relationship. However, the privilege has recognized exceptions including: (1) communications in furtherance of a FUTURE CRIME OR FRAUD. A client\'s statement that he plans to kill his wife is a communication regarding a FUTURE CRIME — not a past act. The privilege does not extend to such communications. Moreover, Canon 19.01 CPR encourages lawyers to advise against wrongful acts; and Rule 1.02 CPR requires lawyers to NOT counsel activities that violate law. The lawyer acted properly and the complaint should be dismissed.',
    taglishExplanation: 'Attorney-client privilege ay hindi absolute! **Exception**: Hindi protektado ang communications tungkol sa **FUTURE crime**. Ang pagpaplano ng pagpatay sa asawa = future crime = hindi covered ng privilege. Plus: May obligation ang lawyer na hindi tumulong sa illegal activities. Kaya: Tamang nag-report ang lawyer — hindi breach ng privilege. Dismiss ang disbarment complaint.',
    relatedArticle: 'Rule 130 Sec. 24(b) Rules of Evidence; Rule 21.01 CPR; Future crime exception to privilege',
    points: 2,
  },
  {
    id: 'eth-mcq-002', subject: 'legal-ethics', topic: 'conflict-of-interest', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'Atty. X represented A in a property dispute against B in 2019. The case was settled. In 2023, B approaches Atty. X to represent him against C in an unrelated case. A objects. Should Atty. X accept B\'s case?',
    choices: [
      'Yes — the A-B case is closed and settled; no conflict of interest.',
      'Yes — the new case is completely unrelated to the old case.',
      'No — Atty. X may not represent B since B was formerly an adverse party, and confidential info about B was obtained in the prior case.',
      'No — Atty. X can never represent anyone who was adverse to a former client.',
    ],
    correctAnswer: 1,
    explanation: 'The rule against representing adverse parties in the SAME CASE applies. However, the prohibition on representing FORMER adverse parties in DIFFERENT cases is governed by the "SUBSTANTIAL RELATION" test: A lawyer may not represent a new client in a matter SUBSTANTIALLY RELATED to a prior case involving a former adverse party WHERE the lawyer obtained CONFIDENTIAL INFORMATION about that party. Here, the new case (B vs. C) is COMPLETELY UNRELATED to the old property dispute (A vs. B). No confidential info about B relevant to the new case was obtained. Atty. X may represent B in the unrelated case — but must inform A as a courtesy.',
    taglishExplanation: 'Ang "conflict of interest" prohibition ay hindi absolute sa dating adverse parties! Test: Ang bagong kaso ba ay **substantially related** sa dati? Dito: 2019 property dispute (A vs B) vs 2023 unrelated case (B vs C) — **walang substantial relation**. Plus: Walang confidential info tungkol kay B na relevant sa bagong kaso. Kaya pwedeng kumatawan si Atty. X kay B sa bagong case. Baka magalit si A pero walang legal basis ang objection.',
    relatedArticle: 'Rule 15.03 CPR; Conflict of interest; substantial relation test; *Pacana v. Pascual-Lopez*',
    points: 2,
  },
  {
    id: 'eth-mcq-003', subject: 'legal-ethics', topic: 'notarial-practice', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'Atty. Y notarized a deed of sale without the personal appearance of the seller. The seller signed in another city and mailed the document. Atty. Y notarized it based on his knowledge of the seller\'s signature. Is this proper?',
    choices: [
      'Yes — personal knowledge of the signature by the notary is a valid basis for notarization.',
      'No — personal appearance before the notary is mandatory under the 2004 Rules on Notarial Practice.',
      'Yes — mailed documents may be notarized if the notary knows the signatory personally.',
      'No — but only a warning is appropriate since the notary acted in good faith.',
    ],
    correctAnswer: 1,
    explanation: 'Under the 2004 Rules on Notarial Practice (A.M. No. 02-8-13-SC), Sec. 2(b): A notary public is prohibited from performing a notarial act if the signatory is NOT IN THE NOTARY\'S PRESENCE at the time of notarization. PERSONAL APPEARANCE is MANDATORY — no exceptions based on familiarity with the signature or prior knowledge. Notarizing a document without personal appearance is a serious violation that may result in revocation of notarial commission, suspension from law practice, or disbarment. This is one of the most commonly tested ethics violations.',
    taglishExplanation: '**Personal appearance** sa harap ng notary ay MANDATORY under 2004 Rules on Notarial Practice! Walang exception — kahit kilala ng notary ang signatory, kahit alam niya ang pirma. Ang pag-notarize nang walang personal appearance = serious violation. Maaaring maging grounds ng: (1) Revocation ng notarial commission; (2) Suspension; (3) Disbarment. Ito ang isa sa pinakamadalas na nalabag na ethics rule.',
    relatedArticle: '2004 Rules on Notarial Practice (AM 02-8-13-SC); Sec. 2(b); Personal appearance requirement',
    points: 2,
  },
  {
    id: 'eth-mcq-004', subject: 'legal-ethics', topic: 'disbarment', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A lawyer was convicted by final judgment of estafa (a crime involving moral turpitude). The lawyer applied for executive clemency and was pardoned. He argues the pardon restores his right to practice law. Is he correct?',
    choices: [
      'Yes — a presidential pardon fully restores all civil and political rights, including the right to practice law.',
      'No — conviction of a crime involving moral turpitude is ground for disbarment; a pardon does not automatically restore bar membership.',
      'Yes — but only if the pardon expressly grants the right to practice law.',
      'No — only the Supreme Court, not the President, may restore the right to practice law.',
    ],
    correctAnswer: 3,
    explanation: 'The right to practice law is under the EXCLUSIVE JURISDICTION of the SUPREME COURT. A presidential pardon — even absolute — does not automatically restore the right to practice law. The SC has consistently held that the power to admit and discipline members of the bar is an INHERENT JUDICIAL POWER. A pardoned lawyer who was disbarred must file a separate PETITION FOR REINSTATEMENT with the SC — the SC will exercise its own judgment on whether the lawyer has shown reformation and moral rehabilitation. The pardon is merely evidence of rehabilitation, not automatic reinstatement.',
    taglishExplanation: 'Presidential pardon ≠ automatic reinstatement to bar! Ang right to practice law ay nasa **exclusive jurisdiction ng Supreme Court**. Kahit i-pardon ng Presidente ang isang disbarred lawyer — kailangan pa rin ng hiwalay na **Petition for Reinstatement** sa SC. Ang SC ay mag-eexercise ng sariling discretion — pardon ay evidence ng rehabilitation lang, hindi automatic reinstatement. Ito ang separation ng powers: Judicial power ng SC over bar admission vs. executive clemency power ng President.',
    relatedArticle: '*In re: Rovero*; *Cui v. Cui*; SC\'s exclusive jurisdiction over bar admission; pardon and reinstatement',
    points: 2,
  },
  {
    id: 'eth-mcq-005', subject: 'legal-ethics', topic: 'fees', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A lawyer agreed to handle a land case on a contingency fee basis — 30% of whatever land is recovered. The client wins and the lawyer files a charging lien over the recovered property for 30%. The client refuses to pay and moves to discharge the lien. How should the court rule?',
    choices: [
      'Grant the motion — contingency fee agreements are void as they create a conflict of interest.',
      'Deny the motion — the contingency fee agreement is valid and the lawyer\'s charging lien is enforceable.',
      'Grant the motion — a lawyer cannot acquire an interest in the subject matter of litigation.',
      'Deny the motion — but the 30% rate must be reviewed for reasonableness.',
    ],
    correctAnswer: 1,
    explanation: 'CONTINGENCY FEE AGREEMENTS are VALID and enforceable in the Philippines (Rule 138, Sec. 24 Rules of Court). They are allowed as a means for indigent clients to obtain legal services. The lawyer\'s right to a CHARGING LIEN upon the judgment/property recovered is recognized under Rule 138, Sec. 37. The prohibition under Canon 16.02 is against acquiring property in LITIGATION through PURCHASE — contingency fees are compensation for services, not purchase of litigated property. The court should deny the motion to discharge. However, the court may review the 30% rate for fairness per jurisprudence on attorney\'s fees.',
    taglishExplanation: '**Contingency fee** ay VALID sa Pilipinas (Rule 138 Sec. 24)! Hindi ito prohibited. Ang bawal ay ang "purchase" ng litigated property (Rule 16.02 CPR) — ibang-iba ito sa contingency fee na compensation for services. At ang **charging lien** ng lawyer (Rule 138 Sec. 37) ay enforceable sa recovered property/judgment. Kaya deny ang motion to discharge. Pero pwedeng i-review ng court ang 30% para sa reasonableness.',
    relatedArticle: 'Rule 138 Sec. 24, 37; Rule 16.02 CPR; *Rayos v. Hernandez*; contingency fee validity',
    points: 2,
  },
  {
    id: 'eth-mcq-006', subject: 'legal-ethics', topic: 'duties-to-court', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A lawyer discovered mid-trial that a key witness he presented had lied on the stand. The lawyer knew the testimony was false. He did not correct the record. The client won the case. Evaluate the lawyer\'s conduct.',
    choices: [
      'Proper — a lawyer\'s duty of confidentiality to his client overrides the duty to the court.',
      'Improper — a lawyer must not knowingly offer false evidence and must take remedial action when he discovers a witness lied.',
      'Proper — the opposing party has the burden to expose false testimony through cross-examination.',
      'Improper — but only if the lawyer was the one who coached the witness to lie.',
    ],
    correctAnswer: 1,
    explanation: 'Canon 10, Rule 10.01-10.02 CPR: A lawyer shall NOT do any falsehood nor mislead the court, and shall NOT knowingly offer or support false evidence. When a lawyer DISCOVERS that evidence presented is false, he must TAKE REMEDIAL ACTION — which may include: (1) advising the client to correct the false testimony; (2) if the client refuses, the lawyer may need to withdraw; (3) if the false testimony has materially affected the outcome, the lawyer may need to inform the court. The duty of candor toward the court CANNOT be overridden by client confidentiality when it involves FRAUD ON THE COURT. The lawyer\'s conduct is improper and constitutes grounds for disciplinary action.',
    taglishExplanation: 'Canon 10 CPR: **Duty of candor to the court** ay hindi maaaring i-override ng client confidentiality pagdating sa fraud on the court! Kapag natuklasan ng lawyer na nag-lie ang witness — dapat kumilos: (1) Sabihin sa client na itama; (2) Kung ayaw ng client — consider withdrawal; (3) Kung nakaapekto sa outcome — may obligation pa rin na i-inform ang court. Hindi pwedeng basta-basta hayaan ang false testimony.',
    relatedArticle: 'Canon 10, Rule 10.01-10.02 CPR; Duty of candor to the court; *Alcantara v. Pefianco*',
    points: 2,
  },
]

export const ethicsEssays = [
  {
    id: 'eth-essay-001', subject: 'legal-ethics', topic: 'multiple-violations', year: 2022,
    difficulty: 'hard', type: 'essay',
    scenario: `THE WAYWARD COUNSELOR:

Atty. Santos handled a land registration case for Mrs. Reyes. After winning, Mrs. Reyes delivered ₱200,000 in cash to Atty. Santos as his attorney's fees. Atty. Santos issued a receipt but deposited the money in his personal bank account instead of his client trust account.

Three months later, Atty. Santos used ₱50,000 of Mrs. Reyes' money to pay for his personal vacation. He told Mrs. Reyes he would replace it.

Additionally, Atty. Santos has been absent from three scheduled hearings in another client's (Mr. Cruz) case without prior notice to the court or Mr. Cruz, causing Mr. Cruz's case to be dismissed for failure to prosecute.

Mrs. Reyes and Mr. Cruz filed separate disbarment complaints.

(a) What ethics violations did Atty. Santos commit regarding Mrs. Reyes' money?
(b) What are the ethics implications of the missed hearings in Mr. Cruz's case?
(c) Can Atty. Santos be disbarred for both sets of violations?`,
    subQuestions: [
      {
        part: 'a',
        question: 'What ethics violations did Atty. Santos commit regarding Mrs. Reyes\' money?',
        points: 12,
        modelAnswer: 'Atty. Santos committed multiple violations: (1) MISAPPROPRIATION: Using ₱50,000 of client funds for personal purposes constitutes misappropriation — a form of dishonesty and breach of fiduciary duty. Canon 16.01 CPR: A lawyer shall hold client funds in trust. Canon 16.02: Funds shall be kept separate from personal funds. Canon 16.03: Client funds shall be promptly delivered. (2) FAILURE TO USE TRUST ACCOUNT: Depositing client funds in a personal account instead of a client trust account violates Canon 16.02. (3) BREACH OF FIDUCIARY DUTY: The attorney-client relationship imposes the highest standards of trust. These violations constitute GROSS MISCONDUCT warranting suspension or disbarment.',
        irac: {
          issue: 'Whether depositing client funds in personal account and misappropriating ₱50,000 constitutes ethics violations.',
          rule: 'Canon 16, Rule 16.01-16.03 CPR: Duty to hold client funds in trust; keep separate from personal funds; promptly account and deliver.',
          application: 'Deposited ₱200K in personal account (not trust) = Rule 16.02 violation. Used ₱50K for personal vacation = misappropriation = Canon 16.01 violation. Gross dishonesty against client.',
          conclusion: 'Multiple violations: Failure to keep separate trust account + misappropriation = grounds for disbarment.',
        },
        taglishExplanation: 'Tatlong violations kay Atty. Santos: (1) **Hindi ginagamit ang client trust account** (Rule 16.02) — personal account niya ang pinaglagyan; (2) **Misappropriation** — ginamit ang ₱50K para sa personal vacation; (3) **Breach of fiduciary duty** — ang pinakamataas na level ng trust ang inaasahan sa attorney-client. Lahat ito ay grounds para sa disbarment.',
      },
      {
        part: 'b',
        question: 'What ethics implications arise from the missed hearings in Mr. Cruz\'s case?',
        points: 8,
        modelAnswer: 'The missed hearings without notice violate: (1) Canon 18.03 CPR: A lawyer shall not neglect a legal matter entrusted to him — failing to attend THREE hearings constitutes neglect. (2) Canon 18.04 CPR: A lawyer must keep the client informed and must comply with requests for information. (3) Canon 12 CPR: A lawyer must assist in the speedy and efficient administration of justice — repeated absences obstruct this duty. (4) The dismissal of Mr. Cruz\'s case due to the absences constitutes GROSS NEGLIGENCE — the ultimate harm to a client. Atty. Santos must make good the damage caused to Mr. Cruz.',
        irac: {
          issue: 'Whether absent counsel who causes dismissal of client\'s case violates professional responsibility.',
          rule: 'Canon 18.03 CPR (neglect); Canon 12 CPR (duty to courts/administration of justice).',
          application: 'Three unexplained absences → Neglect. No notice to court or client → failure to keep client informed. Case dismissed → ultimate harm to client from lawyer negligence.',
          conclusion: 'Gross negligence. Atty. Santos liable for damages to Mr. Cruz and disciplinary sanctions.',
        },
        taglishExplanation: 'Tatlong beses na absent si Atty. Santos — walang notice sa court at kay Mr. Cruz. Violations: (1) **Neglect** (Canon 18.03); (2) **Hindi pinag-alaman ang kliyente** (Canon 18.04); (3) **Obstruction ng justice** (Canon 12). Worst consequence: **Na-dismiss ang kaso ni Mr. Cruz** — ultimate harm na dulot ng lawyer. Atty. Santos ay dapat managot sa damages at disciplinary action.',
      },
      {
        part: 'c',
        question: 'Can Atty. Santos be disbarred for both sets of violations?',
        points: 10,
        modelAnswer: 'YES. The SC may DISBAR Atty. Santos on both grounds. Disbarment is appropriate when the misconduct shows the lawyer\'s moral unworthiness to continue practicing law. (1) For Mrs. Reyes: Misappropriation of client funds is one of the gravest offenses — the SC has consistently imposed disbarment for lawyers who misappropriate. (2) For Mr. Cruz: Gross negligence causing dismissal of a client\'s case, combined with dishonesty (the Reyes case), demonstrates a pattern of moral unfitness. Under Sec. 27 Rule 138: Disbarment grounds include deceit, malpractice, gross misconduct, and grossly immoral conduct. Atty. Santos exhibits multiple grounds. Disbarment is warranted.',
        irac: {
          issue: 'Whether multiple ethics violations warrant disbarment.',
          rule: 'Sec. 27 Rule 138: Grounds for disbarment include deceit, malpractice, gross misconduct, grossly immoral conduct.',
          application: 'Misappropriation = deceit + gross misconduct. Repeated neglect causing dismissal = malpractice + gross negligence. Pattern of conduct showing moral unfitness.',
          conclusion: 'Disbarment is warranted. The SC has inherent power to disbar and will do so for the gravity of these violations, particularly the misappropriation of client funds.',
        },
        taglishExplanation: 'Pwede at dapat ng disbarment si Atty. Santos! Ang misappropriation ng client funds ay isa sa pinaka-grabe na violations — **madalas ay disbarment agad** ang imposed ng SC dito. Ang gross negligence na nag-cause ng dismissal ng kaso + dishonesty sa ibang kliyente ay nagpapakita ng **pattern of moral unfitness**. Sec. 27 Rule 138 ang legal basis. Ang SC ay walang habag sa lawyers na nagnakaw ng pera ng kliyente.',
      },
    ],
  },
]

export default { mcq: ethicsMCQ, essays: ethicsEssays }
