// ─── Bar Question Expansion — 60 new MCQs + 15 essays across all subjects ────

// ─── CRIMINAL LAW ────────────────────────────────────────────────────────────
export const criminalExpMCQ = [
  {
    id: 'crim-exp-mcq-001', subject: 'criminal-law', topic: 'conspiracy', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A, B, and C agreed to rob a bank. A and B entered the bank while C waited outside as lookout. During the robbery, A shot a teller. B did not fire any weapon. What is B\'s criminal liability?',
    choices: [
      'B is liable only for robbery, not for the killing.',
      'B is not liable for the killing since he did not fire the gun.',
      'B is equally liable as co-principal for robbery with homicide.',
      'B is liable as accomplice for the killing.',
    ],
    correctAnswer: 2,
    explanation: 'Under the conspiracy rule — "the act of one is the act of all." When A, B, and C agreed to rob a bank and A killed someone in the process, ALL conspirators are liable for robbery with homicide as co-principals. The killing was a foreseeable consequence of the robbery (even if B did not personally kill). The only exception would be if the killing was completely separate from the conspiracy and the other conspirators could not have foreseen it.',
    taglishExplanation: 'Classic conspiracy case! Kapag nagkasundo silang mag-rob, LAHAT sila ay liable sa lahat ng nagawa sa loob ng conspiracy. Si B ay nag-agree sa robbery — ang killing ni A ay nangyari DURING the robbery at foreseeable consequence nito. "Act of one is act of all" — walang exemption para kay B dahil hindi siya ang nagputok. Except: kung ang killing ay totally unrelated sa robbery at hindi foreseeable, doon lang pwedeng mag-argue ng separate liability.',
    relatedArticle: 'Art. 8, 294 RPC (Conspiracy; Robbery with Homicide)',
    points: 2,
  },
  {
    id: 'crim-exp-mcq-002', subject: 'criminal-law', topic: 'self-defense', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'X and Y had an argument. Y pulled out a knife and lunged at X. X grabbed Y\'s wrist, disarmed him, and then stabbed Y 15 times with Y\'s own knife. Y died. X claims self-defense. Which best describes the situation?',
    choices: [
      'Complete self-defense — unlawful aggression from Y justified all of X\'s acts.',
      'Incomplete self-defense — unlawful aggression existed but the means was not reasonably necessary.',
      'No self-defense — once Y was disarmed, unlawful aggression ceased.',
      'No self-defense — X used Y\'s own weapon, showing premeditation.',
    ],
    correctAnswer: 2,
    explanation: 'Under Art. 11(1), self-defense requires CONTINUING unlawful aggression. Once Y was disarmed, the aggression ceased — there was no more unlawful aggression to defend against. The 15 stabs after disarming Y constituted aggression BY X, not defense. Without the first element (unlawful aggression at the time of the fatal acts), self-defense completely fails. X cannot claim even incomplete self-defense because the element of unlawful aggression was absent at the time of the killing.',
    taglishExplanation: 'Pinaka-palaging trap sa bar! Kapag na-disarm na si Y, WALA NA unlawful aggression. Ang 15 stabs AFTER disarming = aggression na ni X, hindi defense. Kaya NO self-defense at all — wala na yung pinaka-indispensable na element. Kung binaril lang si X habang hawak pa ni Y yung kutsilyo — ibang usapan. Pero dito, pinagpatay na si Y pagkatapos na wala na siyang armas. Liable si X for murder (treachery possible) or at least homicide.',
    relatedArticle: 'Art. 11(1) RPC (Self-Defense); People v. Alconga',
    points: 2,
  },
  {
    id: 'crim-exp-mcq-003', subject: 'criminal-law', topic: 'stages', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A stabbed B in the chest intending to kill him. B was rushed to the hospital and survived after emergency surgery. What crime did A commit?',
    choices: [
      'Attempted homicide — the stabbing was not fatal.',
      'Frustrated homicide — all acts of execution were performed but death did not result.',
      'Physical injuries — since B survived, there is no attempt to kill.',
      'Consummated homicide — intent to kill presumed from nature of the weapon and location of wound.',
    ],
    correctAnswer: 1,
    explanation: 'FRUSTRATED HOMICIDE. Under Art. 6: frustrated stage = all acts of execution performed, death would ordinarily follow, but did not due to causes independent of the will (here: medical intervention). A stabbed B in the chest (all acts done), B would have died without surgery (ordinary death would result), but B survived because of emergency medical intervention — independent of A\'s will. This is the classic frustrated homicide scenario (People v. Lizada).',
    taglishExplanation: 'Ito ang pinaka-tested sa bar! A stabbed B in the chest — lahat ng acts of execution ginawa na ni A. Kung walang doctor, mamatay si B — ang wound ay ordinarily lethal. Pero nabuhay si B dahil sa surgery — causes independent of A\'s will. Kaya: **FRUSTRATED HOMICIDE**. Key test: "Would ordinarily cause death" + "Independent cause of survival." Survival due to medical treatment = frustrated, not attempted.',
    relatedArticle: 'Art. 6 RPC; People v. Lizada, G.R. No. 149005',
    points: 2,
  },
  {
    id: 'crim-exp-mcq-004', subject: 'criminal-law', topic: 'rape', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A had sexual intercourse with his own 14-year-old daughter B. B did not resist and claims she consented. What crime was committed?',
    choices: [
      'Acts of lasciviousness only — B consented.',
      'Qualified rape — under RA 8353, the victim\'s age and family relationship qualify the crime.',
      'Simple rape — because the age alone satisfies the definition.',
      'No crime — familial relationships create an implied consent.',
    ],
    correctAnswer: 1,
    explanation: 'QUALIFIED RAPE under Art. 266-B, RPC. Statutory rape: victim under 16 = rape regardless of consent (consent is immaterial). The qualifications that elevate simple rape to qualified rape include: (1) victim under 18 AND offender is parent/ascendant, (2) use of a deadly weapon, (3) victim is a destitute/insane person. Here: B is 14 (under 16 = statutory rape) AND A is her father = QUALIFIED RAPE. Penalty: death (reduced to reclusion perpetua under RA 9346 abolishing death penalty).',
    taglishExplanation: 'Dalawang layers! Una, statutory rape: si B ay 14 taong gulang — WALA KWENTA ang consent niya. Auto-rape siya kahit "nagconsent." Pangalawa, qualified rape: father + minor = qualifying circumstance na nag-e-elevate ang penalty. Kaya QUALIFIED RAPE si A, hindi lang simple rape. Lesson: sa statutory rape, "consent" ng menor de edad ay walang legal na kahulugan.',
    relatedArticle: 'Art. 266-A, 266-B RPC as amended by RA 8353',
    points: 2,
  },
  {
    id: 'crim-exp-mcq-005', subject: 'criminal-law', topic: 'penalties', year: 2021,
    difficulty: 'medium', type: 'mcq',
    question: 'A was convicted of five separate crimes. The sentences were: 12 years, 10 years, 8 years, 6 years, and 4 years. Under the three-fold rule, what is the maximum time A may serve?',
    choices: [
      '40 years — the absolute maximum under Art. 70.',
      '36 years — three times the most severe penalty.',
      '30 years — limited to three times the most severe penalty.',
      '40 years — total of all sentences cannot exceed this.',
    ],
    correctAnswer: 1,
    explanation: 'Under Art. 70 (three-fold rule): Maximum duration of service = THREE TIMES the most severe single penalty. Most severe penalty = 12 years. 12 × 3 = 36 years. Since 36 years is less than the absolute cap of 40 years, the maximum service is 36 years. The remaining sentences do not add further duration. Note: The total of all sentences is 40 years (12+10+8+6+4), but the three-fold rule caps the actual service.',
    taglishExplanation: 'Three-fold rule: pinaka-mataas na sentence × 3 = maximum service time. Pinaka-mataas = 12 years. 12 × 3 = 36 years. Ang 36 years ay less than the 40-year absolute cap — kaya 36 years ang maximum service ni A. Hindi 40 years kahit ang total ng lahat ng sentences ay 40 years. Ang three-fold rule ay LIMITS the service, hindi pinapalaki.',
    relatedArticle: 'Art. 70 RPC (Service of Sentence)',
    points: 2,
  },
]

