export const politicalMCQ = [
  {
    id: 'pol-mcq-001', subject: 'political-law', topic: 'bill-of-rights', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'Police arrested A without a warrant based on a text message tip from an informant. A was found to have drugs on him. The RTC convicted A. On appeal, A argues the arrest was illegal. The CA should rule:',
    choices: [
      'The arrest was valid — police may act on informant tips for drug cases.',
      'The arrest was invalid but the conviction stands because A was caught in flagrante delicto.',
      'The arrest was invalid; the evidence is inadmissible; A must be acquitted.',
      'The arrest was invalid but A waived objection by not raising it before arraignment.',
    ],
    correctAnswer: 3,
    explanation: 'The arrest was warrantless and invalid — a text message tip alone does not establish in flagrante delicto (the crime must be committed in the officer\'s presence). HOWEVER, under the Rules of Court and SC jurisprudence: Any objection to the legality of arrest must be raised BEFORE ARRAIGNMENT via a motion to quash the information. Failure to do so constitutes WAIVER of the objection to illegal arrest. Post-arraignment, A cannot anymore challenge the validity of the arrest. The conviction may stand if other evidence (the drugs) are independently admissible.',
    taglishExplanation: 'Ito ang **waiver rule** ng illegal arrest! Kahit invalid ang arrest, dapat i-raise ang objection **BAGO mag-arraignment** — motion to quash. Kung nag-arraign na si A nang walang objection — **WAIVED** na niya ang kanyang right na mag-question ng illegal arrest. Pero pansinin: Ang waiver ay para sa **legality of arrest** lang — hindi awtomatikong nag-waive ng objection sa admissibility ng illegally obtained evidence. Kaya importante ang tamang timing ng mga objections.',
    relatedArticle: 'Rule 112-113 Rules of Court; *People v. Racho*; Waiver of illegal arrest',
    points: 2,
  },
  {
    id: 'pol-mcq-002', subject: 'political-law', topic: 'equal-protection', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'Congress passed a law taxing only fast food restaurants with more than 100 branches at a higher rate than other food establishments. A fast food chain challenges this as violating equal protection. Which standard of review applies?',
    choices: [
      'Strict scrutiny, because the law discriminates based on business type.',
      'Intermediate scrutiny, because the law affects commercial enterprises.',
      'Rational basis test, because this is an economic/tax regulation.',
      'No review — the law is a valid exercise of police power beyond judicial review.',
    ],
    correctAnswer: 2,
    explanation: 'Equal protection analysis for economic/tax legislation uses the RATIONAL BASIS TEST (lowest tier). The law need only be RATIONALLY RELATED to a LEGITIMATE GOVERNMENT INTEREST. Strict scrutiny is reserved for suspect classifications (race, religion, nationality) or fundamental rights. Intermediate scrutiny is for gender and quasi-suspect classifications. Economic regulations — including tax laws — get rational basis review. The government\'s interest (e.g., regulating large food chains for health/revenue reasons) likely survives rational basis unless the classification is wholly arbitrary.',
    taglishExplanation: 'Tatlong levels ng equal protection review: (1) **Strict scrutiny** — suspect classifications (race, religion, nationality, fundamental rights); (2) **Intermediate scrutiny** — gender, quasi-suspect; (3) **Rational basis** — lahat ng iba, kasama ang economic at tax laws. Dito, economic regulation ito (restaurant tax) → **rational basis** lang. Mas madaling i-uphold dahil ang requirement ay "rational relation to legitimate interest" lang — hindi compelling interest.',
    relatedArticle: 'Art. III Sec. 1; *Ichong v. Hernandez*; *Tolentino v. Secretary of Finance*',
    points: 2,
  },
  {
    id: 'pol-mcq-003', subject: 'political-law', topic: 'judicial-review', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'President Y issued EO 123 abolishing the Department of Agriculture (DA). Congress has not passed any law authorizing this. Farmers\' groups challenge EO 123. What is the likely ruling of the Supreme Court?',
    choices: [
      'EO 123 is valid as an exercise of the President\'s general executive power.',
      'EO 123 is void because only Congress can abolish departments created by statute.',
      'EO 123 is valid if the President determines there is a reorganization necessity.',
      'The Court will not rule — this is a political question within the executive\'s power.',
    ],
    correctAnswer: 1,
    explanation: 'DEPARTMENTS are created by STATUTE (Congress). What Congress creates, only Congress can abolish. The President\'s power to reorganize extends only to offices WITHIN the executive branch that the President created or that are under the Office of the President. Abolishing a Cabinet department created by law requires an ACT OF CONGRESS. EO 123 would be an unconstitutional usurpation of legislative power. This is a justiciable question (not a political question) under the expanded certiorari jurisdiction of the SC.',
    taglishExplanation: 'Simpleng rule: **"What Congress creates, only Congress can abolish."** Ang Departments ng gobyerno ay gawa ng batas ng Kongreso — hindi decree ng Presidente. Ang presidential reorganization power ay limitado sa mga opisina na **nasa ilalim ng executive** na hindi gawa ng Kongreso. EO 123 = unconstitutional usurpation of legislative power. At hindi political question ito — ang SC ay may jurisdiction na i-review ito under expanded certiorari (Art. VIII Sec. 1).',
    relatedArticle: 'Art. VI, VII Const.; *Buklod ng Kawaning EIIB v. Zamora*; *Malaria Employees v. Exec. Secretary*',
    points: 2,
  },
  {
    id: 'pol-mcq-004', subject: 'political-law', topic: 'bill-of-rights', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'Police officers validly arrested A and searched his person, finding a gun. In A\'s car parked nearby, they also conducted a search and found explosives. A was not in the car at the time. Is the search of the car valid?',
    choices: [
      'Yes — the car was within the area of A\'s immediate control at time of arrest.',
      'No — A was not in the car; the search incident to arrest extends only to the person and immediate surroundings at time of arrest.',
      'Yes — vehicles may always be searched without a warrant.',
      'Yes — the plain view doctrine applies since the car was in a public place.',
    ],
    correctAnswer: 1,
    explanation: 'SEARCH INCIDENT TO LAWFUL ARREST (SILA) is limited in scope: (1) the person of the arrestee; (2) the area within his "immediate control" (lunging distance) at the TIME of arrest. Since A was not in the car when arrested, and the car was "parked nearby" (not within immediate control), the SILA doctrine does NOT extend to the parked car. A separate warrant was needed for the car, OR another exception must apply (consent, plain view, etc.). The search of the car was INVALID.',
    taglishExplanation: 'Ang **search incident to lawful arrest** (SILA) ay limitado lang sa: (1) katawan ng arrested; (2) area within **immediate control** — "arm\'s length" o "lunging distance" sa oras ng arrest. Ang kotse na nakapark sa malapit ay hindi "immediate control" kung hindi naman naroroon si A nang ika-aresto. Walang ibang exception na applicable dito → **invalid ang search** ng kotse. Kahit nakapark sa malapit, kailangan ng hiwalay na warrant.',
    relatedArticle: 'Art. III Sec. 2; *Chimel v. California* (US doctrine adopted); *People v. Damaso*',
    points: 2,
  },
  {
    id: 'pol-mcq-005', subject: 'political-law', topic: 'separation-of-powers', year: 2021,
    difficulty: 'hard', type: 'mcq',
    question: 'Congress passed a law creating a "Congressional Oversight Committee" with power to nullify any executive implementing rule that Congress finds inconsistent with the law\'s intent. Is this constitutional?',
    choices: [
      'Yes — Congress has oversight power over all executive agencies.',
      'No — this gives Congress veto power over executive action, violating separation of powers.',
      'Yes — the Committee only exercises a legislative function in interpreting the law.',
      'No — only the Supreme Court can review executive acts.',
    ],
    correctAnswer: 1,
    explanation: 'The "legislative veto" over executive implementing rules is UNCONSTITUTIONAL. The SC in *Abakada Guro v. Ermita* struck down provisions allowing a Congressional Oversight Committee to review and effectively veto TRAIN Law implementing rules. Rationale: After a law is enacted and signed, it passes from the legislative to the executive for implementation. Congressional oversight is informational/investigatory — not decision-making power over executive action. Allowing Congress to nullify IRRs violates the principle of separation of powers. Only COURTS can nullify executive acts for being contrary to law.',
    taglishExplanation: 'Ang "legislative veto" ay **unconstitutional**! Pagkatapos ma-pass at ma-sign ang batas, wala nang legislative power si Congress sa implementation — executive na ang nag-aasikaso. Ang oversight ng Congress ay informational lang (investigation, hearings) — hindi decision-making na may power na mag-nullify ng executive acts. Tanging courts lang ang pwedeng mag-nullify ng executive IRRs na contrary to law. *Abakada Guro v. Ermita* ang landmark case dito.',
    relatedArticle: '*Abakada Guro Party List v. Ermita*, G.R. 168056 (2005); Separation of powers',
    points: 2,
  },
  {
    id: 'pol-mcq-006', subject: 'political-law', topic: 'local-government', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A municipality passed an ordinance imposing a fee on all cellphones within its territory. Telecom companies challenged this as an invalid exercise of LGU taxing power. How should the court rule?',
    choices: [
      'Valid — LGUs have broad taxing power under the Local Government Code.',
      'Invalid — cellphones are personal property of private individuals and LGUs cannot tax personal property.',
      'Invalid — the national government has exclusive jurisdiction over telecommunications under the Public Telecommunications Policy Act.',
      'Invalid — an LGU cannot impose a tax that is already a subject of national taxation, unless expressly authorized.',
    ],
    correctAnswer: 2,
    explanation: 'Telecommunications is a franchise subject regulated by the national government under RA 7925 (Public Telecommunications Policy Act) and the NTC. The national government has EXCLUSIVE jurisdiction over telecommunications infrastructure, operations, and taxation. LGUs may exercise taxing power under the LGC but CANNOT tax subjects that the national government has exclusive authority over or that are expressly exempted. A "fee on cellphones" invades national telecommunications regulation. Also, LGUs cannot impose tax on personal property of private individuals under Sec. 133(i) LGC.',
    taglishExplanation: 'Dalawang grounds bakit invalid ang ordinance: (1) **Telco regulation** ay exclusive ng national government (RA 7925, NTC); (2) **Sec. 133(i) LGC** — hindi pwedeng mag-impose ng tax ang LGU sa personal property ng private individuals (ibang-iba sa real property). LGU taxing power ay malawak pero may limitasyon — hindi pwedeng mag-overlap sa exclusive national jurisdiction at may expressly prohibited na subjects.',
    relatedArticle: 'Sec. 133 LGC; RA 7925; Art. X Const.; LGU taxing power limitations',
    points: 2,
  },
  {
    id: 'pol-mcq-007', subject: 'political-law', topic: 'constitutional-commissions', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'The Ombudsman filed charges against Senator X for graft in the Sandiganbayan. X claims the Ombudsman has no jurisdiction over members of Congress. Rule on X\'s claim.',
    choices: [
      'Correct — Congress is a co-equal branch; only Congress can discipline its members.',
      'Incorrect — the Ombudsman has jurisdiction over all public officials including senators.',
      'Correct — senators are disciplined only by the Senate through expulsion.',
      'Incorrect — but only for acts done in official capacity, not private acts.',
    ],
    correctAnswer: 1,
    explanation: 'The Ombudsman has jurisdiction over ALL PUBLIC OFFICIALS including senators, regardless of rank. Art. XI, Sec. 13: The Ombudsman investigates any act/omission of any public official that appears to be illegal, unjust, improper, or inefficient. For criminal charges, the Ombudsman files the case with the Sandiganbayan. The Senate\'s power to discipline its members (Art. VI, Sec. 16[3]) is for LEGISLATIVE MISCONDUCT — expulsion, suspension, censure for breaches of Senate rules. CRIMINAL LIABILITY for graft is within the Ombudsman\'s and Sandiganbayan\'s jurisdiction.',
    taglishExplanation: 'Important distinction: **Senate discipline power** (Art. VI Sec. 16[3]) = para sa legislative misconduct (breach of Senate rules, disorderly behavior). **Ombudsman/Sandiganbayan** = para sa criminal acts ng public officials (graft, corruption). Dalawang magkaibang forum! Hindi sinasabi ng Constitution na immune ang senators sa criminal prosecution — nagsasabi lang na may power ang Senate na mag-discipline ng sarili nitong members para sa legislative violations. Mali si Senator X.',
    relatedArticle: 'Art. XI Sec. 13; Art. VI Sec. 16(3); RA 3019; *Defensor-Santiago v. Sandiganbayan*',
    points: 2,
  },
  {
    id: 'pol-mcq-008', subject: 'political-law', topic: 'administrative-law', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A contractor\'s license was revoked by the PCAB (Philippine Contractors Accreditation Board) without a hearing. The contractor filed a petition for certiorari directly with the Court of Appeals. PCAB moved to dismiss for failure to exhaust administrative remedies. Should the CA dismiss?',
    choices: [
      'Yes — the contractor must exhaust PCAB\'s internal remedies first.',
      'No — the contractor may go directly to court because the denial of hearing is a due process violation.',
      'Yes — the CA has no original jurisdiction over PCAB decisions.',
      'No — administrative remedies are optional in all cases.',
    ],
    correctAnswer: 1,
    explanation: 'The exhaustion of administrative remedies doctrine has an exception: when the administrative action is PATENTLY ILLEGAL or VIOLATES DUE PROCESS. Revoking a license without a hearing is a VIOLATION OF PROCEDURAL DUE PROCESS — a fundamental constitutional right. This is one of the recognized exceptions to the exhaustion doctrine. The contractor may go directly to court without exhausting administrative remedies when the agency\'s act is void for due process violation. The CA should NOT dismiss.',
    taglishExplanation: 'Ang exhaustion doctrine ay may mga exceptions — at isa sa pinakamahalaga ay ang **due process violation**! Kapag pinagkaitan ng hearing ang isang party — bago man pa man mag-decide ang agency — pwede nang pumunta directo sa court. Wala kang obligasyon na "exhaust" ang administrative remedies ng isang agency na mismo ang lumabag ng iyong constitutional right. Ito ang prinsipyo: Bakit ka pa mag-exhaust sa agency na violated naman ang due process mo?',
    relatedArticle: 'Art. III Sec. 1; *Vda. de Tan v. Veterans Backpay Commission*; Exhaustion exceptions',
    points: 2,
  },
]

