import { motion } from 'framer-motion'
import { Shield, Mic, TrendingUp } from 'lucide-react'

export default function RecitationSurvival({ recitation = { current: 0, best: 0, total: 0 } }) {
  const { current, best, total } = recitation
  const survivalRate = total > 0 ? Math.round((best / total) * 100) : 0

  const tier = current >= 10 ? { label: 'Legendary', color: '#f59e0b' }
             : current >= 5  ? { label: 'Veteran',   color: '#10b981' }
             : current >= 3  ? { label: 'Resilient', color: '#6366f1' }
             : current >= 1  ? { label: 'Surviving', color: '#60a5fa' }
             :                 { label: 'Untested',  color: '#6b7280' }

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{ background: tier.color }} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${tier.color}18` }}>
            <Shield size={15} style={{ color: tier.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Recitation Survival</p>
            <p className="text-xs text-gray-500">Consecutive 75%+ sessions</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ color: tier.color, background: `${tier.color}15` }}>
          {tier.label}
        </span>
      </div>

      {/* Big survival number */}
      <div className="flex items-end gap-6 mb-5">
        <div>
          <motion.p
            key={current}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-5xl font-bold font-mono leading-none"
            style={{ color: tier.color }}
          >
            {current}
          </motion.p>
          <p className="text-xs text-gray-500 mt-1">current streak</p>
        </div>
        <div className="pb-1 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp size={11} className="text-gold-400" />
            <span className="text-gray-500">Best:</span>
            <span className="font-bold text-gold-400">{best}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Mic size={11} className="text-gray-500" />
            <span className="text-gray-500">Total sessions:</span>
            <span className="font-semibold text-gray-300">{total}</span>
          </div>
        </div>
      </div>

      {/* Survival dots */}
      <div className="flex gap-1.5 mb-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex-1 h-2 rounded-full transition-colors duration-300"
            style={{ background: i < current ? tier.color : i < best ? `${tier.color}30` : '#1e2d45' }}
          />
        ))}
      </div>

      <p className="text-[10px] text-gray-600">
        {current === 0 ? 'Score 75%+ on your next recitation to start a survival streak.' :
         current < 5  ? `${5 - current} more to reach Veteran tier.` :
         current < 10 ? `${10 - current} more to reach Legendary status!` :
         'You have reached Legendary status! 🏆'}
      </p>
    </div>
  )
}