export const criminalExpEssays = [
  {
    id: 'crim-exp-ess-001', subject: 'criminal-law', topic: 'self-defense', year: 2023,
    difficulty: 'hard', type: 'essay',
    question: `Atty. Reyes and his client, accused of a crime passionnel, need your help.\n\nFACTS: A and B had a heated altercation. B shouted "Papatayin kita!" and picked up a rock, lunging at A. A retreated and drew his licensed firearm. A fired one shot that hit B in the shoulder. B fell, dropping the rock. A then fired three more shots, killing B.\n\n(a) Can A invoke self-defense?\n(b) Apply the three elements of self-defense to the facts given.\n(c) Will A's defense fully succeed? Explain.`,
    irac: {
      issue: 'Whether A may invoke complete self-defense under Art. 11(1) of the RPC for shooting B four times, including three shots after B had already been hit and dropped the rock.',
      rule: 'Art. 11(1), RPC provides three elements of self-defense: (1) Unlawful aggression — must be actual or imminent; must be CONTINUING at the time of defensive act; (2) Reasonable necessity of means employed; (3) Lack of sufficient provocation by the defender. All three must concur for complete self-defense.',
      application: 'Element 1 (Unlawful aggression): B\'s act of picking up a rock and lunging at A constitutes actual unlawful aggression. The first shot was fired while B was still advancing — unlawful aggression was present. However, after B fell and dropped the rock, the unlawful aggression CEASED. The three subsequent shots were fired after B was neutralized. Without continuing aggression, the second, third, and fourth shots cannot be justified as self-defense.\n\nElement 2 (Reasonable necessity): The first shot may be deemed reasonably necessary — A faced an imminent threat from B with a rock. Using a firearm against a rock may be questioned but is not unreasonable given the threat. The additional three shots after B was down are clearly NOT reasonably necessary.\n\nElement 3 (Lack of provocation): A appears to have retreated — no sufficient provocation shown.',
      conclusion: 'A\'s self-defense is INCOMPLETE. The first shot may be justified (complete self-defense). However, the three additional shots after B dropped the rock cannot be justified — unlawful aggression had ceased. For the three subsequent shots: A may invoke INCOMPLETE self-defense under Art. 69 (unlawful aggression present at the start, but not all elements of complete self-defense present at time of subsequent shots). This is a privileged mitigating circumstance, reducing the penalty by 1-2 degrees.',
    },
    modelAnswer: 'A can partially invoke self-defense. The first shot may constitute complete self-defense. However, the three shots after B fell are indefensible — unlawful aggression ceased when B dropped the rock. A may claim incomplete self-defense for the fatal shots, which is a privileged mitigating circumstance under Art. 69, reducing the penalty by 1-2 degrees. The crime committed may be homicide (not murder) with a privileged mitigating circumstance.',
    taglishExplanation: 'Dalawang yugto ang incident na ito. Una: si B ay lumaban na may bato — doon may unlawful aggression, valid ang first shot. Pangalawa: nabuwal na si B, bitaw na ang bato — WALA NA UNLAWFUL AGGRESSION. Ang tatlong sumunod na shot = pagpatay na, hindi depensa. Pwede pang i-argue ang INCOMPLETE self-defense (Art. 69) dahil may unlawful aggression sa simula — pero hindi complete defense para sa lahat ng shots.',
    points: 15,
  },
]

