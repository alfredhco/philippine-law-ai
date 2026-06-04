import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Home, TrendingUp, Star, Zap } from 'lucide-react'
import Button from '../ui/Button'

const GRADE = (pct) =>
  pct >= 90 ? { label: 'Excellent!',    emoji: '🏆', color: '#f59e0b' } :
  pct >= 75 ? { label: 'Great Job!',    emoji: '🌟', color: '#10b981' } :
  pct >= 60 ? { label: 'Good Progress', emoji: '💪', color: '#6366f1' } :
  pct >= 40 ? { label: 'Keep Studying', emoji: '📚', color: '#f97316' } :
              { label: 'Need Practice', emoji: '🔄', color: '#ef4444' }

export default function SessionSummary({ sessionStats, onRestart, onHome }) {
  const { correct, hard, again, total, timeSeconds, mode, subject } = sessionStats
  const pct   = total > 0 ? Math.round(((correct) / total) * 100) : 0
  const grade = GRADE(pct)
  const mins  = timeSeconds ? Math.floor(timeSeconds / 60) : null
  const secs  = timeSeconds ? timeSeconds % 60 : null

  return (
    <div className="max-w-md mx-auto text-center space-y-6 py-4">
      {/* Hero */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div className="text-6xl mb-3">{grade.emoji}</div>
        <h2 className="font-serif text-2xl font-bold text-white mb-1">{grade.label}</h2>
        <p className="text-gray-400 text-sm">Session complete · {total} cards reviewed</p>
      </motion.div>

      {/* Score ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 112 112" className="-rotate-90 w-full h-full">
            <circle cx="56" cy="56" r="46" fill="none" stroke="#1a2a48" strokeWidth="10" />
            <motion.circle
              cx="56" cy="56" r="46"
              fill="none"
              stroke={grade.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 46}
              initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - pct / 100) }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white font-mono">{pct}%</span>
            <span className="text-[10px] text-gray-500">accuracy</span>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-3"
      >
        {[
          { label: 'Got It',   value: correct,            color: '#10b981', icon: Star     },
          { label: 'Hard',     value: hard || 0,          color: '#f97316', icon: TrendingUp },
          { label: 'Again',    value: again || 0,         color: '#ef4444', icon: RotateCcw},
        ].map(s => (
          <div key={s.label} className="bg-navy-800/60 border border-navy-700/60 rounded-2xl p-4">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-gray-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Extra stats */}
      {mins !== null && (
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Zap size={12} className="text-gold-400" />
          <span>Session time: {mins}m {secs}s</span>
          {total > 0 && <span>· {Math.round(timeSeconds / total)}s per card</span>}
        </div>
      )}

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-sm text-gray-400 leading-relaxed px-4"
      >
        {pct >= 75
          ? `🎯 Strong performance on ${mode === 'daily' ? 'your daily review' : mode + ' mode'}. Keep this streak going!`
          : `📖 Focus on the cards you missed — they'll come back sooner in spaced repetition.`
        }
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-3"
      >
        <Button variant="secondary" icon={Home} onClick={onHome}>Back to Setup</Button>
        <Button icon={RotateCcw} onClick={onRestart}>Study Again</Button>
      </motion.div>
    </div>
  )
}
