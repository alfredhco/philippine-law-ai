import { motion } from 'framer-motion'

export default function XPBar({ levelInfo, xp, compact = false }) {
  const { current, next, pct, xpToNext } = levelInfo

  if (compact) {
    return (
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base leading-none shrink-0">{current.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-bold text-white truncate">Lv.{current.level}</span>
            {next && <span className="text-[9px] text-gray-600 ml-1">{xpToNext} to go</span>}
          </div>
          <div className="h-1 bg-navy-700 rounded-full overflow-hidden w-16">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${current.color}aa, ${current.color})` }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">{current.icon}</span>
          <div>
            <span className="font-bold text-white">Level {current.level}</span>
            <span className="text-gray-500 ml-1.5">{current.title}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono font-bold tabular-nums" style={{ color: current.color }}>{xp.toLocaleString()} XP</span>
          {next && <span className="text-gray-600 ml-1">/ {next.xp.toLocaleString()}</span>}
        </div>
      </div>
      <div className="relative h-3 bg-navy-800 rounded-full overflow-hidden border border-navy-700/60">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${current.color}80, ${current.color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
        {/* Tick marks at 25%, 50%, 75% */}
        {[25, 50, 75].map(tick => (
          <div key={tick} className="absolute top-0 bottom-0 w-px bg-navy-700/60" style={{ left: `${tick}%` }} />
        ))}
      </div>
      {next && (
        <div className="flex items-center justify-between text-[10px] text-gray-600">
          <span>{pct}% to Level {next.level}</span>
          <span>{next.icon} {next.title} in {xpToNext.toLocaleString()} XP</span>
        </div>
      )}
    </div>
  )
}