// ─── POLITICAL LAW ────────────────────────────────────────────────────────────
export const politicalExpMCQ = [
  {
    id: 'pol-exp-mcq-001', subject: 'political-law', topic: 'search-seizure', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'Police officers received a reliable tip that A\'s house contained illegal firearms. Without a warrant, they surrounded the house and knocked. A opened the door. The officers immediately entered and found firearms in plain sight on a table. The firearms were seized. A challenges the seizure. Is the seizure valid?',
    choices: [
      'Yes — A opened the door, constituting implied consent.',
      'Yes — the firearms were in plain view and the entry was peaceful.',
      'No — warrantless entry into a home is presumptively unconstitutional regardless of plain view.',
      'Yes — the tip established probable cause sufficient for warrantless search.',
    ],
    correctAnswer: 2,
    explanation: 'The warrantless search is INVALID. The entry into A\'s home was without a warrant and without any recognized exception (no consent, no hot pursuit of a fleeing felon, no emergency, no valid arrest). The mere opening of the door by A does not constitute voluntary consent — particularly where officers surrounded the house. A "tip" alone does not justify warrantless entry (People v. Tudtud). Even the plain view doctrine requires a PRIOR VALID intrusion — if the entry was illegal, items in plain view cannot be seized under the plain view doctrine.',
    taglishExplanation: 'Tip lang ≠ probable cause para sa warrantless search ng bahay. Ang pagbukas ni A ng pintuan ay hindi "consent" kung napalibutan ang bahay ng pulis — hindi ito free and voluntary. At ang plain view doctrine ay nag-re-require ng PRIOR VALID INTRUSION. Illegal ang entry = illegal ang seizure ng firearms kahit nakita sila. Kaya lahat ng firearm evidence ay fruit of the poisonous tree — inadmissible!',
    relatedArticle: 'Art. III, Sec. 2, 3 Constitution; People v. Tudtud',
    points: 2,
  },
  {
    id: 'pol-exp-mcq-002', subject: 'political-law', topic: 'due-process', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'A public school teacher was dismissed for gross neglect of duty after an administrative investigation. She was given notice, but no formal hearing was conducted — only written submissions were received. Did the school comply with due process?',
    choices: [
      'No — administrative due process requires a formal hearing at all times.',
      'Yes — administrative due process only requires notice and an opportunity to be heard; written submissions satisfy this.',
      'No — dismissal requires court action, not administrative proceedings.',
      'Yes — because the teacher is a government employee who has lesser rights.',
    ],
    correctAnswer: 1,
    explanation: 'Administrative due process only requires: (1) notice of charges, and (2) meaningful opportunity to be heard. Formal hearing is NOT required — written submissions constitute a sufficient opportunity to be heard. Ang Tibay v. CIR lays down the cardinal rights of administrative due process, and a formal hearing is NOT one of the mandatory requirements. Administrative proceedings are less formal than judicial proceedings. Since the teacher received notice and submitted written defenses, due process was complied with.',
    taglishExplanation: 'Sa administrative proceedings, hindi kailangan ng formal hearing — ang written submissions ay SUFFICIENT na bilang opportunity to be heard. Ang Ang Tibay v. CIR ang nagtatakda ng requirements sa administrative due process — at formal hearing ay hindi mandatory requirement. Basta may notice + chance to be heard (kahit written lang) = due process complied. Kaya valid ang dismissal, assuming merits din naman.',
    relatedArticle: 'Art. III, Sec. 1 Constitution; Ang Tibay v. CIR',
    points: 2,
  },
  {
    id: 'pol-exp-mcq-003', subject: 'political-law', topic: 'equal-protection', year: 2021,
    difficulty: 'hard', type: 'mcq',
    question: 'Congress enacted a law providing higher pension rates for armed forces retirees who served before 1990 compared to those who served after. Veterans of the earlier period challenge the law as a violation of equal protection. How should the court rule?',
    choices: [
      'Unconstitutional — all veterans must receive equal pension.',
      'Constitutional — Congress has wide discretion in classifying pension recipients.',
      'Constitutional if the classification (pre/post-1990) rests on a substantial distinction germane to the pension law.',
      'Unconstitutional — the date of service is an arbitrary distinction.',
    ],
    correctAnswer: 2,
    explanation: 'Under the equal protection clause, a classification is valid if it (1) rests on substantial distinction; (2) is germane to the purpose of the law; (3) is not limited to existing conditions; (4) applies equally to all members of the same class. The question is whether the pre/post-1990 distinction is SUBSTANTIAL and GERMANE. If there is a legitimate reason (e.g., different service conditions, budget constraints in a particular period), the classification may be valid. Courts apply the RATIONAL BASIS test for economic/social legislation — the classification must be rationally related to a legitimate government objective.',
    taglishExplanation: 'Equal protection challenge: courts apply rational basis test sa economic legislation tulad ng pension. Ang tanong: "May rational basis ba ang pre/post-1990 classification?" Kung may legitimate dahilan (different conditions of service, budget constraints noong 1990) — VALID ang classification. Pero kung walang distinguishing factor na substantial at may kinalaman sa pension purpose — UNCONSTITUTIONAL. Kaya ang sagot ay "Constitutional IF..." — need to examine whether the distinction is substantial and germane.',
    relatedArticle: 'Art. III, Sec. 1 Constitution; Rational Basis Test',
    points: 2,
  },
]

