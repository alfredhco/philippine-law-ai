export const taxationMCQ = [
  {
    id: 'tax-mcq-001', subject: 'taxation-law', topic: 'income-tax', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A resident alien worked in the Philippines for a US company earning $80,000/year. The company pays his salary from the US. Is his income subject to Philippine income tax?',
    choices: [
      'No — foreign-sourced income of resident aliens is exempt from Philippine tax.',
      'Yes — resident aliens are taxed on income from all sources within and without the Philippines.',
      'No — because his employer is a foreign company.',
      'Yes — but only on income sourced within the Philippines.',
    ],
    correctAnswer: 3,
    explanation: 'Under the NIRC (Sec. 23): A RESIDENT ALIEN is taxable on income derived from SOURCES WITHIN THE PHILIPPINES only. This is territorial taxation. A non-resident alien engaged in trade or business is also taxed only on Philippine-source income. Only RESIDENT CITIZENS and DOMESTIC CORPORATIONS are taxed on worldwide income. The key question: Is the $80,000 salary sourced in the Philippines? Services rendered in the Philippines = Philippine-source income (Sec. 42[A][3]). Even if paid from the US, services performed in the PH = PH-source income. The resident alien IS taxable on his salary.',
    taglishExplanation: 'Tax situs rules! **Resident alien** = taxed on **Philippine-source income ONLY** — hindi worldwide (unlike citizen). Pero ang suweldo para sa trabahong ginagawa SA PILIPINAS = Philippine-source income kahit mula US na binabayaran. Sec. 42(A)(3): Services rendered in PH = PH-source. Kaya taxable pa rin si resident alien sa kanyang suweldo — ang tanong lang ay kung saan ginagawa ang trabaho, hindi kung saan galing ang bayad.',
    relatedArticle: 'Sec. 23, 24, 42(A)(3) NIRC; Situs of income from services; Resident alien taxation',
    points: 2,
  },
  {
    id: 'tax-mcq-002', subject: 'taxation-law', topic: 'vat', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'XYZ Corp. imported goods from Japan worth ₱5M. It also sold goods domestically for ₱8M. Output VAT from domestic sales = ₱960K. Input VAT from imports = ₱600K. What is XYZ\'s VAT payable?',
    choices: [
      '₱360,000 — output VAT minus input VAT.',
      '₱960,000 — output VAT is the tax due without crediting input VAT on imports.',
      '₱1,560,000 — the sum of all VAT incurred.',
      '₱960,000 — input VAT on imports is not creditable.',
    ],
    correctAnswer: 0,
    explanation: 'Under the NIRC VAT system: VAT PAYABLE = OUTPUT VAT − INPUT VAT. OUTPUT VAT is the 12% VAT on domestic sales = ₱8M × 12% = ₱960,000. INPUT VAT on imports is CREDITABLE against output VAT. The 12% VAT paid on importation = ₱5M × 12% = ₱600,000 input VAT. VAT Payable = ₱960,000 − ₱600,000 = ₱360,000. Input VAT on imports is creditable as part of the credit-invoice method. The tax credit system prevents cascading taxation.',
    taglishExplanation: '**VAT = Output VAT − Input VAT**. Simple formula! Output VAT: ₱8M domestic sales × 12% = ₱960,000. Input VAT: ₱5M imports × 12% = ₱600,000. VAT payable = ₱960K − ₱600K = **₱360,000**. Ang input VAT sa imports ay creditable — iyan ang layunin ng credit-invoice method ng VAT para hindi mag-cascade ang buwis sa bawat level ng supply chain.',
    relatedArticle: 'Sec. 105-112 NIRC; VAT credit-invoice method; creditable input taxes',
    points: 2,
  },
  {
    id: 'tax-mcq-003', subject: 'taxation-law', topic: 'estate-tax', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'T died testate. His estate consists of: house and lot ₱3M, bank deposits ₱1M, shares of stock ₱500K, car ₱300K. Total gross estate = ₱4.8M. Under TRAIN Law, what is the applicable standard deduction and the taxable net estate?',
    choices: [
      'Standard deduction ₱1M; taxable net estate ₱3.8M.',
      'Standard deduction ₱5M; taxable net estate ₱0 (fully covered).',
      'Standard deduction ₱500K; taxable net estate ₱4.3M.',
      'No standard deduction under TRAIN Law; full ₱4.8M is taxable.',
    ],
    correctAnswer: 1,
    explanation: 'The TRAIN Law (RA 10963) amended the estate tax: The STANDARD DEDUCTION was increased to ₱5,000,000 (₱5M). This applies to both resident and non-resident decedents (for citizens and resident aliens). Gross estate = ₱4.8M. Standard deduction = ₱5M. Net taxable estate = ₱4.8M − ₱5M = NEGATIVE (zero). Since the standard deduction (₱5M) EXCEEDS the gross estate (₱4.8M), the taxable net estate is ZERO. No estate tax is due. The estate is fully covered by the standard deduction.',
    taglishExplanation: '**TRAIN Law** ay nagtaas ng standard deduction sa estate tax mula ₱1M patungong **₱5M**! Gross estate ni T = ₱4.8M. Standard deduction = ₱5M. Net taxable estate = ₱4.8M − ₱5M = **ZERO** (negative, so zero). Walang estate tax na babayaran! Ito ang epekto ng pagtaas ng standard deduction ng TRAIN — mas maraming maliit na estate ang na-exempt na sa estate tax.',
    relatedArticle: 'Sec. 86 NIRC as amended by RA 10963 (TRAIN Law); Standard deduction in estate tax',
    points: 2,
  },
  {
    id: 'tax-mcq-004', subject: 'taxation-law', topic: 'tax-remedies', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'The BIR assessed XYZ Corp. for deficiency income tax on March 1, 2021 for taxable year 2018. XYZ protested on April 15, 2021. The BIR denied the protest on October 1, 2021. XYZ filed a Petition for Review with the CTA on January 5, 2022. Is the petition timely?',
    choices: [
      'Yes — the 30-day period runs from the date XYZ received the denial.',
      'No — the petition should have been filed within 30 days from the BIR\'s denial on October 1, 2021.',
      'Yes — the 30-day period was tolled during the BIR proceedings.',
      'No — the CTA has no jurisdiction over income tax assessments.',
    ],
    correctAnswer: 1,
    explanation: 'Under Sec. 228 NIRC and RA 1125 (as amended): After filing a protest, if the BIR denies the protest or fails to act within 180 days, the taxpayer has 30 DAYS from the date of receipt of the adverse decision to file a Petition for Review with the CTA Division. The BIR denied on October 1, 2021. XYZ filed on January 5, 2022 — more than 30 days after the October 1 denial. Even assuming receipt was a few days after October 1, the 30-day period would have expired before January 5, 2022. The petition is LATE and the CTA has no jurisdiction.',
    taglishExplanation: '**30-day rule** pagkatapos ng BIR denial! Sec. 228 NIRC: Pagkatapos i-deny ng BIR ang protest (Oct. 1, 2021), mayroon kang **30 days** para mag-petition sa CTA. Ang January 5, 2022 ay halos 3 buwan pagkatapos ng denial — late na! Ang deadline ay halos November 1, 2021. Kaya: No jurisdiction ang CTA — time-barred ang appeal. Lesson: Track ang 30-day deadline nang mabuti pagkatapos ng BIR denial.',
    relatedArticle: 'Sec. 228 NIRC; RA 1125 Sec. 11; CTA jurisdiction; 30-day appeal period',
    points: 2,
  },
  {
    id: 'tax-mcq-005', subject: 'taxation-law', topic: 'local-taxes', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'Quezon City imposed a business tax on a real estate developer\'s gross receipts from selling lots. The developer argues only the national government may tax real estate transactions. Is the city\'s tax valid?',
    choices: [
      'Invalid — real estate transactions are exclusively taxable by the national government under the NIRC.',
      'Valid — the LGC grants LGUs the power to impose taxes on businesses within their territory, including real estate businesses.',
      'Invalid — LGUs can only tax real property, not business transactions involving real property.',
      'Valid — local taxes are always valid unless Congress expressly withdraws the power.',
    ],
    correctAnswer: 1,
    explanation: 'Under the Local Government Code (RA 7160), Sec. 143: LGUs may impose a LOCAL BUSINESS TAX on businesses operating within their jurisdiction — including real estate developers. This is a TAX ON THE BUSINESS ACTIVITY (gross receipts from selling lots) — NOT a tax on the real estate transaction itself (which would be the documentary stamp tax or capital gains tax). The distinction: National taxes (capital gains tax, DST) cover the TRANSACTION; LGU business tax covers the BUSINESS ACTIVITY/PRIVILEGE. Both may coexist without double taxation in the constitutional sense.',
    taglishExplanation: 'Dalawang magkaibang buwis! **National taxes**: Capital gains tax, DST — buwis sa transaksyon ng real estate. **Local business tax** (LGC Sec. 143): Buwis sa pribilehiyo ng negosyo ng real estate developer — hindi sa transaksyon per se. Pwedeng mag-exist nang sabay ang dalawa — hindi double taxation dahil magkaiba ang subject. Kaya valid ang local business tax ng Quezon City.',
    relatedArticle: 'Sec. 143 RA 7160 (LGC); Local business taxes; *Nursery Care Corp. v. Acosta*',
    points: 2,
  },
  {
    id: 'tax-mcq-006', subject: 'taxation-law', topic: 'income-tax', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A professional earned ₱800,000 in professional fees in 2023. He opted for the 8% flat tax on gross income. He has ₱200,000 in business expenses. What is his income tax due?',
    choices: [
      '₱64,000 — 8% of gross income ₱800,000.',
      '₱48,000 — 8% of net income (₱800,000 − ₱200,000 = ₱600,000).',
      '₱64,000 less the ₱250,000 annual exemption = ₱44,000.',
      '8% of (₱800,000 − ₱250,000 exemption) = ₱44,000.',
    ],
    correctAnswer: 3,
    explanation: 'Under the TRAIN Law, Sec. 24(A)(2)(b): Self-employed and professionals may opt for the 8% FLAT TAX on GROSS SALES/RECEIPTS in excess of the ₱250,000 annual exemption. Formula: 8% × (Gross Income − ₱250,000). The 8% option applies to GROSS income — no deductions for expenses. But the ₱250,000 exemption is deducted. Tax = 8% × (₱800,000 − ₱250,000) = 8% × ₱550,000 = ₱44,000. Business expenses are NOT deductible under the 8% option — that\'s the trade-off for the simplicity of the flat rate.',
    taglishExplanation: '**8% flat tax option** (TRAIN Law): Gross income less ₱250,000 exemption × 8%. Walang deductible na expenses — iyon ang trade-off ng simplicity ng flat rate. Formula: 8% × (₱800,000 − ₱250,000) = 8% × ₱550,000 = **₱44,000**. Kung gusto niyang mag-deduct ng ₱200,000 na expenses — kailangan pumili ng graduated rates (at mag-file ng itemized/OSD deductions). Sa 8% option: walang expense deduction, may ₱250K exemption lang.',
    relatedArticle: 'Sec. 24(A)(2)(b) NIRC as amended by TRAIN; 8% flat tax for self-employed',
    points: 2,
  },
  {
    id: 'tax-mcq-007', subject: 'taxation-law', topic: 'transfer-taxes', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A donated a parcel of land (FMV ₱2M) to his son B. A retained the right to use the land for his lifetime. What is the taxable value of the donation for donor\'s tax purposes?',
    choices: [
      '₱2,000,000 — the full FMV of the donated property.',
      'The value of the remainder interest (FMV minus the value of usufruct retained by A).',
      '₱0 — donation to a child is exempt under the Family Code.',
      '₱2,000,000 but with a ₱250,000 annual exemption deducted.',
    ],
    correctAnswer: 1,
    explanation: 'When a donor RETAINS A USUFRUCT or life estate over donated property, the donation is NOT of the full fee simple. The TAXABLE GIFT is the value of the REMAINDER INTEREST — what B will actually receive free and clear of the usufruct. The donor\'s tax is computed on the FMV of the donated interest, which equals: FMV of property MINUS the value of the retained usufruct (computed using actuarial life expectancy tables). A donated only the "naked ownership" — not the full value. The BIR uses life tables to compute the value of the retained life estate/usufruct.',
    taglishExplanation: 'Kapag nagtanggal ng usufruct ang donor — hindi buong FMV ang taxable! Ang donasyon ay ng **naked ownership** lang (remainder interest). Taxable amount = FMV − Value ng retained usufruct. Ang value ng usufruct ay computed gamit ang life expectancy tables ng BIR. So kung si A ay may matagal pang mabubuhay — mataas ang value ng usufruct niya → mas mababa ang taxable gift. Ang donor\'s tax ay sa actual value ng naibigay, hindi sa theoretical full value ng property.',
    relatedArticle: 'Sec. 100-101 NIRC; Donor\'s tax; valuation of gifts with retained interests',
    points: 2,
  },
  {
    id: 'tax-mcq-008', subject: 'taxation-law', topic: 'tax-remedies', year: 2021,
    difficulty: 'hard', type: 'mcq',
    question: 'The BIR issued a Formal Letter of Demand (FLD/FAN) to ABC Corp. for ₱5M in deficiency taxes. ABC Corp. received it on March 1, 2023. ABC filed its protest on March 31, 2023 (30 days later). Is the protest timely?',
    choices: [
      'No — the protest must be filed within 30 days from issuance, not receipt.',
      'Yes — the 30-day protest period runs from the date of RECEIPT of the FLD/FAN.',
      'No — the protest should have been filed within 15 days for deficiency exceeding ₱1M.',
      'Yes — but only if the protest includes a request for reinvestigation.',
    ],
    correctAnswer: 1,
    explanation: 'Under Sec. 228 NIRC: Upon receipt of a Formal Letter of Demand/Formal Assessment Notice (FLD/FAN), the taxpayer has 30 DAYS FROM DATE OF RECEIPT to file a written protest (either request for reconsideration or reinvestigation). The period runs from RECEIPT — not issuance or mailing. ABC received the FLD on March 1, 2023 and filed on March 31, 2023 — exactly 30 days from receipt. The protest is TIMELY. If ABC fails to file within 30 days, the assessment becomes FINAL, EXECUTORY, and DEMANDABLE.',
    taglishExplanation: '**30 days from RECEIPT** ng FLD/FAN — hindi mula issuance o mailing! ABC natanggap: March 1, nag-file: March 31 = exactly 30 days. **TIMELY**! Kung hindi mag-protest sa loob ng 30 days — ang assessment ay nagiging final at hindi na maaaring i-dispute. Ito ang isa sa pinaka-strict na deadline sa tax law — kailangang i-monitor nang mabuti ang petsa ng receipt ng mga assessment.',
    relatedArticle: 'Sec. 228 NIRC; Rev. Regs. 12-99; 30-day protest period from receipt of FAN',
    points: 2,
  },
]

