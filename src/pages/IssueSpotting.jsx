import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, CheckCircle, AlertCircle, Tag, ArrowLeft, RotateCcw, Filter } from 'lucide-react'
import Button from '../components/ui/Button'
import { logActivity } from '../lib/activity.js'

const SUBJECT_COLORS = {
  'civil-law':      '#6366f1',
  'criminal-law':   '#ef4444',
  'political-law':  '#0ea5e9',
  'remedial-law':   '#10b981',
  'commercial-law': '#f59e0b',
  'taxation-law':   '#8b5cf6',
  'labor-law':      '#f97316',
  'legal-ethics':   '#ec4899',
}

const SCENARIOS = [
  // ─── Civil Law ────────────────────────────────────────────────────────────
  {
    id: 'is-001', title: 'The Forged Deed of Sale', subject: 'civil-law', difficulty: 'hard',
    facts: `A owns a parcel of land covered by TCT No. 12345. Without A's knowledge, B, using a forged Special Power of Attorney, sold the land to C for ₱3,000,000. C registered the deed and was issued a new TCT. C then mortgaged the land to D Bank for ₱2,000,000. A discovered the fraud and now seeks to recover the land.

A is currently residing in Japan and was completely unaware of the transactions. The forged SPA appeared authentic on its face. D Bank conducted due diligence before accepting the mortgage.`,
    issues: [
      { issue: 'Void Contract — Forged SPA', explanation: 'A forged instrument has no legal effect. The sale based on a forged SPA is void ab initio, not merely voidable.', points: 25 },
      { issue: 'Torrens System / Indefeasibility of Title', explanation: 'Despite the void sale, C obtained a TCT. The indefeasibility principle is not absolute — it does not protect a buyer who acquired title through a void instrument.', points: 20 },
      { issue: 'Rights of Innocent Mortgagee (D Bank)', explanation: 'Banks have a higher standard of diligence than ordinary buyers. The SC has ruled that banks cannot rely solely on the face of a certificate of title.', points: 20 },
      { issue: 'Action for Reconveyance / Annulment of Title', explanation: 'A may file an action for reconveyance or declaration of nullity of the transfer certificate. The action attacks the title registered under fraud.', points: 20 },
      { issue: 'Imprescriptibility of Void Contracts', explanation: 'Actions to declare void contracts a nullity do not prescribe. A\'s action is not time-barred regardless of how long it has been since the forged sale.', points: 15 },
    ],
  },
  {
    id: 'is-002', title: 'The Accidental Heir', subject: 'civil-law', difficulty: 'hard',
    facts: `T died intestate. He is survived by: (1) his legitimate son A; (2) his illegitimate daughter B; (3) his surviving spouse C; and (4) his legitimate brother D.

T's estate is valued at ₱6,000,000. A predeceased T but left behind his own legitimate child E (T's grandchild).

B claims she should inherit equally with A's share. D claims he should inherit as a collateral relative. C claims her full spousal share.`,
    issues: [
      { issue: 'Representation — Right of E to Inherit in A\'s Place', explanation: 'E, as A\'s legitimate child, represents A in the succession. E inherits A\'s share by representation (Art. 981).', points: 20 },
      { issue: 'Share of Illegitimate Child B', explanation: 'Under Art. 895, the share of an illegitimate child is one-half of the share of a legitimate child. B gets 1/2 of E\'s share.', points: 25 },
      { issue: 'Surviving Spouse C\'s Share', explanation: 'Under Art. 1001, the surviving spouse concurring with legitimate and illegitimate children is entitled to a share equal to that of a legitimate child.', points: 20 },
      { issue: 'D is Excluded — Preference of Descendants over Collaterals', explanation: 'Brothers and sisters (collateral relatives) are excluded by the presence of descendants (E) and a surviving spouse. D inherits nothing.', points: 20 },
      { issue: 'Computation of Intestate Shares', explanation: 'Let each unit = x. E (legitimate) = x; B (illegitimate) = x/2; C (spouse) = x. Total = 2.5x = ₱6M → x = ₱2.4M. E=2.4M, C=2.4M, B=1.2M.', points: 15 },
    ],
  },
  {
    id: 'is-003', title: 'The Unsigned Lease', subject: 'civil-law', difficulty: 'medium',
    facts: `L (lessor) and T (lessee) verbally agreed that T would lease L's commercial property for ₱50,000/month for 2 years starting January 2023. T moved in, paid 3 months' rent, and made ₱200,000 in improvements with L's knowledge and acquiescence.

In April 2023, L sent a written notice to vacate, claiming no lease contract existed since nothing was in writing. T refuses to leave, invoking the verbal agreement and his improvements. L files an ejectment case.`,
    issues: [
      { issue: 'Form of Lease Contract — Exceeding 1 Year', explanation: 'Under Art. 1358, leases for more than 1 year must be in writing to be enforceable. An unwritten 2-year lease may not be enforced but is not void — it may be ratified.', points: 25 },
      { issue: 'Part Performance / Estoppel', explanation: 'T\'s payment of rent and L\'s acceptance may raise the doctrine of part performance or estoppel, preventing L from relying on the Statute of Frauds.', points: 20 },
      { issue: 'T\'s Right to Reimbursement for Improvements', explanation: 'T made improvements with L\'s knowledge. Under Art. 1678, the lessor may retain improvements or compel the lessee to remove them, with potential indemnity.', points: 20 },
      { issue: 'Proper Remedy: Unlawful Detainer vs. Forcible Entry', explanation: 'L must file unlawful detainer (not forcible entry) since T entered legally. The proper court is the MTC. The one-year period to file runs from the demand to vacate.', points: 20 },
      { issue: 'Implied Lease / Tacit Renewal', explanation: 'Even without a written lease, if T remains with L\'s tolerance, an implied monthly lease may have arisen under Art. 1670.', points: 15 },
    ],
  },

  // ─── Criminal Law ─────────────────────────────────────────────────────────
  {
    id: 'is-004', title: 'The Drug Mule Problem', subject: 'criminal-law', difficulty: 'medium',
    facts: `X and Y are best friends. X asked Y to carry a backpack on a flight from Cebu to Manila, telling Y it contains "pasalubong." X said he needed to buy an additional ticket and would meet Y in Manila. At the airport, Y's bag was checked and found to contain 500 grams of shabu. X was nowhere to be found. Y claims complete ignorance of the contents.

The prosecution argues that Y's act of carrying the bag constitutes possession. Y's defense is lack of knowledge and criminal intent.`,
    issues: [
      { issue: 'Animus Possidendi (Intent to Possess)', explanation: 'Illegal possession requires proof that the accused knowingly possessed the contraband. Mere physical possession without knowledge is not criminal.', points: 30 },
      { issue: 'Conspiracy with X', explanation: 'Was there conspiracy between X and Y? Conspiracy requires prior agreement and community of design. X\'s disappearance is suspicious but does not by itself prove Y\'s knowledge.', points: 25 },
      { issue: 'Credibility of Y\'s Defense of Ignorance', explanation: 'Courts assess claims of ignorance strictly in drug cases. The circumstances — unopened bag, X\'s absence, and the large quantity — are relevant.', points: 20 },
      { issue: 'Chain of Custody Rule (RA 9165 Sec. 21)', explanation: 'The prosecution must strictly comply with the three-witness rule and chain of custody requirements. Any deviation may compromise the evidentiary value of the drugs.', points: 25 },
    ],
  },
  {
    id: 'is-005', title: 'The Ambush at the Provincial Road', subject: 'criminal-law', difficulty: 'hard',
    facts: `A, B, and C planned to rob D, a businessman known to carry large cash. They waited on a dark provincial road at night. When D's car passed, they flagged it down. D, suspecting a holdup, attempted to drive away. A shot at D's car, killing D.

B and C claim they only planned a robbery, not a killing, and should not be held liable for D's death. The group used A's unlicensed firearm.

A separate charge for illegal possession of firearm was also filed against A.`,
    issues: [
      { issue: 'Robbery with Homicide — Special Complex Crime', explanation: 'Under Art. 294(1), when homicide occurs "by reason of or on the occasion of" robbery, ALL conspirators are liable for robbery with homicide regardless of who killed.', points: 25 },
      { issue: 'Conspiracy — Collective Liability', explanation: 'The act of one conspirator is the act of all. B and C\'s claim that they did not intend the killing does not absolve them — the killing was on the occasion of their robbery.', points: 20 },
      { issue: 'Treachery / Nighttime as Aggravating Circumstances', explanation: 'The killing was done at nighttime on a dark road, which may be considered as an aggravating circumstance if shown to have been deliberately sought.', points: 15 },
      { issue: 'Illegal Possession of Firearm — Absorbed or Separate?', explanation: 'Under RA 10591, illegal possession of firearm is a separate offense UNLESS used in the commission of another crime. If used in robbery with homicide, it is an aggravating circumstance, not a separate crime.', points: 20 },
      { issue: 'Waiver of Illegal Arrest — Procedural Issue', explanation: 'If any of the accused were arrested without a valid warrant and failed to raise this before arraignment, the defect is deemed waived.', points: 20 },
    ],
  },

  // ─── Political Law ────────────────────────────────────────────────────────
  {
    id: 'is-006', title: 'The Mayor\'s Emergency Powers', subject: 'political-law', difficulty: 'hard',
    facts: `In response to a severe dengue outbreak, the Mayor of Davao City issued Executive Order No. 05, which: (1) declared a state of public health emergency; (2) authorized the warrantless entry of health officers into any home suspected of harboring mosquito breeding sites; (3) imposed a ₱5,000 fine on residents who failed to allow entry; and (4) appropriated ₱50M from the city's general fund to purchase medicines, without a supplemental budget ordinance.

A local homeowners association challenged EO 05 before the RTC, arguing it is unconstitutional.`,
    issues: [
      { issue: 'Warrantless Entry into Homes — Art. III Sec. 2 Violation', explanation: 'The right against unreasonable searches protects dwellings. Even a health emergency does not authorize blanket warrantless entry. No exception to the warrant requirement applies here.', points: 25 },
      { issue: 'Due Process — Penalty Without Hearing', explanation: 'Imposing a fine without procedural due process (notice and hearing) violates Art. III Sec. 1. Administrative penalties require opportunity to be heard.', points: 20 },
      { issue: 'LGU Appropriation Without Supplemental Budget Ordinance', explanation: 'Under Sec. 321-322 LGC, supplemental appropriations require a supplemental budget ordinance approved by the Sanggunian. An executive order cannot unilaterally appropriate funds.', points: 20 },
      { issue: 'Scope of Mayor\'s Emergency Powers Under LGC', explanation: 'Sec. 465 LGC grants the mayor executive and administrative powers, but these are circumscribed by the Constitution and national laws. Declaration of emergency does not suspend constitutional rights.', points: 20 },
      { issue: 'Justiciability — Is This a Political Question?', explanation: 'This is NOT a political question — it involves the violation of specific constitutional provisions reviewable by the courts under Art. VIII Sec. 1\'s expanded certiorari jurisdiction.', points: 15 },
    ],
  },
  {
    id: 'is-007', title: 'The Midnight Appointments', subject: 'political-law', difficulty: 'hard',
    facts: `President X's term ends on June 30. On March 15, she appointed J as a Regional Trial Court Judge (submitted to the JBC). On May 30, she appointed Asst. Secretary M to the position of Undersecretary (no JBC involvement). On June 15, she appointed Ambassador R to head the CHED (a Cabinet-level position).

The newly sworn-in President Y revoked all three appointments. President X's allies challenge the revocations.`,
    issues: [
      { issue: 'Prohibition on Midnight Appointments — Art. VII Sec. 15', explanation: 'Two months before a presidential election, the President is prohibited from making appointments, except temporary appointments to executive positions when continued vacancies will prejudice public service. The prohibition covers March 15 to June 30 (election period).', points: 25 },
      { issue: 'JBC Nominations — Judicial Appointments Exception', explanation: 'The SC in De Castro v. JBC held that the appointment ban does NOT apply to the Judiciary. Appointment of a judge through the JBC process is permissible even within the prohibited period.', points: 25 },
      { issue: 'Undersecretary M — Executive Position, Covered by Ban', explanation: 'The appointment of Undersecretary M is an executive appointment made within the prohibited period and is not covered by the judicial exception. This appointment is void.', points: 20 },
      { issue: 'CHED Chair R — Quasi-Judicial/Constitutional Body?', explanation: 'Whether R\'s appointment to CHED falls under the general ban or qualifies as an exception depends on whether CHED is purely executive or exercises independent quasi-judicial functions.', points: 15 },
      { issue: 'Revocation — Power of the Incoming President', explanation: 'A void appointment conveys no title. The incoming president may revoke void appointments. However, a validly appointed judge cannot be revoked by executive action — judicial independence protects the appointment.', points: 15 },
    ],
  },

  // ─── Remedial Law ─────────────────────────────────────────────────────────
  {
    id: 'is-008', title: 'The Lost Will', subject: 'remedial-law', difficulty: 'medium',
    facts: `T died leaving a notarial will that was last seen in T's home safe. After T's death, the safe was found open and empty. T's son A claims the will was valid and devised T's estate to him. T's daughter B claims T died intestate since no will was presented.

A filed a petition for probate in the RTC. B moved to dismiss, arguing no will can be probated since the original is missing. A presented a photocopy of the will and the testimonies of the three instrumental witnesses.`,
    issues: [
      { issue: 'Probate of a Lost or Destroyed Will', explanation: 'Under Rule 76 Sec. 6, if the original will cannot be found, probate may proceed upon proof of its existence, its due execution, and its contents through secondary evidence such as a copy and witness testimony.', points: 25 },
      { issue: 'Grounds to Disallow a Will', explanation: 'The burden of proving due execution and validity shifts to the proponent. The opponent (B) must show affirmative grounds for disallowance under Rule 76 Sec. 9.', points: 20 },
      { issue: 'Presumption Regarding Lost Will — Art. 830 Civil Code', explanation: 'If a will cannot be found after the testator\'s death and was last in his possession, there is a disputable presumption that he revoked it. A must overcome this presumption.', points: 25 },
      { issue: 'Jurisdiction — RTC Probate Court', explanation: 'The RTC (acting as a probate court) has exclusive jurisdiction over testate/intestate proceedings. The motion to dismiss based on the missing will is a question of the court\'s authority to proceed — not jurisdiction.', points: 15 },
      { issue: 'Heirs\' Rights Pending Probate', explanation: 'Pending probate, no disposition of estate assets may be made by any heir. B\'s claim of intestate succession cannot be resolved until probate is either granted or denied.', points: 15 },
    ],
  },

  // ─── Commercial Law ───────────────────────────────────────────────────────
  {
    id: 'is-009', title: 'The Deadlocked Board', subject: 'commercial-law', difficulty: 'hard',
    facts: `XYZ Corp. has a 10-member board. Director A is suspended by the board pending an investigation for alleged misappropriation. The remaining 9 directors are split 5-4 on a major business decision — the ₱100M acquisition of a competitor.

The 4-director minority bloc walks out, leaving only 5 directors. The majority then votes 5-0 to approve the acquisition. The 4 directors challenge the resolution as invalid, arguing no quorum was present.

Additionally, the suspended Director A demands to participate in board meetings, claiming his suspension is void.`,
    issues: [
      { issue: 'Quorum Requirement for Board Meetings', explanation: 'Under Sec. 52 RCC, a quorum is a majority of the TOTAL number of directors (not just those present). For a 10-member board, quorum = 6. A 5-0 vote with only 5 present does not meet quorum — the resolution is void.', points: 25 },
      { issue: 'Walkout as Waiver of Quorum Objection', explanation: 'If the minority voluntarily walked out, do they waive the quorum requirement? Philippine doctrine generally holds that voluntary absence does not cure the lack of quorum — the resolution is still invalid.', points: 20 },
      { issue: 'Validity of Director A\'s Suspension', explanation: 'Under Sec. 27 RCC, a director may be removed by stockholders. The board alone cannot suspend a director without clear authority in the by-laws. A\'s suspension may be an ultra vires board act.', points: 20 },
      { issue: 'Business Judgment Rule — Scope of Judicial Review', explanation: 'Courts generally will not substitute their judgment for that of the board on business decisions. However, a procedurally void resolution (no quorum) is reviewable because it violates statutory requirements.', points: 20 },
      { issue: 'Derivative Suit by Minority Stockholders', explanation: 'The 4 directors may file a derivative suit on behalf of the corporation to nullify the resolution. They must exhaust intra-corporate remedies first.', points: 15 },
    ],
  },

  // ─── Taxation Law ────────────────────────────────────────────────────────
  {
    id: 'is-010', title: 'The Family Corporation\'s Loan', subject: 'taxation-law', difficulty: 'hard',
    facts: `ABC Corp. is 90% owned by the Reyes family. In 2022, ABC Corp. extended a ₱5M zero-interest loan to Mr. Reyes (the majority stockholder). The loan has no documentation and no repayment schedule.

The BIR audited ABC Corp. for 2022 and issued deficiency assessments for: (1) income tax on the deemed dividend; (2) fringe benefit tax; and (3) documentary stamp tax on the loan transaction.

Mr. Reyes argues the loan is a legitimate inter-party transaction, not a dividend or compensation.`,
    issues: [
      { issue: 'Constructive Dividend — Imputed Interest', explanation: 'A zero-interest loan from a corporation to a controlling stockholder with no business purpose may be treated as a constructive dividend, subject to income tax. The BIR may impute interest at the prevailing rate.', points: 25 },
      { issue: 'Fringe Benefit Tax — Is Mr. Reyes an Employee?', explanation: 'FBT under Sec. 33 NIRC applies to fringe benefits granted by employers to managerial/supervisory employees. If Mr. Reyes is an officer/employee of ABC, the benefit is subject to FBT at 35%.', points: 20 },
      { issue: 'Documentary Stamp Tax on Loan Instruments', explanation: 'Sec. 179 NIRC imposes DST on loan agreements, promissory notes, and other debt instruments. Even a zero-interest undocumented loan may be subject to DST if it constitutes a loan agreement.', points: 20 },
      { issue: 'Transfer Pricing — Related Party Transactions', explanation: 'Transactions between related parties (like ABC Corp. and Mr. Reyes) must be at arm\'s length. A zero-interest loan between related parties may be adjusted by the BIR under transfer pricing rules.', points: 20 },
      { issue: 'Protest Period — Procedural Compliance', explanation: 'Mr. Reyes and ABC Corp. have 30 days from receipt of the Formal Assessment Notice to file a written protest. Failure to do so renders the assessment final, executory, and demandable.', points: 15 },
    ],
  },

  // ─── Labor Law ────────────────────────────────────────────────────────────
  {
    id: 'is-011', title: 'The Redundancy That Wasn\'t', subject: 'labor-law', difficulty: 'hard',
    facts: `Mega Corp. declared the position of "Marketing Coordinator" redundant and retrenched all 8 employees holding that title, paying them separation pay of 1 month per year of service.

However, three months later, Mega Corp. hired 8 new employees for the newly created position of "Brand Solutions Specialist," performing essentially the same duties as the former Marketing Coordinators.

The retrenched employees filed complaints for illegal dismissal. The company argues it has the right to determine its organizational structure.`,
    issues: [
      { issue: 'Invalid Redundancy — Positions Not Truly Redundant', explanation: 'Redundancy requires that the position is truly superfluous. Immediately re-hiring for the same duties under a different title suggests the redundancy was a pretext. The dismissal is illegal.', points: 30 },
      { issue: 'Management Prerogative — Limits', explanation: 'While employers have the right to reorganize, this prerogative cannot be used to circumvent labor laws. A reorganization that merely renames positions to terminate regular employees is an abuse of management prerogative.', points: 20 },
      { issue: 'Separation Pay Rate — Redundancy vs. Retrenchment', explanation: 'For redundancy, separation pay is 1 month per year of service (higher than retrenchment\'s 1/2 month). The company paid the correct rate — but if the dismissal is declared illegal, this becomes backwages + reinstatement.', points: 15 },
      { issue: 'Reinstatement and Backwages — Remedy for Illegal Dismissal', explanation: 'Under Art. 294, illegally dismissed employees are entitled to reinstatement without loss of seniority AND full backwages from dismissal until actual reinstatement.', points: 20 },
      { issue: 'Bad Faith in Termination — Moral Damages', explanation: 'If the dismissal was done in bad faith (sham redundancy), the employees may claim moral and exemplary damages in addition to reinstatement and backwages.', points: 15 },
    ],
  },

  // ─── Legal Ethics ─────────────────────────────────────────────────────────
  {
    id: 'is-012', title: 'The Desperate Lawyer', subject: 'legal-ethics', difficulty: 'hard',
    facts: `Atty. Cruz represents Client A in a civil case for sum of money. Desperate for funds, Atty. Cruz: (1) borrowed ₱50,000 from Client A, promising to repay within 60 days; (2) entered into a contingency fee agreement for 40% of whatever is recovered; (3) without Client A's knowledge, settled the case with the defendant for ₱200,000 (well below the ₱500,000 claimed); and (4) applied the entire ₱200,000 to his attorney's fees, claiming 40% = ₱80,000 and the balance applied to the loan.

Client A filed a disbarment complaint when he discovered the settlement.`,
    issues: [
      { issue: 'Borrowing Money from a Client — Canon 16.04 Violation', explanation: 'Canon 16.04 CPR: A lawyer shall not borrow money from a client unless the client\'s interests are fully protected. Borrowing creates a conflict of interest that prejudices the client\'s cause.', points: 20 },
      { issue: 'Unconscionable Contingency Fee — 40% of Recovery', explanation: 'While contingency fees are valid, the SC reviews them for reasonableness. 40% of recovery in a simple collection case may be excessive. The agreement is subject to court scrutiny.', points: 15 },
      { issue: 'Unauthorized Settlement — Canon 19, Rule 19.03', explanation: 'A lawyer may not settle a case without the client\'s knowledge or consent. Atty. Cruz settled without informing Client A, which violates the attorney\'s duty of loyalty and the right of the client to approve settlements.', points: 25 },
      { issue: 'Misappropriation of Settlement Proceeds — Canon 16', explanation: 'Atty. Cruz applied the entire ₱200,000 to fees and the loan without Client A\'s consent. Retaining client funds without authority is misappropriation — one of the gravest grounds for disbarment.', points: 25 },
      { issue: 'Conflict of Interest — Creditor-Debtor and Lawyer-Client', explanation: 'By borrowing from his client, Atty. Cruz created a conflict between his role as counsel (maximize recovery) and his personal interest (settle quickly to pay his debt). He cannot serve two masters.', points: 15 },
    ],
  },
]

