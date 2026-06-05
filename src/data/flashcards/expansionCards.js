// ─── Expansion Pack — 80 new cards across all subjects ───────────────────────

export const criminalExpansion = [
  {
    id: 'crim-exp-001', subject: 'criminal-law', topic: 'justifying', difficulty: 'hard',
    front: 'State ALL THREE elements of SELF-DEFENSE under Art. 11(1) RPC.',
    back: '1. **Unlawful aggression** — *ang pinaka-indispensable* element; must be ACTUAL or IMMINENT\n2. **Reasonable necessity of means employed** — proportionality; rational equivalence, not exact equality\n3. **Lack of sufficient provocation** by the defender\n\n**All three must be present** for COMPLETE self-defense (justifying, no criminal liability).\n\n**INCOMPLETE:** If only unlawful aggression is present but other elements are absent → *privileged mitigating circumstance* (Art. 69) — penalty reduced by 1-2 degrees.\n\n*Key: Once aggressor is disarmed/helpless, unlawful aggression CEASES. Any further attack = aggression, not defense.*',
    hint: 'UAE — Unlawful Aggression is INDISPENSABLE. Without it, no self-defense at all.',
    tags: ['justifying', 'self-defense', 'Art-11', 'unlawful-aggression'],
  },
  {
    id: 'crim-exp-002', subject: 'criminal-law', topic: 'exempting', difficulty: 'medium',
    front: 'Who are EXEMPT from criminal liability under Art. 12 RPC? Name all 7.',
    back: '**Seven exempting circumstances (Art. 12):**\n\n1. **Imbecile/Insane** person — no criminal liability; may have civil liability\n2. **Minor under 15** — absolute exemption; not criminally liable\n3. **Minor 15-17** acting without discernment — exempt\n4. **Accident** — without fault/intention; lawful act done with due care\n5. **Irresistible force** — physical compulsion leaving no other choice\n6. **Uncontrollable fear** — threat of equal or greater injury, cannot resist\n7. **Insuperable cause** — acts required by law but fulfillment is impossible by lawful means\n\n*Mnemonic: **IMMAIAU** = Insane, Minor-15, Minor-15/17, Accident, Irresistible force, Uncontrollable fear, Insuperable cause*\n\n**Distinguish from JUSTIFYING:** Exempting = act is criminal but offender is not liable. Justifying = act itself is lawful.',
    hint: 'IMMAIAU — 7 exempting circumstances. No criminal liability, possible civil liability.',
    tags: ['exempting', 'Art-12', 'criminal-liability'],
  },
  {
    id: 'crim-exp-003', subject: 'criminal-law', topic: 'mitigating', difficulty: 'medium',
    front: 'Distinguish ORDINARY mitigating from PRIVILEGED mitigating circumstances.',
    back: '**Ordinary Mitigating (Art. 13):**\n• Can be offset by aggravating circumstances\n• If present, penalty is applied in MINIMUM period\n• Example: voluntary surrender, passion/obfuscation, sufficient provocation\n\n**Privileged Mitigating:**\n• Cannot be offset by any aggravating circumstance\n• Reduces penalty by 1 or 2 DEGREES, not just period\n• Examples:\n  - Incomplete self-defense (Art. 69) — reduces by 1-2 degrees\n  - Minor 15-18 with discernment — reduces by 1 degree (RA 9344)\n  - Degree of education of offender (special laws)\n\n*Key rule: Privileged > Ordinary in weight. When both present, apply privileged first.*',
    hint: 'Ordinary = offset-able, affects period. Privileged = cannot be offset, reduces degree.',
    tags: ['mitigating', 'privileged', 'Art-13', 'Art-69'],
  },
  {
    id: 'crim-exp-004', subject: 'criminal-law', topic: 'aggravating', difficulty: 'hard',
    front: 'What is the difference between GENERIC and QUALIFYING aggravating circumstances?',
    back: '**Generic Aggravating:**\n• Generally applicable to ALL crimes\n• Can be OFFSET by mitigating circumstances\n• Effect: penalty applied in MAXIMUM period\n• Examples: nighttime, uninhabited place, recidivism, band\n\n**Qualifying Aggravating:**\n• Changes the NATURE of the crime itself\n• **Cannot be offset** by any mitigating circumstance\n• Must be specifically alleged in the Information\n• Effect: Elevates crime to a higher offense\n• Example: treachery + intent to kill = Murder (not just Homicide)\n\n*Mnemonic: "GENERIC can be GONE (offset). QUALIFYING stays and QUALIFIES the crime."*\n\n*Rule: If not alleged in the Information, a qualifying circumstance CANNOT be appreciated even if proved. It can only be used as generic aggravating.*',
    hint: 'Generic = offset-able, maximum period. Qualifying = changes the crime, cannot be offset.',
    tags: ['aggravating', 'qualifying', 'generic', 'Art-14'],
  },
  {
    id: 'crim-exp-005', subject: 'criminal-law', topic: 'penalties', difficulty: 'medium',
    front: 'What is the THREE-FOLD RULE on service of multiple penalties?',
    back: '**Three-fold rule (Art. 70):**\n\nWhen a person is sentenced to multiple penalties, the maximum duration of his imprisonment shall not exceed **THREE TIMES** the most severe penalty imposed.\n\n**Absolute maximum:** 40 years imprisonment (regardless of number of sentences).\n\n**Application:**\n1. Identify the most severe single sentence\n2. Multiply by 3\n3. The result is the cap (not to exceed 40 years)\n4. The remaining sentences are served after the cap is reached\n\n*Example: Convicted of 5 crimes, each with 10-year sentence. Most severe = 10 years. 10 × 3 = 30 years maximum. The other sentences do NOT add further time beyond 30 years.*\n\n*Note: The three-fold rule applies to the DURATION of imprisonment service, not to the imposition of penalties.*',
    hint: '3× most severe penalty = max service. Absolute cap: 40 years.',
    tags: ['penalties', 'three-fold', 'Art-70', 'service'],
  },
  {
    id: 'crim-exp-006', subject: 'criminal-law', topic: 'theft', difficulty: 'medium',
    front: 'Distinguish THEFT from ROBBERY. What element separates them?',
    back: '**Theft (Art. 308):**\n• Taking of personal property BELONGING TO ANOTHER\n• With intent to gain\n• **WITHOUT** violence, intimidation, or force upon things\n• Without consent of the owner\n\n**Robbery (Arts. 293-302):**\n• Taking of personal property belonging to another\n• With intent to gain\n• **WITH** violence against or intimidation of persons OR force upon things\n\n**Key dividing line: VIOLENCE/INTIMIDATION/FORCE.**\n\n*Robbery with homicide — robbery with force that results in killing = special complex crime. Penalty: reclusion perpetua to death.*\n\n*Qualified theft — committed with grave abuse of confidence (Art. 310): penalty two degrees higher.*',
    hint: 'Theft = stealth. Robbery = force/violence/intimidation. That one element changes everything.',
    tags: ['theft', 'robbery', 'Art-308', 'Art-293', 'distinction'],
  },
  {
    id: 'crim-exp-007', subject: 'criminal-law', topic: 'homicide-murder', difficulty: 'hard',
    front: 'What QUALIFIES Homicide to Murder? List all qualifying circumstances.',
    back: '**Art. 248 — Murder qualifiers:**\n\n1. **Treachery** (alevosia) — attack ensures no risk to offender\n2. **Obvious ungratefulness** — offended party gave trust to offender\n3. **In consideration of price/reward/promise**\n4. **By means of inundation, fire, poison, explosion, shipwreck, etc.**\n5. **On occasion of calamity/misfortune**\n6. **With evident premeditation** — pre-planned, cool deliberation\n7. **With cruelty** — deliberate augmentation of suffering\n8. **Unlicensed firearm** (treated as aggravating per RA 8294)\n\n*Only ONE qualifier is needed to elevate homicide to murder.*\n\n*Most tested: **TREACHERY** — must be proven beyond reasonable doubt; presumed present if the attack was sudden and victim had no means to defend.*',
    hint: 'T-O-P-F-C-E-C — 7 qualifiers. One is enough to convert homicide to murder.',
    tags: ['murder', 'homicide', 'treachery', 'Art-248', 'qualifiers'],
  },
  {
    id: 'crim-exp-008', subject: 'criminal-law', topic: 'rape', difficulty: 'hard',
    front: 'Enumerate the acts constituting RAPE under RA 8353. What are the two categories?',
    back: '**RA 8353 (Anti-Rape Law of 1997) — Two categories:**\n\n**Category 1: Rape by sexual intercourse (Art. 266-A par. 1)**\n• By man upon woman through:\n  - Force, threat, or intimidation\n  - Offended party is deprived of reason or unconscious\n  - Fraudulent machination or grave abuse of authority\n  - Victim is under 16 (statutory rape — no consent needed)\n\n**Category 2: Rape by sexual assault (Art. 266-A par. 2)**\n• By inserting penis into mouth/anal orifice, OR\n• By inserting instrument/object into genital/anal orifice\n• Through force/intimidation/incapacity or age\n\n**Marital rape:** A husband CAN commit rape against his wife under RA 8353.\n\n*Penalty for statutory rape (victim under 16) = reclusion perpetua regardless of consent.*',
    hint: 'Two categories: intercourse (par. 1) and sexual assault (par. 2). Both are rape under RA 8353.',
    tags: ['rape', 'RA-8353', 'Art-266-A', 'statutory-rape'],
  },
  {
    id: 'crim-exp-009', subject: 'criminal-law', topic: 'recidivism', difficulty: 'medium',
    front: 'Distinguish RECIDIVISM, REITERACION, QUASI-RECIDIVISM, and HABITUAL DELINQUENCY.',
    back: '| Term | When | Offset-able? | Effect |\n|---|---|---|---|\n| **Recidivism** (Art. 14[9]) | 2nd conviction for **same title** of RPC | YES (generic) | Max period |\n| **Reiteracion** (Art. 14[10]) | Previous offense had **equal or greater** penalty | YES (generic) | Max period |\n| **Quasi-recidivism** (Art. 160) | Crime committed **while serving sentence** | NO (special agg.) | Max penalty |\n| **Habitual delinquency** (Art. 62) | 3x+ conviction for theft, robbery, estafa, falsification, serious/less serious physical injuries within 10 years | NO | Additional penalty |\n\n*Habitual delinquency ≠ recidivism. Both may coexist.*\n\n*Quasi-recidivism is a SPECIAL aggravating — cannot be offset by any mitigating.*',
    hint: 'Four flavors of repeat offender. Quasi-recidivism = committed while serving. Habitual = 3x for specific crimes.',
    tags: ['recidivism', 'quasi-recidivism', 'habitual-delinquency', 'Art-14', 'Art-62', 'Art-160'],
  },
  {
    id: 'crim-exp-010', subject: 'criminal-law', topic: 'estafa', difficulty: 'hard',
    front: 'What are the ELEMENTS of Estafa through abuse of confidence (Art. 315[1]b)?',
    back: '**Art. 315[1](b) — Estafa by misappropriation:**\n\n1. **Money, goods, or property received** by the offender in trust, on commission, for administration, or under any other obligation involving duty to deliver or return\n2. **Misappropriation or conversion** — using the property for own benefit or purpose different from that agreed\n3. **Prejudice** to the offended party\n4. **Demand made** by the offended party (demand is a prerequisite for prosecution)\n\n*Key distinction:*\n• **Estafa vs. BP 22 (Bouncing Checks):** Estafa requires deceit or abuse of confidence. BP 22 is a malum prohibitum — the mere act of issuing a bouncing check creates liability regardless of intent.\n• **Estafa vs. Theft:** In estafa, delivery was with CONSENT but subsequent misappropriation. In theft, no consent at all.',
    hint: 'RTM-D: Received in trust, Misappropriation, Prejudice, Demand. All four must be present.',
    tags: ['estafa', 'Art-315', 'misappropriation', 'abuse-of-confidence'],
  },
]

