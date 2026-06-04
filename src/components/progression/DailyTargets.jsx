import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CreditCard, Award, CheckCircle, Circle, Settings2 } from 'lucide-react'
import { setTargets, getTodayTargets } from '../../lib/progression.js'

const TARGET_CONFIG = [
  { key: 'minutes',      icon: Clock,       label: 'Study minutes',     color: '#f59e0b', unit: 'min', min: 10, max: 240, step: 10 },
  { key: 'flashcards',   icon: CreditCard,  label: 'Flashcards reviewed',color: '#6366f1', unit: '',   min: 5,  max: 100, step: 5  },
  { key: 'barQuestions', icon: Award,       label: 'Bar questions',      color: '#ef4444', unit: '',   min: 1,  max: 50,  step: 1  },
]

function TargetRow({ config, target, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className="flex items-center gap-3"
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${config.color}18` }}>
        <config.icon size={14} style={{ color: config.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">{config.label}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono tabular-nums text-white">{target.current}</span>
            <span className="text-[10px] text-gray-600">/ {target.goal}{config.unit}</span>
            {target.done && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                <CheckCircle size={12} className="text-emerald-400" />
              </motion.span>
            )}
          </div>
        </div>
        <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: target.done ? '#10b981' : `linear-gradient(90deg, ${config.color}80, ${config.color})` }}
            initial={{ width: 0 }}
            animate={{ width: `${target.pct}%` }}
            transition={{ duration: 1, delay: index * 0.07, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function DailyTargets({ todayTargets, dailyTargetConfig, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(dailyTargetConfig)

  const saveTargets = () => {
    setTargets(draft)
    onUpdate?.()
    setEditing(false)
  }

  const completedCount = TARGET_CONFIG.filter(c => todayTargets[c.key]?.done).length

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 flex items-center justify-center">
            {completedCount === 3
              ? <CheckCircle size={15} className="text-emerald-400" />
              : <Circle size={15} className="text-gold-400" />
            }
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Daily Targets</p>
            <p className="text-xs text-gray-500">{completedCount}/3 complete today</p>
          </div>
        </div>
        <button
          onClick={() => setEditing(e => !e)}
          className="p-1.5 rounded-lg text-gray-600 hover:text-gold-400 hover:bg-navy-700 transition-all"
        >
          <Settings2 size={13} />
        </button>
      </div>

      {/* All-done celebration */}
      {todayTargets.allDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
        >
          <p className="text-xs font-bold text-emerald-400">🎉 All targets complete! +50 XP earned</p>
        </motion.div>
      )}

      {/* Target rows */}
      {!editing && (
        <div className="space-y-3">
          {TARGET_CONFIG.map((c, i) => (
            <TargetRow key={c.key} config={c} target={todayTargets[c.key]} index={i} />
          ))}
        </div>
      )}

      {/* Edit mode */}
      {editing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {TARGET_CONFIG.map(c => (
            <div key={c.key} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <c.icon size={13} style={{ color: c.color }} />
                <span className="text-xs text-gray-400">{c.label}</span>
              </div>
              <input
                type="number"
                value={draft[c.key]}
                min={c.min} max={c.max} step={c.step}
                onChange={e => setDraft(d => ({ ...d, [c.key]: Number(e.target.value) }))}
                className="w-16 bg-navy-800 border border-navy-700 rounded-lg px-2 py-1 text-xs text-center text-white font-mono outline-none focus:border-gold-500/40"
              />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button onClick={() => setEditing(false)} className="flex-1 py-1.5 text-xs text-gray-500 hover:text-gray-300 border border-navy-700 rounded-xl transition-colors">Cancel</button>
            <button onClick={saveTargets} className="flex-1 py-1.5 text-xs font-semibold text-navy-950 bg-gold-500 rounded-xl hover:bg-gold-400 transition-colors">Save</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
