import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, BookOpen } from 'lucide-react'
import { SUBJECTS } from '../../data/subjects'
import { Tabs } from '../ui/Tabs'

const tabs = [
  { label: 'All',       value: 'all'      },
  { label: 'Weak',      value: 'weak'     },
  { label: 'Strong',    value: 'strong'   },
]

export default function SubjectProgress() {
  const navigate  = useNavigate()
  const [tab, setTab] = useState('all')

  const filtered = tab === 'weak'   ? [...SUBJECTS].sort((a,b) => a.progress - b.progress).slice(0, 5) :
                   tab === 'strong' ? [...SUBJECTS].sort((a,b) => b.progress - a.progress).slice(0, 5) :
                   SUBJECTS

  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 flex items-center justify-center">
            <BookOpen size={15} className="text-gold-400" />
          </div>
          <h2 className="text-sm font-semibold text-white">Subject Progress</h2>
        </div>
        <div className="flex items-center gap-3">
          <Tabs tabs={tabs} active={tab} onChange={setTab} variant="default" className="scale-90 origin-right" />
          <button
            onClick={() => navigate('/analytics')}
            className="hidden sm:flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
          >
            Full report <ChevronRight size={11} />
          </button>
        </div>
      </div>

      <div className="space-y-3.5">
        {filtered.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group cursor-pointer"
            onClick={() => navigate('/analytics')}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: subject.color }} />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">
                  {subject.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-600 hidden sm:block">{subject.mastered}/{subject.totalCards} cards</span>
                <span className="text-xs font-bold tabular-nums w-10 text-right" style={{ color: subject.color }}>
                  {subject.progress}%
                </span>
              </div>
            </div>

            <div className="relative h-1.5 bg-navy-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{ background: `linear-gradient(90deg, ${subject.color}aa, ${subject.color})` }}
                initial={{ width: 0 }}
                animate={{ width: `${subject.progress}%` }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: 'easeOut' }}
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-shimmer opacity-30 group-hover:opacity-60 transition-opacity" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary row */}
      <div className="mt-5 pt-4 border-t border-navy-700 grid grid-cols-3 gap-4">
        {[
          { label: 'Subjects', value: SUBJECTS.length, color: '#f59e0b' },
          { label: 'Cards Done', value: SUBJECTS.reduce((s,sub) => s + sub.mastered, 0), color: '#10b981' },
          { label: 'Avg Progress', value: `${Math.round(SUBJECTS.reduce((s,sub) => s + sub.progress, 0) / SUBJECTS.length)}%`, color: '#6366f1' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <p className="text-base font-bold font-mono" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[10px] text-gray-600 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
