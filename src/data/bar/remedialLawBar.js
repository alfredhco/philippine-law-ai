export const remedialMCQ = [
  {
    id: 'rem-mcq-001', subject: 'remedial-law', topic: 'jurisdiction', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A filed a complaint for sum of money of ₱450,000 against B with the RTC. B moved to dismiss for lack of jurisdiction, arguing the amount falls within MTC jurisdiction. A argues his complaint also includes a claim for moral damages of ₱200,000. Should the RTC dismiss?',
    choices: [
      'Yes — the principal claim of ₱450,000 is below the ₱2M RTC threshold.',
      'No — the totality of claims including damages exceeds ₱2M.',
      'No — the totality of claims (₱650,000) still falls within MTC jurisdiction; MTC should hear it.',
      'Yes — jurisdiction is determined solely by the principal claim, not damages.',
    ],
    correctAnswer: 2,
    explanation: 'Under the totality rule (Sec. 33[1] BP 129 as amended by RA 11576): When the plaintiff claims both a principal sum AND damages, the TOTALITY of the claims determines jurisdiction. ₱450,000 + ₱200,000 = ₱650,000. Under RA 11576 (effective April 11, 2022), the MTC\'s jurisdictional amount was increased to ₱2,000,000 (₱2M). Since ₱650,000 is below ₱2M, the MTC — NOT the RTC — has jurisdiction. The RTC should dismiss for lack of jurisdiction but on the ground that jurisdiction belongs to the MTC.',
    taglishExplanation: 'Under **RA 11576** (2022), ang MTC ay may jurisdiction sa claims na **hanggang ₱2,000,000**! Kaya pag nilagyan ng totality rule (principal + damages = ₱650,000), MTC pa rin ang may jurisdiction — hindi RTC. RTC jurisdiction ay nagsisimula sa higit sa ₱2M. Kaya mag-dismiss ang RTC — pero hindi dahil mataas ang claim, kundi dahil dapat sa MTC. Importanteng malaman: Ang RA 11576 ay nagtaas ng jurisdictional amounts sa buong panahon ng 2022.',
    relatedArticle: 'RA 11576; BP 129 Sec. 33; Totality rule; *Sec. 19 BP 129 as amended*',
    points: 2,
  },
  {
    id: 'rem-mcq-002', subject: 'remedial-law', topic: 'pleadings', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A filed a complaint. B filed an answer with a counterclaim for damages. A did not file a reply to the counterclaim within the reglementary period. What is the effect?',
    choices: [
      'B\'s counterclaim is deemed admitted by A\'s silence.',
      'A\'s failure to reply is deemed a general denial of the counterclaim.',
      'The court shall motu proprio dismiss A\'s complaint for failure to reply.',
      'A is in default on the counterclaim; B may present evidence ex parte.',
    ],
    correctAnswer: 1,
    explanation: 'Under the 2019 Amended Rules of Civil Procedure, Rule 6, Sec. 10: If a party FAILS TO FILE A REPLY, ALL THE MATERIAL ALLEGATIONS in the answer are deemed CONTROVERTED (i.e., denied). This is the reverse of the old rule where failure to reply meant admissions. The 2019 Rules abolished the concept of "implied admission by silence" for counterclaims — no reply = general denial. A is NOT in default; the counterclaim allegations are simply deemed denied. B must still prove them.',
    taglishExplanation: 'Malaking pagbabago ng **2019 Amended Rules**! Dati: Walang reply = deemed admitted. Ngayon: Walang reply = **deemed controverted (denied)**! So hindi na kailangang mag-file ng reply para maprotektahan ang sarili sa counterclaim. Pero payo pa rin: Mag-file ng reply para makapag-raise ng affirmative defenses. Pero kung naligtaan — hindi ka default, at hindi deemed admitted ang counterclaim.',
    relatedArticle: 'Rule 6 Sec. 10, 2019 Amended Rules of Civil Procedure',
    points: 2,
  },
  {
    id: 'rem-mcq-003', subject: 'remedial-law', topic: 'evidence', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'In a murder case, the prosecution presents a dying declaration. The defense objects that the declarant did not die. The declarant survived due to surgery. Is the statement admissible?',
    choices: [
      'Yes — the statement was made under consciousness of impending death, which is sufficient.',
      'No — a dying declaration requires the declarant to have actually died.',
      'Yes — the statement may be admitted as part of the res gestae instead.',
      'No — only the declarant\'s written statements are admissible when the declarant survives.',
    ],
    correctAnswer: 1,
    explanation: 'Rule 130, Sec. 37 (2019 Rules on Evidence): A DYING DECLARATION requires: (1) the declaration concerned the cause and circumstances of the declarant\'s death; (2) the declarant was CONSCIOUS OF IMPENDING DEATH at the time; (3) the declarant was COMPETENT to testify; (4) THE DECLARANT THEREAFTER DIED. The fourth requisite — ACTUAL DEATH — is indispensable. If the declarant survived, the statement CANNOT be admitted as a dying declaration. However, it may still be admissible under other exceptions (res gestae, spontaneous exclamation, or as the declarant\'s own testimony if the declarant is presented as a witness).',
    taglishExplanation: 'Ang dying declaration ay may **apat na requirements** at lahat ay kailangan! Yung ika-apat: **Ang nagdeklara ay namatay**. Kung nabuhay siya — hindi dying declaration. PERO: Pwede pa ring admissible ang statement bilang (1) part of res gestae (spontaneous exclamation), (2) prior consistent/inconsistent statement, o (3) ipresenta ang buhay na declarant bilang testigo at i-testify niya ng direkta. Hindi lang basta rejected ang statement — naghahanap lang ng tamang ground ng admissibility.',
    relatedArticle: 'Rule 130 Sec. 37, 2019 Rules on Evidence; *People v. Bautista*',
    points: 2,
  },
  {
    id: 'rem-mcq-004', subject: 'remedial-law', topic: 'special-civil-actions', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A filed a petition for certiorari under Rule 65 questioning the RTC\'s order denying her motion for summary judgment. The CA dismissed for wrong remedy, holding that the proper remedy is appeal. Is the CA correct?',
    choices: [
      'No — certiorari is always available to question interlocutory orders.',
      'Yes — an order denying summary judgment is interlocutory and the proper remedy is to proceed to trial and appeal.',
      'No — certiorari is proper because the denial of summary judgment causes irreparable injury.',
      'Yes — but only if the RTC committed grave abuse of discretion, which denial of summary judgment cannot constitute.',
    ],
    correctAnswer: 1,
    explanation: 'An ORDER DENYING A MOTION FOR SUMMARY JUDGMENT is an INTERLOCUTORY ORDER — it does not terminate the action. The proper remedy is to proceed to trial, and if judgment is adverse, APPEAL from the final judgment. Certiorari under Rule 65 is not a substitute for appeal and is only available when: (1) there is no appeal OR other adequate, speedy remedy; and (2) the tribunal acted without or in excess of jurisdiction or with grave abuse of discretion. Since appeal is an adequate remedy, certiorari is improper. The CA correctly dismissed.',
    taglishExplanation: 'Rule 65 certiorari ay **extraordinary remedy** — ginagamit lang kung walang appeal o ibang adequate remedy. Ang denial ng summary judgment ay interlocutory order — hindi pa tapos ang kaso. Ang tamang gawin: Ituloy ang trial, then kung adverse ang judgment, mag-**appeal** ng final judgment. Hindi pwedeng mag-certiorari para sa bawat interlocutory order na hindi gusto ng isang party. Kaya tama ang CA na dismissal.',
    relatedArticle: 'Rule 65, Rule 35, Rules of Civil Procedure; *Ley Construction v. Union Bank*',
    points: 2,
  },
  {
    id: 'rem-mcq-005', subject: 'remedial-law', topic: 'criminal-procedure', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'An information for frustrated homicide was filed against A. After arraignment, the prosecution discovered evidence showing the crime was actually murder. The prosecutor filed a motion to amend the information to murder. A objects. How should the court rule?',
    choices: [
      'Grant the amendment — the prosecution may amend at any time with leave of court.',
      'Deny — amendments after arraignment are absolutely prohibited.',
      'Grant the amendment only if A will not be prejudiced.',
      'Deny — amending frustrated homicide to murder changes the nature of the offense and prejudices A\'s rights after arraignment.',
    ],
    correctAnswer: 3,
    explanation: 'Rule 110, Sec. 14: AFTER ARRAIGNMENT, amendments are allowed only as to FORM — not SUBSTANCE. Changing the charge from frustrated homicide to murder is a SUBSTANTIAL AMENDMENT — it changes: (1) the nature/character of the offense (homicide → murder); (2) the qualifying circumstance; (3) the penalty (reclusion temporal → reclusion perpetua). Substantial amendments after arraignment are NOT permitted because they would require A to be re-arraigned, potentially prejudice A\'s defense, and violate the right not to be placed in double jeopardy. The remedy is to file a separate information for murder, not to amend.',
    taglishExplanation: 'After arraignment: **Form amendments lang** ang allowed — hindi substantive! Ang pagbabago mula frustrated homicide patungong murder ay SUBSTANTIVE amendment — nagbabago ng nature ng offense, qualifying circumstance, at penalty. Bawal ito post-arraignment. **Remedy ng prosecution**: Mag-file ng bagong information para sa murder (at i-resolve kung anong mangyayari sa original frustrated homicide case). Hindi dapat i-amend; dapat mag-file ng bago.',
    relatedArticle: 'Rule 110 Sec. 14 Rules of Court; *Matalam v. Sandiganbayan*; formal vs. substantial amendments',
    points: 2,
  },
  {
    id: 'rem-mcq-006', subject: 'remedial-law', topic: 'evidence', year: 2021,
    difficulty: 'medium', type: 'mcq',
    question: 'In a civil case, A presents a certified true copy of a deed of sale registered with the Register of Deeds. B objects that the original must be presented under the Best Evidence Rule. Rule on the objection.',
    choices: [
      'Sustained — the original deed must be presented.',
      'Overruled — certified true copies of public documents are admissible as secondary evidence without need to account for the original.',
      'Sustained — B must be given opportunity to inspect the original.',
      'Overruled — only if A lays foundation for the original\'s unavailability.',
    ],
    correctAnswer: 1,
    explanation: 'Under the 2019 Rules on Evidence (Rule 130, Sec. 5): The ORIGINAL DOCUMENT RULE (formerly Best Evidence Rule) applies to private documents. PUBLIC DOCUMENTS (like a registered deed of sale — a public record) are exempt. Certified true copies of public documents are ORIGINAL EVIDENCE themselves — not secondary evidence. A certified true copy from the Register of Deeds is a public document under Rule 132 and is admissible WITHOUT needing to produce the original deed. No foundation is needed because certified copies ARE the rule, not the exception, for public records.',
    taglishExplanation: 'Ang **Original Document Rule** (dating Best Evidence Rule) ay para sa **private documents** — hindi public documents! Ang registered deed of sale sa Register of Deeds ay **public document**. Ang certified true copy nito ay admissible as ORIGINAL EVIDENCE mismo — hindi secondary. Kaya: Walang need na i-present ang original deed, at walang need na mag-account sa pagkawala nito. The certified copy IS the best evidence for public records.',
    relatedArticle: 'Rule 130 Sec. 3, 5; Rule 132 Sec. 23; 2019 Rules on Evidence',
    points: 2,
  },
  {
    id: 'rem-mcq-007', subject: 'remedial-law', topic: 'appeals', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'The RTC rendered a decision convicting A of murder. A filed a Notice of Appeal. The CA affirmed. A filed a petition for review on certiorari with the SC. The SC dismissed for being filed late. A argues the SC should still review because it involves the death penalty. Is A correct?',
    choices: [
      'Yes — death penalty cases are automatically reviewed by the SC regardless of timeliness.',
      'No — automatic review applies only to death penalty actually imposed, not murder convictions.',
      'Yes — the SC has jurisdiction over all murder cases regardless of procedure.',
      'No — A procedurally waived the right to SC review by filing late; the SC dismissal is valid.',
    ],
    correctAnswer: 1,
    explanation: 'AUTOMATIC REVIEW (formerly automatic appeal) applies only when the RTC ACTUALLY IMPOSES THE DEATH PENALTY — and since RA 9346 abolished the death penalty in 2006, this no longer applies in practice. For murder convictions where the imposed penalty is reclusion perpetua or less, there is NO automatic review to the SC. The proper appellate route is RTC → CA (ordinary appeal) → SC (petition for review on certiorari, discretionary). If the petition is filed late and the SC dismisses, the dismissal is valid — procedural rules apply. The lateness of the filing is not excused merely because the charge was murder.',
    taglishExplanation: 'Ang automatic review ay para lamang sa kaso kung saan **actual na idineclare ang death penalty** — at wala na ito dahil binura ng RA 9346 (2006) ang death penalty. Murder conviction na reclusion perpetua ang penalty = **hindi automatic review**. Kaya ang late filing ay hindi maaaring i-excuse ng dahilan na "murder case ito." Rules on procedure apply equally. Ang appellate route: RTC → CA (ordinary appeal) → SC (petition, discretionary) — may deadline sa bawat hakbang.',
    relatedArticle: 'RA 9346; Rule 122, 125 Rules of Court; *People v. Mateo*; automatic review abolished',
    points: 2,
  },
  {
    id: 'rem-mcq-008', subject: 'remedial-law', topic: 'provisional-remedies', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A filed a complaint for collection of sum of money and simultaneously applied for a writ of preliminary attachment, alleging B is about to dispose of his property to defraud creditors. The court issued the writ ex parte. B moved to discharge, presenting evidence that the allegation was false. The court discharged the writ. A appeals. How should the CA rule?',
    choices: [
      'Reverse — the writ was properly issued ex parte and the court erred in discharging it.',
      'Affirm — the court correctly discharged the writ after B demonstrated the falsity of the ground.',
      'Reverse — only the plaintiff may dissolve a writ of preliminary attachment.',
      'Affirm — preliminary attachment should never be issued ex parte.',
    ],
    correctAnswer: 1,
    explanation: 'Under Rule 57 (Preliminary Attachment): The adverse party may move to DISCHARGE the writ by (1) posting a counterbond; or (2) proving under Sec. 13 that the writ was IMPROPERLY OR IRREGULARLY ISSUED — including when the ground alleged is false. If the court finds the ground to be false (B demonstrated the fraudulent-disposal allegation was untrue), it may discharge the writ. This protects defendants from wrongful attachment. The court\'s discharge of the writ upon showing the falsehood of the ground is proper. The CA should affirm.',
    taglishExplanation: 'May dalawang paraan si B para ma-discharge ang writ: (1) **Mag-post ng counterbond** — para mapalabas ang property; o (2) **Ipakita na mali ang ground** (Sec. 13, Rule 57) — na ang allegation ng fraudulent disposal ay false. Kung napatunayan ni B na false ang ground, dapat i-discharge ang writ. Ito ang proteksyon ng defendant laban sa abusadong gamit ng preliminary attachment. Tama ang court at tama ang CA na affirm.',
    relatedArticle: 'Rule 57 Secs. 12-13 Rules of Civil Procedure; grounds for discharge of attachment',
    points: 2,
  },
  {
    id: 'rem-mcq-009', subject: 'remedial-law', topic: 'jurisdiction', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A filed a petition for habeas corpus before the RTC. The respondent moved to dismiss, arguing the CA has concurrent jurisdiction. The RTC dismissed. On certiorari, A argues any court with jurisdiction may take cognizance. Rule on A\'s argument.',
    choices: [
      'Correct — concurrent jurisdiction means A may choose the court where to file.',
      'Incorrect — when concurrent jurisdiction exists, the court first acquiring jurisdiction retains it.',
      'Correct — habeas corpus petitions are always cognizable by any RTC.',
      'Incorrect — A should have filed with the CA as the superior court has priority.',
    ],
    correctAnswer: 0,
    explanation: 'The writ of HABEAS CORPUS is CONCURRENTLY cognizable by the RTC, CA, and SC (Rule 102). Under the doctrine of CONCURRENT JURISDICTION, the petitioner has the option to file with ANY court possessing jurisdiction. The court first taking cognizance of the petition acquires EXCLUSIVE jurisdiction to the exclusion of other courts. The RTC\'s dismissal was ERRONEOUS — it should have accepted jurisdiction since the petition was properly filed before it. There is no rule requiring petitioners to first go to the CA or SC in habeas corpus cases. A may choose any court with concurrent jurisdiction.',
    taglishExplanation: 'Ang habeas corpus ay **concurrent jurisdiction** ng RTC, CA, at SC. Ibig sabihin: **Pagpili ng petitioner** kung saan mag-file! Walang hierarchy na dapat sundin — kahit RTC, CA, o SC, puwede lahat. Ang court na unang mag-acquire ng jurisdiction ay mag-re-retain nito nang exclusive. Kaya: Mali ang RTC na dismiss — dapat ni-accept ang petition. A has the right to choose any competent court.',
    relatedArticle: 'Rule 102 Rules of Court; *Ilusorio v. Bildner*; concurrent jurisdiction in habeas corpus',
    points: 2,
  },
  {
    id: 'rem-mcq-010', subject: 'remedial-law', topic: 'evidence', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'In a drug case, the police extracted a confession from A while in custody. Before extracting the confession, they gave A a form to sign waiving his rights. A signed. No lawyer was present. Is the confession admissible?',
    choices: [
      'Yes — A voluntarily waived his rights by signing the form.',
      'No — the waiver of Miranda rights must be in writing AND in the presence of counsel.',
      'Yes — the signing of the form constitutes adequate waiver regardless of counsel.',
      'No — confessions obtained during custodial investigation without counsel are always void.',
    ],
    correctAnswer: 1,
    explanation: 'Art. III, Sec. 12(1): During custodial investigation, the accused has the right to: (1) remain silent; (2) have COMPETENT AND INDEPENDENT COUNSEL preferably of his own choice; (3) be informed of these rights. Sec. 12(3): Any CONFESSION OR ADMISSION obtained in violation of this section shall be inadmissible. The waiver of the right to remain silent and counsel MUST be: (1) in WRITING; (2) made IN THE PRESENCE OF COUNSEL. A signed waiver without counsel present is INVALID — the confession is inadmissible. A mere written form without counsel does not satisfy the constitutional requirement.',
    taglishExplanation: 'Ang waiver ng Miranda rights ay may **dalawang requirements**: (1) **In writing** — at (2) **Sa harap ng counsel**. Hindi sapat ang pirmahan lang ng form nang walang abogado. Kung walang counsel present nang mag-sign si A ng waiver — **invalid ang waiver, inadmissible ang confession**. Ito ang mahigpit na panuntunan ng Saligang Batas — hindi pwedeng i-waive ang right to counsel nang walang counsel mismo na nagrerekomenda ng waiver.',
    relatedArticle: 'Art. III Sec. 12, 1987 Constitution; *People v. Deniega*; RA 7438 (Custodial Investigation Act)',
    points: 2,
  },
]

