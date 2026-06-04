import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, TrendingUp, Clock, Target, Award, Zap, BookOpen, Mic, CheckCircle } from 'lucide-react'
import { getProgressSnapshot } from '../lib/progress.js'
import ProgressBar from '../components/ui/ProgressBar'

function StatCard({ label, value, sub, icon: Icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-5"
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}18` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <p className="text-2xl font-bold text-white font-mono">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
      <p className="text-xs text-gray-600 mt-0.5">{sub}</p>
    </motion.div>
  )
}

export default function Analytics() {
  const snap = useMemo(() => getProgressSnapshot(), [])

  const {
    readiness, masteredCards, totalCards, streak, monthlyMinutes,
    flashcards, barReview, recitation,
    weekly, subjectBreakdown, insights,
  } = snap

  const maxMinutes  = Math.max(...weekly.map(d => d.minutes), 1)
  const studyHours  = Math.round(monthlyMinutes / 60)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <BarChart2 size={20} className="text-blue-400" />
        </div>
        <div>
          <h2 className="section-title">Study Analytics</h2>
          <p className="text-xs text-gray-500 mt-0.5">Track your real progress across all modules</p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Bar Readiness"  value={`${readiness}%`}            sub="Overall"       icon={Target}   color="#f59e0b" delay={0}    />
        <StatCard label="Cards Mastered" value={masteredCards}               sub={`of ${totalCards}`} icon={Award} color="#10b981" delay={0.06} />
        <StatCard label="Study Hours"    value={studyHours > 0 ? `${studyHours}h` : '—'} sub="This month" icon={Clock}   color="#6366f1" delay={0.12} />
        <StatCard label="Current Streak" value={streak > 0 ? `${streak}d` : '—'} sub="Keep going!" icon={Zap}    color="#f97316" delay={0.18} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly activity */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title">Weekly Activity</h3>
            <span className="text-xs text-gray-500">minutes studied</span>
          </div>
          {weekly.every(d => d.minutes === 0) ? (
            <div className="h-40 flex items-center justify-center">
              <p className="text-xs text-gray-600">No activity logged yet — start a study session!</p>
            </div>
          ) : (
            <div className="flex items-end gap-2 h-40">
              {weekly.map((day, i) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
                  {day.minutes > 0 && (
                    <span className="text-[10px] text-gray-600 font-mono">{day.minutes}m</span>
                  )}
                  <motion.div
                    className="w-full rounded-t-md min-h-[3px]"
                    style={{ background: 'linear-gradient(180deg, #f59e0b, #f97316)' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max((day.minutes / maxMinutes) * 120, day.minutes > 0 ? 4 : 3)}px` }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                  />
                  <span className="text-[10px] text-gray-500">{day.day}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject breakdown */}
        <div className="glass-card p-5">
          <h3 className="section-title mb-4">Subject Breakdown</h3>
          <div className="space-y-3.5">
            {subjectBreakdown.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                    <span className="text-xs text-gray-300">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-600">{s.mastered}/{s.total}</span>
                    <span className="font-semibold tabular-nums w-8 text-right" style={{ color: s.color }}>{s.pct}%</span>
                  </div>
                </div>
                <ProgressBar value={s.pct} color={s.color} size="sm" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Module stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Flashcards */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={14} className="text-indigo-400" />
            <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Flashcards</p>
          </div>
          {[
            { label: 'Mastered',  value: flashcards.mastered,  color: '#10b981' },
            { label: 'Learning',  value: flashcards.learning,  color: '#f59e0b' },
            { label: 'Not seen',  value: flashcards.total - flashcards.mastered - flashcards.learning, color: '#6b7280' },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between text-xs">
              <span className="text-gray-500">{row.label}</span>
              <span className="font-semibold" style={{ color: row.color }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Bar Review */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Award size={14} className="text-red-400" />
            <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Bar Review</p>
          </div>
          {barReview.sessions > 0 ? (
            <>
              {[
                { label: 'Sessions done',  value: barReview.sessions },
                { label: 'Avg score',      value: `${barReview.avgScore}%`,  color: barReview.avgScore >= 75 ? '#10b981' : '#f97316' },
                { label: 'Best score',     value: `${barReview.bestScore}%`, color: '#f59e0b' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-semibold" style={{ color: row.color ?? '#e5e7eb' }}>{row.value}</span>
                </div>
              ))}
            </>
          ) : (
            <p className="text-xs text-gray-600">No sessions yet. Start a mock bar exam!</p>
          )}
        </div>

        {/* Recitation */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Mic size={14} className="text-emerald-400" />
            <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Recitation</p>
          </div>
          {recitation.sessions > 0 ? (
            <>
              {[
                { label: 'Sessions done',  value: recitation.sessions },
                { label: 'Avg score',      value: `${recitation.avgScore}%`, color: recitation.avgScore >= 75 ? '#10b981' : '#f97316' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-semibold" style={{ color: row.color ?? '#e5e7eb' }}>{row.value}</span>
                </div>
              ))}
            </>
          ) : (
            <p className="text-xs text-gray-600">No sessions yet. Face a professor!</p>
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-gold-400" />
          <h3 className="section-title">Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-navy-800 rounded-xl p-4 border border-navy-700">
            <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Strongest Subject</p>
            {insights.strongest ? (
              <>
                <p className="text-base font-bold mb-1" style={{ color: insights.strongest.color }}>{insights.strongest.name}</p>
                <p className="text-xs text-gray-400">{insights.strongest.pct}% mastery — your most consistent performance.</p>
              </>
            ) : (
              <p className="text-xs text-gray-600">Study some flashcards to see this.</p>
            )}
          </div>
          <div className="bg-navy-800 rounded-xl p-4 border border-navy-700">
            <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Needs Attention</p>
            {insights.weakest ? (
              <>
                <p className="text-base font-bold text-red-400 mb-1">{insights.weakest.name}</p>
                <p className="text-xs text-gray-400">Only {insights.weakest.pct}% mastery. Schedule more sessions.</p>
              </>
            ) : (
              <p className="text-xs text-gray-600">Study some flashcards to see this.</p>
            )}
          </div>
          <div className="bg-navy-800 rounded-xl p-4 border border-navy-700">
            <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Best Study Day</p>
            {insights.bestDay ? (
              <>
                <p className="text-base font-bold text-emerald-400 mb-1">{insights.bestDay.day}</p>
                <p className="text-xs text-gray-400">You studied {insights.bestDay.minutes} min — your most productive day.</p>
              </>
            ) : (
              <p className="text-xs text-gray-600">Complete some sessions to see your best day.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
