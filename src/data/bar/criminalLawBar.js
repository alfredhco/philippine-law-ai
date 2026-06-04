export const criminalMCQ = [
  {
    id: 'crim-mcq-001', subject: 'criminal-law', topic: 'stages', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A aimed his gun at B and fired. The bullet missed because B dodged. A was arrested. What crime did A commit?',
    choices: [
      'Attempted homicide, because all acts of execution were performed.',
      'Frustrated homicide, because the felony was not produced.',
      'Attempted homicide, because A did not perform all acts of execution (the bullet missed).',
      'Illegal discharge of firearm, not homicide.',
    ],
    correctAnswer: 0,
    explanation: 'This is ATTEMPTED HOMICIDE. The key: A fired the gun at B with intent to kill — this IS performing "all acts of execution." The distinction between attempted and frustrated is not whether the bullet hit, but whether ALL acts were done. In homicide, the "last act" is when the wound is inflicted that would mortally wound the victim. Since B was not hit at all, the crime is ATTEMPTED (not frustrated). For frustrated homicide, the victim must be hit and the wound would normally cause death but for medical intervention or other fortuitous circumstances. Since B dodged (completely missed), all acts were NOT completed — ATTEMPTED.',
    taglishExplanation: 'Tricky ito! Ang totoong test: **Naperform ba niya lahat ng acts of execution?** Sa homicide, ang "last act" ay ang pag-inflict ng wound na maaring makahilo/makapatay. Dahil hindi naman natamaan si B — hindi pa na-complete ang lahat ng acts. Kaya: **ATTEMPTED**, hindi frustrated. Sa frustrated, na-hit at na-wound ang victim — yung healing lang ang nagpaligtas. Sa attempted, hindi pa tumaob sa katawan ng victim ang criminal act.',
    relatedArticle: 'Art. 6 RPC; *People v. Pugay*; distinguish attempted vs. frustrated homicide',
    points: 2,
  },
  {
    id: 'crim-mcq-002', subject: 'criminal-law', topic: 'conspiracy', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A, B, and C agreed to rob a bank. A drove the getaway car. B entered the bank and shot and killed a guard while C grabbed the money. A did not know B would kill anyone. What are the criminal liabilities of A?',
    choices: [
      'A is liable for robbery only; the killing was beyond the conspiracy.',
      'A is liable for robbery with homicide because the conspiracy covered the robbery, and the killing was committed on the occasion thereof.',
      'A is not liable because he only drove the car and did not participate in the killing.',
      'A is liable for robbery only if B\'s killing was not foreseeable.',
    ],
    correctAnswer: 1,
    explanation: 'Art. 294: Robbery with homicide is a SPECIAL COMPLEX CRIME. When a killing occurs "on the occasion of" or "by reason of" robbery, ALL conspirators are liable for robbery with homicide regardless of who did the killing. The conspiracy covered the robbery; the homicide occurred during the robbery. Under the conspiracy doctrine ("act of one is act of all"), A shares liability for all acts done in furtherance of the conspiracy, including killing that occurs during the execution. A cannot escape by claiming he did not anticipate the killing.',
    taglishExplanation: 'Ito ay **robbery with homicide** (Art. 294[1]) — special complex crime! Ang homicide ay naganap "on the occasion of" robbery. Sa conspiracy: "the act of one is the act of all." Lahat ng conspirators ay liable para sa lahat ng acts done in furtherance of the plan — kasama na yung homicide kahit hindi ito plano ni A. Ang tanging defense ni A ay kung naganap ang killing nang **after** ang robbery at **for reasons personal to B** na walang koneksyon sa robbery.',
    relatedArticle: 'Art. 294(1) RPC; Art. 8 (Conspiracy); *People v. Llobera*',
    points: 2,
  },
  {
    id: 'crim-mcq-003', subject: 'criminal-law', topic: 'justifying', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'After disarming X, Y continued to stab X 10 more times while X lay helpless on the ground. Y claims self-defense. Will the defense succeed?',
    choices: [
      'Yes, because Y was initially threatened.',
      'No, because there was no longer any unlawful aggression when Y continued stabbing.',
      'Yes, because once threatened, Y was entitled to neutralize the threat completely.',
      'No, because Y used excessive force from the start.',
    ],
    correctAnswer: 1,
    explanation: 'The fundamental rule in self-defense: UNLAWFUL AGGRESSION MUST BE CONTINUING. Once X was disarmed and helpless on the ground, there was NO MORE UNLAWFUL AGGRESSION. The moment aggression ceased, the right to self-defense also ceased. Continuing to stab X 10 times after disarming him is no longer self-defense — Y became the aggressor. The defense fails completely because the indispensable element (continuing unlawful aggression) was absent during the fatal attacks. Y is liable for homicide/murder.',
    taglishExplanation: 'Classic self-defense trap! Ang unlawful aggression ay dapat **PRESENT AT TIME OF DEFENSE**. Pagkaalis ng aggression (naarmas na, nabuwal na) — tapos na rin ang right of self-defense. Nagsimula si Y bilang defender pero naging aggressor na siya pagkatapos na walang laban si X. "Continuous aggression" ang requirement — hindi pwedeng "once threatened, perpetual right to kill." Ito ang pinaka-common na tinatanong na mali sa bar exams.',
    relatedArticle: 'Art. 11(1) RPC; *People v. Cabungcal*; unlawful aggression must be continuing',
    points: 2,
  },
  {
    id: 'crim-mcq-004', subject: 'criminal-law', topic: 'circumstances', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'A stabbed B in the back suddenly and without warning while B was talking to a friend. B died. What qualifying circumstance elevated the crime to murder?',
    choices: [
      'Evident premeditation, because A planned to kill B.',
      'Treachery, because A employed means ensuring the execution without risk from B\'s defense.',
      'Abuse of superior strength, because A surprised B.',
      'Cruelty, because B suffered from the stab wound.',
    ],
    correctAnswer: 1,
    explanation: 'TREACHERY (alevosia) — Art. 14(16): The offender employs means, methods, or forms that (1) ensure execution without risk to himself from any defense the victim might make; (2) deliberately/consciously adopted. A attacked B from behind, suddenly, while B was unsuspecting and talking to a friend. This satisfies both elements of treachery. Evident premeditation requires proof of (1) time when A decided to kill; (2) act manifesting the decision; (3) sufficient lapse of time to allow reflection — none proven here. Treachery is the qualifying circumstance.',
    taglishExplanation: '**Treachery** ang tama — hindi evident premeditation. Bakit? Ang treachery ay nakatuon sa **paraan ng atake** (sudden, from behind, no warning). Ang evident premeditation ay nakatuon sa **planning bago ang atake** (kailangan ng proof ng time ng decision + acts manifesting it + reflection period). Dito, walang ebidensya ng prior planning — ang proven lang ay ang paraan ng pag-atake. Lesson: Treachery = how you attacked; Evident premeditation = when/how you planned it.',
    relatedArticle: 'Art. 14(16) RPC (Treachery); *People v. Abujan*',
    points: 2,
  },
  {
    id: 'crim-mcq-005', subject: 'criminal-law', topic: 'special-laws', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'Police received a tip and arrested A. They found shabu in A\'s pocket. During marking, only one witness (a barangay official) was present instead of the required three. The RTC convicted A. On appeal, A argues violation of chain of custody. How should the CA rule?',
    choices: [
      'Affirm conviction — the presence of one witness substantially complies.',
      'Acquit A — non-compliance with the three-witness rule is always fatal.',
      'Acquit A unless the prosecution provides a justifiable reason for the absence of the other witnesses and proves the integrity of the evidence was preserved.',
      'Remand to RTC for re-presentation of witnesses.',
    ],
    correctAnswer: 2,
    explanation: 'RA 10640 amended Sec. 21, RA 9165: Requires presence of (1) elected public official AND (2) representative of DOJ or media during inventory. Non-compliance does NOT automatically acquit. The prosecution must: (1) acknowledge the deviation; (2) provide a justifiable reason (e.g., unavailability of witnesses despite earnest efforts); (3) prove the integrity and evidentiary value of the seized items were properly preserved. If the prosecution fails to justify or fails to show preserved integrity — ACQUITTAL. If justified and integrity preserved — CONVICTION upheld.',
    taglishExplanation: 'Chain of custody violation ay hindi automatic acquittal — **conditional** lang! Ang prosecution ay dapat: (1) **acknowledge** ang deviation; (2) magbigay ng **justifiable reason** (halimbawa: hindi makita ang DOJ rep kahit naghanap); at (3) ipakita na **naka-preserve ang integrity** ng evidence. Kung wala ito — acquit. Kung nandoon — conviction valid. Ito ang current rule ng SC pagkatapos ng maraming napalaya dahil sa minor chain of custody issues.',
    relatedArticle: 'RA 9165 Sec. 21 as amended by RA 10640; *People v. Lim*; *People v. Miranda*',
    points: 2,
  },
  {
    id: 'crim-mcq-006', subject: 'criminal-law', topic: 'penalties', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'A was convicted of homicide (reclusion temporal). The court found two mitigating circumstances and no aggravating. Under the Indeterminate Sentence Law, what should the penalty be?',
    choices: [
      'Reclusion temporal minimum — since two mitigating reduce it one degree.',
      'Prision mayor minimum (6 years and 1 day) to reclusion temporal minimum (12 years and 1 day).',
      'Reclusion temporal in its minimum period only.',
      'Prision mayor minimum to prision mayor maximum since two mitigating reduce two degrees.',
    ],
    correctAnswer: 1,
    explanation: 'Two mitigating circumstances with no aggravating: Under Art. 64(5) RPC, the penalty shall be lowered by ONE DEGREE. Homicide penalty: reclusion temporal. One degree lower: prision mayor. Under ISLAW: minimum = within the range of the penalty NEXT LOWER (prision correccional); maximum = proper period of the penalty (prision mayor minimum, since two mitigating = minimum period). The correct sentence: minimum from prision correccional range, maximum at prision mayor minimum. Best answer: prision mayor minimum to reclusion temporal minimum.',
    taglishExplanation: 'ISLAW + RPC penalty math! Two mitigating, no aggravating → **one degree lower** (Art. 64[5]). Homicide = reclusion temporal. One degree lower = prision mayor. Sa ISLAW: Maximum = prision mayor (minimum period dahil may mitigating); Minimum = within the range ng next lower degree (prision correccional). Importante: Ang ISLAW ang nagdidikta ng minimum at maximum na penalty — hindi simpleng "half and half."',
    relatedArticle: 'Art. 64 RPC; Indeterminate Sentence Law (Act 4103); *People v. Bon*',
    points: 2,
  },
  {
    id: 'crim-mcq-007', subject: 'criminal-law', topic: 'felonies', year: 2021,
    difficulty: 'medium', type: 'mcq',
    question: 'A and B got into a fight. A pulled a knife and threatened to "end" B. B grabbed a flower pot and hit A on the head. A suffered a concussion. B claims self-defense. The court found: (1) A\'s threat alone was not physical aggression; (2) B\'s response was disproportionate. What crime did B commit?',
    choices: [
      'Serious physical injuries — no self-defense; action was unprovoked.',
      'Serious physical injuries with incomplete self-defense as mitigating.',
      'No crime — the threat from A constitutes unlawful aggression.',
      'Less serious physical injuries only due to the mitigating circumstance.',
    ],
    correctAnswer: 1,
    explanation: 'Verbal threat alone is generally NOT unlawful aggression — only imminent PHYSICAL attack qualifies. However, if A displayed a knife during the threat, this creates an "imminent threat" scenario. If the court finds INCOMPLETE self-defense (only unlawful aggression is proven, but reasonable necessity is lacking OR slight provocation exists), it becomes a PRIVILEGED MITIGATING circumstance under Art. 13(1). This reduces the penalty by one or two degrees, not merely to the minimum period. B committed serious physical injuries with incomplete self-defense.',
    taglishExplanation: 'Hindi complete ang self-defense → **Incomplete self-defense** (Art. 69) — privileged mitigating! Nandoon ang unlawful aggression (nagpakita ng kutsilyo) pero kulang ang reasonable necessity (disproportionate yung flower pot sa kutsilyo... o baka hindi?). Kung hindi complete ang lahat ng elements, hindi acquittal — pero mas mababa ang penalty. Ito ang "incomplete self-defense" na nagre-reduce ng 1-2 degrees ng penalty.',
    relatedArticle: 'Art. 11(1), 69 RPC; *People v. Alconga*; incomplete self-defense',
    points: 2,
  },
  {
    id: 'crim-mcq-008', subject: 'criminal-law', topic: 'crimes-against-property', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A took B\'s laptop from a coffee shop table while B was in the restroom. A was apprehended by mall security before exiting the coffee shop. The prosecution charged A with consummated theft. A argues the theft was only attempted since he had not left the premises. Rule on the charge.',
    choices: [
      'Attempted theft — A did not gain free dominion over the laptop.',
      'Frustrated theft — A performed all acts but was caught before escaping.',
      'Consummated theft — the crime was complete the moment A gained possession.',
      'Robbery — A used force in taking the laptop.',
    ],
    correctAnswer: 2,
    explanation: 'Under *Valenzuela v. People* (G.R. No. 160188, 2007), the SC definitively ruled: THEFT IS CONSUMMATED THE MOMENT THE THIEF ACQUIRES DOMINION AND CONTROL OVER THE STOLEN PROPERTY. There is NO frustrated stage in theft. The moment A picked up and took possession of the laptop — even before leaving — the theft was consummated. Being caught inside the coffee shop does not negate consummation. The "physical transfer of dominion" test controls, not the "escape" test. Frustrated theft was rejected by the SC.',
    taglishExplanation: '**Valenzuela v. People** — memorize ito! Walang frustrated theft sa Pilipinas. Theft ay **consummated the moment** nakuha ang possession at dominion ng stolen property. Hindi kailangan lumabas o makalusot — basta nasa kamay na ng magnanakaw, consummated na! Ito ang itinuro ng SC noong 2007, binalibaligtad ang mas lumang rulings. Practical test: "May dominion na ba siya?" Kung oo — consummated na.',
    relatedArticle: 'Art. 308, 6 RPC; *Valenzuela v. People*, G.R. 160188 (2007)',
    points: 2,
  },
]

