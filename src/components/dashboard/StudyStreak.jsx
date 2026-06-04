import { motion } from 'framer-motion'
import { Flame, Calendar, Zap, Target } from 'lucide-react'
import { useStudySession } from '../../hooks/useStudySession'
import { getStreakEmoji } from '../../lib/utils'

const DAYS_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function StudyStreak() {
  const { streak, todayMinutes } = useStudySession()
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

  const weekActivity = DAYS_LABELS.map((_, i) => ({
    active: i < todayIndex,
    today:  i === todayIndex,
  }))

  const goal = 120
  const goalPct = Math.min(100, Math.round((todayMinutes / goal) * 100))

  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 relative overflow-hidden">
      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <Flame size={15} className="text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Study Streak</p>
            <p className="text-xs text-gray-500">Daily consistency</p>
          </div>
        </div>
        <span className="text-lg">{getStreakEmoji(streak.count)}</span>
      </div>

      {/* Streak count */}
      <div className="flex items-end gap-4 mb-5">
        <div>
          <motion.p
            className="text-5xl font-bold text-white font-mono leading-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          >
            {streak.count}
          </motion.p>
          <p className="text-xs text-gray-500 mt-1">day streak</p>
        </div>
        <div className="flex-1 pb-1">
          <div className="flex items-center justify-end gap-1.5 mb-1">
            <Zap size={11} className="text-gold-400" />
            <span className="text-xs text-gold-400 font-semibold">{todayMinutes}m today</span>
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <Target size={11} className="text-gray-500" />
            <span className="text-xs text-gray-500">Goal: {goal}m</span>
          </div>
        </div>
      </div>

      {/* Daily goal progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="text-gray-500">Daily goal</span>
          <span className={goalPct >= 100 ? 'text-emerald-400 font-semibold' : 'text-gray-500'}>{goalPct}%</span>
        </div>
        <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${goalPct >= 100
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
              : 'bg-gradient-to-r from-orange-500 to-gold-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${goalPct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Week grid */}
      <div className="flex items-center gap-2 mb-4">
        {DAYS_LABELS.map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className={`w-full aspect-square max-w-[36px] rounded-lg flex items-center justify-center text-xs transition-all duration-200 ${
                weekActivity[i].today
                  ? 'bg-gradient-to-br from-gold-500 to-accent-orange text-navy-950 font-bold shadow-glow'
                  : weekActivity[i].active
                  ? 'bg-orange-500/20 text-orange-300'
                  : 'bg-navy-800 text-gray-700'
              }`}
            >
              {weekActivity[i].today || weekActivity[i].active ? '✓' : '·'}
            </motion.div>
            <span className="text-[9px] text-gray-600">{day}</span>
          </div>
        ))}
      </div>

      {/* Milestone */}
      <div className="pt-3 border-t border-navy-700">
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5">
          <div className="flex items-center gap-1.5">
            <Calendar size={11} />
            <span>Next milestone: 14 days</span>
          </div>
          <span>{Math.max(0, 14 - streak.count)}d away</span>
        </div>
        <div className="h-1 bg-navy-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-gold-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (streak.count / 14) * 100)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}