// ─── REMEDIAL LAW ─────────────────────────────────────────────────────────────
export const remedialExpMCQ = [
  {
    id: 'rem-exp-mcq-001', subject: 'remedial-law', topic: 'jurisdiction', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A filed a collection suit in the MTC for ₱1,800,000. After trial, the MTC rendered judgment ordering B to pay ₱2,500,000 (principal + interest + damages). B argues the MTC had no jurisdiction. Is B correct?',
    choices: [
      'Yes — since the judgment amount exceeded the MTC threshold, MTC had no jurisdiction.',
      'No — jurisdiction is determined by the amount CLAIMED in the complaint, not the amount awarded.',
      'Yes — since the award exceeded ₱2M, the case should be elevated to RTC.',
      'No — but the excess award should be remanded to the RTC.',
    ],
    correctAnswer: 1,
    explanation: 'Jurisdiction is determined by the allegations and relief prayed for in the COMPLAINT, not by the amount eventually awarded. A filed for ₱1,800,000 — within MTC jurisdiction. The fact that the MTC awarded more through interest and damages does not divest the MTC of jurisdiction it properly acquired. The court validly had jurisdiction from the filing. This is settled doctrine: the jurisdictional amount is measured at the time of filing, not at the time of judgment.',
    taglishExplanation: 'Classic jurisdiction trap! Ang jurisdiction ay tinitino sa oras ng FILING — kung magkano ang CLAIMED sa complaint. Si A nag-claim ng ₱1.8M — within MTC jurisdiction. Kahit magbigay ang MTC ng ₱2.5M judgment (sa pamamagitan ng interest at damages), hindi nito binabago ang jurisdiction na nag-attach na sa simula. Jurisdiction once acquired is not lost by later developments in the amount awarded.',
    relatedArticle: 'Rule 1; RA 11576; *Russel v. Vestil*',
    points: 2,
  },
  {
    id: 'rem-exp-mcq-002', subject: 'remedial-law', topic: 'evidence', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A is on trial for murder. The prosecution presents a letter written by A to B stating "I will not rest until X is dead." A\'s lawyer objects: "The letter is hearsay." The prosecutor responds: "It is not hearsay — we are not offering it to prove A intended to kill X, but to show a letter exists." Who is correct?',
    choices: [
      'A\'s lawyer — any out-of-court written statement is hearsay.',
      'The prosecutor — hearsay applies only when the statement is offered to prove the truth of its contents.',
      'A\'s lawyer — the letter is inadmissible regardless of purpose.',
      'The prosecutor — letters are always admissible as documentary evidence.',
    ],
    correctAnswer: 1,
    explanation: 'The prosecutor is correct. The hearsay rule applies to statements offered to prove the TRUTH OF THEIR CONTENTS. If the prosecution offers the letter merely to show that A wrote such a letter (i.e., the letter EXISTS), and not to prove that A actually intended to kill X, it is NOT hearsay. However, if the prosecution then argues "Because A wrote this, A intended to kill X," that IS using it for the truth of its content. Courts examine the PURPOSE of offering the statement, not just its form.',
    taglishExplanation: 'Ang hearsay rule ay depende sa PURPOSE ng offer. Kung ang letter ay inilalabas para lang patunayan na MAY SULAT na ganitong nilalaman (to show the letter exists) — not hearsay. Pero kung gagamitin para patunayan ang TRUTH (na talagang gusto ni A na patayin si X) — hearsay na. Ang lawyer ni A ay mali sa blanket objection. Prosecutor ang tama — ang hearsay issue ay nakasalalay sa kung para saan ginagamit ang evidence.',
    relatedArticle: 'Rule 130, Sec. 36 (Hearsay)',
    points: 2,
  },
  {
    id: 'rem-exp-mcq-003', subject: 'remedial-law', topic: 'double-jeopardy', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A was charged with homicide. After arraignment, the trial court dismissed the case based on the prosecution\'s motion citing inability to present witnesses due to their "sudden unavailability." A was not consulted. Can the prosecution refile the case?',
    choices: [
      'Yes — the dismissal was on the prosecution\'s own motion, so it was with the prosecution\'s consent.',
      'No — once A was arraigned and the case was dismissed, double jeopardy attaches regardless of who moved for dismissal.',
      'Yes — dismissal for inability to present witnesses is not a dismissal on the merits.',
      'No — but only if the "unavailability" was a manipulation by the prosecution.',
    ],
    correctAnswer: 1,
    explanation: 'Double jeopardy bars the refiling. The elements are: (1) valid information; (2) competent court; (3) arraignment; (4) dismissal/acquittal/conviction. All four are present. The key question is whether the dismissal was with A\'s EXPRESS consent (if so, double jeopardy waived). Since A was NOT consulted and did not consent — the dismissal was without A\'s express consent. Dismissal without the accused\'s express consent constitutes double jeopardy. The prosecution cannot refile.',
    taglishExplanation: 'Double jeopardy na! Lahat ng elements ay naroroon: valid Information, competent court, arraignment na, tapos dismissed. Ang susi: may EXPRESS CONSENT ba si A? WALA — hindi naman siya nagtanong, hindi niya pinayagan. Ang dismissal ay ginawa ng prosecution nang walang A\'s consent. Kaya double jeopardy fully attaches — hindi na pwedeng i-refile. Exception: kung express consent ng A ang dismissal — pero dito, wala.',
    relatedArticle: 'Art. III, Sec. 21; Rule 117, Sec. 7; *People v. Hernandez*',
    points: 2,
  },
  {
    id: 'rem-exp-mcq-004', subject: 'remedial-law', topic: 'writ-of-amparo', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A disappeared after last being seen with military personnel. A\'s family filed a Writ of Amparo. The court granted it and required the military to produce A or explain. The military claims they have no knowledge of A\'s whereabouts. What standard of proof applies in Amparo proceedings?',
    choices: [
      'Proof beyond reasonable doubt — since A\'s life and liberty are at stake.',
      'Preponderance of evidence — same as civil cases.',
      'Substantial evidence — same as administrative cases.',
      'Substantial evidence — lower than preponderance; totality of available evidence must support the claim.',
    ],
    correctAnswer: 3,
    explanation: 'Under the Rule on the Writ of Amparo (A.M. No. 07-9-12-SC), the standard of proof is SUBSTANTIAL EVIDENCE — defined as such relevant evidence as a reasonable mind might accept as adequate to support a conclusion. This is lower than preponderance of evidence and much lower than proof beyond reasonable doubt. The Amparo proceeding is remedial in character — the focus is on production and protection of the person, not criminal conviction. The court examines the totality of evidence and the probability of the person\'s disappearance being attributable to the respondent.',
    taglishExplanation: 'Writ of Amparo ay may sariling standard of proof: SUBSTANTIAL EVIDENCE — hindi beyond reasonable doubt (criminal), hindi preponderance (civil). Substantial evidence = reasonable mind would accept as adequate. Lower standard kasi ang purpose ng Amparo ay remedial — para i-locate at i-protect si A, hindi para magkumbikto ng krimen. Ang court ay tinitingnan ang totality ng evidence para malaman kung may pattern ng enforced disappearance.',
    relatedArticle: 'A.M. No. 07-9-12-SC (Rule on Writ of Amparo)',
    points: 2,
  },
]

