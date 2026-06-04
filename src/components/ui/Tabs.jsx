import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function Tabs({ tabs, active, onChange, variant = 'default', className = '' }) {
  const variants = {
    default: {
      container: 'flex gap-1 p-1 bg-navy-800 rounded-xl border border-navy-700',
      tab: 'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
      active: 'text-white',
      inactive: 'text-gray-500 hover:text-gray-300',
      indicator: 'absolute inset-0 bg-navy-600 rounded-lg',
    },
    underline: {
      container: 'flex gap-6 border-b border-navy-700',
      tab: 'relative pb-3 text-sm font-medium transition-colors duration-200',
      active: 'text-gold-400',
      inactive: 'text-gray-500 hover:text-gray-300',
      indicator: 'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-accent-orange rounded-full',
    },
    pill: {
      container: 'flex gap-2',
      tab: 'relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border',
      active: 'text-navy-950 border-transparent',
      inactive: 'text-gray-400 border-navy-700 hover:text-gray-200 hover:border-navy-600',
      indicator: 'absolute inset-0 bg-gradient-to-r from-gold-500 to-accent-orange rounded-full',
    },
  }

  const v = variants[variant]

  return (
    <div className={cn(v.container, className)}>
      {tabs.map(tab => {
        const isActive = active === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(v.tab, isActive ? v.active : v.inactive)}
          >
            {isActive && (
              <motion.div
                layoutId={`tab-indicator-${variant}`}
                className={v.indicator}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {tab.icon && <tab.icon size={14} />}
              {tab.label}
              {tab.count != null && (
                <span className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-bold',
                  isActive ? 'bg-white/20' : 'bg-navy-700 text-gray-500'
                )}>
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
