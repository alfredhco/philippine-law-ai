// Each question has:
// - keywords: must appear in answer for full credit
// - citations: article/case refs that boost score
// - followUps: professor drills deeper if answer is weak

export const RECITATION_QUESTIONS = [

  // ─── CIVIL LAW ───────────────────────────────────────────────────────────────

  {
    id: 'rec-civ-001', subject: 'civil-law', topic: 'Obligations', difficulty: 'hard',
    question: 'Counsel, A borrowed B\'s specific car and a flash flood destroyed it while in A\'s possession. A invokes the fortuitous event doctrine to escape liability. Will A\'s defense succeed?',
    keywords: ['fortuitous event', 'default', 'mora', 'article 1174', 'specific', 'risk', 'exempt', 'debtor'],
    citations: ['article 1174', 'article 1262', 'article 1165', 'mora solvendi'],
    followUps: [
      { level: 1, question: 'You mentioned the fortuitous event doctrine. Counsel, under Article 1174, what are the THREE elements that must concur for a valid invocation?' },
      { level: 2, question: 'And what is the rule when the debtor is already in default at the time the fortuitous event occurs? Cite the provision.' },
      { level: 3, question: 'Counsel, I will give you one more chance. Is the result different if the obligation is generic rather than specific? Explain res perit domino.' },
    ],
    modelAnswer: 'Under Art. 1174, a fortuitous event exempts the debtor ONLY if: (1) the event was unforeseeable or inevitable; (2) the event was the proximate cause of loss; and (3) the debtor was NOT in default. If A was in mora solvendi at the time of the flood, the exemption fails. For specific obligations, risk follows ownership (res perit domino) — but if in default, the debtor bears the risk.',
  },

  {
    id: 'rec-civ-002', subject: 'civil-law', topic: 'Contracts', difficulty: 'hard',
    question: 'Counsel, distinguish between CAUSAL FRAUD and INCIDENTAL FRAUD in contracts. What are the legal consequences of each?',
    keywords: ['causal', 'incidental', 'dolo causante', 'dolo incidente', 'annulment', 'damages', 'consent', 'article 1338', 'voidable', 'void'],
    citations: ['article 1338', 'article 1344', 'article 1390'],
    followUps: [
      { level: 1, question: 'You mentioned annulment for causal fraud. What is the prescriptive period for an action to annul under Article 1391?' },
      { level: 2, question: 'What happens if the defrauded party RATIFIES the voidable contract? Does the right to sue for damages survive?' },
      { level: 3, question: 'Counsel, can fraud committed by a THIRD PARTY — not a party to the contract — vitiate consent? What does the Code say?' },
    ],
    modelAnswer: 'Causal fraud (dolo causante, Art. 1338) is fraud without which the party would NOT have given consent — it vitiates consent and renders the contract VOIDABLE. Incidental fraud (dolo incidente, Art. 1344) is fraud that did not determine consent but caused damage — the contract remains VALID but the guilty party is liable for damages. Action to annul: 4 years from discovery (Art. 1391).',
  },

  {
    id: 'rec-civ-003', subject: 'civil-law', topic: 'Sales', difficulty: 'hard',
    question: 'Counsel, the rule on double sales under Article 1544. A sold the same land to B (unregistered) then to C (registered in bad faith). Who prevails and why?',
    keywords: ['article 1544', 'good faith', 'bad faith', 'registered', 'prior', 'double sale', 'immovable', 'torrens', 'knowledge'],
    citations: ['article 1544', 'cheng v. genato', 'gabriel v. mabanta'],
    followUps: [
      { level: 1, question: 'The rule favors first to register in good faith. How do we define "good faith" under Article 1544 for immovables?' },
      { level: 2, question: 'What if NEITHER buyer registered? Who prevails in that scenario under Art. 1544?' },
      { level: 3, question: 'Counsel, does the Art. 1544 rule apply to unregistered land? What governs priority in that case?' },
    ],
    modelAnswer: 'Art. 1544: For immovables, priority goes to the first to REGISTER IN GOOD FAITH. C registered but had ACTUAL KNOWLEDGE of B\'s prior sale — C is in bad faith. Bad-faith registration confers no priority. B, as first buyer in good faith, prevails. Good faith means absence of notice or knowledge of any prior sale at the time of registration.',
  },

  {
    id: 'rec-civ-004', subject: 'civil-law', topic: 'Torts', difficulty: 'medium',
    question: 'Counsel, explain the employer\'s liability under Article 2180 of the Civil Code. When may the employer escape liability for the negligent act of an employee?',
    keywords: ['article 2180', 'employer', 'employee', 'due diligence', 'selection', 'supervision', 'presumption', 'rebuttable', 'quasi-delict'],
    citations: ['article 2180', 'article 2176', 'mercury drug v. baking', 'layugan v. iac'],
    followUps: [
      { level: 1, question: 'You said the liability is presumptive. How is that different from the employer\'s liability under Article 103 of the Revised Penal Code?' },
      { level: 2, question: 'Counsel, an employer proves due diligence in SELECTION but not in SUPERVISION. Can the employer escape liability?' },
      { level: 3, question: 'What is the effect on the employer\'s liability if the employee used the employer\'s vehicle WITHOUT permission? Does 2180 still apply?' },
    ],
    modelAnswer: 'Art. 2180: Employers are DIRECTLY and PRIMARILY liable for damages caused by employees acting within the scope of assigned tasks. The liability is PRESUMPTIVE and REBUTTABLE — employer must prove due diligence in BOTH selection (screening, credentials) AND supervision (monitoring, safety rules). Due diligence in only ONE aspect is insufficient — both must be proven. Unlike Art. 103 RPC (subsidiary only), Art. 2180 liability is primary.',
  },

  // ─── CRIMINAL LAW ────────────────────────────────────────────────────────────

  {
    id: 'rec-crim-001', subject: 'criminal-law', topic: 'Stages of Execution', difficulty: 'hard',
    question: 'Counsel, A fired a gun at B intending to kill him. The bullet missed because B dodged. Is the crime attempted or frustrated homicide?',
    keywords: ['attempted', 'frustrated', 'all acts', 'execution', 'independent', 'intent to kill', 'article 6', 'stages'],
    citations: ['article 6', 'people v. pugay', 'people v. lizada'],
    followUps: [
      { level: 1, question: 'You concluded attempted homicide. Now tell me: for FRUSTRATED homicide, what must the prosecution prove that is NOT required in attempted?' },
      { level: 2, question: 'What if A fired and HIT B, but B survived because a doctor performed surgery? Attempted, frustrated, or consummated? Explain the distinction.' },
      { level: 3, question: 'Counsel, are there crimes where there can be NO attempted or frustrated stage? Name at least THREE and explain why.' },
    ],
    modelAnswer: 'ATTEMPTED homicide. The stages under Art. 6: attempted = not all acts of execution performed; frustrated = all acts performed but felony not produced due to causes independent of the will. A fired and missed — the act did not reach B\'s person, so NOT all acts were performed. For frustrated homicide, the victim must be HIT and the wound would ordinarily cause death, but survival was due to medical intervention (People v. Lizada).',
  },

  {
    id: 'rec-crim-002', subject: 'criminal-law', topic: 'Justifying Circumstances', difficulty: 'hard',
    question: 'Counsel, Y disarmed X and then stabbed X ten more times while X lay helpless. Y claims self-defense. Walk me through whether the defense will succeed.',
    keywords: ['unlawful aggression', 'continuing', 'reasonable necessity', 'self-defense', 'article 11', 'ceased', 'complete defense', 'elements'],
    citations: ['article 11', 'people v. cabungcal', 'people v. alconga'],
    followUps: [
      { level: 1, question: 'You said unlawful aggression must be continuing. What is the distinction between ACTUAL and IMMINENT unlawful aggression?' },
      { level: 2, question: 'If Y had incomplete self-defense — say unlawful aggression is present but reasonable necessity is absent — what is the legal effect on Y\'s criminal liability?' },
      { level: 3, question: 'Can a person invoke self-defense against a POLICE OFFICER making an illegal arrest? Analyze.' },
    ],
    modelAnswer: 'Self-defense under Art. 11(1) requires: (1) unlawful aggression — MUST BE CONTINUING; (2) reasonable necessity of means; (3) lack of sufficient provocation. Once X was disarmed and helpless, unlawful aggression CEASED. Y became the aggressor. The indispensable element (continuing aggression) was absent during the fatal attacks. Defense FAILS. Y is liable for the resulting crime. If incomplete: privileged mitigating under Art. 69.',
  },

  {
    id: 'rec-crim-003', subject: 'criminal-law', topic: 'Special Laws', difficulty: 'hard',
    question: 'Counsel, police arrested A without a warrant and found shabu in his pocket. At inventory, only one witness (a barangay official) was present instead of the three required. Is the drug evidence admissible?',
    keywords: ['chain of custody', 'ra 9165', 'ra 10640', 'three-witness rule', 'justifiable reason', 'integrity', 'acquittal', 'section 21'],
    citations: ['ra 9165 section 21', 'ra 10640', 'people v. lim', 'people v. miranda'],
    followUps: [
      { level: 1, question: 'You mentioned the integrity of evidence must be preserved. What is the "saving clause" under RA 10640 that prevents automatic acquittal?' },
      { level: 2, question: 'The prosecution says the absent witnesses simply did not come. No explanation given. Does that satisfy the saving clause?' },
      { level: 3, question: 'Counsel, what are the FOUR links of the chain of custody that the prosecution must establish to prove the integrity of the seized drug?' },
    ],
    modelAnswer: 'Under RA 9165 Sec. 21 as amended by RA 10640: Non-compliance with the three-witness rule is NOT automatically fatal. The prosecution must: (1) acknowledge the deviation; (2) give a justifiable reason (e.g., unavailability despite earnest efforts); and (3) prove the integrity and evidentiary value of the seized item were preserved. Bare failure to explain = failure of saving clause = inadmissible. Four links of chain of custody: (1) seizure and marking; (2) turnover to investigating officer; (3) turnover to forensic chemist; (4) turnover to court.',
  },

  // ─── POLITICAL LAW ───────────────────────────────────────────────────────────

  {
    id: 'rec-pol-001', subject: 'political-law', topic: 'Bill of Rights', difficulty: 'hard',
    question: 'Counsel, police conducted a warrantless search of a parked car owned by the arrested person. The car was 15 meters from the arrest scene. Is the search valid?',
    keywords: ['search incident to lawful arrest', 'immediate control', 'arm\'s length', 'article iii', 'section 2', 'valid', 'invalid', 'warrant', 'chimel'],
    citations: ['article iii section 2', 'people v. damaso', 'chimel v. california'],
    followUps: [
      { level: 1, question: 'You invoked SILA. What are the TWO PURPOSES of the search incident to lawful arrest doctrine? Why is scope limited?' },
      { level: 2, question: 'Could the police have validly searched the car under any OTHER exception to the warrant requirement? Name the applicable exception and its requirements.' },
      { level: 3, question: 'What if the officer saw drugs in PLAIN VIEW through the car window before making the arrest? Analyze the plain view doctrine and its three requisites.' },
    ],
    modelAnswer: 'INVALID. SILA (search incident to lawful arrest) is limited to: (1) the person of the arrestee; and (2) the area within his IMMEDIATE CONTROL — the "grab area" or lunging distance at the TIME of arrest. A car parked 15 meters away is NOT within immediate control. SILA does not extend to remote vehicles. The search of the car required a separate warrant or another valid exception (e.g., consent, plain view).',
  },

  {
    id: 'rec-pol-002', subject: 'political-law', topic: 'Separation of Powers', difficulty: 'hard',
    question: 'Counsel, Congress passed a law authorizing a Joint Congressional Committee to review and nullify any implementing rule of the executive branch it finds inconsistent with the law. Constitutionally valid?',
    keywords: ['separation of powers', 'legislative veto', 'unconstitutional', 'executive', 'implementing rules', 'abakada', 'enrolled bill', 'bicameral'],
    citations: ['abakada guro v. ermita', 'article vi', 'article vii'],
    followUps: [
      { level: 1, question: 'You cited Abakada Guro. What was the specific constitutional defect found by the SC in that case regarding the congressional oversight committee?' },
      { level: 2, question: 'If Congress CANNOT nullify implementing rules, what IS the proper remedy when an implementing rule is alleged to be contrary to the enabling law?' },
      { level: 3, question: 'Distinguish the power of oversight from the power of control as understood in separation of powers doctrine.' },
    ],
    modelAnswer: 'The legislative veto is UNCONSTITUTIONAL — Abakada Guro v. Ermita. Once a law is enacted and signed, it passes to the executive for implementation. Congressional oversight is purely INFORMATIONAL (hearings, investigations) — Congress cannot make binding executive decisions post-enactment. Giving Congress power to nullify IRRs violates separation of powers. Only COURTS can nullify executive acts that are contrary to law or the Constitution.',
  },

  // ─── REMEDIAL LAW ────────────────────────────────────────────────────────────

  {
    id: 'rec-rem-001', subject: 'remedial-law', topic: 'Evidence', difficulty: 'hard',
    question: 'Counsel, in a murder trial, the prosecution offers a dying declaration. The defense objects because the declarant is alive — she survived after surgery. How does the court rule?',
    keywords: ['dying declaration', 'actual death', 'rule 130', 'section 37', 'admissible', 'requisites', 'consciousness', 'impending death'],
    citations: ['rule 130 section 37', 'people v. bautista', 'res gestae'],
    followUps: [
      { level: 1, question: 'The statement is rejected as a dying declaration. Can it be admitted under any other exception to the hearsay rule? Which one and what are its requirements?' },
      { level: 2, question: 'What if the prosecution calls the DECLARANT herself as a witness to testify about what she said while believing she would die? Is the statement still relevant or necessary?' },
      { level: 3, question: 'Counsel, the defense says the declarant\'s statement was made while unconscious due to pain medication. Does this affect the admissibility of the dying declaration?' },
    ],
    modelAnswer: 'SUSTAINED — excluded as dying declaration. Rule 130, Sec. 37: The declarant must have ACTUALLY DIED — this is an indispensable fourth requisite. Survival means the dying declaration exception is unavailable. However, the statement may be admitted as: (1) res gestae — spontaneous exclamation at time of the startling event; or (2) prior consistent/inconsistent statement. Or the prosecution may simply call the declarant as a live witness.',
  },

  {
    id: 'rec-rem-002', subject: 'remedial-law', topic: 'Criminal Procedure', difficulty: 'hard',
    question: 'Counsel, after arraignment, the prosecution moves to amend the information to change the charge from frustrated homicide to murder. The defense objects. How should the court rule on the amendment?',
    keywords: ['amendment', 'arraignment', 'formal', 'substantial', 'murder', 'homicide', 'prejudice', 'rule 110', 'section 14'],
    citations: ['rule 110 section 14', 'matalam v. sandiganbayan', 'people v. magpale'],
    followUps: [
      { level: 1, question: 'You said post-arraignment amendments must be formal only. Give me THREE examples of FORMAL amendments versus THREE examples of SUBSTANTIAL amendments.' },
      { level: 2, question: 'The prosecution claims upgrading to murder is a formal amendment because the facts already in the information would support murder. Is this correct?' },
      { level: 3, question: 'What IS the proper remedy if the prosecution discovers evidence of murder AFTER arraignment for homicide? What procedural steps should be taken?' },
    ],
    modelAnswer: 'DENY the amendment. Rule 110, Sec. 14: After arraignment, only FORMAL amendments are allowed. Changing frustrated homicide to murder is SUBSTANTIAL — it changes the nature and character of the offense, adds a qualifying circumstance (e.g., treachery), and elevates the penalty from reclusion temporal to reclusion perpetua. This prejudices the accused\'s rights. Remedy: Withdraw the homicide information and file a new information for murder (double jeopardy analysis required).',
  },

  // ─── COMMERCIAL LAW ──────────────────────────────────────────────────────────

  {
    id: 'rec-com-001', subject: 'commercial-law', topic: 'Corporations', difficulty: 'hard',
    question: 'Counsel, ABC Corp. is 100% owned by XYZ Corp. ABC has no employees — all operations are run by XYZ. ABC defaults on a ₱5M contract. Can creditors pierce the corporate veil and hold XYZ liable?',
    keywords: ['pierce the corporate veil', 'alter ego', 'instrumentality', 'control', 'fraud', 'proximate cause', 'separate entity', 'doctrine'],
    citations: ['concept builders v. nlrc', 'philippine national bank v. ritratto', 'article 4 revised corporation code'],
    followUps: [
      { level: 1, question: 'You cited the alter ego doctrine. What are the THREE elements that must ALL concur to justify piercing the corporate veil under Philippine jurisprudence?' },
      { level: 2, question: 'Can the corporate veil be pierced against individual stockholders — not just a parent corporation? What are the requirements?' },
      { level: 3, question: 'Counsel, if the court pierces the veil, what is the EXTENT of XYZ\'s liability? Limited to its investment in ABC, or the full ₱5M?' },
    ],
    modelAnswer: 'YES — under the alter ego/instrumentality doctrine. Three requisites: (1) Complete CONTROL by parent over subsidiary — no separate mind, will, or existence; (2) Control was used to commit FRAUD or wrong, perpetuate violation of legal duty; (3) The control and breach proximately CAUSED the injury. Here: 100% ownership, no employees, XYZ runs all operations — satisfies element 1. Using the shell to default on debt may satisfy element 2. The full ₱5M liability attaches if all three elements are proven.',
  },

  {
    id: 'rec-com-002', subject: 'commercial-law', topic: 'Negotiable Instruments', difficulty: 'medium',
    question: 'Counsel, a check was indorsed in blank by the payee and then lost. A finder presents it to the bank and the bank pays. Is the bank discharged? What is the payee\'s remedy?',
    keywords: ['blank indorsement', 'bearer', 'negotiable', 'delivery', 'holder', 'discharged', 'section 34', 'nil', 'section 9'],
    citations: ['section 9 nil', 'section 34 nil', 'section 65 nil'],
    followUps: [
      { level: 1, question: 'You said a blank indorsement converts the instrument to bearer paper. What provision of the NIL governs, and why does that matter for subsequent transfers?' },
      { level: 2, question: 'Can the payee recover from the bank if the bank paid without checking identification? What is the bank\'s standard of care for bearer instruments?' },
      { level: 3, question: 'What if the finder FORGED a special indorsement before presenting? Would the analysis change? How does forgery affect the chain of title under the NIL?' },
    ],
    modelAnswer: 'The bank is DISCHARGED. Under Sec. 34 NIL: A blank indorsement makes the instrument payable to bearer — negotiable by mere delivery. The finder became the BEARER — the holder of a bearer instrument. A bank that pays the bearer of a bearer instrument in good faith and without notice of any defect is discharged. The payee\'s remedy is against the person who lost the check (the person entrusted with it), NOT the bank.',
  },

  // ─── TAXATION LAW ────────────────────────────────────────────────────────────

  {
    id: 'rec-tax-001', subject: 'taxation-law', topic: 'Income Tax', difficulty: 'hard',
    question: 'Counsel, a non-resident alien (not engaged in trade or business) earned dividends from a Philippine corporation. What is the applicable tax treatment?',
    keywords: ['non-resident alien', 'final withholding tax', '25 percent', 'gross income', 'passive income', 'section 25', 'nirc', 'philippine source'],
    citations: ['section 24 nirc', 'section 25 nirc', 'section 42 nirc'],
    followUps: [
      { level: 1, question: 'How does the tax treatment differ if the non-resident alien IS engaged in trade or business in the Philippines? What rate applies?' },
      { level: 2, question: 'What determines whether income is "Philippine source"? Apply the situs rules to: (a) dividends from a domestic corporation; (b) royalties for patents used in the PH.' },
      { level: 3, question: 'Counsel, a tax treaty between the Philippines and the non-resident\'s country provides a reduced 15% rate on dividends. Which controls — the NIRC or the treaty?' },
    ],
    modelAnswer: 'Non-resident alien NOT engaged in trade or business: subject to a 25% FINAL WITHHOLDING TAX on GROSS income from Philippine sources (Sec. 25[B] NIRC). Dividends from a Philippine domestic corporation are Philippine-source income (Sec. 42[A]). The 25% final tax is a complete settlement — no further Philippine income tax return required for that income. Tax treaties, being part of the law of the land, may reduce this rate (generally supreme over domestic law under the NIRC).',
  },

  // ─── LABOR LAW ───────────────────────────────────────────────────────────────

  {
    id: 'rec-lab-001', subject: 'labor-law', topic: 'Illegal Dismissal', difficulty: 'hard',
    question: 'Counsel, A was dismissed for serious misconduct. The employer sent only ONE written notice — the dismissal notice — without a prior notice to explain. The misconduct is clearly proven. Is the dismissal valid?',
    keywords: ['two-notice rule', 'procedural due process', 'substantive', 'article 292', 'charge sheet', 'opportunity to be heard', 'nominal damages', 'agabon', 'jaka food'],
    citations: ['article 292 labor code', 'agabon v. nlrc', 'jaka food v. pacot', 'king of kings transport v. mamac'],
    followUps: [
      { level: 1, question: 'You said nominal damages are awarded. Under Agabon and Jaka Food, how much is the nominal damages award for procedural due process violations?' },
      { level: 2, question: 'The employer says they held a verbal conference where A explained himself — that should count as due process. Does verbal opportunity to explain satisfy the two-notice rule?' },
      { level: 3, question: 'What if the employee RESIGNED before the employer could complete the two-notice procedure? Is the employer still liable? What is constructive dismissal?' },
    ],
    modelAnswer: 'The dismissal is SUBSTANTIVELY VALID (serious misconduct proven) but PROCEDURALLY DEFECTIVE (only one notice given). The two-notice rule requires: (1) First notice: charge sheet specifying the act, giving the employee a chance to respond (minimum 5 days); AND (2) Second notice: written decision after evaluation. No first notice = procedural violation. Under Agabon: employer owes NOMINAL DAMAGES (₱30,000) to the employee for the procedural defect. No reinstatement or backwages since substantive cause exists.',
  },

  // ─── LEGAL ETHICS ────────────────────────────────────────────────────────────

  {
    id: 'rec-eth-001', subject: 'legal-ethics', topic: 'Conflicts of Interest', difficulty: 'hard',
    question: 'Counsel, a lawyer represented Company A in a labor dispute in 2020. In 2024, Company B approaches the lawyer to sue Company A for breach of contract — a completely unrelated matter. May the lawyer accept?',
    keywords: ['conflict of interest', 'former client', 'substantial relation', 'confidential information', 'rule 15.03', 'cpr', 'adverse', 'loyalty'],
    citations: ['rule 15.03 cpr', 'pacana v. pascual-lopez', 'canon 15'],
    followUps: [
      { level: 1, question: 'You mentioned the "substantial relation" test. Articulate the test: when is a new matter substantially related to the prior representation?' },
      { level: 2, question: 'What if Company A CONSENTS in writing to the lawyer representing Company B? Does written consent cure the conflict?' },
      { level: 3, question: 'Counsel, a law firm (not individual lawyer) handled Company A\'s case. One associate left and joined another firm now suing Company A. Is the conflict imputed to the new firm?' },
    ],
    modelAnswer: 'The lawyer MAY accept — provided the matters are NOT substantially related AND no confidential information from the prior representation is relevant to the new case. Substantial relation test: the new matter must involve the same facts and legal issues as the former representation. Here, the 2024 breach of contract case is unrelated to the 2020 labor dispute — different facts, different law. No conflict. However, the lawyer must ensure no confidential information from the Company A representation is used against it.',
  },

  // ─── LEGAL WRITING ───────────────────────────────────────────────────────────

  {
    id: 'rec-lw-001', subject: 'legal-writing', topic: 'Statutory Construction', difficulty: 'medium',
    question: 'Counsel, a penal statute punishes those who "drive a vehicle while intoxicated." The accused was operating a ride-on lawn mower on a private road at 0.09% BAC. Is he covered?',
    keywords: ['penal statute', 'strict construction', 'vehicle', 'literal meaning', 'legislative intent', 'ambiguity', 'in dubio pro reo', 'accused'],
    citations: ['in dubio pro reo', 'people v. garcia'],
    followUps: [
      { level: 1, question: 'You invoked strict construction. What is the rationale for strictly construing penal statutes against the State?' },
      { level: 2, question: 'The prosecution argues legislative intent was to cover ALL motorized devices to protect public safety. Which construction principle supports this argument — and does it override strict construction?' },
      { level: 3, question: 'Counsel, the incident happened on PRIVATE property, not a public road. Does the statute apply? How do you determine if "road" is an element of the offense?' },
    ],
    modelAnswer: 'Applying STRICT CONSTRUCTION of penal statutes: In case of ambiguity, the doubt must be resolved IN FAVOR OF THE ACCUSED (in dubio pro reo). A ride-on lawn mower may or may not be a "vehicle" — the statute is ambiguous. Even if we apply ejusdem generis, the common understanding of "vehicle" for DUI purposes is road-going transport. The lawn mower on a private road likely falls outside the penal statute. Strict construction means the accused benefits from the ambiguity.',
  },
]

