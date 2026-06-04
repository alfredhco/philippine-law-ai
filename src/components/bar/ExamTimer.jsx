import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Clock, Pause, Play } from 'lucide-react'

export default function ExamTimer({ totalMinutes, onExpire, onPause }) {
  const [secondsLeft, setSecondsLeft] = useState(totalMinutes * 60)
  const [paused, setPaused]           = useState(false)
  const intervalRef                    = useRef(null)

  useEffect(() => {
    if (paused) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { clearInterval(intervalRef.current); onExpire?.(); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [paused, onExpire])

  const hours   = Math.floor(secondsLeft / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60
  const totalSeconds = totalMinutes * 60
  const pct     = (secondsLeft / totalSeconds) * 100

  const warning  = secondsLeft <= 30 * 60  // 30 min
  const critical = secondsLeft <= 10 * 60  // 10 min
  const color    = critical ? '#ef4444' : warning ? '#f97316' : '#10b981'

  const handlePause = () => {
    setPaused(p => !p)
    onPause?.(!paused)
  }

  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
      critical ? 'bg-red-500/10 border-red-500/30' :
      warning  ? 'bg-orange-500/10 border-orange-500/30' :
                 'bg-navy-800/60 border-navy-700/60'
    }`}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1.5">
          <Clock size={13} style={{ color }} />
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
            {critical ? 'TIME CRITICAL' : warning ? 'TIME WARNING' : 'Time Remaining'}
          </span>
        </div>
        <button
          onClick={handlePause}
          className="p-1 rounded-lg transition-all hover:bg-navy-700"
          style={{ color }}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>

      <div className="text-center">
        <motion.p
          className="text-3xl font-mono font-bold tabular-nums"
          style={{ color }}
          animate={critical ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {hours > 0 && `${String(hours).padStart(2, '0')}:`}
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </motion.p>
        {paused && <p className="text-[10px] text-gray-500 mt-0.5">PAUSED</p>}
      </div>

      <div className="w-full h-1.5 bg-navy-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full transition-colors duration-300"
          style={{ background: color, width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