export const politicalExpansion = [
  {
    id: 'pol-exp-001', subject: 'political-law', topic: 'bill-of-rights', difficulty: 'hard',
    front: 'What is the EXCLUSIONARY RULE in Philippine constitutional law?',
    back: '**Exclusionary Rule (Art. III, Sec. 3[2]):**\n\n"Any evidence obtained in violation of [the right against unreasonable searches and seizures] shall be inadmissible in any proceeding for any purpose."\n\n**Also called the "Fruit of the Poisonous Tree" doctrine:**\n• Primary evidence (directly obtained illegally) = inadmissible\n• Secondary evidence (derived from illegal seizure) = also inadmissible\n\n**Exception to the Exclusionary Rule:**\n1. **Independent Source Doctrine** — prosecution can show independent, lawful basis for discovery\n2. **Inevitable Discovery** — evidence would have been found anyway\n3. **Good Faith Exception** (adopted in some US decisions, NOT firmly adopted in PH)\n\n*Note: In PH, the exclusionary rule applies to CRIMINAL proceedings primarily. Civil proceedings may be different.*',
    hint: 'Illegally seized evidence = inadmissible. Fruit of poisonous tree doctrine. Art. III, Sec. 3(2).',
    tags: ['exclusionary-rule', 'search-seizure', 'Art-III', 'Sec-3', 'fruit-of-poisonous-tree'],
  },
  {
    id: 'pol-exp-002', subject: 'political-law', topic: 'due-process', difficulty: 'hard',
    front: 'What are the CARDINAL PRIMARY RIGHTS in administrative due process (Ang Tibay v. CIR)?',
    back: '**Seven Cardinal Primary Rights (Ang Tibay v. CIR, 1940):**\n\n1. **Right to a hearing** — including presentation of evidence\n2. **Tribunal must consider** the evidence presented\n3. **Decision must be supported** by substantial evidence\n4. **Evidence must be substantial** — reasonable mind would accept as adequate\n5. **Decision must be based on evidence presented** at hearing, not on prior or extraneous knowledge\n6. **Tribunal must act independently** — free from outside pressure\n7. **Tribunal must render a decision** such that parties can know the issues and the reasons for the decision\n\n*Key in admin proceedings: notice + opportunity to be heard = due process. Formal hearing not always required — written submissions may suffice.*',
    hint: 'Ang Tibay 7 rights: Hearing, Consider, Substantial evidence, Based on hearing evidence, Independence, Decision.',
    tags: ['due-process', 'administrative', 'Ang-Tibay', 'cardinal-rights'],
  },
  {
    id: 'pol-exp-003', subject: 'political-law', topic: 'equal-protection', difficulty: 'medium',
    front: 'What are the FOUR REQUISITES for valid classification under the equal protection clause?',
    back: '**Art. III, Sec. 1 — Equal Protection:**\n\n**Four requisites for VALID classification:**\n\n1. Must rest on **substantial distinction** (not just any difference)\n2. Must be **germane to the purpose** of the law\n3. Must not be limited to **existing conditions only** (must apply to future conditions of the same type)\n4. Must apply **equally to all members of the same class**\n\n**Three standards of review:**\n• **Rational Basis** — economic/social legislation; rationally related to legitimate state interest\n• **Intermediate Scrutiny** — gender discrimination; substantially related to important state interest\n• **Strict Scrutiny** — suspect class (race, national origin) or fundamental right; compelling state interest, narrowly tailored\n\n*Philippine courts predominantly use rational basis, moving to strict scrutiny for fundamental rights.*',
    hint: 'SGEE: Substantial distinction, Germane to purpose, Existing + future conditions, Equal within class.',
    tags: ['equal-protection', 'classification', 'Art-III', 'Sec-1', 'rational-basis'],
  },
  {
    id: 'pol-exp-004', subject: 'political-law', topic: 'freedom-of-expression', difficulty: 'hard',
    front: 'Distinguish PRIOR RESTRAINT from SUBSEQUENT PUNISHMENT. Which is more constitutionally disfavored?',
    back: '**Prior Restraint:**\n• Government restriction BEFORE the expression occurs\n• Presumptively unconstitutional\n• Heavy burden on government to justify\n• Examples: licensing systems for press, court injunctions against publication, censorship boards\n\n**Subsequent Punishment:**\n• Government sanction AFTER the expression\n• More constitutionally acceptable\n• Normal criminal/civil liability for speech that causes harm\n• Examples: libel, contempt of court, prosecution for sedition\n\n**Prior restraint is MORE disfavored** — it chills free speech before it even happens.\n\n*Philippine test for prior restraint:*\n• **Clear and Present Danger Test** — whether the words create a danger that is clear, present, and likely to bring about evil that government may prevent (*Gonzales v. COMELEC*)\n• Modern PH courts also use **Balancing of Interests** test',
    hint: 'Prior = before speech = more disfavored. Subsequent = after speech = more acceptable. Prior restraint presumptively unconstitutional.',
    tags: ['free-speech', 'prior-restraint', 'Art-III', 'Sec-4', 'clear-present-danger'],
  },
  {
    id: 'pol-exp-005', subject: 'political-law', topic: 'police-power', difficulty: 'medium',
    front: 'Distinguish POLICE POWER, EMINENT DOMAIN, and TAXATION — the three inherent powers of the State.',
    back: '| Power | What is Taken | Compensation | Purpose |\n|---|---|---|---|\n| **Police Power** | Property/liberty regulated or destroyed | None | Public welfare |\n| **Eminent Domain** | Private property | Just compensation | Public use |\n| **Taxation** | Money/property | No direct benefit | Revenue generation |\n\n**Police Power** — broadest, most pervasive; includes zoning, licensing, health regulations\n**Eminent Domain** — government takes private property for public use with just compensation\n**Taxation** — government levies charges to raise revenue\n\n*All three have CONSTITUTIONAL limitations.*\n\n*Police power vs. Eminent domain: If regulation goes "too far" it becomes a **taking** requiring compensation — the "regulatory takings" doctrine.*',
    hint: 'Police = regulate with no pay. Eminent = take with just compensation. Tax = collect money.',
    tags: ['police-power', 'eminent-domain', 'taxation', 'inherent-powers', 'State'],
  },
  {
    id: 'pol-exp-006', subject: 'political-law', topic: 'writ-of-habeas-corpus', difficulty: 'medium',
    front: 'When may the privilege of the writ of HABEAS CORPUS be suspended? What happens when suspended?',
    back: '**Art. VII, Sec. 18 — Suspension of Habeas Corpus:**\n\n**Who may suspend:** The President, as Commander-in-Chief\n\n**Grounds:**\n1. **Invasion** or\n2. **Rebellion** — when public safety requires it\n\n**Limitations:**\n• Duration: **60 days** (unless revoked or extended by Congress)\n• Congress may **revoke** by majority vote\n• **SC may review** sufficiency of factual basis (Rule 65 certiorari)\n• Persons arrested under suspension must be **charged within 3 days**; otherwise released\n\n**Effect of suspension:** Does NOT suspend the right to bail (except for offenses where bail is not a matter of right). Does not authorize warrantless arrests for non-rebellion offenses.\n\n*Writ of Amparo and Habeas Data remain available even during suspension.*',
    hint: 'President suspends for invasion/rebellion. 60 days. Congress reviews. SC can check factual basis.',
    tags: ['habeas-corpus', 'Art-VII', 'Sec-18', 'suspension', 'rebellion'],
  },
  {
    id: 'pol-exp-007', subject: 'political-law', topic: 'executive-power', difficulty: 'hard',
    front: 'What is the POWER OF EXECUTIVE CLEMENCY? Distinguish pardon, commutation, reprieve, and amnesty.',
    back: '**Art. VII, Sec. 19 — Executive Clemency:**\n\n| Type | Effect | When | Needs concurrence? |\n|---|---|---|---|\n| **Pardon** | Forgives offense; restores rights (except political rights unless expressly restored) | After conviction | NO |\n| **Commutation** | Reduces penalty; does not forgive offense | After conviction | NO |\n| **Reprieve** | Postpones/stays execution | Any time | NO |\n| **Amnesty** | Obliterates offense itself; as if never committed | Any stage | YES — concurrence of Congress |\n\n**Limitations on Pardon:**\n• Cannot be granted for impeachment offenses\n• Cannot be granted before conviction (only pardon, not amnesty)\n• Does NOT automatically restore political rights\n• Does NOT restore disbarment — must separately petition SC\n\n*Amnesty: blots out the crime completely. Pardoned person still committed the crime.*',
    hint: 'Pardon = forgive crime. Commute = reduce penalty. Reprieve = delay. Amnesty = obliterate + needs Congress.',
    tags: ['executive-clemency', 'pardon', 'amnesty', 'Art-VII', 'Sec-19'],
  },
  {
    id: 'pol-exp-008', subject: 'political-law', topic: 'judicial-review', difficulty: 'hard',
    front: 'What are the REQUISITES for JUDICIAL REVIEW of a constitutional question?',
    back: '**Four Requisites for Judicial Review:**\n\n1. **Actual case or controversy** — definite and concrete issue; not hypothetical\n2. **Proper party (locus standi)** — party must have personal, substantial, and direct interest\n3. **Constitutional question raised at the earliest opportunity** — not belated raising\n4. **Constitutional issue must be the very lis mota** (lifeblood) of the case — indispensable to resolution\n\n**Exceptions to Locus Standi:**\n• **Citizen suit** — taxpayer standing for matters of public concern\n• **Transcendental importance** — SC may relax standing requirements (e.g., *David v. Macapagal-Arroyo*)\n\n*Political question doctrine: Courts will NOT rule on political questions — matters committed by the Constitution to the other branches (Art. VIII, Sec. 1 — "grave abuse of discretion" exception).*',
    hint: 'APCE: Actual controversy, Proper party, Constitutional question at earliest, Essential to decision.',
    tags: ['judicial-review', 'locus-standi', 'Art-VIII', 'constitutional-question'],
  },
]

