import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS   = ['M','','W','','F','','S']

function generateHeatmapData() {
  const today = new Date()
  const data = []
  for (let i = 104; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const rand = Math.random()
    const minutes = rand < 0.15 ? 0 :
                    rand < 0.35 ? Math.floor(Math.random() * 30) + 5 :
                    rand < 0.60 ? Math.floor(Math.random() * 60) + 30 :
                    rand < 0.82 ? Math.floor(Math.random() * 60) + 60 :
                                  Math.floor(Math.random() * 60) + 120
    data.push({ date: d, minutes, dateStr: d.toDateString() })
  }
  return data
}

const DATA = generateHeatmapData()

function getColor(minutes) {
  if (minutes === 0)   return 'bg-navy-800 border-navy-700'
  if (minutes < 30)   return 'bg-gold-900/40 border-gold-800/30'
  if (minutes < 60)   return 'bg-gold-700/50 border-gold-600/30'
  if (minutes < 120)  return 'bg-gold-500/70 border-gold-400/40'
  return 'bg-gradient-to-br from-gold-400 to-orange-500 border-gold-300/50 shadow-sm'
}

export default function StudyHeatmap() {
  const [tooltip, setTooltip] = useState(null)
  const weeks = []
  for (let i = 0; i < DATA.length; i += 7) weeks.push(DATA.slice(i, i + 7))

  const totalMinutes = DATA.reduce((s, d) => s + d.minutes, 0)
  const activeDays   = DATA.filter(d => d.minutes > 0).length
  const currentStreak = (() => {
    let streak = 0
    for (let i = DATA.length - 1; i >= 0; i--) {
      if (DATA[i].minutes > 0) streak++
      else break
    }
    return streak
  })()

  return (
    <div className="bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 flex items-center justify-center">
            <Activity size={15} className="text-gold-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Study Heatmap</p>
            <p className="text-xs text-gray-500">Last 15 weeks</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span><span className="text-white font-semibold">{activeDays}</span> active days</span>
          <span><span className="text-gold-400 font-semibold">{Math.round(totalMinutes / 60)}h</span> total</span>
          <span><span className="text-orange-400 font-semibold">{currentStreak}d</span> streak</span>
        </div>
      </div>

      <div className="flex gap-2">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] pt-5">
          {DAYS.map((d, i) => (
            <div key={i} className="h-[14px] text-[9px] text-gray-600 flex items-center w-3">{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-[3px] min-w-max">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {/* Month label above first week of month */}
                <div className="h-4 text-[9px] text-gray-600 flex items-center">
                  {week[0] && week[0].date.getDate() <= 7
                    ? MONTHS[week[0].date.getMonth()]
                    : ''}
                </div>
                {week.map((day, di) => (
                  <motion.div
                    key={di}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: (wi * 7 + di) * 0.003 }}
                    onMouseEnter={() => setTooltip(day)}
                    onMouseLeave={() => setTooltip(null)}
                    className={`w-[14px] h-[14px] rounded-[3px] border cursor-pointer transition-all duration-150 hover:scale-125 hover:z-10 ${getColor(day.minutes)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-3">
        <span className="text-[10px] text-gray-600">Less</span>
        {[0, 20, 45, 90, 140].map((m, i) => (
          <div key={i} className={`w-[12px] h-[12px] rounded-[2px] border ${getColor(m)}`} />
        ))}
        <span className="text-[10px] text-gray-600">More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-xs text-white pointer-events-none z-20 whitespace-nowrap shadow-navy">
          <p className="font-semibold">{tooltip.dateStr}</p>
          <p className="text-gray-400">{tooltip.minutes > 0 ? `${tooltip.minutes} min studied` : 'No study'}</p>
        </div>
      )}
    </div>
  )
}