export const remedialEssays = [
  {
    id: 'rem-essay-001', subject: 'remedial-law', topic: 'jurisdiction-procedure', year: 2023,
    difficulty: 'hard', type: 'essay',
    scenario: `CEBU COLLECTION DISPUTE:

Atty. Cruz represents Pedro, a businessman in Cebu City. Pedro lent ₱1,800,000 to his friend Ramon. Ramon defaulted. Pedro wants to sue for the principal loan plus ₱500,000 in moral damages for the humiliation caused by Ramon's refusal to pay, plus ₱100,000 attorney's fees.

Pedro also discovered that Ramon is about to sell his only real property — a house and lot in Cebu City valued at ₱2,500,000 — to a third party to avoid paying the debt.

Atty. Cruz comes to you for advice.

(a) Which court has jurisdiction over Pedro's complaint and why?
(b) What provisional remedy should Pedro apply for to prevent Ramon from disposing of his property, and what must he show?
(c) At trial, Pedro wants to present a text message from Ramon acknowledging the debt. Ramon objects that text messages are not admissible. Rule on Ramon's objection.`,
    subQuestions: [
      {
        part: 'a',
        question: 'Which court has jurisdiction and why?',
        points: 10,
        modelAnswer: 'The REGIONAL TRIAL COURT (RTC) has jurisdiction. Under RA 11576 (effective 2022), the MTC has exclusive jurisdiction over civil actions where the value does not exceed ₱2,000,000. Using the TOTALITY RULE: ₱1,800,000 (principal) + ₱500,000 (moral damages) + ₱100,000 (attorney\'s fees) = ₱2,400,000. Since the total exceeds ₱2,000,000, the RTC has jurisdiction. The venue is Cebu City — where Ramon resides or where the obligation was to be performed (Rule 4, Sec. 2).',
        irac: {
          issue: 'Which court has jurisdiction over a money claim totaling ₱2,400,000?',
          rule: 'RA 11576: MTC has jurisdiction up to ₱2,000,000. Totality rule: All monetary claims are added to determine jurisdictional amount. Rule 4 Sec. 2: Venue for personal actions.',
          application: '₱1.8M + ₱500K + ₱100K = ₱2.4M. Exceeds ₱2M threshold → RTC jurisdiction. Cebu City is proper venue (residence of defendant / place of performance).',
          conclusion: 'RTC Cebu City has jurisdiction. File complaint with RTC.',
        },
        taglishExplanation: 'Totality rule: Idadagdag lahat ng monetary claims. ₱1.8M + ₱500K + ₱100K = **₱2.4M** — higit sa ₱2M na threshold ng RA 11576. Kaya **RTC** ang may jurisdiction. Kung ₱1.8M lang ang in-claim at walang damages → MTC. Ang damages ay nagdadagdag sa total jurisdictional amount.',
      },
      {
        part: 'b',
        question: 'What provisional remedy should Pedro apply for?',
        points: 10,
        modelAnswer: 'Pedro should apply for a WRIT OF PRELIMINARY ATTACHMENT under Rule 57. To obtain it, Pedro must show: (1) a sufficient cause of action; (2) the case is one of the grounds under Sec. 1, specifically that the defendant is about to remove or dispose of his property with intent to defraud creditors (Sec. 1[e]); (3) there is no other sufficient security for the claim; (4) the amount due is as much as the sum for which the order is granted above all legal counterclaims; and (5) Pedro must post an attachment bond. Pedro must file a verified application and an affidavit stating the grounds with particularity.',
        irac: {
          issue: 'What remedy prevents Ramon from disposing his property to defraud Pedro?',
          rule: 'Rule 57 Sec. 1(e): Preliminary attachment may issue when defendant is about to depart or remove/dispose of property with intent to defraud creditors. Requires verified application and attachment bond.',
          application: 'Ramon is about to sell his only property (₱2.5M house) apparently to avoid paying the ₱1.8M debt. This falls squarely under Sec. 1(e). Pedro must post a bond and file a verified application with affidavit.',
          conclusion: 'File a verified application for preliminary attachment under Rule 57 Sec. 1(e) concurrent with the complaint, with an attachment bond.',
        },
        taglishExplanation: '**Preliminary Attachment** (Rule 57) ang tamang remedy! Ang ground: Sec. 1(e) — nagbe-benta ng property si Ramon para dayain ang creditor (Pedro). Para makuha ang writ: (1) Verified application; (2) Affidavit ng ground; (3) Attachment bond. Kapag nai-attach ang bahay, hindi na pwedeng ibenta ni Ramon nang walang clearance mula sa court.',
      },
      {
        part: 'c',
        question: 'Are text messages admissible as evidence?',
        points: 10,
        modelAnswer: 'Ramon\'s objection should be OVERRULED. Text messages are admissible as ELECTRONIC EVIDENCE under the Rules on Electronic Evidence (A.M. No. 01-7-01-SC). Under Rule 3 of the Rules on Electronic Evidence, electronic documents — including text messages — are admissible if PROPERLY AUTHENTICATED. Authentication may be done by: showing the text came from Ramon\'s number (subscriber records), Ramon\'s own testimony, or circumstantial evidence. The text message acknowledging the debt is a relevant admission by a party-opponent (Rule 130 Sec. 27). Once authenticated, it is admissible as an electronic document and as an admission.',
        irac: {
          issue: 'Whether a text message acknowledging debt is admissible evidence.',
          rule: 'Rules on Electronic Evidence (A.M. 01-7-01-SC): Electronic documents are admissible if authenticated. Rule 130 Sec. 27 (2019 Rules): Admission of a party is admissible against him.',
          application: 'The text message is an electronic document. If Pedro can authenticate it (e.g., Ramon\'s phone number, cell records), it is admissible. The content — acknowledgment of debt — is an admission by a party-opponent, directly admissible against Ramon.',
          conclusion: 'Overrule the objection. The text message is admissible as authenticated electronic evidence and as Ramon\'s admission.',
        },
        taglishExplanation: 'Text messages = **electronic documents** (Rules on Electronic Evidence, AM 01-7-01-SC). Admissible kung ma-**authenticate** — ibig sabihin, kailangang ipakita na talaga si Ramon ang nagpadala. Paraan: Subscriber records ng telecom, testimony ni Pedro na alam niya ang number ni Ramon, o iba pang circumstantial evidence. At ang nilalaman? — **Admission ng party** (Rule 130 Sec. 27) — direktang admissible laban kay Ramon. Overruled ang objection.',
      },
    ],
  },
]

export default { mcq: remedialMCQ, essays: remedialEssays }