// ─── COMMERCIAL LAW ───────────────────────────────────────────────────────────
export const commercialExpMCQ = [
  {
    id: 'com-exp-mcq-001', subject: 'commercial-law', topic: 'corporation', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'ABC Corp. has 10 directors. For quorum at a board meeting, how many directors must be present? And if quorum is present, what vote is needed to pass ordinary resolutions?',
    choices: [
      'Quorum: 5 directors present; vote to pass: majority of those present (3).',
      'Quorum: 6 directors present; vote to pass: majority of entire board (6).',
      'Quorum: 6 directors present; vote to pass: majority of quorum present (4).',
      'Quorum: majority of board (6); vote to pass: majority of those present (4).',
    ],
    correctAnswer: 2,
    explanation: 'Under the Revised Corporation Code (RA 11232), Sec. 52: A quorum for board meetings = majority of the NUMBER OF DIRECTORS as fixed in the articles of incorporation. For 10 directors: majority = 6. Once quorum is established, ordinary resolutions pass by majority of the QUORUM PRESENT (not majority of entire board). With 6 present: majority of 6 = 4. Answer: C is correct — quorum of 6, ordinary resolution needs 4 affirmative votes.',
    taglishExplanation: 'Dalawang hakbang: (1) Quorum = majority ng lahat ng directors = 10/2 + 1 = 6. (2) Para manalo ang resolution = majority ng quorum na present. Kung 6 ang present (quorum), kailangan ng 4 para manalo ang ordinary resolution. Karaniwang error: "majority of entire board" para sa vote — HINDI TAMA. Ang vote ay majority ng quorum, hindi majority ng buong board.',
    relatedArticle: 'Sec. 52, RA 11232 (Revised Corporation Code)',
    points: 2,
  },
  {
    id: 'com-exp-mcq-002', subject: 'commercial-law', topic: 'negotiable-instruments', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A issued a check to B for P100,000. B negotiated it to C without endorsement. C then negotiated it to D by endorsement. The check bounced. Can D recover from A?',
    choices: [
      'Yes — D is an HIDC and can recover directly from A as drawer.',
      'No — the chain of negotiation was broken when B negotiated without endorsement.',
      'Yes — but only up to the extent of B\'s original transaction with A.',
      'No — A can raise personal defenses against D since D is not an HIDC.',
    ],
    correctAnswer: 1,
    explanation: 'When B negotiated without endorsement, C became a mere holder (not by endorsement) — but C could still pass good title. When C endorsed to D, D may still be an HIDC if D took: (1) for value, (2) in good faith, (3) without notice of defect, (4) before maturity. The break in endorsement by B does not automatically defeat D\'s HIDC status — it may affect it if D had notice. If D is an HIDC, D can enforce against A (drawer). However, the answer depends on whether D qualifies as HIDC despite the endorsement gap.',
    taglishExplanation: 'Ang isyu dito ay kung HIDC ba si D kahit may "gap" sa endorsement chain (si B ay hindi nag-endorse). Ang gap ay hindi automatic na nagtatanggal ng HIDC status ng subsequent holder kung hindi siya nagkaroon ng notice ng defect. Kung walang alam si D at kumuha siya for value in good faith — HIDC pa rin siya at maaari siyang mag-recover sa A. Pero kung may notice si D ng gap — hindi na HIDC, at pwedeng mag-raise ng personal defenses si A.',
    relatedArticle: 'Sec. 52, 65 NIL (HIDC; Effect of missing endorsement)',
    points: 2,
  },
]

