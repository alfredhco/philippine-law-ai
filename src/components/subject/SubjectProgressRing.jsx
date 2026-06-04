import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function SubjectProgressRing({
  value = 0,
  size = 80,
  strokeWidth = 6,
  color = '#f59e0b',
  showLabel = true,
  label = null,
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const cx = size / 2
  const cy = size / 2

  const progress = useMotionValue(0)
  const strokeDashoffset = useTransform(
    progress,
    (v) => circumference - (v / 100) * circumference
  )

  const displayValue = useRef(null)

  useEffect(() => {
    const controls = animate(progress, Math.min(100, Math.max(0, value)), {
      duration: 1.2,
      ease: 'easeOut',
    })
    return controls.stop
  }, [value, progress])

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          filter={`drop-shadow(0 0 ${strokeWidth}px ${color}60)`}
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            ref={displayValue}
            className="font-bold text-white leading-none"
            style={{ fontSize: size * 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(value)}%
          </motion.span>
          {label && (
            <span
              className="text-gray-500 leading-none mt-0.5"
              style={{ fontSize: size * 0.12 }}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
