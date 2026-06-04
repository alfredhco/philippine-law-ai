import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCard({ title, value, subtitle, icon: Icon, color = '#f59e0b', trend, index = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3, scale: 1.02 }}
      onClick={onClick}
      className="relative bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-opacity-80 hover:shadow-navy-lg"
      style={{ '--accent': color }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />

      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${color}08, transparent 60%)` }} />

      <div className="relative flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <Icon size={18} style={{ color }} />
        </motion.div>

        {trend != null && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
            trend >= 0
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'
          }`}>
            {trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            <span>{trend > 0 ? '+' : ''}{trend}%</span>
          </div>
        )}
      </div>

      <div className="relative">
        <motion.p
          className="text-2xl font-bold text-white font-mono tabular-nums leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.2 }}
        >
          {value}
        </motion.p>
        <p className="text-sm text-gray-400 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
      </div>

      {/* Bottom micro-bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
    </motion.div>
  )
}
