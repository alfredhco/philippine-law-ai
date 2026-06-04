// Commercial, Taxation, Labor, and Legal Ethics cards

export const commercialLawCards = [
  {
    id: 'com-001', subject: 'commercial-law', topic: 'corporation', difficulty: 'medium',
    front: 'What is the BUSINESS JUDGMENT RULE?',
    back: '**Business Judgment Rule:** Courts will not substitute their judgment for that of the Board of Directors in **business decisions** made in good faith.\n\n**Elements for protection:**\n1. Decision was made in **good faith**\n2. Director was **informed** (due care)\n3. Director had **no disqualifying interest** (no conflict)\n\n**Effect:** If all elements present, courts defer to the board — even if the decision turns out to be wrong.\n\n**Exception:** Protection REMOVED if:\n• Bad faith or fraud\n• Gross negligence\n• Self-dealing (conflict of interest)\n• Ultra vires act\n\n*Source: Revised Corporation Code (RA 11232), Sec. 22-23*',
    hint: 'Good faith + informed + no conflict = court defers to board.',
    tags: ['corporation', 'business-judgment-rule', 'RCC', 'board-of-directors'],
  },
  {
    id: 'com-002', subject: 'commercial-law', topic: 'negotiable-instruments', difficulty: 'hard',
    front: 'What are the requisites of a NEGOTIABLE INSTRUMENT under the NIL?',
    back: '**NIL (Act 2031), Sec. 1 — WOUPS:**\n\n1. **W**riting and signed by maker/drawer\n2. **U**nconditional promise or order to pay\n3. **S**um certain in money\n4. **P**ayable on demand OR at a fixed/determinable future time\n5. Payable to **order** or **bearer**\n6. Where addressed to a drawee, must be named or indicated with reasonable **certainty**\n\n*If ANY requirement is missing → NOT negotiable (ordinary contract only).*\n\n**Holder in due course** (HDC): Takes free from personal defenses if:\n• Takes for value\n• In good faith\n• Without notice of dishonor/defect\n• Before maturity',
    hint: 'WOUPS — Writing, Unconditional, Sum certain, Payable, Specific parties.',
    tags: ['negotiable-instruments', 'NIL', 'Act-2031', 'WOUPS'],
  },
  {
    id: 'com-003', subject: 'commercial-law', topic: 'insurance', difficulty: 'medium',
    front: 'What is INSURABLE INTEREST and when must it exist?',
    back: '**Insurable interest** = the person must have a legal or equitable interest in the subject of insurance such that he benefits from its preservation and suffers from its loss.\n\n**Life insurance:** Must exist **at time of procurement**; not required at time of loss.\n*Exception: If assignment — assignee need not have insurable interest.*\n\n**Property insurance:** Must exist **both at time of procurement AND at time of loss**.\n\n**Who has insurable interest in property?**\n• Owner\n• Creditor (in debtor\'s property)\n• Mortgagee\n• Lessee/bailee\n• Trustee\n\n*Without insurable interest: Contract is void as a wagering contract. Public policy prohibits it.*',
    hint: 'Life: at procurement. Property: at procurement AND loss.',
    tags: ['insurance', 'insurable-interest', 'Insurance-Code'],
  },
  {
    id: 'com-004', subject: 'commercial-law', topic: 'partnership', difficulty: 'medium',
    front: 'Distinguish a GENERAL PARTNERSHIP from a LIMITED PARTNERSHIP.',
    back: '| | GENERAL PARTNERSHIP | LIMITED PARTNERSHIP |\n|---|---|---|\n| Liability | All partners: **unlimited** | General partners: unlimited; Limited: **only to capital** |\n| Management | All general partners | Only general partners |\n| Participation | All may participate | Limited partners: **cannot** manage |\n| Registration | Not required but SEC registration needed | SEC registration **required** |\n| Withdrawal | Generally allowed | Limited partners may withdraw per agreement |\n\n**Effect of limited partner participating in management:** Becomes **liable as general partner** to third parties who relied on his acts.\n\n*Civil Code Arts. 1767-1867; governed by RCCP for limited partnerships formed as corporations.*',
    hint: 'General: unlimited liability. Limited: limited to capital contribution.',
    tags: ['partnership', 'general-partnership', 'limited-partnership', 'Civil-Code'],
  },
]

