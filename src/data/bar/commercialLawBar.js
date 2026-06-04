export const commercialMCQ = [
  {
    id: 'com-mcq-001', subject: 'commercial-law', topic: 'corporations', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'The board of directors of XYZ Corp. approved a resolution donating ₱10M of corporate funds to a charity with no business relation to XYZ Corp. Minority stockholder A challenges this as ultra vires. Is A correct?',
    choices: [
      'No — boards have broad discretion to make charitable donations as good corporate governance.',
      'Yes — corporate acts must have a reasonable business purpose; donations to unrelated charities are ultra vires.',
      'No — charitable donations are expressly authorized by the Revised Corporation Code.',
      'Yes — only the stockholders may authorize donations exceeding 10% of net income.',
    ],
    correctAnswer: 2,
    explanation: 'Sec. 41 of the Revised Corporation Code (RA 11232) expressly authorizes corporations to make reasonable donations to: (1) public welfare; (2) hospital, charitable, cultural, scientific, civic, or similar purposes; provided the donation is NOT in aid of a political party or candidate. Corporate charitable donations are EXPRESSLY AUTHORIZED by the RCC — they are NOT ultra vires. The board\'s authority to make reasonable charitable donations does not require stockholder ratification unless it involves a conflict of interest. The minority stockholder\'s challenge fails.',
    taglishExplanation: 'Sa ilalim ng **Revised Corporation Code (RA 11232) Sec. 41** — ang charitable donations ay **expressly authorized**! Hindi ultra vires ang pagdo-donate ng korporasyon sa charitable purposes — part ito ng corporate powers. Limitasyon lang: Hindi dapat sa political candidate o party, at dapat "reasonable." Kaya mali si A na i-challenge ito bilang ultra vires — saklaw ito ng express corporate powers ng RCC.',
    relatedArticle: 'Sec. 41 RA 11232 (Revised Corporation Code); Corporate powers; Ultra vires acts',
    points: 2,
  },
  {
    id: 'com-mcq-002', subject: 'commercial-law', topic: 'negotiable-instruments', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'A check was drawn by X payable to Y or order. Y indorsed it in blank and delivered to Z. Z lost the check. P found it and presented it to the drawee bank. The bank paid P. Can Y recover from the bank?',
    choices: [
      'Yes — the bank was negligent in paying a finder without verifying Y\'s identity.',
      'No — Z\'s blank indorsement converted the check to bearer paper; the bank validly paid the holder.',
      'Yes — only Y as payee has the right to receive payment.',
      'No — Y\'s loss is due to Z\'s negligence in losing the check.',
    ],
    correctAnswer: 1,
    explanation: 'Under the Negotiable Instruments Law (NIL): A BLANK INDORSEMENT (indorsing without specifying the indorsee) converts the instrument into BEARER PAPER (Sec. 34 NIL). Bearer paper is negotiated by DELIVERY ALONE — no further indorsement is needed. Z\'s blank indorsement by Y made the check negotiable by mere delivery. When Z lost it and P found it, P became the holder of a bearer instrument. The drawee bank that pays a HOLDER IN DUE COURSE (or a bearer) in good faith is discharged. The bank validly paid P. Y\'s remedy is against Z for negligently losing the bearer instrument.',
    taglishExplanation: '**Blank indorsement = bearer paper**! Nang in-indorse ni Y in blank, naging bearer instrument na ang check — negotiable by delivery lang. Sinuman ang may hawak ay pwedeng magpresenta. Nang nawala kay Z at nakuha ni P — si P ay nagtataglay ng bearer instrument. Ang bank na nag-pay in good faith sa bearer ay **discharged**. Kaya si Y ay hindi maaaring mangolekta sa bank — sa Z na siya dapat mag-claim dahil sa negligence nito sa pagkawala ng bearer check.',
    relatedArticle: 'Sec. 9, 34, 65 Negotiable Instruments Law; Bearer vs. order instruments',
    points: 2,
  },
  {
    id: 'com-mcq-003', subject: 'commercial-law', topic: 'insurance', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A obtained a life insurance policy naming his wife B as beneficiary. A concealed his pre-existing heart condition from the insurer. A died of a heart attack two years after the policy was issued. The insurer denied B\'s claim based on concealment. B argues the incontestability clause bars the insurer. Who prevails?',
    choices: [
      'Insurer — concealment of a pre-existing condition is always grounds for rescission regardless of incontestability.',
      'B — the incontestability clause bars the insurer from contesting the policy after 2 years.',
      'Insurer — incontestability does not apply to pre-existing conditions known to the insured.',
      'B — the insurer waived the right to contest by accepting premiums for 2 years.',
    ],
    correctAnswer: 1,
    explanation: 'Sec. 48 of the Insurance Code: After a life insurance policy has been in force for TWO YEARS from the date of issue or last reinstatement — the insurer CANNOT contest the policy on grounds of CONCEALMENT or MISREPRESENTATION — except for FRAUD. The INCONTESTABILITY CLAUSE protects beneficiaries from late denials. A died exactly two years after issuance — the policy has been in force for the required period. UNLESS the insurer can prove FRAUDULENT concealment (not mere concealment), B prevails. B is entitled to the proceeds.',
    taglishExplanation: '**Incontestability clause** (Sec. 48 Insurance Code)! Pagkatapos ng **2 taon** mula issue date — hindi na pwedeng i-contest ng insurer ang policy dahil sa concealment o misrepresentation — maliban sa **fraud**. Si A ay namatay pagkatapos ng 2 taon → triggered na ang incontestability. Kung walang proof ng fraud (lang concealment) → si B ay mananalo. Lesson: Ang insurer ay kailangan mag-investigate bago ang 2-year period — hindi pwedeng mag-deny pagkatapos ng 2 taon.',
    relatedArticle: 'Sec. 48 Insurance Code; Incontestability clause; *Philamlife v. CA*',
    points: 2,
  },
  {
    id: 'com-mcq-004', subject: 'commercial-law', topic: 'corporations', year: 2022,
    difficulty: 'hard', type: 'mcq',
    question: 'ABC Corp. is 99% owned by XYZ Corp. ABC was used by XYZ to enter contracts that XYZ could not directly enter due to legal restrictions. ABC has no employees; all operations are handled by XYZ personnel. ABC defaults on a contract. Can the creditor pierce the corporate veil of ABC and hold XYZ liable?',
    choices: [
      'No — corporations are always separate legal entities regardless of ownership.',
      'No — only the shareholders of a corporation, not parent companies, can be held liable.',
      'Yes — the alter ego doctrine allows piercing when the subsidiary is a mere instrumentality of the parent with no separate existence.',
      'Yes — but only for the amount of XYZ\'s investment in ABC.',
    ],
    correctAnswer: 2,
    explanation: 'The ALTER EGO DOCTRINE (Instrumentality Theory) allows piercing the corporate veil when: (1) the parent controls the subsidiary to the extent that the subsidiary has no separate mind, will, or existence — complete domination; (2) such control was used to commit fraud or wrong, or to perpetuate a violation of legal duty; (3) the control and wrong must have proximately caused the injury/loss. Here: ABC has no employees, all operations done by XYZ, and ABC was used to circumvent legal restrictions. All three elements are present — the corporate veil may be pierced and XYZ held liable.',
    taglishExplanation: '**Alter ego / instrumentality doctrine**: Kapag ginagamit ang subsidiary para mago-go around ng legal restrictions, at wala itong sariling existence (walang empleyado, XYZ ang nag-o-operate) — pwedeng i-pierce ang corporate veil! Tatlong elements: (1) Complete control ng parent; (2) Ginamit ang control para sa fraud o legal violation; (3) Proximate cause ng damage. Lahat present dito → liable si XYZ. Hindi perpektong proteksyon ang corporate veil sa lahat ng sitwasyon.',
    relatedArticle: '*Concept Builders v. NLRC*; *Philippine National Bank v. Ritratto Group*; Alter ego doctrine',
    points: 2,
  },
  {
    id: 'com-mcq-005', subject: 'commercial-law', topic: 'securities', year: 2023,
    difficulty: 'hard', type: 'mcq',
    question: 'A company CEO sold his shares immediately before a public announcement that the company\'s earnings dropped significantly. The SEC investigated him for insider trading. The CEO argues he did not "tip" anyone and acted on his own. Is he liable for insider trading?',
    choices: [
      'No — insider trading requires tipping a third party; solo trading is not covered.',
      'Yes — trading on material non-public information as an insider constitutes insider trading regardless of tipping.',
      'No — executives are allowed to trade their own company\'s shares without restriction.',
      'Yes — but only if he made a profit of more than ₱1M from the transaction.',
    ],
    correctAnswer: 1,
    explanation: 'Sec. 27 of the Securities Regulation Code (RA 8799): It is unlawful for any insider to sell or buy securities while in possession of MATERIAL NON-PUBLIC INFORMATION. An INSIDER includes officers, directors, and employees. TRADING on MNPI is itself prohibited — no "tipping" to a third party is required. The CEO knew about the earnings drop (MNPI) and sold before the public announcement. This is a classic insider trading scenario. Tipping is a separate violation (Sec. 27.4) but trading on MNPI as an insider is independently prohibited.',
    taglishExplanation: '**Insider trading** ay hindi lang tipping — ang **trading mismo** sa material non-public information (MNPI) ay bawal! Sec. 27 SRC: Ang insider (tulad ng CEO) na may MNPI ay hindi dapat mag-buy o mag-sell ng shares bago ma-disclose ang information. Solo trading = insider trading. Tipping = hiwalay pang violation. Kaya liable ang CEO kahit walang na-"tip" — ang paggamit ng MNPI para sa personal na trading ay ang violation.',
    relatedArticle: 'Sec. 27 RA 8799 (Securities Regulation Code); Insider trading; MNPI',
    points: 2,
  },
  {
    id: 'com-mcq-006', subject: 'commercial-law', topic: 'banking', year: 2022,
    difficulty: 'medium', type: 'mcq',
    question: 'A depositor\'s bank account was debited ₱500,000 without her authorization. The bank claims its records show the transaction was authorized. The depositor demands return of funds. The bank refuses, citing bank secrecy. Rule on the bank\'s defense.',
    choices: [
      'Valid — bank secrecy protects banks from unauthorized disclosure of account transactions.',
      'Invalid — bank secrecy protects depositors, not banks seeking to withhold information from their own depositors.',
      'Valid — the bank is protected from liability if its records show authorization.',
      'Invalid — banks must return unauthorized debits regardless of their internal records.',
    ],
    correctAnswer: 1,
    explanation: 'The Law on Secrecy of Bank Deposits (RA 1405) protects DEPOSITORS — specifically, it prohibits THIRD PARTIES (including the government) from accessing deposit information without the depositor\'s consent or court order. It does NOT protect a BANK from its own depositor. The depositor has the absolute right to information about and access to her OWN ACCOUNT. The bank cannot hide behind bank secrecy vis-à-vis the account owner. If the bank debited without authorization, it committed an act prejudicial to the depositor. The bank must return the funds or prove authorization — bank secrecy is not a defense here.',
    taglishExplanation: 'Ang **bank secrecy** (RA 1405) ay proteksyon para sa **depositor** — laban sa government at third parties na gustong makita ang account. Hindi ito proteksyon ng bank laban sa sariling depositor! Ang depositor ay may absolute right na malaman ang lahat tungkol sa sariling account. Kaya hindi pwedeng gamitin ng bank ang bank secrecy para iwasang magbayad ng unauthorized debit sa sariling depositor. Mali ang depensa ng bank.',
    relatedArticle: 'RA 1405 (Bank Secrecy Law); Purpose and scope; depositor\'s rights',
    points: 2,
  },
  {
    id: 'com-mcq-007', subject: 'commercial-law', topic: 'partnerships', year: 2021,
    difficulty: 'medium', type: 'mcq',
    question: 'A and B formed a general partnership for a construction business. Without B\'s knowledge, A contracted with C to supply materials beyond the scope of the partnership. C now demands payment from the partnership. Is the partnership liable to C?',
    choices: [
      'No — B did not consent; only acts within A\'s actual authority bind the partnership.',
      'Yes — A as general partner has apparent authority to contract within the ordinary course of the partnership\'s business.',
      'No — C should have verified A\'s authority with B before contracting.',
      'Yes — but only A is personally liable, not the partnership.',
    ],
    correctAnswer: 1,
    explanation: 'Under the Civil Code, every GENERAL PARTNER is an agent of the partnership for the purpose of its BUSINESS (Art. 1818). A general partner has APPARENT AUTHORITY to bind the partnership in acts within the ordinary course of the partnership\'s business — regardless of whether actual authority was given. Since A and B operate a construction business, contracts for supply of construction materials fall within the ordinary course of that business. C, as a third party dealing in good faith, can rely on A\'s apparent authority. The partnership is bound and liable to C. B\'s internal lack of consent does not affect third-party rights.',
    taglishExplanation: '**Art. 1818 Civil Code**: Ang bawat general partner ay AGENT ng partnership para sa business nito. Si A ay may **apparent authority** para mag-contract ng supplies para sa construction — ito ay within the ordinary course ng business ng partnership. Hindi nag-aapekto ang internal disagreement ni B sa rights ng third party (C) na kumontrata nang in good faith. Liable ang partnership. Si B ang mag-re-recoup mula kay A internally kung labag ito sa kanilang kasunduan.',
    relatedArticle: 'Art. 1818, 1822 Civil Code (Partnership); Apparent authority of general partners',
    points: 2,
  },
  {
    id: 'com-mcq-008', subject: 'commercial-law', topic: 'intellectual-property', year: 2023,
    difficulty: 'medium', type: 'mcq',
    question: 'A software company registered its trademark "SwiftPay" for payment applications. A competitor uses "SwiftPayz" for a similar app. The competitor argues the added "z" makes it a different mark. Will the trademark infringement suit succeed?',
    choices: [
      'No — different spelling means different marks; no likelihood of confusion.',
      'Yes — the dominant portion test: "SwiftPay" is the dominant part; the added "z" is immaterial.',
      'No — trademarks for software are not protected under Philippine IP law.',
      'Yes — but only if actual consumer confusion can be proven.',
    ],
    correctAnswer: 1,
    explanation: 'Under the Intellectual Property Code (RA 8293) and the DOMINANCY TEST applied by the SC: When comparing marks, the court focuses on the DOMINANT PORTION — the most distinctive, memorable part. "SwiftPay" is the dominant element; the addition of "z" is a MINOR VARIATION that does not distinguish the mark. A consumer encountering "SwiftPayz" would likely confuse it with "SwiftPay." The HOLISTIC TEST also supports infringement: taken as a whole, the marks are nearly identical in appearance, sound, and overall impression. Trademark infringement does not require actual confusion — LIKELIHOOD of confusion suffices.',
    taglishExplanation: '**Dominancy test** ang ginagamit ng SC: Ang "SwiftPay" ang dominant at distinctive portion — ang "z" ay minor addition na hindi nagbibigay ng significant distinction. Para sa trademark, ang tanong ay: Magka-confuse ba ang consumers? Possible ba? — **Yes!** Hindi kailangan ng actual confusion — likelihood lang. Plus holistic test: magkahawig ang marks sa sound at appearance. Kaya liable ang competitor para sa trademark infringement.',
    relatedArticle: 'Sec. 155 RA 8293 (IP Code); Dominancy test; *McDonald\'s Corp. v. L.C. Big Mak*',
    points: 2,
  },
]