export const remedialExpansion = [
  {
    id: 'rem-exp-001', subject: 'remedial-law', topic: 'jurisdiction', difficulty: 'hard',
    front: 'What is the MTC/RTC jurisdictional threshold for civil cases? How is it determined?',
    back: '**Jurisdictional thresholds (as amended by RA 11576, 2021):**\n\n**MTC (First Level Courts):**\n• Civil actions — assessed value of property OR demand does not exceed **₱2,000,000**\n• Small claims — not exceeding **₱400,000** (Rule of Procedure for Small Claims)\n\n**RTC (Second Level Courts):**\n• Civil actions — assessed value OR demand EXCEEDS **₱2,000,000**\n• Incapable of pecuniary estimation — ALWAYS RTC (e.g., specific performance, annulment of contracts)\n• Family court matters — Family Court (special court)\n\n**Incapable of pecuniary estimation test (*Russel v. Vestil*):** If the main relief is INCAPABLE of being estimated in money (e.g., annulment, injunction, specific performance) → RTC has jurisdiction regardless of amount.\n\n*Note: Jurisdiction is determined by the COMPLAINT, not the answer or defenses.*',
    hint: 'RA 11576 raised thresholds: ₱2M divides MTC/RTC. Incapable of pecuniary estimation = always RTC.',
    tags: ['jurisdiction', 'MTC', 'RTC', 'RA-11576', 'pecuniary-estimation'],
  },
  {
    id: 'rem-exp-002', subject: 'remedial-law', topic: 'evidence', difficulty: 'hard',
    front: 'Distinguish JUDICIAL ADMISSIONS from EXTRAJUDICIAL ADMISSIONS. What is their evidentiary weight?',
    back: '**Judicial Admission:**\n• Made in the COURSE OF JUDICIAL PROCEEDINGS (pleadings, stipulations, testimony at trial)\n• **Conclusive** — binds the party; NO need for proof; can only be contradicted by showing palpable mistake or imputed through fraud\n• Does not require proof; court takes it for granted\n\n**Extrajudicial Admission:**\n• Made OUTSIDE court proceedings (letter, text, admission to police)\n• NOT conclusive — must be offered in evidence; subject to rebuttal\n• Goes to the weight of evidence, not conclusive\n\n*Key distinction: A party who makes a judicial admission in pleadings CANNOT later deny it or offer contrary evidence. Extrajudicial admission can be explained away.*\n\n*Rule 129, Sec. 4: "An admission, verbal or written, made by a party in the course of the proceedings in the same case, does not require proof."*',
    hint: 'Judicial = conclusive, no proof needed. Extrajudicial = offered as evidence, can be rebutted.',
    tags: ['admissions', 'judicial-admission', 'extrajudicial', 'Rule-129', 'Sec-4'],
  },
  {
    id: 'rem-exp-003', subject: 'remedial-law', topic: 'evidence', difficulty: 'hard',
    front: 'What is the PAROL EVIDENCE RULE and its exceptions?',
    back: '**Parol Evidence Rule (Rule 130, Sec. 10):**\n\nWhen the terms of an agreement have been reduced to writing, it is deemed to contain all the terms agreed upon. No evidence of such terms other than the contents of the written agreement shall be admissible.\n\n**Exceptions — Parol evidence admissible to show:**\n1. **Intrinsic ambiguity** in the contract\n2. **Failure of written agreement** to express true intent (mistake, fraud)\n3. **Validity of the written agreement** — e.g., lack of consideration, fraud\n4. **Existence of other terms** agreed to as conditions precedent or subsequent not in conflict\n\n*Parol evidence vs. Best Evidence Rule:*\n• Best Evidence = original document vs. secondary evidence\n• Parol Evidence = written contract vs. extrinsic oral/written evidence of different terms\n\n*Key: If the written contract is unambiguous on its face, parol evidence is GENERALLY inadmissible.*',
    hint: 'Written contract is the whole deal — cannot add terms by oral evidence. Four exceptions to the rule.',
    tags: ['parol-evidence', 'Rule-130', 'Sec-10', 'contracts', 'evidence'],
  },
  {
    id: 'rem-exp-004', subject: 'remedial-law', topic: 'appeals', difficulty: 'hard',
    front: 'What is the HIERARCHY OF COURTS and the proper appellate remedies at each level?',
    back: '**Philippine Court Hierarchy:**\n\n```\nSupreme Court (SC)\n    ↑ Rule 45 (Questions of Law)\nCourt of Appeals (CA)\n    ↑ Rule 41 (Ordinary Appeal)\nRegional Trial Court (RTC)\n    ↑ Rule 40 (Appeal from MTC to RTC)\nMunicipal Trial Court (MTC/MeTC/MCTC)\n```\n\n**Key appellate remedies:**\n• **MTC → RTC:** Rule 40 — Notice of Appeal (15 days)\n• **RTC → CA:** Rule 41 — Record on Appeal OR Notice of Appeal\n• **CA → SC:** Rule 45 — Petition for Review on Certiorari (questions of law only)\n• **Any court:** Rule 65 — Certiorari (grave abuse of discretion, not ordinary appeal)\n\n*Period: 15 days from notice of judgment (non-extendable for criminal cases; 1 extension for civil)*',
    hint: 'MTC→RTC (Rule 40), RTC→CA (Rule 41), CA→SC (Rule 45). All 15-day periods. Rule 65 is not an appeal.',
    tags: ['hierarchy', 'appeals', 'Rule-40', 'Rule-41', 'Rule-45', 'courts'],
  },
  {
    id: 'rem-exp-005', subject: 'remedial-law', topic: 'provisional-remedies', difficulty: 'medium',
    front: 'What is PRELIMINARY ATTACHMENT and when may it be availed of?',
    back: '**Preliminary Attachment (Rule 57):**\n\nA court order directing the sheriff to seize the property of the defendant as security for satisfaction of judgment.\n\n**Grounds (Sec. 1, Rule 57):**\n1. Defendant is about to **depart from PH** with intent to defraud creditors\n2. Defendant has **removed or disposed** of property to defraud creditors\n3. Defendant **fraudulently incurred** obligation\n4. Action is for **money or property embezzled** by public officer or fiduciary\n5. Action is against a defendant who is a **non-resident** of the Philippines\n6. Action is for **recovery of property wrongfully taken**\n\n**Dissolved when:** Counter-bond filed; Ground for attachment did not exist; Writ improvidently issued.\n\n*Ex-parte issuance: Attachment may be granted EX PARTE before defendant can question it — but defendant has right to discharge.*',
    hint: 'Rule 57 = seize property as security. 6 grounds: depart, remove/dispose, fraudulent debt, embezzlement, non-resident, wrongful taking.',
    tags: ['preliminary-attachment', 'Rule-57', 'provisional-remedies', 'security'],
  },
  {
    id: 'rem-exp-006', subject: 'remedial-law', topic: 'criminal-procedure', difficulty: 'hard',
    front: 'What is DOUBLE JEOPARDY? State the elements and exceptions.',
    back: '**Double Jeopardy (Art. III, Sec. 21; Rule 117, Sec. 7):**\n\nNo person shall be twice put in jeopardy of punishment for the same offense.\n\n**Elements for double jeopardy to attach:**\n1. **First jeopardy attached** — valid complaint/information; court of competent jurisdiction; arraignment\n2. **First jeopardy terminated** — by acquittal, conviction, dismissal without express consent of accused, or dismissal based on insufficiency of evidence\n3. **Second jeopardy for SAME offense** (or for attempt or frustration of same, or offense necessarily included)\n\n**Exceptions — prosecution may appeal acquittal:**\n1. **Grave abuse of discretion** by the court (Rule 65 — not double jeopardy)\n2. **Dismissal made with express consent of accused** (waiver of double jeopardy)\n3. **Provisional dismissal** — not double jeopardy if not permanent\n\n*An acquittal based on a demurrer to evidence is immediately FINAL — double jeopardy fully attaches.*',
    hint: '3 elements: jeopardy attached, terminated, same offense again. Acquittal = final. Grave abuse exception via Rule 65.',
    tags: ['double-jeopardy', 'Art-III', 'Sec-21', 'Rule-117', 'acquittal'],
  },
  {
    id: 'rem-exp-007', subject: 'remedial-law', topic: 'evidence', difficulty: 'medium',
    front: 'What is CIRCUMSTANTIAL EVIDENCE? How many pieces are needed to convict?',
    back: '**Circumstantial Evidence (Rule 133, Sec. 4):**\n\nEvidence that proves a fact from which, by inference, another fact may be established.\n\n**Requirements for conviction based on circumstantial evidence:**\n1. There is **more than one circumstance** (plural — one is never enough)\n2. **Facts from which inferences are derived are proven** (each circumstance must be proven beyond reasonable doubt)\n3. The combination of all circumstances produces a **conviction beyond reasonable doubt**\n\n*The circumstances must form an unbroken chain leading to the conclusion that the accused committed the crime.*\n\n*Circumstantial vs. Direct evidence:*\n• Direct = witness saw the stabbing\n• Circumstantial = witness saw accused at scene, covered in blood, fleeing\n\n*A conviction based purely on circumstantial evidence is VALID provided the three requirements are met.*',
    hint: 'More than one circumstance, each proven, combination = beyond reasonable doubt. Three requirements.',
    tags: ['circumstantial-evidence', 'Rule-133', 'Sec-4', 'conviction'],
  },
]