export const taxationEssays = [
  {
    id: 'tax-essay-001', subject: 'taxation-law', topic: 'income-tax-exemptions', year: 2022,
    difficulty: 'hard', type: 'essay',
    scenario: `THE DIGITAL NOMAD AND THE BIR:

Pedro, a Filipino citizen, left the Philippines in January 2022 to live and work in Germany. He works remotely as a freelance software developer for a US company, earning $150,000/year. His clients are all based in the US and EU — none in the Philippines. He maintains a condominium in Makati that he rents out for ₱30,000/month. He visited the Philippines for 45 days in December 2022 for the holidays.

For taxable year 2022, the BIR issued him a notice of assessment claiming he owes Philippine income tax on all his foreign income.

(a) Is Pedro a resident citizen or non-resident citizen for tax purposes in 2022? What is the significance?
(b) Are Pedro's freelance earnings from foreign clients subject to Philippine tax?
(c) Is Pedro's rental income from his Makati condo subject to Philippine tax?`,
    subQuestions: [
      {
        part: 'a',
        question: 'Is Pedro a resident or non-resident citizen in 2022?',
        points: 10,
        modelAnswer: 'Pedro is a NON-RESIDENT CITIZEN for 2022. Under the NIRC (Sec. 22[E]): A "non-resident citizen" is a Filipino citizen who establishes residence abroad during the taxable year. Pedro left in January 2022 to live and work in Germany — he established his residence abroad. The fact that he visited for 45 days does not re-establish Philippine residency. The SIGNIFICANCE: A non-resident citizen is taxed ONLY on income derived from SOURCES WITHIN THE PHILIPPINES — NOT on worldwide income (unlike resident citizens). This distinction is critical to his tax liability.',
        irac: {
          issue: 'Whether Pedro qualifies as non-resident citizen and the tax consequences thereof.',
          rule: 'Sec. 22(E) NIRC: Non-resident citizen = Filipino who establishes residence abroad. Sec. 23(B): Non-resident citizens taxed only on Philippine-source income.',
          application: 'Pedro left in January 2022 and established residence in Germany. 45-day visit does not re-establish PH residency. He is a non-resident citizen. As such, only Philippine-source income is taxable.',
          conclusion: 'Pedro is a non-resident citizen in 2022 — taxable only on Philippine-source income.',
        },
        taglishExplanation: 'Ang susi ay ang **non-resident citizen** status! Umalis si Pedro at nagtayo ng residence sa Germany → non-resident citizen. Ang 45-day visit ay hindi nagbabalik ng residency. Significance: **Non-resident citizen = taxed sa Philippine-source income ONLY**. Hindi katulad ng resident citizen na worldwide income ang taxable. Kaya ang BIR assessment sa lahat ng foreign income niya ay **mali** kung non-resident citizen siya.',
      },
      {
        part: 'b',
        question: 'Are Pedro\'s freelance earnings from US/EU clients taxable in the Philippines?',
        points: 10,
        modelAnswer: 'NO. Pedro\'s freelance earnings are NOT subject to Philippine income tax. As a non-resident citizen, Pedro is taxed only on Philippine-source income (Sec. 23[B] NIRC). The SOURCE of income from services is determined by WHERE the services are PERFORMED (Sec. 42[A][3]). Pedro\'s services were rendered from Germany — not the Philippines. Even if the clients are US-based and payments come from the US, the SITUS of the service income is where Pedro physically performs the work (Germany). German-sourced service income = foreign-source income = NOT taxable in the Philippines for a non-resident citizen.',
        irac: {
          issue: 'Whether income from services rendered abroad to foreign clients is Philippine-source income.',
          rule: 'Sec. 23(B): Non-resident citizen taxed only on PH-source income. Sec. 42(A)(3): Source of compensation/service income = place where services are rendered.',
          application: 'Pedro rendered all services from Germany. Clients are US/EU-based. Services performed outside PH = foreign-source income. As non-resident citizen, Pedro is not taxable on foreign-source income.',
          conclusion: 'Pedro\'s freelance earnings are foreign-source income, not subject to Philippine income tax.',
        },
        taglishExplanation: 'Situs of service income = **kung saan ginawa ang serbisyo**. Si Pedro ay nag-trabaho sa Germany — German-source income ito. Bilang non-resident citizen, taxable lang siya sa PH-source income. Ang freelance earnings niya = **foreign-source** = **hindi taxable sa Pilipinas**. Ang BIR assessment sa foreign income niya ay walang basehan.',
      },
      {
        part: 'c',
        question: 'Is the rental income from Pedro\'s Makati condo subject to Philippine tax?',
        points: 10,
        modelAnswer: 'YES. The rental income from the Makati condominium IS subject to Philippine income tax. Under Sec. 42(A)(4): Income from RENTALS of REAL PROPERTY situated in the Philippines is Philippine-SOURCE income. Even as a non-resident citizen, Pedro is taxable on Philippine-source income. The condo is located in the Philippines (Makati) — the rental income is Philippine-source. Pedro must file a Philippine income tax return for his rental income. The applicable rate for non-resident citizens on passive income from the Philippines is the regular graduated rate or the 20% final withholding tax on passive income, depending on the specific nature.',
        irac: {
          issue: 'Whether rental income from Philippine real property is taxable to a non-resident citizen.',
          rule: 'Sec. 42(A)(4): Income from real property situated in PH = Philippine-source income. Sec. 23(B): Non-resident citizens taxed on PH-source income.',
          application: 'The condo is situated in Makati, Philippines. Rental income from PH real property = PH-source income. Non-resident citizen Pedro is taxable on PH-source income.',
          conclusion: 'The ₱30,000/month rental income is subject to Philippine income tax as Philippine-source income.',
        },
        taglishExplanation: 'Kahit non-resident citizen si Pedro — ang income mula sa **real property sa Pilipinas** ay taxable sa Pilipinas! Sec. 42(A)(4): Income from real property situated in PH = **Philippine-source income**. Ang kanyang Makati condo ay nasa Pilipinas kaya ang ₱30,000/month rental = taxable. Pedro ay kailangang mag-file ng Philippine income tax return para sa rental income niya — kahit nasa Germany siya.',
      },
    ],
  },
]

export default { mcq: taxationMCQ, essays: taxationEssays }