export const politicalEssays = [
  {
    id: 'pol-essay-001', subject: 'political-law', topic: 'bill-of-rights-due-process', year: 2023,
    difficulty: 'hard', type: 'essay',
    scenario: `BASILAN SCENARIO:

In response to reports of drug activity, the Mayor of Basilan City issued Executive Order No. 01 ordering: (1) all residents in Barangay Sunrise to submit to warrantless house-to-house searches by police; (2) any person found with "suspected drug paraphernalia" — as determined by the searching officer — be immediately arrested and detained for 72 hours pending investigation; and (3) any resident who refuses to allow entry shall be fined ₱5,000 and imprisoned for 5 days.

A group of residents filed a petition with the RTC challenging EO 01 as unconstitutional.

(a) Is the warrantless house-to-house search under EO 01 valid? Explain.
(b) Is the 72-hour detention without charge constitutional? Explain.
(c) Is the penalty for refusing house searches valid?`,
    subQuestions: [
      {
        part: 'a',
        question: 'Is the warrantless house-to-house search valid?',
        points: 15,
        modelAnswer: 'The warrantless house-to-house search under EO 01 is UNCONSTITUTIONAL. Art. III, Sec. 2 guarantees the right of the people to be secure in their homes against unreasonable searches. A valid search requires (1) a JUDICIALLY ISSUED SEARCH WARRANT based on (2) PROBABLE CAUSE. EO 01 has no provision for judicial determination of probable cause — the Mayor cannot authorize mass warrantless searches by executive fiat. None of the valid warrantless search exceptions apply (the searches are not incident to arrest, not consensual, not plain view, etc.). The ordinance is void for violating the constitutional right against unreasonable searches.',
        irac: {
          issue: 'Whether the Mayor\'s EO authorizing mass warrantless house searches violates Art. III, Sec. 2 of the 1987 Constitution.',
          rule: 'Art. III, Sec. 2: The right to be secure in persons, houses, papers, and effects against unreasonable searches shall be inviolable. No search warrant shall issue except upon probable cause determined personally by a judge.',
          application: 'EO 01 authorizes blanket, warrantless, house-to-house searches without individual judicial determination of probable cause. This violates the constitutional requirement of a judicial warrant. No exception to the warrant requirement applies (not incident to lawful arrest; not consensual; not checkpoints; not plain view). An executive officer — even a Mayor — cannot override constitutional search requirements.',
          conclusion: 'EO 01\'s search provision is void as it violates Art. III, Sec. 2. All evidence obtained through these searches would be inadmissible under the exclusionary rule (Art. III, Sec. 3[2]).',
        },
        taglishExplanation: 'Mayor cannot override constitutional rights by EO! Ang **Art. III Sec. 2** ay nagsasabi na kailangan ng **search warrant** mula sa JUDGE — hindi mula sa Mayor. Walang mass search na pwede nang walang individualized probable cause determination. Kahit pa may drug problem ang barangay — ang sagot ay mag-file ng individual warrants para sa suspected houses, hindi blanket authorization. At kahit ma-execute ang search: **exclusionary rule** — inadmissible lahat ng evidence!',
      },
      {
        part: 'b',
        question: 'Is the 72-hour detention without charge constitutional?',
        points: 15,
        modelAnswer: 'The 72-hour detention is UNCONSTITUTIONAL. Art. III, Sec. 3[2]: The right against deprivation of liberty without due process. The RPC (Art. 125) and the Rules of Court require that after a warrantless arrest, the arrested person must be charged or released within: (1) 12 hours for light offenses; (2) 18 hours for less grave; (3) 36 hours for grave offenses. Detention beyond these periods without charges constitutes arbitrary detention (Art. 124-125 RPC). The EO\'s 72-hour detention is beyond the maximum allowed 36 hours even for grave offenses. Moreover, "suspected drug paraphernalia" determined by a searching officer is too vague — it does not constitute adequate grounds for arrest. The detained persons were denied due process.',
        irac: {
          issue: 'Whether 72-hour detention without charge based solely on an officer\'s determination of "suspected" paraphernalia violates the right to liberty and due process.',
          rule: 'Art. III Sec. 1 (due process); Art. 125 RPC: Maximum detention without charge is 36 hours for grave offenses. Art. III Sec. 14: Presumption of innocence.',
          application: '72 hours exceeds the maximum 36-hour detention period under Art. 125 RPC. Furthermore, "suspected drug paraphernalia" is vague — no objective standard. The arresting officer\'s subjective determination is insufficient basis for arrest and detention. This constitutes arbitrary detention (Art. 124 RPC).',
          conclusion: 'The 72-hour detention provision is void as it violates Art. 125 RPC and the constitutional right to liberty under due process. Any police officer enforcing this is liable for arbitrary detention.',
        },
        taglishExplanation: 'Ang maximum detention nang walang charges ay: 12h (light), 18h (less grave), **36h (grave)**. Ang 72 hours = doble ng maximum para sa pinaka-malubhang krimen! Plus: "suspected drug paraphernalia as determined by searching officer" — napaka-vague! Walang objectivity, walang probable cause. Kaya: (1) Unconstitutional ang 72-hour detention; (2) Ang police na mag-enforce ay maaaring charged ng **arbitrary detention** (Art. 124 RPC).',
      },
      {
        part: 'c',
        question: 'Is the penalty for refusing house searches valid?',
        points: 10,
        modelAnswer: 'The penalty for refusing house searches is INVALID for two reasons: (1) The underlying house-to-house search itself is unconstitutional — a person CANNOT be penalized for exercising their constitutional right to refuse an unconstitutional search. Art. III, Sec. 2 gives citizens the right to require a search warrant. Refusing an illegal, warrantless search is the lawful exercise of a constitutional right — it cannot be made a criminal act. (2) The Mayor has no power to create penal ordinances for refusing police entry during warrantless searches. This would effectively punish the exercise of a constitutional right. The penalty provision is void ab initio.',
        irac: {
          issue: 'Whether residents can be punished for refusing to allow unconstitutional warrantless searches.',
          rule: 'Art. III Sec. 2: Right against unreasonable searches. Residents have a constitutional RIGHT to refuse entry without a warrant. Punishing the exercise of a constitutional right is void.',
          application: 'The search itself being unconstitutional, refusing it is constitutionally protected. Penalizing the exercise of a constitutional right violates Art. III. Furthermore, an LGU cannot criminalize constitutionally protected conduct.',
          conclusion: 'The penalty provision is void — it punishes constitutionally protected conduct. Citizens may validly refuse warrantless searches without penalty.',
        },
        taglishExplanation: 'Pwede ba kang parusahan sa pag-exercise ng iyong constitutional right? **HINDI!** Ang pagtatanggi sa warrantless search ay hindi krimen — ito ay ang pag-exercise ng iyong Art. III Sec. 2 right! Ang EO 01 ay effectively nag-criminalize ng isang constitutional right — void ito. Analogy: Parang parusahan kang dahil nag-invoke ka ng right to remain silent. Bawal ito. Constitutional rights cannot be penalized.',
      },
    ],
  },
]

export default { mcq: politicalMCQ, essays: politicalEssays }