export const commercialExpansion = [
  {
    id: 'com-exp-001', subject: 'commercial-law', topic: 'corporation', difficulty: 'hard',
    front: 'What is the BUSINESS JUDGMENT RULE? When does it NOT apply?',
    back: '**Business Judgment Rule:**\n\nCourts will NOT substitute their judgment for the board\'s in matters that are within the board\'s legitimate authority, exercised in good faith and in the reasonable belief that the decision serves the corporation\'s best interest.\n\n**Rationale:** Directors have expertise and information that courts lack. Business decisions involve risk — courts should not second-guess good-faith business decisions.\n\n**When the BJR does NOT apply (when courts will intervene):**\n1. **Bad faith** — decision was not made in the interest of the corporation\n2. **Fraud** — decision involved fraud or deliberate deception\n3. **Gross negligence** — failure to even make an informed decision\n4. **Illegality** — decision violates law or corporate charter\n5. **Oppression of minority** — abuse of the majority\'s power\n\n*Section 23, RCC: Directors shall exercise their powers in good faith, for the best interest of the corporation, and with the diligence of a good father of a family.*',
    hint: 'BJR = courts stay out of board decisions IF good faith + best interest + reasonable. No BJR if fraud, bad faith, or gross negligence.',
    tags: ['business-judgment-rule', 'corporation', 'board', 'RA-11232', 'Sec-23'],
  },
  {
    id: 'com-exp-002', subject: 'commercial-law', topic: 'insurance', difficulty: 'hard',
    front: 'What is INSURABLE INTEREST in life insurance? When must it exist?',
    back: '**Insurable Interest in Life (Sec. 10, Insurance Code):**\n\nA person has insurable interest in the life of:\n1. **Himself**\n2. **Spouse and children**\n3. Any person upon whose life any **estate or interest** depends (e.g., creditor in debtor\'s life, employer in key employee\'s life)\n4. Any person under **legal obligation** to the insured for payment of money (co-debtor)\n5. Any person on whose life **property rights** depend\n\n**When must insurable interest exist?**\n• **Life insurance:** Only at the **TIME OF CONTRACTING** — not at time of loss/death!\n  (You can insure someone\'s life, then your interest may disappear, but policy remains valid.)\n• **Property insurance:** Must exist at **BOTH** time of contract AND time of loss\n\n*Incontestability clause: After 2 years from issuance, the insurer cannot contest validity of life insurance policy on grounds of concealment or misrepresentation.*',
    hint: 'Life = insurable interest only at time of contracting. Property = both at contract AND loss. Incontestability = 2 years.',
    tags: ['insurable-interest', 'life-insurance', 'Insurance-Code', 'Sec-10', 'incontestability'],
  },
  {
    id: 'com-exp-003', subject: 'commercial-law', topic: 'negotiable-instruments', difficulty: 'hard',
    front: 'What is a HOLDER IN DUE COURSE (HIDC)? List all requisites.',
    back: '**HIDC (Sec. 52, Negotiable Instruments Law):**\n\nA holder who takes the instrument:\n1. **Complete and regular** on its face\n2. **Before maturity** (before due date)\n3. **For value** (consideration given)\n4. In **good faith** (no notice of infirmity or defect)\n5. **Without notice** of dishonor or overdue\n\n**Privileges of HIDC:**\n• Takes instrument FREE from personal defenses (failure of consideration, fraud in the inducement, want of delivery)\n• Subject ONLY to real defenses (forgery, material alteration, non est factum, infancy, illegality)\n\n**Shelter Rule:** A non-HIDC who takes from an HIDC acquires the HIDC rights (as if she/he were HIDC herself) — UNLESS that holder was herself party to fraud/illegality.\n\n*Mnemonic for requisites: **CBVGN** = Complete, Before maturity, Value, Good faith, No notice.*',
    hint: 'CBVGN — 5 requisites. HIDC takes free from personal defenses, not real defenses. Shelter rule.',
    tags: ['HIDC', 'NIL', 'Sec-52', 'negotiable-instruments', 'defenses'],
  },
  {
    id: 'com-exp-004', subject: 'commercial-law', topic: 'partnership', difficulty: 'medium',
    front: 'How is a GENERAL PARTNERSHIP distinguished from a LIMITED PARTNERSHIP?',
    back: '| Feature | General Partnership | Limited Partnership |\n|---|---|---|\n| Liability | All partners: UNLIMITED, solidary | General partners: unlimited; Limited: only to contribution |\n| Management | All may manage | Only general partners manage |\n| Registration | Not required (Art. 1771) | REQUIRED — certificate filed with SEC |\n| Dissolution | Death/incapacity of a general partner dissolves | Death of limited partner does NOT dissolve |\n| Capital contribution | Money, property, industry | NO industry (services) contribution for limited partners |\n\n**Key rule on liability:** A general partner\'s liability to third persons is UNLIMITED and SOLIDARY — personal assets are at risk.\n\n*Industrial partner* = contributes services, not capital. Cannot engage in business for himself without consent (*Art. 1789*).\n\n*Immovable property contributed to partnership must be in a PUBLIC INSTRUMENT (Art. 1771) for validity.*',
    hint: 'General = all unlimited liability. Limited = limited partners only liable for contribution, cannot manage.',
    tags: ['partnership', 'general', 'limited', 'Art-1771', 'liability'],
  },
  {
    id: 'com-exp-005', subject: 'commercial-law', topic: 'securities', difficulty: 'hard',
    front: 'What is INSIDER TRADING under the Securities Regulation Code (RA 8799)?',
    back: '**Insider Trading (Sec. 27, RA 8799):**\n\nAn **insider** is prohibited from trading securities of a corporation while in possession of **material non-public information** about the corporation.\n\n**Who is an insider?**\n• Corporate officers and directors\n• Employees with access to inside information\n• Substantial security holders (owning more than 10%)\n• Government regulators with access to inside information\n• Any person who received inside info from an insider (tippee)\n\n**Material information** = information that would likely affect the price of the security if made public\n\n**Non-public** = not generally available to the investing public\n\n**Elements of the offense:**\n1. Trading in securities\n2. Possession of material non-public information\n3. Non-disclosure to the investing public\n\n*Defense: Information was already public. Trading policy existed before information obtained.*',
    hint: 'Insider + material non-public info + trading = illegal. Tippees also liable. RA 8799, Sec. 27.',
    tags: ['insider-trading', 'RA-8799', 'SRC', 'Sec-27', 'material-information'],
  },
]