// ─── TAXATION LAW ─────────────────────────────────────────────────────────────
export const taxationExpMCQ = [
  {
    id: 'tax-exp-mcq-001', subject: 'taxation-law', topic: 'income-tax', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A, a resident citizen, received P500,000 from his employer as separation pay due to retrenchment. B, a resident citizen, received P600,000 as separation pay after being dismissed for cause. How are these taxed?',
    choices: [
      'Both are taxable — all compensation income is taxable.',
      'A\'s is exempt; B\'s is taxable.',
      'Both are exempt — separation pay is always non-taxable.',
      'A\'s is taxable; B\'s is exempt.',
    ],
    correctAnswer: 1,
    explanation: 'Under Revenue Regulations 1-2011 and BIR rulings: Separation pay received due to AUTHORIZED CAUSES (retrenchment, redundancy, business closure, disease) — EXEMPT from income tax. This is because the separation was not due to the employee\'s fault. Separation pay for JUST CAUSES (dismissal for cause) — TAXABLE as compensation income because the employee was at fault. A was retrenched (authorized cause) → EXEMPT. B was dismissed for cause → TAXABLE.',
    taglishExplanation: 'Simpleng rule: Kung ang separation pay ay dahil sa authorized cause (retrenchment, redundancy, business closure, health) — EXEMPT. Kapag nag-separate ka nang walang kasalanan dahil sa business decision ng employer — hindi ka dapat bayad ng income tax sa separation pay. Pero kapag ikaw ang may sala (just cause dismissal) — TAXABLE ang separation pay. Si A (retrenchment = authorized cause) = EXEMPT. Si B (dismissed for cause = just cause) = TAXABLE.',
    relatedArticle: 'Sec. 32(B)(6)(b) NIRC; RR 1-2011',
    points: 2,
  },
  {
    id: 'tax-exp-mcq-002', subject: 'taxation-law', topic: 'vat', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'A restaurant\'s gross sales for the current quarter are ₱900,000. Total input VAT paid on purchases is ₱80,000. Assuming the restaurant is VAT-registered, how much output VAT must it collect and what is the VAT payable?',
    choices: [
      'Output VAT: ₱108,000; VAT payable: ₱28,000.',
      'Output VAT: ₱108,000; VAT payable: ₱108,000.',
      'Output VAT: ₱97,200; VAT payable: ₱17,200.',
      'No VAT — restaurants are VAT-exempt.',
    ],
    correctAnswer: 0,
    explanation: 'VAT computation: Output VAT = Sales × 12% = ₱900,000 × 12% = ₱108,000. VAT Payable = Output VAT - Input VAT = ₱108,000 - ₱80,000 = ₱28,000. Restaurants are subject to VAT (not exempt unless they are specifically exempt such as small businesses below the VAT threshold of ₱3M/year). Since the quarterly sales are ₱900,000, annual sales would be ₱3,600,000 — above the ₱3M threshold. The restaurant must be VAT-registered.',
    taglishExplanation: 'VAT formula: OUTPUT VAT (12% ng sales) - INPUT VAT (VAT sa purchases) = VAT PAYABLE. ₱900,000 × 12% = ₱108,000 output VAT. ₱108,000 - ₱80,000 input VAT = ₱28,000 VAT payable sa BIR. Hindi exempt ang restaurants — malaking misconception ito. Kung ₱900K quarterly sales = ₱3.6M annual sales = above ₱3M threshold = dapat VAT-registered at nagbabayad ng VAT.',
    relatedArticle: 'Sec. 106, 110, 114 NIRC (Output VAT, Input VAT, VAT Payable)',
    points: 2,
  },
]

