import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock } from 'lucide-react'
import { RARITY_COLORS, RARITY_LABELS } from '../../lib/progression.js'

const FILTERS = ['All', 'Unlocked', 'Locked', 'Legendary', 'Rare', 'Uncommon', 'Common']

function BadgeCard({ badge, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl p-4 border transition-all duration-200 cursor-default group ${
        badge.unlocked
          ? 'bg-navy-800/60 border-navy-600/60 hover:border-opacity-80'
          : 'bg-navy-900/40 border-navy-800/40 opacity-50'
      }`}
      style={badge.unlocked ? { borderColor: `${badge.color}25` } : undefined}
    >
      {/* Rarity glow */}
      {badge.unlocked && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${badge.color}10, transparent 70%)` }} />
      )}

      {/* Rarity stripe at top */}
      <div className="absolute top-0 left-4 right-4 h-px rounded-full" style={{ background: badge.unlocked ? `${badge.rarityColor}60` : 'transparent' }} />

      <div className="flex flex-col items-center gap-2 text-center">
        {/* Icon */}
        <div className="relative">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-200 ${badge.unlocked ? 'group-hover:scale-110' : ''}`}
            style={{ background: badge.unlocked ? `${badge.color}18` : '#1e2d4510' }}>
            {badge.unlocked ? badge.icon : <Lock size={16} className="text-gray-700" />}
          </div>
          {badge.unlocked && (
            <motion.div
              initial={false}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.4 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"
            >
              <span className="text-[8px] text-white font-bold">✓</span>
            </motion.div>
          )}
        </div>

        {/* Name */}
        <div>
          <p className={`text-xs font-semibold leading-tight ${badge.unlocked ? 'text-white' : 'text-gray-600'}`}>
            {badge.name}
          </p>
          <p className="text-[10px] text-gray-600 mt-0.5 leading-tight">{badge.desc}</p>
        </div>

        {/* Rarity badge */}
        <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
          style={{ color: badge.rarityColor, background: `${badge.rarityColor}15` }}>
          {RARITY_LABELS[badge.rarity]}
        </span>
      </div>

      {/* Tooltip on hover for locked */}
      <AnimatePresence>
        {hovered && !badge.unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-navy-700 border border-navy-600 rounded-xl text-xs text-gray-300 whitespace-nowrap z-20 shadow-navy pointer-events-none"
          >
            {badge.desc}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function AchievementGrid({ achievements, unlockedCount }) {
  const [filter, setFilter] = useState('All')

  const filtered = achievements.filter(a => {
    if (filter === 'All')      return true
    if (filter === 'Unlocked') return a.unlocked
    if (filter === 'Locked')   return !a.unlocked
    return a.rarity === filter.toLowerCase()
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{unlockedCount} / {achievements.length} Unlocked</p>
          <div className="w-32 h-1.5 bg-navy-700 rounded-full mt-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                filter === f ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'text-gray-500 hover:text-gray-300 border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((badge, i) => (
          <BadgeCard key={badge.id} badge={badge} index={i} />
        ))}
      </div>
    </div>
  )
}
