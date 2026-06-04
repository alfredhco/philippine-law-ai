import { motion } from 'framer-motion'
import { RotateCcw, Minus, Check, Zap } from 'lucide-react'

const RATINGS = [
  {
    value: 1, label: 'Again',
    desc: "Didn't recall",
    color: '#ef4444', bg: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/20 hover:border-red-500/40',
    icon: RotateCcw, key: '1',
  },
  {
    value: 2, label: 'Hard',
    desc: 'Struggled',
    color: '#f97316', bg: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/20 hover:border-orange-500/40',
    icon: Minus, key: '2',
  },
  {
    value: 3, label: 'Good',
    desc: 'Got it',
    color: '#10b981', bg: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20 hover:border-emerald-500/40',
    icon: Check, key: '3',
  },
  {
    value: 4, label: 'Easy',
    desc: 'Perfect recall',
    color: '#f59e0b', bg: 'bg-gold-500/10 hover:bg-gold-500/20 border-gold-500/20 hover:border-gold-500/40',
    icon: Zap, key: '4',
  },
]

export default function ConfidenceRater({ onRate, disabled = false, nextIntervals }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <p className="text-center text-xs text-gray-600 mb-3 uppercase tracking-widest">
        How well did you know this?
      </p>
      <div className="grid grid-cols-4 gap-2">
        {RATINGS.map((r, i) => (
          <motion.button
            key={r.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={!disabled ? { scale: 1.04, y: -2 } : undefined}
            whileTap={!disabled ? { scale: 0.97 } : undefined}
            disabled={disabled}
            onClick={() => onRate(r.value)}
            className={`relative flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-2xl border transition-all duration-200 ${r.bg} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {/* Keyboard shortcut badge */}
            <div className="absolute top-2 right-2 w-4 h-4 rounded bg-navy-700 flex items-center justify-center text-[9px] font-mono text-gray-500">
              {r.key}
            </div>

            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${r.color}18` }}>
              <r.icon size={15} style={{ color: r.color }} />
            </div>
            <span className="text-sm font-bold" style={{ color: r.color }}>{r.label}</span>
            <span className="text-[10px] text-gray-600">{r.desc}</span>
            {nextIntervals?.[r.value] && (
              <span className="text-[9px] text-gray-700 mt-0.5">
                +{nextIntervals[r.value]}d
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
