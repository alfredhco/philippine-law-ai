import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays, Sparkles, TrendingDown, Shuffle,
  Timer, Skull, Trophy, BookOpen,
} from 'lucide-react'
import { SUBJECT_INFO } from '../../data/flashcards/index.js'
import Button from '../ui/Button'

const MODES = [
  {
    id: 'daily',
    label: 'Daily Review',
    icon: CalendarDays,
    color: '#f59e0b',
    desc: 'Cards due today — the core of spaced repetition',
    statKey: 'dueToday',
    statLabel: 'due',
    recommended: true,
  },
  {
    id: 'new',
    label: 'New Cards',
    icon: Sparkles,
    color: '#6366f1',
    desc: 'Learn unseen cards for the first time',
    statKey: 'newCards',
    statLabel: 'new',
  },
  {
    id: 'weak',
    label: 'Weak Topics',
    icon: TrendingDown,
    color: '#ef4444',
    desc: 'Cards you\'ve struggled with — target your gaps',
    statKey: null,
    statLabel: 'struggling',
  },
  {
    id: 'difficult',
    label: 'Hardest Cards',
    icon: Skull,
    color: '#dc2626',
    desc: 'Cards rated "Again" repeatedly — drill the tough ones',
    statKey: null,
    statLabel: 'difficult',
  },
  {
    id: 'random',
    label: 'Random Mix',
    icon: Shuffle,
    color: '#10b981',
    desc: 'Shuffle all cards for a mixed review session',
    statKey: 'total',
    statLabel: 'cards',
  },
  {
    id: 'timed',
    label: 'Timed Mode',
    icon: Timer,
    color: '#8b5cf6',
    desc: '60 seconds per card — race against the clock',
    statKey: 'dueToday',
    statLabel: 'timed',
  },
]

export default function SessionSetup({ stats, onStart }) {
  const [selectedMode,    setMode]    = useState('daily')
  const [subjectFilter,   setSubject] = useState('all')

  const selectedModeData = MODES.find(m => m.id === selectedMode)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-serif text-2xl font-bold text-white mb-1">Flashcard Study</h2>
        <p className="text-sm text-gray-500">Spaced repetition powered by the SM-2 algorithm</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Due Today',  value: stats.dueToday,   color: '#f59e0b' },
          { label: 'New Cards',  value: stats.newCards,   color: '#6366f1' },
          { label: 'Mastered',   value: stats.mastered,   color: '#10b981' },
          { label: 'Day Streak', value: `${stats.streak}🔥`, color: '#f97316' },
        ].map(s => (
          <div key={s.label} className="bg-navy-800/60 border border-navy-700/60 rounded-2xl p-4 text-center">
            <p className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mode selection */}
      <div>
        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Select Mode</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MODES.map((mode, i) => {
            const isSelected = selectedMode === mode.id
            const count = mode.statKey ? stats[mode.statKey] : '—'
            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode(mode.id)}
                className={`relative text-left p-4 rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'border-opacity-60'
                    : 'bg-navy-800/40 border-navy-700/60 hover:border-navy-600'
                }`}
                style={isSelected ? {
                  background: `${mode.color}12`,
                  borderColor: `${mode.color}50`,
                } : {}}
              >
                {mode.recommended && (
                  <span className="absolute top-2 right-2 text-[8px] font-bold px-1.5 py-0.5 bg-gold-500/20 text-gold-400 rounded-full uppercase tracking-wider">
                    Recommended
                  </span>
                )}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${mode.color}18` }}>
                    <mode.icon size={16} style={{ color: mode.color }} />
                  </div>
                  <span className="text-sm font-semibold text-white">{mode.label}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug mb-2">{mode.desc}</p>
                {count !== '—' && (
                  <p className="text-xs font-bold" style={{ color: mode.color }}>
                    {count} {mode.statLabel}
                  </p>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Subject filter */}
      <div>
        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Filter by Subject</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              subjectFilter === 'all'
                ? 'bg-gold-500/15 text-gold-400 border border-gold-500/30'
                : 'bg-navy-800 text-gray-500 hover:text-gray-300 border border-navy-700'
            }`}
          >
            All Subjects ({stats.total})
          </button>
          {stats.bySubject.map(s => (
            <button
              key={s.id}
              onClick={() => setSubject(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                subjectFilter === s.id ? 'text-white border' : 'bg-navy-800 text-gray-500 hover:text-gray-300 border border-navy-700'
              }`}
              style={subjectFilter === s.id ? {
                background: `${s.color}18`,
                borderColor: `${s.color}40`,
                color: s.color,
              } : {}}
            >
              {s.name} ({s.count})
            </button>
          ))}
        </div>
      </div>

      {/* Start button */}
      <div className="flex justify-center">
        <Button
          onClick={() => onStart(selectedMode, subjectFilter)}
          size="lg"
          icon={selectedModeData?.icon}
          className="min-w-48"
          style={{ background: `linear-gradient(135deg, ${selectedModeData?.color}, #f97316)` }}
        >
          Start {selectedModeData?.label}
        </Button>
      </div>

      {/* Progress overview */}
      <div className="bg-navy-800/40 border border-navy-700/60 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} className="text-gold-400" />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mastery Progress</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {stats.bySubject.map(s => (
            <div key={s.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">{s.name}</span>
                <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.pct}%</span>
              </div>
              <div className="h-1 bg-navy-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: s.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