export const taxationLawCards = [
  {
    id: 'tax-001', subject: 'taxation-law', topic: 'general-principles', difficulty: 'medium',
    front: 'What is the SITUS OF TAXATION and how does it apply?',
    back: '**Situs of taxation** = the place where the tax is imposed; where the taxing authority has jurisdiction.\n\n**General rules:**\n• **Personal property** — domicile of owner\n• **Real property** — location of property (*lex situs*)\n• **Income** — where earned (source rule)\n• **Business** — place of business\n• **Succession** — domicile of decedent\n\n**Philippines as source jurisdiction:**\nPhilippines taxes income **from Philippine sources**, whether the taxpayer is a resident or non-resident.\n\n**Resident citizens:** Taxed on **worldwide** income\n**Non-resident aliens/foreign corporations:** Taxed on **Philippines-source income** only\n\n*RA 10963 (TRAIN Law) modified tax brackets; remember updated rates for bar.*',
    hint: 'Where the tax attaches — domicile, source, location.',
    tags: ['general-principles', 'situs', 'NIRC', 'income-tax'],
  },
  {
    id: 'tax-002', subject: 'taxation-law', topic: 'vat', difficulty: 'hard',
    front: 'Who are VAT-REGISTERED PERSONS and what are exempt transactions?',
    back: '**VAT-registered persons (Sec. 109, NIRC):**\n• Engaged in sale/lease of goods/services\n• Gross annual sales/receipts > ₱3,000,000\n\n**VAT rate:** 12% on taxable transactions\n\n**VAT-exempt transactions (key examples):**\n• Sale of agricultural/marine food products in original state\n• Sale of books, newspapers, magazines\n• Medical/dental/hospital services\n• Educational services (accredited)\n• Lease of residential units ≤ ₱15,000/month\n• Sale of house and lot ≤ ₱3.2M (under TRAIN)\n• Exports (zero-rated, not exempt)\n• Transactions of cooperatives\n• Sale of gold to BSP\n\n*Zero-rated vs. Exempt: Zero-rated = taxable at 0% (input VAT creditable). Exempt = not subject to VAT (input VAT not creditable).*',
    hint: 'Zero-rated ≠ exempt. Both affect how input VAT is treated.',
    tags: ['vat', 'NIRC', 'Sec-109', 'zero-rated', 'exempt'],
  },
  {
    id: 'tax-003', subject: 'taxation-law', topic: 'income-tax', difficulty: 'medium',
    front: 'What is the TAX TREATMENT OF FRINGE BENEFITS under TRAIN?',
    back: '**Fringe Benefit Tax (FBT):**\n• Tax on the **employer** (not the employee)\n• Rate: **35%** on grossed-up monetary value\n• Applies to managerial/supervisory employees only\n\n**Grossed-up monetary value formula:**\nGMV = Actual monetary value / (1 - tax rate)\nGMV = AMV / 0.65\n\n**Exempt fringe benefits:**\n• De minimis benefits (per RR 11-2018)\n• Benefits required by nature of business\n• Fringe benefits to **rank-and-file** employees (subject to regular income tax instead)\n• Benefits specifically excluded by law\n\n*De minimis examples: Rice subsidy (₱2,000/month), uniform allowance (₱6,000/year), medical cash allowance (₱250/month)*',
    hint: 'FBT = tax on employer; 35% on grossed-up value; managers/supervisors only.',
    tags: ['income-tax', 'fringe-benefits', 'FBT', 'TRAIN', 'NIRC'],
  },
  {
    id: 'tax-004', subject: 'taxation-law', topic: 'tax-remedies', difficulty: 'hard',
    front: 'What is the PRESCRIPTIVE PERIOD for assessment and collection of taxes?',
    back: '**Assessment (NIRC, Sec. 203):**\n• **Regular period: 3 years** from last day to file return (or actual filing if later)\n• **Fraudulent return/non-filing: 10 years** from discovery\n\n**Collection (NIRC, Sec. 222):**\n• **5 years** from assessment\n• Waiver of period must be in writing, notarized, before expiration\n\n**Suspension of prescriptive period:**\n• Taxpayer files protest within 30 days\n• While request for reinvestigation is pending\n• During tax appeal proceedings\n\n**Waiver of prescriptive period:**\n• Must be in writing\n• Signed by taxpayer AND authorized BIR officer\n• Executed BEFORE the period expires (*CIR v. Kudos Metal*)',
    hint: '3 years regular, 10 years fraud for assessment; 5 years for collection.',
    tags: ['tax-remedies', 'prescription', 'NIRC', 'Sec-203', 'assessment'],
  },
]

