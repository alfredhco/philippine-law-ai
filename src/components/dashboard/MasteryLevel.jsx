import { motion } from 'framer-motion'
import { Star, Trophy } from 'lucide-react'
import { SUBJECTS, OVERALL_PROGRESS } from '../../data/subjects'

const LEVELS = [
  { label: 'Novice',       min: 0,  max: 20,  color: '#6b7280', icon: '📖' },
  { label: 'Student',      min: 20, max: 40,  color: '#60a5fa', icon: '🎓' },
  { label: 'Practitioner', min: 40, max: 60,  color: '#a78bfa', icon: '⚖️' },
  { label: 'Associate',    min: 60, max: 75,  color: '#f59e0b', icon: '🏛️' },
  { label: 'Counselor',    min: 75, max: 90,  color: '#f97316', icon: '⚔️' },
  { label: 'Esquire',      min: 90, max: 101, color: '#10b981', icon: '🏆' },
]

const currentLevel = LEVELS.find(l => OVERALL_PROGRESS >= l.min && OVERALL_PROGRESS < l.max) || LEVELS[0]
const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1]
const progressToNext = nextLevel
  ? Math.round(((OVERALL_PROGRESS - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100)
  : 100

export default function MasteryLevel() {
  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl"
          style={{ background: currentLevel.color }} />
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${currentLevel.color}18` }}>
            <Star size={15} style={{ color: currentLevel.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Mastery Level</p>
            <p className="text-xs text-gray-500">Bar exam readiness tier</p>
          </div>
        </div>
        <Trophy size={16} className="text-gray-700" />
      </div>

      {/* Current level badge */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">{currentLevel.icon}</span>
            <span className="font-serif text-xl font-bold" style={{ color: currentLevel.color }}>
              {currentLevel.label}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {OVERALL_PROGRESS}% overall mastery
          </p>
        </div>
        {nextLevel && (
          <div className="text-right">
            <p className="text-[10px] text-gray-600">Next tier</p>
            <p className="text-xs font-semibold text-gray-400 mt-0.5">{nextLevel.icon} {nextLevel.label}</p>
            <p className="text-[10px] text-gray-600 mt-0.5">at {nextLevel.min}%</p>
          </div>
        )}
      </div>

      {/* Progress to next */}
      {nextLevel && (
        <div>
          <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
            <span>Progress to {nextLevel.label}</span>
            <span style={{ color: currentLevel.color }}>{progressToNext}%</span>
          </div>
          <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${currentLevel.color}aa, ${currentLevel.color})` }}
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* All levels */}
      <div className="mt-4 flex items-center justify-between">
        {LEVELS.map((l, i) => {
          const isReached = OVERALL_PROGRESS >= l.min
          const isCurrent = l.label === currentLevel.label
          return (
            <div key={l.label} className="flex flex-col items-center gap-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-all ${
                  isCurrent ? 'ring-2 ring-offset-2 ring-offset-navy-800 scale-125' : ''
                }`}
                style={{
                  background: isReached ? l.color : '#1e2d45',
                  ringColor: l.color,
                }}
              >
                {isReached ? '✓' : ''}
              </motion.div>
              <span className="text-[8px] text-gray-600 hidden sm:block">{l.label.slice(0,3)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