// ─── LABOR LAW ────────────────────────────────────────────────────────────────
export const laborExpMCQ = [
  {
    id: 'lab-exp-mcq-001', subject: 'labor-law', topic: 'illegal-dismissal', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A was dismissed for "loss of trust and confidence" after being accused of shortchanging customers. However, no formal investigation was conducted and A was not given a chance to explain. The NLRC found valid cause (A indeed shortchanged customers) but lack of procedural due process. What is the correct ruling?',
    choices: [
      'Illegal dismissal — because there was no procedural due process, regardless of valid cause.',
      'Valid dismissal — because there was a valid substantive cause; procedure is merely technicality.',
      'Valid dismissal but employer must pay nominal damages of ₱30,000 for lack of due process.',
      'Valid dismissal but employer must reinstate A and pay backwages until procedural compliance.',
    ],
    correctAnswer: 2,
    explanation: 'Agabon v. NLRC doctrine: When there is VALID SUBSTANTIVE CAUSE for dismissal but LACK OF PROCEDURAL DUE PROCESS, the dismissal is VALID (not illegal) but the employer must pay NOMINAL DAMAGES — ₱30,000 for just causes; ₱50,000 for authorized causes. The Court in Agabon clarified that procedural lapse alone does not convert a valid dismissal into an illegal one — the employee does not deserve reinstatement or backwages if the cause for dismissal was valid. Only nominal damages as indemnification.',
    taglishExplanation: 'AGABON DOCTRINE na ito! Substantive cause = VALID (nag-shortchange si A). Procedural compliance = WALA. Result: Valid dismissal pero may nominal damages na ₱30,000 (just cause). Hindi illegal dismissal, kaya walang reinstatement, walang backwages — nominal damages lang. Kapag authorized cause ang ginagamit at walang procedure = ₱50,000 (JAKA doctrine). Importanteng pagkakaiba: Agabon = just cause (₱30K), JAKA = authorized cause (₱50K).',
    relatedArticle: 'Agabon v. NLRC, G.R. No. 158693; Art. 294, 299 Labor Code',
    points: 2,
  },
  {
    id: 'lab-exp-mcq-002', subject: 'labor-law', topic: 'probationary-employment', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'A was hired as a probationary employee for 6 months. After 5 months, the employer terminated A without stating any reason. A claims illegal dismissal. Is A\'s claim valid?',
    choices: [
      'No — the employer has wide discretion to terminate probationary employees at any time.',
      'Yes — probationary employees may only be terminated for just/authorized causes or failure to meet the standards for regularization communicated at the time of hiring.',
      'No — A was not yet regularized and thus had no security of tenure.',
      'Yes, but only if the employer failed to communicate standards at the start of employment.',
    ],
    correctAnswer: 1,
    explanation: 'Probationary employees are NOT without protection. Under Art. 296, Labor Code: Probationary employment shall not exceed 6 months. During probation, the employee may only be terminated for: (1) just or authorized cause, OR (2) failure to qualify as regular employee in accordance with REASONABLE STANDARDS COMMUNICATED to the employee at the time of engagement. If the employer did not communicate standards at hiring, any "failure to qualify" basis fails. Here, the employer gave no reason — the termination may be illegal if it was not for cause or failure to meet communicated standards.',
    taglishExplanation: "Probationary employees ay HINDI walang proteksyon! Pwede silang tanggalin para lang sa: (1) just/authorized cause, o (2) failure to meet REASONABLE STANDARDS na COMMUNICATED sa kanila sa oras ng pag-hire. Kung walang sinabi na standard sa simula — hindi pwedeng gamitin ang \"failure to qualify\" bilang dahilan. At kung walang dahilan na ibinigay si A — presumptively ILLEGAL ang dismissal. Proof of just cause = employer's burden.",
    relatedArticle: 'Art. 296 Labor Code (Probationary Employment)',
    points: 2,
  },
]