export const criminalEssays = [
  {
    id: 'crim-essay-001', subject: 'criminal-law', topic: 'felonies-self-defense', year: 2023,
    difficulty: 'hard', type: 'essay',
    scenario: `MANILA HOTEL INCIDENT:

During a business dinner at a hotel, a heated argument erupted between Ramon and Carlos over a business deal. Carlos suddenly stood up and threw a punch at Ramon's face. Ramon dodged and grabbed a steak knife from the table and stabbed Carlos twice — once in the shoulder and once in the side. Carlos fell and was rushed to the hospital. He survived but has permanent damage to one lung.

The prosecution charged Ramon with frustrated murder, alleging: (1) treachery because Ramon used a lethal weapon against an unarmed Carlos; (2) evident premeditation because they had argued before.

(a) Did Ramon act in self-defense? Analyze all elements.
(b) Was the crime frustrated murder or another offense? Analyze the proper charge.
(c) Can the qualifying circumstances of treachery and evident premeditation be appreciated?`,
    subQuestions: [
      {
        part: 'a',
        question: 'Did Ramon act in self-defense?',
        points: 15,
        modelAnswer: 'INCOMPLETE SELF-DEFENSE. Element 1 — Unlawful aggression: PRESENT. Carlos threw a punch — this constitutes actual physical aggression against Ramon\'s person. Element 2 — Reasonable necessity: QUESTIONABLE. A punch justifies some form of defensive act, but grabbing a knife and inflicting two stab wounds (one lung damage) may be disproportionate to a punch, though this is fact-specific. Element 3 — Lack of sufficient provocation: Depends on who started the argument. If Ramon provoked the argument, this element fails. The defense is at best INCOMPLETE (privileged mitigating), not complete self-defense.',
        irac: {
          issue: 'Whether Ramon is entitled to complete self-defense or only incomplete self-defense under Art. 11(1) RPC.',
          rule: 'Art. 11(1): Self-defense requires (1) unlawful aggression; (2) reasonable necessity of means; (3) lack of sufficient provocation. Art. 69: Incomplete justifying circumstances = privileged mitigating.',
          application: 'Unlawful aggression (punch) = present. Reasonable necessity (knife vs fist): courts assess proportionality from defender\'s perspective — but two stab wounds for a punch raises questions. Lack of provocation: unclear from facts. At minimum, Element 1 is satisfied. If Elements 2 or 3 fail, result is incomplete self-defense.',
          conclusion: 'Ramon has a colorable complete self-defense claim on Element 1, but Elements 2 and 3 are debatable. Most likely: INCOMPLETE self-defense (privileged mitigating) under Art. 69.',
        },
        taglishExplanation: 'Ang self-defense ni Ramon: (1) Unlawful aggression — YES (suntok ni Carlos). (2) Reasonable necessity — DEBATABLE (saksak ng dalawang beses para sa isang suntok? Masyado bang malayo?). (3) Lack of provocation — depende sa kung sino ang nagsimula ng argumento. Kaya: Posible na INCOMPLETE self-defense lang — hindi complete acquittal. Kung nandoon ang isa o dalawang elements pero kulang ang isa — privileged mitigating, hindi fully exempt.',
      },
      {
        part: 'b',
        question: 'What is the proper criminal charge?',
        points: 15,
        modelAnswer: 'The proper charge is FRUSTRATED HOMICIDE (not frustrated murder). Carlos survived — so the crime is against life, not completed homicide. Since the qualifying circumstances (treachery, evident premeditation) do NOT apply (see part c), the base crime is HOMICIDE. Carlos survived due to medical treatment. Ramon performed all acts that would have caused death (lung damage is life-threatening), and survival was due to factors independent of Ramon. Elements of frustrated homicide: (1) Ramon performed acts to kill; (2) acts would have produced death; (3) did not produce it due to factors independent of Ramon\'s will (medical treatment). Therefore: FRUSTRATED HOMICIDE with incomplete self-defense as privileged mitigating.',
        irac: {
          issue: 'What is the proper charge given that Carlos survived?',
          rule: 'Art. 6: Frustrated stage = all acts performed + felony not produced due to independent causes. Art. 248 (Murder) requires qualifying circumstances. Art. 249 (Homicide) = unlawful killing without qualifying circumstances.',
          application: 'Carlos survived — not consummated. Ramon stabbed twice, including lung — potentially lethal acts. Survival due to medical intervention = independent cause. Qualifying circumstances (treachery, premeditation) absent (see part c). Therefore: FRUSTRATED HOMICIDE.',
          conclusion: 'The proper charge is FRUSTRATED HOMICIDE. If incomplete self-defense is accepted, the penalty is reduced under Art. 69.',
        },
        taglishExplanation: 'Frustrated murder vs. frustrated homicide — ang difference ay ang presence ng qualifying circumstance. Walang treachery, walang evident premeditation (see part c) → **Frustrated Homicide** lang, hindi frustrated murder. Pero frustrated pa rin dahil: (1) ginawa na ni Ramon ang lahat ng acts; (2) buhay pa rin si Carlos dahil sa medical treatment (independent cause). Plus: incomplete self-defense bilang privileged mitigating → mas mababa pa ang penalty.',
      },
      {
        part: 'c',
        question: 'Can treachery and evident premeditation be appreciated as qualifying circumstances?',
        points: 10,
        modelAnswer: 'NO to BOTH. TREACHERY: Requires (1) means ensuring no risk from victim\'s defense; (2) deliberately adopted. Ramon used a knife in response to Carlos\'s attack — this was a REACTIVE act, not a pre-planned mode of attack. There was no deliberate, conscious adoption of means to ensure execution without risk — the victim (Carlos) was the initial aggressor. Treachery cannot be appreciated when the victim is the initial aggressor. EVIDENT PREMEDITATION: Requires (1) time when decision to commit crime was made; (2) act manifesting the decision; (3) sufficient time elapsed for reflection. A spur-of-the-moment argument does not satisfy these elements. No evidence of prior planning or cool reflection. BOTH qualifying circumstances fail.',
        irac: {
          issue: 'Whether treachery and evident premeditation qualify the crime to murder.',
          rule: 'Treachery (Art. 14[16]): means consciously adopted to ensure execution without risk. Evident premeditation: must show time of decision, overt act, and sufficient lapse of reflection time.',
          application: 'Treachery: Reactive stabbing in response to attack ≠ deliberately adopted means without risk. Carlos attacked first — Ramon responded. No treachery. Evident premeditation: No evidence of pre-planned decision, manifesting acts, or cool reflection time. The incident was spontaneous.',
          conclusion: 'Neither treachery nor evident premeditation can be appreciated. The crime is frustrated HOMICIDE, not murder.',
        },
        taglishExplanation: 'Dalawang qualifier — walang isa na valid! **Treachery**: Reactive lang si Ramon — hindi deliberate adoption ng paraan. Ang victim (Carlos) ang nagsimula ng aggression. Hindi pwedeng treacherous kung ang victim mismo ay aggressor. **Evident premeditation**: Walang ebidensya ng prior decision + overt act + reflection time. Spontaneous argument → spontaneous response. Kaya: Frustrated HOMICIDE lang, hindi murder.',
      },
    ],
  },
]

export default { mcq: criminalMCQ, essays: criminalEssays }
