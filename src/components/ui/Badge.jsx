import { cn } from '../../lib/utils'

const variants = {
  gold: 'bg-gold-500/10 text-gold-400 border border-gold-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  red: 'bg-red-500/10 text-red-400 border border-red-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  gray: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
}

export default function Badge({ children, variant = 'gray', className = '' }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
