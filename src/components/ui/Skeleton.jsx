import { cn } from '../../lib/utils'

function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-navy-700 via-navy-600 to-navy-700 bg-[length:200%_100%]',
        className
      )}
      style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.8s infinite' }}
      {...props}
    />
  )
}

export function SkeletonCard({ rows = 3 }) {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-3" style={{ width: `${85 - i * 10}%` }} />
      ))}
    </div>
  )
}

export function SkeletonStat() {
  return (
    <div className="glass-card p-5 space-y-3">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="h-7 w-20" />
      <Skeleton className="h-3 w-28" />
    </div>
  )
}

export function SkeletonList({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-2.5 w-1/2" />
          </div>
          <Skeleton className="h-3 w-12 shrink-0" />
        </div>
      ))}
    </div>
  )
}

export default Skeleton