export const taxationExpansion = [
  {
    id: 'tax-exp-001', subject: 'taxation-law', topic: 'income-tax', difficulty: 'hard',
    front: 'What is the MINIMUM CORPORATE INCOME TAX (MCIT) and when does it apply?',
    back: '**MCIT (Sec. 27[E], NIRC as amended by CREATE Act):**\n\n**Rate:** **1%** of gross income (TEMPORARILY — CREATE Act reduced to 1% from 2023; will revert to 2% in 2027)\n\n**When it applies:**\n• Beginning on the 4th year following the year in which the corporation commenced business\n• Imposed when MCIT is GREATER than the regular corporate income tax (RCIT)\n• Compare MCIT vs. RCIT — pay whichever is HIGHER\n\n**Gross income** for MCIT = gross sales/revenues MINUS cost of goods sold/services\n\n**Relief from MCIT:**\n• BIR may suspend MCIT if the corporation suffered losses from:\n  - Prolonged labor dispute\n  - Force majeure\n  - Legitimate business reversal\n\n*Excess MCIT over regular income tax may be **carried forward** for the next 3 years.*',
    hint: 'MCIT = 1% of gross income (CREATE). Starts year 4. Applied when HIGHER than regular 25% tax. Excess carries forward 3 years.',
    tags: ['MCIT', 'corporate-income-tax', 'CREATE', 'NIRC', 'Sec-27'],
  },
  {
    id: 'tax-exp-002', subject: 'taxation-law', topic: 'vat', difficulty: 'medium',
    front: 'Who are VAT-EXEMPT persons and transactions under the NIRC?',
    back: '**VAT Exempt Persons (Sec. 109, NIRC):**\n\nKey exempt transactions:\n1. **Agricultural products** in original state (unprocessed)\n2. **Medical/dental/hospital services** (but not those rendered by professionals)\n3. **Educational services** by gov\'t accredited institutions\n4. **Residential dwellings** with selling price ≤ ₱3,199,200 (indexed)\n5. **Export sales** — zero-rated (not exempt; different treatment)\n6. **Cooperatives** — sales of agricultural products by cooperatives\n7. **Books, newspapers, magazines** (educational)\n8. **Power generation** — electricity generated by renewable energy\n9. **Importation of goods** by persons with diplomatic immunity\n10. **Persons who gross ≤ ₱3,000,000/year** — exempt from VAT (subject to percentage tax instead)\n\n*Zero-rated vs. Exempt: Zero-rated = subject to VAT at 0% (input tax creditable). Exempt = not subject to VAT at all (no input tax credit).*',
    hint: 'NIRC Sec. 109 — key exemptions: agricultural, medical, educational, residential ≤₱3.2M, ₱3M threshold persons.',
    tags: ['VAT', 'exempt', 'Sec-109', 'NIRC', 'zero-rated'],
  },
  {
    id: 'tax-exp-003', subject: 'taxation-law', topic: 'estate-tax', difficulty: 'medium',
    front: 'What is the ESTATE TAX rate under TRAIN Law and what are the key deductions?',
    back: '**Estate Tax (RA 10963 — TRAIN Law, Sec. 84 NIRC):**\n\n**Rate:** Flat **6%** of net estate (TRAIN simplified from graduated to flat rate)\n\n**Key Deductions (Sec. 86):**\n1. **Standard deduction:** ₱5,000,000 (no documents needed)\n2. **Family home:** up to ₱10,000,000 (if used as family home)\n3. **Amount received under RA 4917** (retirement benefits from GSIS, SSS, etc.)\n4. **Funeral expenses** — now subsumed in standard deduction under TRAIN\n5. **Judicial/admin expenses** — included in standard deduction\n\n**Gross estate includes:**\n• All property wherever situated if decedent was a resident or citizen\n• Only Philippine property if non-resident alien\n\n**Filing and payment:** Within 1 year from date of death. BIR can extend to 30 days (for meritorious reasons).\n\n*TRAIN simplification: The 6% flat rate replaced the complex progressive rates. Standard deduction of ₱5M is a huge simplification.*',
    hint: 'TRAIN: 6% flat estate tax. Standard deduction ₱5M. Family home up to ₱10M. File within 1 year of death.',
    tags: ['estate-tax', 'TRAIN', 'RA-10963', 'Sec-84', 'NIRC', 'standard-deduction'],
  },
  {
    id: 'tax-exp-004', subject: 'taxation-law', topic: 'tax-remedies', difficulty: 'hard',
    front: 'Trace the PROTEST PROCEDURE for a disputed BIR assessment.',
    back: '**BIR Assessment Dispute Process:**\n\n1. **BIR issues Final Assessment Notice (FAN)**\n   ↓\n2. **Taxpayer protests within 30 days** from receipt of FAN\n   • File Request for Reconsideration (no new evidence) OR\n   • File Request for Reinvestigation (with new/additional evidence)\n   ↓\n3. **BIR has 180 days** to resolve the protest from filing\n   ↓\n4. **If BIR decides adverse or no decision after 180 days:**\n   • Taxpayer has **30 days** to appeal to the **Court of Tax Appeals (CTA)**\n   ↓\n5. **CTA Division** hears the case\n   ↓\n6. **CTA En Banc** — motion for reconsideration/new trial\n   ↓\n7. **Supreme Court** — petition for review under Rule 45\n\n*Critical deadlines: 30 days to protest FAN + 30 days to appeal from CTA-adverse decision (180-day period).*',
    hint: 'FAN → 30 days protest → BIR 180 days → 30 days to CTA → CTA en banc → SC. Every deadline is critical.',
    tags: ['tax-assessment', 'protest', 'BIR', 'CTA', 'FAN', '180-days', '30-days'],
  },
]

