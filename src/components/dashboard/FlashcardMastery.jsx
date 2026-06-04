import { motion } from 'framer-motion'
import { CreditCard, Zap } from 'lucide-react'
import { FLASHCARDS } from '../../data/flashcards'
import { SUBJECTS } from '../../data/subjects'

const totalCards  = SUBJECTS.reduce((s, sub) => s + sub.totalCards, 0)
const masteredCards = SUBJECTS.reduce((s, sub) => s + sub.mastered, 0)
const masteryPct  = Math.round((masteredCards / totalCards) * 100)

const byDifficulty = [
  { label: 'Easy',   count: 156, mastered: 142, color: '#10b981' },
  { label: 'Medium', count: 430, mastered: 220, color: '#f59e0b' },
  { label: 'Hard',   count: 284, mastered: 82,  color: '#ef4444' },
]

const dueToday = FLASHCARDS.filter(f => !f.mastered).length

export default function FlashcardMastery() {
  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <CreditCard size={15} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Flashcard Mastery</p>
            <p className="text-xs text-gray-500">{masteredCards} of {totalCards} mastered</p>
          </div>
        </div>
        {dueToday > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <Zap size={11} className="text-orange-400" />
            <span className="text-xs font-semibold text-orange-400">{dueToday} due</span>
          </div>
        )}
      </div>

      {/* Donut ring */}
      <div className="flex items-center gap-5 mb-5">
        <div className="relative shrink-0 w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#1a2a48" strokeWidth="10" />
            <motion.circle
              cx="40" cy="40" r="32"
              fill="none"
              stroke="url(#cardGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 32}
              initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - masteryPct / 100) }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            />
            <defs>
              <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-white font-mono">{masteryPct}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {byDifficulty.map((d, i) => (
            <div key={d.label}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] text-gray-500">{d.label}</span>
                <span className="text-[11px] font-semibold" style={{ color: d.color }}>
                  {Math.round((d.mastered / d.count) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: d.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(d.mastered / d.count) * 100}%` }}
                  transition={{ duration: 0.9, delay: 0.15 * i, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject breakdown mini */}
      <div className="grid grid-cols-3 gap-2">
        {SUBJECTS.slice(0, 3).map(s => {
          const pct = Math.round((s.mastered / s.totalCards) * 100)
          return (
            <div key={s.id} className="bg-navy-900/50 rounded-xl p-3 text-center border border-navy-700/50">
              <div className="text-base font-bold font-mono" style={{ color: s.color }}>{pct}%</div>
              <div className="text-[9px] text-gray-600 mt-0.5 truncate">{s.shortName}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
