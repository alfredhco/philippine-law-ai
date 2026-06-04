import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

const variants = {
  primary:  'bg-gradient-to-r from-gold-500 to-accent-orange text-navy-950 font-semibold shadow-glow hover:shadow-gold hover:brightness-105',
  secondary:'bg-navy-700 text-gray-300 font-medium hover:bg-navy-600 hover:text-white border border-navy-600 hover:border-navy-500',
  ghost:    'text-gray-400 hover:text-gold-400 hover:bg-navy-700/50',
  danger:   'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30',
  outline:  'border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/50',
  glass:    'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20',
  success:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20',
}

const sizes = {
  xs: 'px-2.5 py-1 text-xs gap-1.5 rounded-lg',
  sm: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-lg',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-7 py-3 text-sm gap-2 rounded-xl',
  xl: 'px-8 py-3.5 text-base gap-2.5 rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  icon: Icon,
  iconRight: IconRight,
  type = 'button',
  full = false,
}) {
  return (
    <motion.button
      type={type}
      whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-40 cursor-not-allowed',
        full && 'w-full',
        className
      )}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'xs' || size === 'sm' ? 13 : 15} />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight size={13} className="ml-auto" />}
    </motion.button>
  )
}