// Grouped by subject for quick access
export const QUESTIONS_BY_SUBJECT = RECITATION_QUESTIONS.reduce((acc, q) => {
  if (!acc[q.subject]) acc[q.subject] = []
  acc[q.subject].push(q)
  return acc
}, {})

export const SUBJECTS_WITH_QUESTIONS = Object.keys(QUESTIONS_BY_SUBJECT)

export const getQuestionsForSession = (subject, count = 3) => {
  const pool = subject === 'all' ? RECITATION_QUESTIONS : (QUESTIONS_BY_SUBJECT[subject] ?? [])
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export const scoreAnswer = (answer, question, confidence = 5) => {
  if (!answer || answer.trim().length < 5) return {
    score: 0, pct: 0, keywordsFound: [], keywordsMissing: question.keywords,
    citationsFound: [], hasArticle: false, wordCount: 0,
  }

  const lower = answer.toLowerCase()
  const words = answer.trim().split(/\s+/)
  const wordCount = words.length

  // Keyword coverage (40 pts)
  const keywordsFound = question.keywords.filter(k => lower.includes(k.toLowerCase()))
  const keywordsMissing = question.keywords.filter(k => !lower.includes(k.toLowerCase()))
  const keywordScore = (keywordsFound.length / Math.max(question.keywords.length, 1)) * 40

  // Length / completeness (20 pts)
  const lengthScore = Math.min(wordCount / 60, 1) * 20

  // Article citations (20 pts)
  const hasArticle = /art(?:icle)?\.?\s*\d+|sec(?:tion)?\.?\s*\d+|r\.a\.?\s*\d+/i.test(answer)
  const articleScore = hasArticle ? 20 : 0

  // Case citations (20 pts)
  const citationsFound = (question.citations || []).filter(c => lower.includes(c.toLowerCase()))
  const citationScore = Math.min(citationsFound.length * 10, 20)

  let raw = keywordScore + lengthScore + articleScore + citationScore
  raw = Math.min(raw, 100)

  // Confidence modifier: high confidence + poor performance = bigger penalty
  let adjusted = raw
  if (confidence >= 8 && raw < 50) adjusted = Math.max(raw - 8, 0)
  if (confidence >= 8 && raw >= 80) adjusted = Math.min(raw + 5, 100)

  return {
    score: Math.round(adjusted),
    pct: Math.round(adjusted),
    keywordsFound,
    keywordsMissing,
    citationsFound,
    hasArticle,
    wordCount,
  }
}