export const laborExpansion = [
  {
    id: 'lab-exp-001', subject: 'labor-law', topic: 'two-notice-rule', difficulty: 'medium',
    front: 'Explain the TWO-NOTICE RULE in employee dismissal. What are the contents of each notice?',
    back: '**Two-Notice Rule (Procedural Due Process in Dismissal):**\n\n**FIRST NOTICE — Notice to Explain (NTE):**\n• Must specify the specific acts/omissions alleged\n• Must inform employee of grounds for dismissal\n• Must give employee at least **5 calendar days** to explain\n• Must be in writing\n\n**[Opportunity to be Heard — Conference/Hearing]**\n• Employee may explain verbally or in writing\n\n**SECOND NOTICE — Notice of Decision:**\n• Informs employee of the employer\'s decision\n• Must state clearly the reason for dismissal\n• Must be based on the hearing/NTE process\n\n**Effect of non-compliance:**\n• If dismissal has JUST CAUSE but no procedural due process → valid dismissal BUT employer pays **nominal damages**\n  - Just cause: **₱30,000** (*Agabon doctrine*)\n  - Authorized cause: **₱50,000** (*JAKA Food doctrine*)\n• If neither substantive nor procedural due process → ILLEGAL DISMISSAL',
    hint: 'NTE (5-day reply period) → Hearing → Notice of Decision. No procedure = nominal damages ₱30K/₱50K (Agabon/JAKA).',
    tags: ['two-notice-rule', 'dismissal', 'procedural-due-process', 'Agabon', 'JAKA'],
  },
  {
    id: 'lab-exp-002', subject: 'labor-law', topic: 'wages', difficulty: 'medium',
    front: 'What is the WAGE ORDER system? Who sets minimum wages and how?',
    back: '**Regional Wage Board System (RA 6727 — Wage Rationalization Act):**\n\n**Who sets minimum wages:**\n• **Regional Tripartite Wages and Productivity Boards (RTWPB)** — one per region\n• Composed of: government, employers, workers representatives\n\n**Procedure:**\n1. RTWPB initiates wage review or receives petition\n2. Mandatory public hearings\n3. RTWPB issues Wage Order\n4. Wage Order submitted to National Wages and Productivity Commission (NWPC) for review\n5. If no action by NWPC within 10 days → deemed approved\n\n**Key wage rules:**\n• No wage distortion may result (salaries must maintain proper differentials)\n• Non-diminution of benefits rule: Established practice/policy cannot be withdrawn\n• CBA wage rates > minimum wage: CBA prevails\n• 13th month pay (PD 851): all employers, paid before December 24\n\n*Wage distortion: Elimination/severe contraction of intentional differences between wage/salary rates — negotiable or arbitrable.*',
    hint: 'RTWPB sets minimum wages per region. Wage Order process. Wage distortion = arbitrable. Non-diminution rule.',
    tags: ['wage-order', 'RTWPB', 'RA-6727', 'minimum-wage', 'wage-distortion'],
  },
  {
    id: 'lab-exp-003', subject: 'labor-law', topic: 'strikes', difficulty: 'hard',
    front: 'What are the requisites for a VALID STRIKE? What makes a strike ILLEGAL?',
    back: '**Valid Strike Requisites (Art. 278-279, Labor Code; DO 40-03):**\n\n1. **Filed by legitimate labor organization** (certified bargaining agent)\n2. **Notice of strike filed** with NCMB at least:\n   • **30 days** for bargaining deadlock\n   • **15 days** for ULP\n3. **Strike vote** — majority of union membership votes to strike (secret ballot)\n4. **Strike vote results submitted to NCMB** at least 7 days before strike\n5. **Cooling-off period observed** (30 days for deadlock; 15 days for ULP)\n6. **Strike is not in violation** of any injunction or assumption of jurisdiction order\n\n**Grounds for ILLEGAL STRIKE:**\n• Violation of cooling-off period\n• No strike vote or vote not properly done\n• Strike in violation of injunction\n• Strike in an industry **indispensable to national interest** (without SOLE/DOLE assumption)\n• Violence, coercion, obstruction by strikers\n\n*Illegal strike: Union officers lose employment. Rank-and-file who participated but without illegal acts — employer may not dismiss.*',
    hint: '30 days (deadlock) / 15 days (ULP) notice. Strike vote. 7-day submission. Cooling off. Violation = illegal strike.',
    tags: ['strike', 'labor-dispute', 'Art-278', 'cooling-off', 'NCMB', 'strike-vote'],
  },
]

