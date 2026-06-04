import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart2, BookOpen, Mic, Award, TrendingUp, Clock,
  Bell, BellOff, CheckCircle,
} from 'lucide-react'
import { getProgressSnapshot } from '../lib/progress.js'
import { getProgressionSnapshot, setReminder, LEVELS } from '../lib/progression.js'
import { getWeeklyActivity } from '../lib/activity.js'
import { Tabs } from '../components/ui/Tabs'
import ProgressBar from '../components/ui/ProgressBar'
import StudyHeatmap from '../components/dashboard/StudyHeatmap'
import XPBar from '../components/progression/XPBar'
import MasteryRings from '../components/progression/MasteryRings'
import AchievementGrid from '../components/progression/AchievementGrid'
import DailyTargets from '../components/progression/DailyTargets'
import RecitationSurvival from '../components/progression/RecitationSurvival'

const TABS = [
  { label: 'Progress',      value: 'progress'  },
  { label: 'Achievements',  value: 'achievements' },
  { label: 'Stats',         value: 'stats'     },
  { label: 'Daily',         value: 'daily'     },
]

// ─── Radar chart (SVG, 9 subjects) ───────────────────────────────────────────
function RadarChart({ subjects }) {
  const N = subjects.length
  const CX = 120, CY = 120, R = 90
  const angle = (i) => (i * 2 * Math.PI / N) - Math.PI / 2

  const gridLevels = [0.25, 0.5, 0.75, 1.0]

  const dataPoints = subjects.map((s, i) => {
    const a = angle(i)
    const r = (s.pct / 100) * R
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a), ...s }
  })

  const polygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="glass-card p-5">
      <p className="text-sm font-semibold text-white mb-4">Subject Radar</p>
      <div className="flex justify-center">
        <svg width={240} height={240} viewBox="0 0 240 240">
          {/* Grid rings */}
          {gridLevels.map((level, li) => {
            const pts = subjects.map((_, i) => {
              const a = angle(i)
              const r = level * R
              return `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`
            }).join(' ')
            return <polygon key={li} points={pts} fill="none" stroke="#1e3a5f" strokeWidth={1} />
          })}

          {/* Axis lines */}
          {subjects.map((_, i) => {
            const a = angle(i)
            return <line key={i} x1={CX} y1={CY} x2={CX + R * Math.cos(a)} y2={CY + R * Math.sin(a)} stroke="#1e3a5f" strokeWidth={1} />
          })}

          {/* Data polygon */}
          <motion.polygon
            points={polygon}
            fill="#f59e0b18"
            stroke="#f59e0b"
            strokeWidth={1.5}
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* Data points */}
          {dataPoints.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x} cy={p.y} r={3}
              fill={p.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 + 0.4 }}
              style={{ filter: `drop-shadow(0 0 3px ${p.color})` }}
            />
          ))}

          {/* Labels */}
          {subjects.map((s, i) => {
            const a = angle(i)
            const labelR = R + 18
            const x = CX + labelR * Math.cos(a)
            const y = CY + labelR * Math.sin(a)
            const shortName = s.name.replace(' Law', '').replace('Legal ', '')
            return (
              <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize={7} fill={s.pct > 0 ? s.color : '#6b7280'} fontWeight="600">
                {shortName.length > 8 ? shortName.slice(0, 7) + '…' : shortName}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// ─── Weekly chart ─────────────────────────────────────────────────────────────
function WeeklyChart({ weekly }) {
  const max = Math.max(...weekly.map(d => d.minutes), 1)
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold text-white">Weekly Activity</p>
        <span className="text-xs text-gray-500">minutes</span>
      </div>
      {weekly.every(d => d.minutes === 0) ? (
        <div className="h-32 flex items-center justify-center">
          <p className="text-xs text-gray-600">No activity logged — start a session!</p>
        </div>
      ) : (
        <div className="flex items-end gap-2 h-32">
          {weekly.map((day, i) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
              {day.minutes > 0 && <span className="text-[9px] text-gray-600 font-mono">{day.minutes}m</span>}
              <motion.div
                className="w-full rounded-t-md min-h-[3px]"
                style={{ background: 'linear-gradient(180deg, #f59e0b, #f97316)' }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max((day.minutes / max) * 100, day.minutes > 0 ? 4 : 3)}px` }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
              />
              <span className="text-[10px] text-gray-500">{day.day}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Level timeline ───────────────────────────────────────────────────────────
function LevelTimeline({ levelInfo }) {
  const { current } = levelInfo
  return (
    <div className="glass-card p-5">
      <p className="text-sm font-semibold text-white mb-4">Level Progression</p>
      <div className="space-y-2">
        {LEVELS.map((level, i) => {
          const isReached  = current.level >= level.level
          const isCurrent  = current.level === level.level
          return (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                isCurrent ? 'bg-navy-700/60 border border-navy-600/60' : ''
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 transition-all ${
                isReached ? 'ring-1' : 'opacity-30'
              }`} style={{ background: isReached ? `${level.color}20` : '#1e2d45', ringColor: level.color }}>
                <span className={isReached ? '' : 'grayscale'}>{level.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-white' : isReached ? 'text-gray-400' : 'text-gray-700'}`}>
                    Lv.{level.level} {level.title}
                  </span>
                  {isCurrent && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-bold">YOU</span>}
                </div>
              </div>
              <span className="text-[10px] font-mono text-gray-600">{level.xp.toLocaleString()} XP</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Reminder settings ────────────────────────────────────────────────────────
function ReminderSettings({ reminderTime, reminderEnabled, onUpdate }) {
  const [time, setTime] = useState(reminderTime)
  const [enabled, setEnabled] = useState(reminderEnabled)

  const save = () => {
    setReminder(time, enabled)
    onUpdate?.()
    if (enabled && 'Notification' in window) {
      Notification.requestPermission()
    }
  }

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <Bell size={15} className="text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Study Reminders</p>
          <p className="text-xs text-gray-500">Daily reminder to keep your streak alive</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Enable reminders</span>
        <button
          onClick={() => setEnabled(e => !e)}
          className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${enabled ? 'bg-gold-500' : 'bg-navy-700'}`}
        >
          <motion.div
            animate={{ x: enabled ? 20 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
          />
        </button>
      </div>
      {enabled && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Reminder time</span>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="bg-navy-800 border border-navy-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-gold-500/40"
          />
        </motion.div>
      )}
      <button
        onClick={save}
        className="w-full py-2 text-xs font-semibold text-navy-950 bg-gold-500 rounded-xl hover:bg-gold-400 transition-colors"
      >
        Save Settings
      </button>
    </div>
  )
}

// ─── XP History spark ─────────────────────────────────────────────────────────
function XPSpark({ xpLog }) {
  if (!xpLog.length) return null
  const max = Math.max(...xpLog.map(e => e.xp), 1)
  const last7 = xpLog.slice(-7)
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-white">XP This Week</p>
        <span className="text-xs font-mono text-gold-400 font-bold">
          +{last7.reduce((s, e) => s + e.xp, 0).toLocaleString()} XP
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-16">
        {last7.map((entry, i) => (
          <div key={entry.date} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t-sm min-h-[2px]"
              style={{ background: `linear-gradient(180deg, #f59e0b, #f97316)` }}
              initial={{ height: 0 }}
              animate={{ height: `${Math.max((entry.xp / max) * 52, entry.xp > 0 ? 4 : 2)}px` }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            />
            <span className="text-[8px] text-gray-600">{new Date(entry.date + 'T12:00:00').toLocaleDateString('en', { weekday: 'narrow' })}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Analytics() {
  const [tab, setTab] = useState('progress')
  const [refreshKey, setRefreshKey] = useState(0)

  const snap     = useMemo(() => getProgressSnapshot(),    [refreshKey])
  const progSnap = useMemo(() => getProgressionSnapshot(), [refreshKey])
  const weekly   = useMemo(() => getWeeklyActivity(),      [refreshKey])

  const refresh = () => setRefreshKey(k => k + 1)

  const { readiness, masteredCards, totalCards, subjectBreakdown, flashcards, barReview, recitation: recStats, insights } = snap
  const { xp, levelInfo, achievements, unlockedCount, totalAchievements, recitation, todayTargets, dailyTargetConfig, reminderTime, reminderEnabled, xpLog } = progSnap

  return (
    <div className="space-y-5 pb-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
            <BarChart2 size={20} className="text-gold-400" />
          </div>
          <div>
            <h2 className="section-title">Progression Dashboard</h2>
            <p className="text-xs text-gray-500 mt-0.5">Track your bar exam journey</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-navy-800/60 border border-navy-700/60 rounded-xl">
          <span className="text-base">{levelInfo.current.icon}</span>
          <div>
            <p className="text-xs font-bold text-white leading-none">Level {levelInfo.current.level}</p>
            <p className="text-[10px] text-gray-500">{levelInfo.current.title}</p>
          </div>
        </div>
      </div>

      {/* ── XP Bar ── */}
      <div className="glass-card px-5 py-4">
        <XPBar levelInfo={levelInfo} xp={xp} />
      </div>

      {/* ── Tabs ── */}
      <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline" />

      {/* ══════════════════ PROGRESS TAB ══════════════════ */}
      {tab === 'progress' && (
        <div className="space-y-5">
          {/* Key metrics row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Bar Readiness',  value: readiness > 0 ? `${readiness}%` : '—',  icon: TrendingUp, color: '#f59e0b' },
              { label: 'Cards Mastered', value: masteredCards,                             icon: Award,      color: '#10b981' },
              { label: 'Total XP',       value: xp.toLocaleString(),                      icon: BarChart2,  color: '#6366f1' },
              { label: 'Achievements',   value: `${unlockedCount}/${totalAchievements}`,  icon: CheckCircle, color: '#f97316' },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="glass-card p-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${m.color}18` }}>
                  <m.icon size={15} style={{ color: m.color }} />
                </div>
                <p className="text-xl font-bold text-white font-mono">{m.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Mastery rings + radar */}
          <MasteryRings />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <RadarChart subjects={subjectBreakdown} />
            <LevelTimeline levelInfo={levelInfo} />
          </div>

          {/* Heatmap */}
          <StudyHeatmap />

          {/* Weekly chart + XP spark */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <WeeklyChart weekly={weekly} />
            <XPSpark xpLog={xpLog} />
          </div>
        </div>
      )}

      {/* ══════════════════ ACHIEVEMENTS TAB ══════════════════ */}
      {tab === 'achievements' && (
        <AchievementGrid achievements={achievements} unlockedCount={unlockedCount} />
      )}

      {/* ══════════════════ STATS TAB ══════════════════ */}
      {tab === 'stats' && (
        <div className="space-y-5">
          {/* Subject breakdown */}
          <div className="glass-card p-5">
            <h3 className="section-title mb-4">Subject Mastery Breakdown</h3>
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

          {/* Module stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Flashcards */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={14} className="text-indigo-400" />
                <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Flashcards</p>
              </div>
              {[
                { label: 'Mastered', value: flashcards.mastered, color: '#10b981' },
                { label: 'Learning', value: flashcards.learning, color: '#f59e0b' },
                { label: 'Not seen', value: flashcards.total - flashcards.mastered - flashcards.learning, color: '#6b7280' },
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
                [
                  { label: 'Sessions done', value: barReview.sessions },
                  { label: 'Avg score',     value: `${barReview.avgScore}%`,  color: barReview.avgScore >= 75 ? '#10b981' : '#f97316' },
                  { label: 'Best score',    value: `${barReview.bestScore}%`, color: '#f59e0b' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="font-semibold" style={{ color: row.color ?? '#e5e7eb' }}>{row.value}</span>
                  </div>
                ))
              ) : <p className="text-xs text-gray-600">No sessions yet.</p>}
            </div>

            {/* Recitation */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Mic size={14} className="text-emerald-400" />
                <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Recitation</p>
              </div>
              {recStats.sessions > 0 ? (
                [
                  { label: 'Sessions done', value: recStats.sessions },
                  { label: 'Avg score',     value: `${recStats.avgScore}%`, color: recStats.avgScore >= 75 ? '#10b981' : '#f97316' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="font-semibold" style={{ color: row.color ?? '#e5e7eb' }}>{row.value}</span>
                  </div>
                ))
              ) : <p className="text-xs text-gray-600">No sessions yet.</p>}
            </div>
          </div>

          {/* Recitation survival */}
          <RecitationSurvival recitation={recitation} />

          {/* Insights */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-gold-400" />
              <h3 className="section-title">Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Strongest Subject', value: insights.strongest?.name, sub: insights.strongest ? `${insights.strongest.pct}% mastery` : null, color: insights.strongest?.color, fallback: 'Study flashcards to see this.' },
                { label: 'Needs Attention',   value: insights.weakest?.name,   sub: insights.weakest  ? `${insights.weakest.pct}% mastery`  : null, color: '#ef4444',                  fallback: 'Study flashcards to see this.' },
                { label: 'Best Study Day',    value: insights.bestDay?.day,    sub: insights.bestDay  ? `${insights.bestDay.minutes} min`   : null, color: '#10b981',                  fallback: 'Complete sessions to see your best day.' },
              ].map(item => (
                <div key={item.label} className="bg-navy-800 rounded-xl p-4 border border-navy-700">
                  <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">{item.label}</p>
                  {item.value ? (
                    <>
                      <p className="text-base font-bold mb-1" style={{ color: item.color }}>{item.value}</p>
                      <p className="text-xs text-gray-400">{item.sub}</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-600">{item.fallback}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ DAILY TAB ══════════════════ */}
      {tab === 'daily' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DailyTargets
              todayTargets={todayTargets}
              dailyTargetConfig={dailyTargetConfig}
              onUpdate={refresh}
            />
            <ReminderSettings
              reminderTime={reminderTime}
              reminderEnabled={reminderEnabled}
              onUpdate={refresh}
            />
          </div>

          {/* Streak tips */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={15} className="text-gold-400" />
              <p className="text-sm font-semibold text-white">Study Tips</p>
            </div>
            <div className="space-y-2.5">
              {[
                { tip: 'Review flashcards first thing in the morning — memory consolidation peaks after sleep.', icon: '🌅' },
                { tip: 'Do at least 5 bar questions daily. Consistent low-volume practice beats weekend cramming.', icon: '📋' },
                { tip: 'IRAC-train on 1 case per day. Daily writing practice builds exam speed.', icon: '✍️' },
                { tip: 'Study streaks are psychological anchors. Missing one day doubles the chance of missing the next.', icon: '🔥' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 p-3 bg-navy-800/60 rounded-xl border border-navy-700/40">
                  <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