const ALL_SUBJECTS = [...new Set(SCENARIOS.map(s => s.subject))]

// ─── Session ──────────────────────────────────────────────────────────────────
function ScenarioSession({ scenario, onBack }) {
  const [spotted, setSpotted]   = useState([])
  const [revealed, setRevealed] = useState(false)
  const subjectColor = SUBJECT_COLORS[scenario.subject] ?? '#6366f1'

  const toggle = (issue) => {
    if (revealed) return
    setSpotted(p => p.includes(issue) ? p.filter(i => i !== issue) : [...p, issue])
  }

  const handleReveal = () => {
    setRevealed(true)
    const score = scenario.issues.filter(i => spotted.includes(i.issue)).reduce((s, i) => s + i.points, 0)
    const total  = scenario.issues.reduce((s, i) => s + i.points, 0)
    logActivity({ issueSpots: spotted.length, minutes: 5 })
  }

  const score = scenario.issues.filter(i => spotted.includes(i.issue)).reduce((s, i) => s + i.points, 0)
  const total = scenario.issues.reduce((s, i) => s + i.points, 0)
  const pct   = revealed ? Math.round((score / total) * 100) : 0

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft size={13} /> Back
        </button>
        {revealed && (
          <button onClick={() => { setSpotted([]); setRevealed(false) }}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            <RotateCcw size={13} /> Try again
          </button>
        )}
      </div>

      {/* Title + score */}
      <div className="glass-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider"
                style={{ background: `${subjectColor}15`, color: subjectColor }}>
                {scenario.subject.replace(/-/g, ' ')}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                scenario.difficulty === 'hard' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
              }`}>{scenario.difficulty}</span>
            </div>
            <h2 className="font-serif text-lg font-bold text-white">{scenario.title}</h2>
          </div>
          {revealed && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-right shrink-0">
              <p className="text-2xl font-bold font-mono" style={{ color: pct >= 75 ? '#10b981' : pct >= 50 ? '#f97316' : '#ef4444' }}>{pct}%</p>
              <p className="text-[10px] text-gray-500">{score}/{total} pts</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Facts */}
      <div className="glass-card p-5">
        <p className="text-[10px] font-bold text-gold-400 uppercase tracking-wider mb-3">Statement of Facts</p>
        <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{scenario.facts}</p>
      </div>

      {/* Issues */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {revealed ? 'All Issues' : 'Spot the Issues'} — {revealed ? `${score}/${total} pts` : `${spotted.length} spotted`}
          </p>
          {!revealed && (
            <p className="text-[10px] text-gray-600">Click all legal issues you can identify</p>
          )}
        </div>
        {scenario.issues.map((issue, i) => {
          const isSpotted  = spotted.includes(issue.issue)
          const isCorrect  = revealed && isSpotted
          const isMissed   = revealed && !isSpotted

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggle(issue.issue)}
              className={`glass-card p-4 transition-all duration-200 ${!revealed ? 'cursor-pointer hover:border-navy-600' : ''} ${
                isCorrect ? 'border-emerald-500/40' : isMissed ? 'border-red-500/20 opacity-80' : isSpotted ? 'border-gold-500/40' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isCorrect ? 'border-emerald-500 bg-emerald-500/20' :
                  isSpotted && !revealed ? 'border-gold-500 bg-gold-500/20' :
                  'border-navy-600'
                }`}>
                  {(isSpotted || isCorrect) && <CheckCircle size={11} className={isCorrect ? 'text-emerald-400' : 'text-gold-400'} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-gray-200">{issue.issue}</p>
                    <span className="text-[10px] text-gray-600">({issue.points} pts)</span>
                  </div>
                  <AnimatePresence>
                    {revealed && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-gray-400 mt-1.5 leading-relaxed"
                      >
                        {issue.explanation}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {revealed && (
                  isSpotted
                    ? <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    : <AlertCircle size={15} className="text-red-400/50 shrink-0 mt-0.5" />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {!revealed && (
        <Button onClick={handleReveal} variant="primary" className="w-full">
          <Eye size={14} className="mr-2" /> Reveal All Issues ({spotted.length}/{scenario.issues.length} spotted)
        </Button>
      )}
    </div>
  )
}

// ─── Lobby ────────────────────────────────────────────────────────────────────
export default function IssueSpotting() {
  const [active,  setActive]  = useState(null)
  const [filter,  setFilter]  = useState('all')

  const filtered = filter === 'all' ? SCENARIOS : SCENARIOS.filter(s => s.subject === filter)

  if (active) return <ScenarioSession scenario={active} onBack={() => setActive(null)} />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
          <Search size={20} className="text-purple-400" />
        </div>
        <div>
          <h2 className="section-title">Issue Spotting</h2>
          <p className="text-xs text-gray-500 mt-0.5">{SCENARIOS.length} fact patterns · Identify every legal issue</p>
        </div>
      </div>

      {/* Subject filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
            filter === 'all' ? 'bg-purple-500/15 text-purple-400 border-purple-500/30' : 'bg-navy-800 text-gray-500 border-navy-700 hover:text-gray-300'
          }`}>
          All ({SCENARIOS.length})
        </button>
        {ALL_SUBJECTS.map(sub => {
          const color = SUBJECT_COLORS[sub] ?? '#6366f1'
          const count = SCENARIOS.filter(s => s.subject === sub).length
          return (
            <button key={sub} onClick={() => setFilter(sub)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${filter === sub ? 'border-opacity-40' : 'bg-navy-800 text-gray-500 border-navy-700 hover:text-gray-300'}`}
              style={filter === sub ? { background: `${color}15`, color, borderColor: `${color}40` } : undefined}>
              {sub.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} ({count})
            </button>
          )
        })}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map((scenario, i) => {
          const color = SUBJECT_COLORS[scenario.subject] ?? '#6366f1'
          return (
            <motion.div key={scenario.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setActive(scenario)}
              className="glass-card p-5 cursor-pointer hover:border-navy-600/80 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Tag size={12} style={{ color }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
                      {scenario.subject.replace(/-/g, ' ')}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                      scenario.difficulty === 'hard' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>{scenario.difficulty}</span>
                    <span className="text-[10px] text-gray-600">{scenario.issues.length} issues</span>
                  </div>
                  <h3 className="font-serif font-bold text-white group-hover:text-gold-400 transition-colors mb-1">
                    {scenario.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{scenario.facts}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  Start
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