export const laborLawCards = [
  {
    id: 'lab-001', subject: 'labor-law', topic: 'termination', difficulty: 'hard',
    front: 'What are the JUST CAUSES for termination under the Labor Code?',
    back: '**Art. 297 (formerly 282) — Just causes (employee fault):**\n\n1. **Serious misconduct** or willful disobedience of lawful orders\n2. **Gross and habitual neglect** of duties\n3. **Fraud or willful breach of trust** (loss of confidence) — managerial employees\n4. **Commission of a crime** or offense against employer or family\n5. **Other causes analogous** to the foregoing\n\n**Two-notice rule:**\n1. Notice of Intent to Dismiss (with specific charges) → employee has 5 days to explain\n2. Notice of Decision to Dismiss\n\n**Plus: Opportunity to be heard** (hearing or written explanation).\n\n*Violation of two-notice rule = dismissal valid but employer pays **nominal damages** (Agabon doctrine).*',
    hint: 'SMG-FC-A — Serious misconduct, Gross neglect, Fraud/breach, Crime, Analogous.',
    tags: ['termination', 'just-causes', 'Art-297', 'two-notice-rule', 'Agabon'],
  },
  {
    id: 'lab-002', subject: 'labor-law', topic: 'termination', difficulty: 'medium',
    front: 'What are AUTHORIZED CAUSES for termination and what is required?',
    back: '**Art. 298-299 (formerly 283-284) — Authorized causes (business/health reasons):**\n\n**Art. 298:**\n1. **Installation of labor-saving devices**\n2. **Redundancy** — position is in excess of what the enterprise requires\n3. **Retrenchment** — reduce losses; losses must be substantial, serious, actual\n4. **Closure/cessation** of business\n\n**Art. 299:**\n5. **Disease** — employee has incurable disease; continued employment prejudicial to health of co-workers\n\n**Requirements:**\n• Written **notice to DOLE** and the employee at least **30 days** before effectivity\n• Payment of **separation pay:**\n  → Redundancy/installation/closure: **1 month per year** of service\n  → Retrenchment/disease: **½ month per year** of service',
    hint: 'IRDCD — 30-day notice + separation pay.',
    tags: ['termination', 'authorized-causes', 'Art-298', 'separation-pay'],
  },
  {
    id: 'lab-003', subject: 'labor-law', topic: 'labor-standards', difficulty: 'medium',
    front: 'What are the REQUISITES for OVERTIME pay?',
    back: '**Overtime pay = 25% premium on regular wage**\n\n**Requisites:**\n1. Work is performed **beyond 8 hours** in a day\n2. Work is performed at the **employer\'s request or with employer\'s knowledge**\n\n**Overtime rates:**\n• Regular day: Plus **25%** of hourly rate\n• Rest day/Holiday: Plus **30%** of rest day/holiday rate\n\n**CANNOT waive overtime:**\nEmployer cannot compel waiver of overtime pay — any agreement waiving it is void (Labor Code, Art. 6).\n\n**Excluded from overtime:**\n• Managerial employees (no fixed hours)\n• Field personnel with unsupervised work\n• Members of employer\'s family dependent on him\n• Domestic workers (*kasambahay*)',
    hint: 'Beyond 8 hours + employer request/knowledge = 25% premium.',
    tags: ['labor-standards', 'overtime', 'Art-87', 'wages'],
  },
]