export const commercialEssays = [
  {
    id: 'com-essay-001', subject: 'commercial-law', topic: 'corporations-directors', year: 2022,
    difficulty: 'hard', type: 'essay',
    scenario: `CORPORATE GOVERNANCE CRISIS:

ABC Corporation is a publicly listed company. Its board of directors, led by CEO-Director Don, approved the following transactions in a single board meeting:

(1) A ₱50M contract between ABC Corp. and DEF Corp., a company wholly owned by Don's wife, without disclosing Don's interest. Don voted in favor.

(2) A resolution waiving ABC Corp.'s right to collect a ₱20M loan from GHI Corp., a company where Director Ella owns 40% of outstanding shares. Ella voted in favor.

(3) A decision to sell ABC Corp.'s main building — which represents 70% of its total assets — to an investor for ₱100M.

Minority stockholders challenge all three transactions.

(a) Analyze the validity of Transaction 1 regarding Don's conflict of interest.
(b) Analyze the validity of Transaction 2 regarding Director Ella's self-dealing.
(c) Is board approval alone sufficient for Transaction 3? Explain.`,
    subQuestions: [
      {
        part: 'a',
        question: 'Is Transaction 1 (contract with Don\'s wife\'s company) valid?',
        points: 12,
        modelAnswer: 'Transaction 1 is VOIDABLE. Under Sec. 31 of the Revised Corporation Code (RA 11232): A director who has a personal interest in a contract with the corporation must FULLY DISCLOSE the interest to the board AND ABSTAIN FROM VOTING. Don failed to (1) disclose that DEF Corp. is his wife\'s company (his indirect interest) and (2) abstained from voting. An undisclosed, self-dealing contract by a director is VOIDABLE at the corporation\'s option. The minority stockholders can move to annul the transaction or have it ratified with proper disclosure at a stockholders\' meeting.',
        irac: {
          issue: 'Whether a director\'s undisclosed contract with a corporation he has an indirect interest in is valid.',
          rule: 'Sec. 31 RA 11232: Director must disclose material interest and abstain from voting on self-dealing contracts. Failure renders the contract voidable.',
          application: 'Don has indirect interest in DEF Corp. (wife\'s company). No disclosure was made. Don voted in favor. These are violations of Sec. 31. The contract is voidable, not void — the corporation may ratify it with proper disclosure.',
          conclusion: 'Transaction 1 is voidable at the corporation\'s option due to Don\'s undisclosed conflict of interest and participation in voting.',
        },
        taglishExplanation: 'Self-dealing director rule! Si Don ay may **indirect interest** (wife\'s company). Requirement ng Sec. 31 RCC: (1) **I-disclose** ang interest; (2) **Huwag bumoto**. Dalawa itong hindi ginawa ni Don. Kaya: **Voidable** ang kontrata — hindi automatic void, kundi pwedeng i-annul ng corporation o i-ratify ng stockholders with proper disclosure. Ang minority stockholders ay may standing na i-challenge ito.',
      },
      {
        part: 'b',
        question: 'Is Transaction 2 (waiving the ₱20M loan from GHI Corp.) valid?',
        points: 12,
        modelAnswer: 'Transaction 2 is also VOIDABLE. Director Ella owns 40% of GHI Corp. — a MATERIAL INTEREST. Waiving ABC Corp.\'s right to collect a ₱20M loan directly benefits GHI Corp. (and thus Ella). Under Sec. 31 RCC, Ella was required to: (1) disclose her 40% ownership of GHI Corp.; (2) abstain from voting on the waiver. Ella voted in favor of a transaction that benefits a company she substantially owns. This is an undisclosed, interested-director transaction. It is voidable. The waiver of the ₱20M loan is prejudicial to the corporation and actionable as a breach of fiduciary duty.',
        irac: {
          issue: 'Whether a director may vote to waive a corporation\'s right against a company in which she has substantial interest.',
          rule: 'Sec. 31 RCC: Directors have fiduciary duties — loyalty, disclosure, and abstention from self-dealing votes.',
          application: 'Ella owns 40% of GHI Corp. — a material interest. Waiving the ₱20M loan benefits Ella through her GHI shareholding. Ella did not disclose and voted in favor — violation of Sec. 31.',
          conclusion: 'Transaction 2 is voidable due to Ella\'s undisclosed conflict of interest. The board resolution waiving the loan is challengeable by the corporation or minority stockholders.',
        },
        taglishExplanation: 'Parehong violation ng Sec. 31 RCC ang Transaction 2! Si Ella ay may 40% stake sa GHI Corp. — **material interest**. Ang pag-waive ng ₱20M loan ay nagbe-benefit kay GHI (at kay Ella indirectly). Violation: Hindi nag-disclose at bumoto pa. Kaya **voidable** rin ang waiver. Plus: Pwede pang mag-file ng derivative suit ang minority stockholders kung hindi gagalaw ang board.',
      },
      {
        part: 'c',
        question: 'Is board approval alone sufficient for the sale of 70% of total assets?',
        points: 6,
        modelAnswer: 'NO. Under Sec. 39 of the Revised Corporation Code: Any sale, lease, exchange, mortgage, pledge, or disposition of ALL OR SUBSTANTIALLY ALL of the corporate property and assets requires both: (1) Board approval; AND (2) RATIFICATION by the STOCKHOLDERS representing at least 2/3 of outstanding capital stock at a meeting called for that purpose. Seventy percent (70%) of total assets clearly constitutes "substantially all" of the corporation\'s property. Board approval alone is INSUFFICIENT. The transaction requires STOCKHOLDER RATIFICATION. Without it, the sale is VOID.',
        irac: {
          issue: 'Whether the board alone may approve the sale of 70% of total corporate assets.',
          rule: 'Sec. 39 RCC: Disposition of substantially all corporate assets requires board approval PLUS ratification by 2/3 vote of outstanding capital stock.',
          application: '70% of total assets = substantially all assets. Requires stockholder ratification by 2/3 vote. Board approval alone is insufficient.',
          conclusion: 'Transaction 3 requires both board approval and 2/3 stockholder ratification. Board action alone renders the sale void without subsequent stockholder approval.',
        },
        taglishExplanation: '**Sec. 39 RCC** — "Substantially all assets" rule! Ang pagbebenta ng 70% ng assets ay **substantially all assets**. Requirement: (1) Board resolution; PLUS (2) **2/3 stockholder vote** sa special meeting. Board alone = hindi sapat. Kung walang stockholder ratification — **VOID** ang sale. Ito ang protection ng stockholders laban sa board na nagbebenta ng substantially all assets nang walang kanilang consent.',
      },
    ],
  },
]

export default { mcq: commercialMCQ, essays: commercialEssays }
