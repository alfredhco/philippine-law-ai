import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = 'Get started by adding your first item.',
  action,
  actionLabel = 'Get Started',
  compact = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center ${compact ? 'py-8 px-4' : 'py-16 px-6'}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center mb-4">
        <Icon size={22} className="text-gray-600" />
      </div>
      <h3 className="text-sm font-semibold text-gray-400 mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-gray-600 leading-relaxed max-w-xs mb-5">{description}</p>
      )}
      {action && (
        <Button onClick={action} size="sm" variant="secondary">{actionLabel}</Button>
      )}
    </motion.div>
  )
}