export const legalEthicsCards = [
  {
    id: 'eth-001', subject: 'legal-ethics', topic: 'CPRA', difficulty: 'medium',
    front: 'What are the FOUR CANONS of the Code of Professional Responsibility and Accountability (CPRA 2023)?',
    back: '**CPRA (A.M. No. 22-09-01-SC, effective April 2023)**\n\nFour canons:\n1. **Independence** — Maintain independence of the legal profession\n2. **Competence and Diligence** — Discharge duties with competence, diligence, and skill\n3. **Professional Responsibility** — Conduct befitting a member of the legal profession\n4. **Accountability** — Be accountable to clients, the courts, the profession, and society\n\n*The CPRA replaced the old Code of Professional Responsibility (CPR) which had 3 canons.*\n\n*Key addition: CPRA now expressly covers **online/digital conduct**, **sexual harassment**, and **lateral hiring/moonlighting** rules.*',
    hint: 'ICPA — Independence, Competence, Professional responsibility, Accountability.',
    tags: ['CPRA', 'canons', 'legal-ethics', 'CPRA-2023'],
  },
  {
    id: 'eth-002', subject: 'legal-ethics', topic: 'disbarment', difficulty: 'hard',
    front: 'What is the NATURE of DISBARMENT proceedings?',
    back: '**Disbarment is sui generis** — it is NOT a criminal or civil proceeding.\n\n**Key characteristics:**\n1. **Disciplinary proceeding** — its purpose is to protect the public and the courts, NOT to punish the lawyer\n2. **Not penal in nature** — double jeopardy does NOT apply\n3. **Rules of evidence apply liberally** — standard is substantial evidence\n4. **SC has exclusive jurisdiction** over disbarment and suspension\n5. **Prescription does NOT apply** to disbarment cases\n6. **Complainant may withdraw** but SC may still proceed\n7. **Death of respondent** does NOT moot the proceedings (*Bueno v. Raneses*)\n\n**Grounds:** Any violation of the Lawyer\'s Oath, CPR/CPRA, Rules of Court, or acts involving moral turpitude.\n\n*SC can motu proprio disbar a lawyer.*',
    hint: 'Sui generis — not criminal, not civil. SC exclusive jurisdiction.',
    tags: ['disbarment', 'disciplinary', 'SC-jurisdiction', 'sui-generis'],
  },
  {
    id: 'eth-003', subject: 'legal-ethics', topic: 'client-relations', difficulty: 'medium',
    front: 'What are the exceptions to ATTORNEY-CLIENT PRIVILEGE?',
    back: '**Attorney-client privilege** protects confidential communications between lawyer and client.\n\n**Exceptions — lawyer MAY/MUST disclose:**\n1. **Future crime or fraud** — client seeks advice to commit a future crime (not past)\n2. **To prevent substantial bodily harm** (in some jurisdictions)\n3. **To collect fees** — may disclose enough to establish claim\n4. **Self-defense** — to defend against client\'s accusations\n5. **Waiver by client** — client may waive the privilege\n6. **Crime-fraud exception** — communication made to further a crime\n\n**NOT privileged:**\n• Identity of the client (generally)\n• Fee arrangements\n• Physical evidence of crime (must be turned over)\n• Communications not made in confidence\n\n*The privilege belongs to the CLIENT, not the lawyer. Only the client can waive it.*',
    hint: 'Future crime/fraud, self-defense, client waiver — key exceptions.',
    tags: ['client-relations', 'attorney-client-privilege', 'confidentiality', 'CPRA'],
  },
]
