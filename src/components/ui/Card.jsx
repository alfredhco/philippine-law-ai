import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-navy-800/60 backdrop-blur-md border border-navy-600/60',
  elevated:'bg-navy-800/80 backdrop-blur-xl border border-navy-600/80 shadow-navy-lg',
  glass:   'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]',
  solid:   'bg-navy-800 border border-navy-700',
  glow:    'bg-navy-800/60 backdrop-blur-md border border-gold-500/20 shadow-gold',
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
  padding = 'p-5',
  animate = true,
  delay = 0,
  accentColor,
}) {
  const hoverClass = hover
    ? 'hover:border-gold-500/30 hover:shadow-gold cursor-pointer transition-all duration-300 group'
    : ''

  const content = (
    <div className={cn(variants[variant], hoverClass, 'rounded-2xl relative overflow-hidden', padding, className)} onClick={onClick}>
      {accentColor && (
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }} />
      )}
      {children}
    </div>
  )

  if (!animate) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -2 } : undefined}
    >
      {content}
    </motion.div>
  )
}
