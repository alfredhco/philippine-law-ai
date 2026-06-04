import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ChevronRight, TrendingDown } from 'lucide-react'
import { SUBJECTS } from '../../data/subjects'

const weakSubjects = [...SUBJECTS]
  .sort((a, b) => a.progress - b.progress)
  .slice(0, 4)

export default function WeakSubjects() {
  const navigate = useNavigate()

  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 bg-red-500 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertTriangle size={15} className="text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Weak Subjects</p>
            <p className="text-xs text-gray-500">Needs more attention</p>
          </div>
        </div>
        <TrendingDown size={14} className="text-red-400/50" />
      </div>

      <div className="space-y-3">
        {weakSubjects.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => navigate('/analytics')}
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 text-xs font-bold text-red-400"
              style={{ background: `${s.color}15` }}>
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">{s.name}</p>
                <span className="text-xs font-bold text-red-400 tabular-nums ml-2">{s.progress}%</span>
              </div>
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: s.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.progress}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                />
              </div>
            </div>
            <ChevronRight size={13} className="text-gray-700 group-hover:text-gray-400 transition-colors shrink-0" />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-navy-700">
        <p className="text-xs text-gray-600 leading-relaxed">
          <span className="text-amber-400 font-semibold">Recommendation:</span> Focus on{' '}
          <span className="text-white">{weakSubjects[0].name}</span> — schedule 2 sessions this week.
        </p>
      </div>
    </div>
  )
}