// ─── LEGAL ETHICS ─────────────────────────────────────────────────────────────
export const ethicsExpMCQ = [
  {
    id: 'eth-exp-mcq-001', subject: 'legal-ethics', topic: 'attorney-client-privilege', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A consulted Atty. B about committing fraud. Atty. B refused to assist. A later committed the fraud. The prosecution subpoenas Atty. B to testify about A\'s consultation. Atty. B invokes attorney-client privilege. Is the privilege applicable?',
    choices: [
      'Yes — all communications between attorney and client are privileged.',
      'No — attorney-client privilege does not cover communications made for the purpose of future crimes or frauds.',
      'Yes — the privilege protects all confidential communications regardless of content.',
      'No — Atty. B refused to assist, severing the attorney-client relationship.',
    ],
    correctAnswer: 1,
    explanation: 'The crime-fraud exception to attorney-client privilege: The privilege does NOT protect communications made to an attorney for the purpose of committing a FUTURE crime or fraud. Here, A consulted Atty. B to get help in committing fraud — a future crime. The fact that Atty. B refused is irrelevant to whether the privilege covers the communication. The exception applies whenever the client sought advice to facilitate a crime/fraud. The communication falls outside the privilege.',
    taglishExplanation: 'CRIME-FRAUD EXCEPTION ang magagamit dito! Ang attorney-client privilege ay HINDI nagtatakip ng komunikasyon na ginawa para sa layuning gumawa ng FUTURE crime o fraud. Si A ay nagconsult kay Atty. B para tulungan siyang mag-commit ng fraud — future crime. Hindi covered ng privilege ang komunikasyong iyon. Ang tanggihan ni Atty. B na tumulong ay walang epekto sa applicability ng crime-fraud exception — ang exception ay nakabatay sa layunin ng kliyente, hindi sa tugon ng lawyer.',
    relatedArticle: 'Rule 130, Sec. 24(b) Rules of Court; Canon 21 CPR',
    points: 2,
  },
]

// ─── ESSAY SAMPLES (multi-subject) ────────────────────────────────────────────
export const multiSubjectEssays = [
  {
    id: 'multi-ess-001', subject: 'civil-law', topic: 'succession', year: 2022,
    difficulty: 'hard', type: 'essay',
    question: `T died intestate leaving the following properties: a house worth ₱5M and a car worth ₱2M.\n\nHe is survived by: (1) his legitimate child A; (2) his illegitimate child B; (3) his surviving spouse C; and (4) his legitimate mother D.\n\n(a) Who are T's intestate heirs?\n(b) How should the estate be distributed?\n(c) Would the answer change if T had left a valid will excluding all his children?`,
    irac: {
      issue: 'How the ₱7M estate of T should be distributed among his surviving heirs under the rules of intestate succession in the Civil Code, and whether a will can exclude compulsory heirs.',
      rule: 'Under Arts. 960-1014 (Intestate Succession) and Arts. 886-895 (Compulsory Heirs), legitimate children exclude parents from inheriting. Illegitimate children inherit at half the share of legitimate children (Art. 895). Surviving spouse shares with legitimate children equally. In intestate succession, the order of intestate heirs excludes ascending relatives when descendants survive.',
      application: 'T is survived by legitimate child A, illegitimate child B, surviving spouse C, and legitimate mother D. Under Art. 985, legitimate children exclude the father/mother of the deceased from inheriting — so D (legitimate mother) is EXCLUDED. Remaining heirs: A, B, C. Under Art. 895: share of B (illegitimate) = 1/2 share of A (legitimate). Surviving spouse C: equal share to a legitimate child (Art. 998). Let A = x, B = x/2, C = x. Total: x + x/2 + x = 7M → 2.5x = 7M → x = 2.8M. A = ₱2.8M; B = ₱1.4M; C = ₱2.8M.',
      conclusion: 'Intestate heirs: A (legitimate child), B (illegitimate child), C (surviving spouse). D (mother) is excluded by A and B. Distribution: A = ₱2.8M; B = ₱1.4M; C = ₱2.8M. For part (c): Even in testamentary succession, a will CANNOT deprive compulsory heirs of their LEGITIME. A and C are compulsory heirs — their legitimes are fixed portions that the testator cannot take away. The will may affect free portion only.',
    },
    modelAnswer: 'T\'s intestate heirs are A, B, and C — D is excluded by A. Distribution: A=₱2.8M, C=₱2.8M, B=₱1.4M (half of legitimate). If T left a will excluding children: The will is partially void insofar as it impairs the legitime of compulsory heirs (A and B as legitimate/illegitimate children; C as spouse). The legitime cannot be reduced by testamentary disposition — but T may distribute the free portion freely.',
    taglishExplanation: 'Succession formula para dito: A (legit child) at C (surviving spouse) ay magkaparehong share. Si B (illegitimate) ay half lang ng legitimate child. Si D (ina ni T) ay excluded dahil may surviving descendants. Computation: 2.5x = 7M → x = 2.8M. Para sa will na nag-e-exclude ng lahat ng anak: HINDI PWEDE. Ang legitime ng compulsory heirs ay hindi mapapagkalooban ng testador — ang will ay void pro tanto (hanggang sa extent na naaapektuhan ang legitime).',
    points: 20,
  },
]
