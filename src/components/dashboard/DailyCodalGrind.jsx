import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle, ChevronRight, Hash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TODAY_PROVISIONS = [
  { article: 'Art. 1318', subject: 'Civil Law',    topic: 'Contracts', done: true  },
  { article: 'Art. 1319', subject: 'Civil Law',    topic: 'Contracts', done: true  },
  { article: 'Art. 4',    subject: 'Crim Law',     topic: 'RPC Book I', done: false },
  { article: 'Art. 12',   subject: 'Crim Law',     topic: 'RPC Book I', done: false },
  { article: 'Sec. 1',    subject: 'Pol Law',      topic: 'Art. II',   done: false },
]

export default function DailyCodalGrind() {
  const navigate  = useNavigate()
  const [done, setDone] = useState(new Set(TODAY_PROVISIONS.filter(p => p.done).map(p => p.article)))
  const completed = done.size
  const total     = TODAY_PROVISIONS.length

  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <BookOpen size={15} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Daily Codal Grind</p>
            <p className="text-xs text-gray-500">{completed}/{total} provisions today</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/codal')}
          className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1 transition-colors"
        >
          Open <ChevronRight size={12} />
        </button>
      </div>

      {/* Progress ring */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-14 h-14 shrink-0">
          <svg viewBox="0 0 56 56" className="-rotate-90 w-full h-full">
            <circle cx="28" cy="28" r="22" fill="none" stroke="#1a2a48" strokeWidth="6" />
            <motion.circle
              cx="28" cy="28" r="22"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 22}
              initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - completed / total) }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white font-mono">{Math.round((completed/total)*100)}%</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-white font-medium">{completed === total ? '🎉 All done!' : `${total - completed} left today`}</p>
          <p className="text-xs text-gray-500 mt-0.5">Keep reading daily provisions</p>
        </div>
      </div>

      {/* Provision list */}
      <div className="space-y-2">
        {TODAY_PROVISIONS.map((p, i) => {
          const isDone = done.has(p.article)
          return (
            <motion.div
              key={p.article}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setDone(prev => {
                const n = new Set(prev)
                isDone ? n.delete(p.article) : n.add(p.article)
                return n
              })}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-navy-700/40 cursor-pointer transition-all group"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                isDone ? 'border-blue-500 bg-blue-500/20' : 'border-navy-600 group-hover:border-navy-500'
              }`}>
                <AnimatePresence>
                  {isDone && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <CheckCircle size={12} className="text-blue-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <Hash size={10} className="text-gray-600 shrink-0" />
                <span className={`text-xs font-mono font-semibold ${isDone ? 'text-gray-600 line-through' : 'text-blue-400'}`}>
                  {p.article}
                </span>
                <span className="text-xs text-gray-500 truncate">{p.topic}</span>
              </div>
              <span className="text-[10px] text-gray-700 shrink-0">{p.subject}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
