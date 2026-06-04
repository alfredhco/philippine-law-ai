import { motion } from 'framer-motion'
import { getProgressSnapshot } from '../../lib/progress.js'

const R = 26
const STROKE = 6
const SIZE = 68
const CX = SIZE / 2
const CIRC = 2 * Math.PI * R

function Ring({ subject, delay = 0 }) {
  const offset = CIRC * (1 - subject.pct / 100)
  const masteryLabel = subject.pct >= 90 ? 'Master' : subject.pct >= 75 ? 'Expert' : subject.pct >= 60 ? 'Proficient' : subject.pct >= 40 ? 'Practitioner' : subject.pct >= 20 ? 'Apprentice' : 'Novice'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center gap-1.5 group cursor-default"
      title={`${subject.name}: ${subject.pct}% — ${masteryLabel}`}
    >
      <div className="relative">
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          {/* Background track */}
          <circle cx={CX} cy={CX} r={R} fill="none" stroke="currentColor" strokeWidth={STROKE} className="text-navy-700" />
          {/* Foreground arc */}
          <motion.circle
            cx={CX} cy={CX} r={R}
            fill="none"
            stroke={subject.color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${CIRC} ${CIRC}`}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay, ease: 'easeOut' }}
            style={{ filter: subject.pct > 0 ? `drop-shadow(0 0 4px ${subject.color}60)` : 'none' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold font-mono tabular-nums" style={{ color: subject.pct > 0 ? subject.color : '#4b5563' }}>
            {subject.pct}%
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[9px] font-semibold text-gray-400 leading-tight group-hover:text-white transition-colors" style={{ maxWidth: 64 }}>
          {subject.name.replace(' Law', '').replace('Legal ', '')}
        </p>
        <p className="text-[8px] text-gray-600">{masteryLabel}</p>
      </div>
    </motion.div>
  )
}

export default function MasteryRings() {
  const { subjectBreakdown } = getProgressSnapshot()

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-semibold text-white">Subject Mastery</p>
          <p className="text-xs text-gray-500">Flashcard mastery per subject</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gold-400">
            {subjectBreakdown.filter(s => s.pct >= 75).length} / {subjectBreakdown.length}
          </p>
          <p className="text-[10px] text-gray-600">Expert+</p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 justify-items-center">
        {subjectBreakdown.map((s, i) => (
          <Ring key={s.id} subject={s} delay={i * 0.07} />
        ))}
      </div>
    </div>
  )
}
