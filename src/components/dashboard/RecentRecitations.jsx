import { motion } from 'framer-motion'
import { Mic, Star, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RECITATIONS = [
  { subject: 'Civil Law',    topic: 'Vitiated Consent',        score: 85, stars: 4, time: '2h ago'   },
  { subject: 'Criminal Law', topic: 'Stages of Execution',     score: 72, stars: 3, time: '5h ago'   },
  { subject: 'Pol Law',      topic: 'Political Question Doctrine', score: 90, stars: 5, time: 'Yesterday' },
  { subject: 'Remedial Law', topic: 'Exhaustion of Admin Remedies', score: 68, stars: 3, time: '2d ago' },
]

const COLOR_MAP = {
  'Civil Law':    { color: '#6366f1', bg: '#6366f115' },
  'Criminal Law': { color: '#ef4444', bg: '#ef444415' },
  'Pol Law':      { color: '#0ea5e9', bg: '#0ea5e915' },
  'Remedial Law': { color: '#10b981', bg: '#10b98115' },
}

export default function RecentRecitations() {
  const navigate = useNavigate()

  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Mic size={15} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Recent Recitations</p>
            <p className="text-xs text-gray-500">Your oral practice history</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/oral')}
          className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1 transition-colors"
        >
          All <ChevronRight size={12} />
        </button>
      </div>

      <div className="space-y-3">
        {RECITATIONS.map((r, i) => {
          const c = COLOR_MAP[r.subject] || { color: '#f59e0b', bg: '#f59e0b15' }
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 group cursor-pointer hover:bg-navy-700/30 rounded-xl p-2 -mx-2 transition-all"
              onClick={() => navigate('/oral')}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.bg }}>
                <Mic size={15} style={{ color: c.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors truncate">{r.topic}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-gray-600">{r.subject}</span>
                  <span className="text-[10px] text-gray-700">·</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={8} className={si < r.stars ? 'text-gold-400 fill-gold-400' : 'text-gray-700'} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold tabular-nums" style={{ color: r.score >= 80 ? '#10b981' : r.score >= 70 ? '#f59e0b' : '#ef4444' }}>
                  {r.score}%
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">{r.time}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
