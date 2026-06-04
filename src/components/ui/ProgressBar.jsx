import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function ProgressBar({ value = 0, color = '#f59e0b', className = '', showLabel = false, size = 'md' }) {
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-medium" style={{ color }}>{value}%</span>
        </div>
      )}
      <div className={cn('w-full bg-navy-700 rounded-full overflow-hidden', heights[size])}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
