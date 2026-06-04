import { motion } from 'framer-motion'
import { Award, TrendingUp } from 'lucide-react'
import { SUBJECTS } from '../../data/subjects'

const OVERALL = 67

function ArcRing({ value, size = 120, stroke = 8, color = '#f59e0b' }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value / 100)
  const cx = size / 2, cy = size / 2

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2a48" strokeWidth={stroke} />
      {/* Progress */}
      <motion.circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
      />
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const TOP_SUBJECTS = SUBJECTS.slice(0, 5).map(s => ({
  ...s,
  mockScore: Math.floor(s.progress * 0.8 + Math.random() * 15),
}))

export default function MockBarScore() {
  const passing = OVERALL >= 75

  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <Award size={15} className="text-amber-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Mock Bar Score</p>
          <p className="text-xs text-gray-500">Simulated performance</p>
        </div>
      </div>

      {/* Big ring */}
      <div className="flex items-center gap-5 mb-5">
        <div className="relative shrink-0">
          <ArcRing value={OVERALL} size={100} stroke={9} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-2xl font-bold text-white font-mono leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {OVERALL}%
            </motion.span>
            <span className="text-[9px] text-gray-500 mt-0.5 uppercase tracking-wider">overall</span>
          </div>
        </div>
        <div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${
            passing ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${passing ? 'bg-emerald-400' : 'bg-red-400'}`} />
            {passing ? 'On track to pass' : 'Needs improvement'}
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Passing score is <span className="text-white font-semibold">75%</span>.
            You need <span className="text-amber-400 font-semibold">{Math.max(0, 75 - OVERALL)}%</span> more to pass.
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
            <TrendingUp size={11} />
            <span>+4% from last simulation</span>
          </div>
        </div>
      </div>

      {/* Per-subject bars */}
      <div className="space-y-2.5">
        {TOP_SUBJECTS.map((s, i) => (
          <div key={s.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">{s.shortName}</span>
              <span className="text-xs font-semibold tabular-nums" style={{ color: s.mockScore >= 75 ? '#10b981' : '#f59e0b' }}>
                {s.mockScore}%
              </span>
            </div>
            <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: s.mockScore >= 75 ? '#10b981' : s.color }}
                initial={{ width: 0 }}
                animate={{ width: `${s.mockScore}%` }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