export const ethicsExpansion = [
  {
    id: 'eth-exp-001', subject: 'legal-ethics', topic: 'CPR', difficulty: 'medium',
    front: 'What are the DUTIES OF A LAWYER under the Code of Professional Responsibility (CPR)? Enumerate the four primary duties.',
    back: '**Four Primary Duties of a Lawyer (CPR Preamble):**\n\n1. **To society** — uphold laws, social welfare, legal order\n2. **To the legal profession** — maintain its dignity and integrity\n3. **To courts** — candor, fairness, good faith toward tribunals\n4. **To clients** — fidelity, competence, diligence in service\n\n**Canon structure:**\n• Canons 1-6: Duties to Society\n• Canons 7-9: Duties to Legal Profession\n• Canons 10-13: Duties to Courts\n• Canons 14-22: Duties to Client\n\n*When these duties conflict: SOCIETY > COURTS > CLIENT*\n\n*The lawyer\'s first duty is to the COURTS and to justice — not just to the client. A lawyer cannot do whatever the client wants if it violates ethical duties.*\n\n*New Code of Professional Responsibility and Accountability (CPRA, 2023) has updated the structure.*',
    hint: 'Society → Legal Profession → Courts → Client. When conflicts: Society/Courts > Client.',
    tags: ['CPR', 'duties', 'lawyer', 'Canon', 'society', 'client'],
  },
  {
    id: 'eth-exp-002', subject: 'legal-ethics', topic: 'disbarment', difficulty: 'hard',
    front: 'What are the GROUNDS FOR DISBARMENT under Sec. 27, Rule 138?',
    back: '**Grounds for Disbarment or Suspension (Rule 138, Sec. 27):**\n\n1. **Deceit**\n2. **Malpractice** or other gross misconduct in office\n3. **Grossly immoral conduct**\n4. **Conviction of crime** involving moral turpitude\n5. **Violation of oath**\n6. **Willful disobedience** of lawful order of superior court\n7. **Willful appearance** as attorney without authority\n8. **Solicitation** of cases through agents, brokers, or middlemen\n\n*Note: Disbarment is not a PUNISHMENT but a PROTECTION of the public and the profession.*\n\n*SC has exclusive jurisdiction over disbarment — cannot be delegated.*\n\n*Pardon does NOT automatically restore the right to practice law. Must separately petition SC.*\n\n*Prescription: Disciplinary proceedings against lawyers do NOT prescribe.*',
    hint: 'D-M-G-C-V-D-W-S — 8 grounds. SC exclusive jurisdiction. No prescription. Pardon ≠ automatic reinstatement.',
    tags: ['disbarment', 'Rule-138', 'Sec-27', 'grounds', 'moral-turpitude'],
  },
  {
    id: 'eth-exp-003', subject: 'legal-ethics', topic: 'conflict-of-interest', difficulty: 'hard',
    front: 'What is the CONFLICT OF INTEREST rule for lawyers? When does it arise?',
    back: '**CPR Canon 15, Rule 15.03 — Conflict of Interest:**\n\n"A lawyer shall not represent conflicting interests except by written consent of all concerned given after a full disclosure of the facts."\n\n**Tests for conflict of interest:**\n\n1. **Substantial Relation Test:** Whether a substantial relationship exists between the current representation and the previous case (similar issues, same parties, related subject matter)\n\n2. **Adverse Interest Test:** Whether acceptance of the new case would require the lawyer to use confidential information obtained from the former client\n\n3. **Divided Loyalty Test:** Whether the lawyer\'s representation of one client would limit his ability to fully represent another\n\n**Note:** The conflict may be **waived** by ALL clients in writing, with full disclosure.\n\n*Successive representation is also covered — lawyer cannot represent adverse interest against former client in substantially related matter.*',
    hint: 'Conflict = prior client vs. current client vs. lawyer. Three tests. Can be waived by written consent. Covers successive clients too.',
    tags: ['conflict-of-interest', 'Canon-15', 'Rule-15.03', 'CPR', 'loyalty'],
  },
  {
    id: 'eth-exp-004', subject: 'legal-ethics', topic: 'notarial-practice', difficulty: 'medium',
    front: 'What are the basic duties of a NOTARY PUBLIC under the 2004 Rules on Notarial Practice?',
    back: '**Key Duties under 2004 Rules on Notarial Practice:**\n\n1. **Personal appearance** — signatory MUST personally appear before the notary at the time of notarization\n2. **Competent evidence of identity** — for persons not personally known to notary (valid ID, at least one credible witness)\n3. **Notarial register** — maintain a chronological record of all notarial acts\n4. **Certificate of notarial act** — must contain statutory information\n5. **No notarization of incomplete instruments**\n6. **No notarization of documents where notary has personal interest** (except for notary\'s own instruments)\n\n**Who may be a notary:**\n• Member of the Philippine Bar in good standing\n• Commission issued by Executive Judge of RTC\n\n**Common violations leading to discipline:**\n• Notarizing without personal appearance of signatory\n• Notarizing blank/incomplete instruments\n• Notarizing where the notary is a party to the instrument',
    hint: 'Personal appearance is MANDATORY. Competent evidence of identity. Notarial register. No blanks. No personal interest (except own docs).',
    tags: ['notarial-practice', '2004-Rules', 'notary-public', 'personal-appearance'],
  },
]
