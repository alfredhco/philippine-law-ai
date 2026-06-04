import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, CreditCard, Award, Mic, Search,
  FileText, Target, TrendingUp, Clock, Zap,
  ChevronRight, Sparkles,
} from 'lucide-react'

import XPBar              from '../components/progression/XPBar'
import StatsCard          from '../components/dashboard/StatsCard'
import SubjectProgress    from '../components/dashboard/SubjectProgress'
import StudyStreak        from '../components/dashboard/StudyStreak'
import RecentActivity     from '../components/dashboard/RecentActivity'
import StudyHeatmap       from '../components/dashboard/StudyHeatmap'
import MockBarScore       from '../components/dashboard/MockBarScore'
import FlashcardMastery   from '../components/dashboard/FlashcardMastery'
import WeakSubjects       from '../components/dashboard/WeakSubjects'
import MasteryLevel       from '../components/dashboard/MasteryLevel'
import DailyCodalGrind    from '../components/dashboard/DailyCodalGrind'
import RecentRecitations  from '../components/dashboard/RecentRecitations'
import Button             from '../components/ui/Button'
import Modal              from '../components/ui/Modal'
import { Tabs }           from '../components/ui/Tabs'
import { useToast }       from '../context/ToastContext'

import { SUBJECTS } from '../data/subjects'
import { ALL_MCQ, ALL_ESSAYS } from '../data/bar/index.js'
import { getProgressSnapshot } from '../lib/progress.js'
import { getProgressionSnapshot } from '../lib/progression.js'
import { getMonthlyMinutes } from '../lib/activity.js'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 5)  return 'Good night'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

const QUICK_ACTIONS = [
  { label: 'Flashcards',     icon: CreditCard, path: '/flashcards',     color: '#6366f1', bg: '#6366f115', desc: 'Spaced repetition' },
  { label: 'Bar Review',     icon: Award,      path: '/bar-review',     color: '#ef4444', bg: '#ef444415', desc: 'Past exam Q&As' },
  { label: 'Oral Recitation',icon: Mic,        path: '/oral',           color: '#10b981', bg: '#10b98115', desc: 'Socratic method' },
  { label: 'IRAC Trainer',   icon: FileText,   path: '/irac',           color: '#f59e0b', bg: '#f59e0b15', desc: 'Legal analysis' },
  { label: 'Issue Spotting', icon: Search,     path: '/issue-spotting', color: '#8b5cf6', bg: '#8b5cf615', desc: 'Fact pattern drill' },
  { label: 'Codal Study',    icon: BookOpen,   path: '/codal',          color: '#0ea5e9', bg: '#0ea5e915', desc: 'Statutory review' },
]

const DASHBOARD_TABS = [
  { label: 'Overview',  value: 'overview'  },
  { label: 'Modules',   value: 'modules'   },
  { label: 'Analytics', value: 'analytics' },
]

export default function Dashboard() {
  const navigate            = useNavigate()
  const toast               = useToast()
  const [tab, setTab]       = useState('overview')
  const [aiModal, setAiModal] = useState(false)

  const snap          = getProgressSnapshot()
  const progSnap      = getProgressionSnapshot()
  const liveReadiness = snap.readiness
  const masteredCards = snap.masteredCards
  const totalCards    = snap.totalCards
  const displayPct    = liveReadiness
  const studyHours    = Math.round(getMonthlyMinutes() / 60)
  const totalBarQs    = ALL_MCQ.length + ALL_ESSAYS.length

  const handleQuickAction = (path) => {
    toast.success('Opening module', 'Loading your study session...')
    navigate(path)
  }

  return (
    <div className="space-y-5 pb-6">

      {/* ── Hero Banner ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-navy-600/60 bg-navy-800/40 backdrop-blur-xl p-6"
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/[0.06] rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/[0.04] rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles size={14} className="text-gold-400" />
              </motion.div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Bar Examination Prep</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1.5 leading-tight">
              {getGreeting()}, Counselor
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              {displayPct === 0
                ? <>Start studying to track your bar readiness. <span className="text-gold-400 font-semibold">Review flashcards</span> to begin.</>
                : <>You're <span className="text-gold-400 font-bold">{displayPct}% bar-ready</span> — {displayPct < 50 ? 'Early stages. Build your foundation subject by subject.' : displayPct < 75 ? 'Good momentum. Focus on weak subjects to close the gaps.' : 'Excellent! You\'re approaching passing territory. Keep the pace.'}</>
              }
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
            <Button onClick={() => setAiModal(true)} icon={Sparkles} size="md">
              AI Study Plan
            </Button>
            <Button variant="secondary" onClick={() => navigate('/analytics')} icon={TrendingUp} size="md">
              Full Analytics
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500">Bar Readiness</span>
            <span className="font-bold text-gold-400">
              {displayPct > 0 ? `${displayPct}% · ${100 - displayPct}% to go` : 'Start studying to measure readiness'}
            </span>
          </div>
          <div className="h-2 bg-navy-900/80 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(90deg, #f59e0b, #f97316)' }}
              initial={{ width: 0 }}
              animate={{ width: `${displayPct}%` }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-shimmer opacity-30" />
            </motion.div>
          </div>
          {/* 75% marker */}
          <div className="absolute top-5 flex flex-col items-center" style={{ left: '75%' }}>
            <div className="w-px h-2 bg-white/40" />
            <span className="text-[9px] text-gray-500 mt-0.5 -translate-x-1/2">75% pass</span>
          </div>
        </div>

        {/* XP bar */}
        <div className="relative mt-4 pt-4 border-t border-navy-700/50">
          <XPBar levelInfo={progSnap.levelInfo} xp={progSnap.xp} />
        </div>
      </motion.div>

      {/* ── Tabs ─────────────────────────────────────── */}
      <Tabs tabs={DASHBOARD_TABS} active={tab} onChange={setTab} variant="underline" />

      {tab === 'overview' && (
        <div className="space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <StatsCard index={0} title="Bar Readiness"  value={displayPct > 0 ? `${displayPct}%` : '—'} subtitle="Overall mastery" icon={TrendingUp} color="#f59e0b" trend={displayPct > 0 ? 4 : undefined} onClick={() => navigate('/analytics')} />
            <StatsCard index={1} title="Cards Mastered" value={masteredCards}                            subtitle={`of ${totalCards} total`} icon={CreditCard} color="#6366f1" trend={masteredCards > 0 ? 8 : undefined} onClick={() => navigate('/flashcards')} />
            <StatsCard index={2} title="Bar Questions"  value={totalBarQs}                               subtitle="Practice Q&As"           icon={Award}      color="#ef4444" onClick={() => navigate('/bar-review')} />
            <StatsCard index={3} title="Study Hours"    value={studyHours > 0 ? `${studyHours}h` : '—'} subtitle="This month"              icon={Clock}      color="#10b981" trend={studyHours > 0 ? 12 : undefined} onClick={() => navigate('/analytics')} />
          </div>

          {/* Quick actions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
              <span className="text-xs text-gray-600">{QUICK_ACTIONS.length} modules</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {QUICK_ACTIONS.map((action, i) => (
                <motion.button
                  key={action.path}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleQuickAction(action.path)}
                  className="flex flex-col items-center gap-2 p-3.5 bg-navy-800/60 backdrop-blur-sm border border-navy-600/60 rounded-2xl hover:border-opacity-80 transition-all duration-200 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${action.color}10, transparent 70%)` }} />
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ background: action.bg }}>
                    <action.icon size={17} style={{ color: action.color }} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors leading-tight">{action.label}</p>
                    <p className="text-[9px] text-gray-600 mt-0.5 hidden md:block">{action.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Heatmap */}
          <StudyHeatmap />

          {/* 3-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <MockBarScore />
            <FlashcardMastery />
            <MasteryLevel />
          </div>

          {/* 2-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <SubjectProgress />
            </div>
            <div className="space-y-4">
              <StudyStreak />
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WeakSubjects />
            <DailyCodalGrind />
            <RecentRecitations />
          </div>
        </div>
      )}

      {tab === 'modules' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="relative bg-navy-800/60 backdrop-blur-md border border-navy-600/60 rounded-2xl p-5 overflow-hidden cursor-pointer group"
              onClick={() => navigate('/codal')}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${s.color}06, transparent 60%)` }} />
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}18` }}>
                  <BookOpen size={18} style={{ color: s.color }} />
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: `${s.color}15`, color: s.accent }}>{s.progress}%</span>
              </div>
              <h3 className="font-serif font-bold text-white mb-0.5 group-hover:text-gold-400 transition-colors">{s.name}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{s.description}</p>
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden mb-2">
                <motion.div className="h-full rounded-full" style={{ background: s.color, width: `${s.progress}%` }} initial={{ width: 0 }} animate={{ width: `${s.progress}%` }} transition={{ delay: 0.1 * i, duration: 0.7 }} />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{s.mastered}/{s.totalCards} cards</span>
                <div className="flex items-center gap-1 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Study now</span>
                  <ChevronRight size={11} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MockBarScore />
            <FlashcardMastery />
          </div>
          <StudyHeatmap />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SubjectProgress />
            <WeakSubjects />
          </div>
          <div className="text-center pt-2">
            <Button onClick={() => navigate('/analytics')} variant="outline" icon={TrendingUp} size="lg">
              Open Full Analytics Dashboard
            </Button>
          </div>
        </div>
      )}

      {/* AI Study Plan Modal */}
      <Modal
        open={aiModal}
        onClose={() => setAiModal(false)}
        title="AI Study Plan"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setAiModal(false)}>Close</Button>
            <Button onClick={() => { setAiModal(false); toast.success('Study plan saved!', 'Your personalized plan is now active.') }} icon={Zap}>
              Activate Plan
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="bg-gold-500/5 border border-gold-500/15 rounded-xl p-4">
            <p className="text-xs text-gold-400 font-semibold mb-1.5 uppercase tracking-wider">AI Analysis</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Based on your current progress ({displayPct > 0 ? displayPct : 0}% overall), your study pattern shows
              strength in Legal Ethics (65%) and Criminal Law (58%), while Taxation Law (18%) and
              Commercial Law (22%) require urgent attention.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recommended Weekly Schedule</p>
            {[
              { day: 'Mon / Thu', subject: 'Taxation Law', action: '2× flashcard sessions + 1 bar Q', color: '#8b5cf6' },
              { day: 'Tue / Fri', subject: 'Commercial Law', action: '1× codal study + issue spotting', color: '#f59e0b' },
              { day: 'Wed',       subject: 'Remedial Law', action: 'IRAC training + oral recitation', color: '#10b981' },
              { day: 'Sat',       subject: 'Full Mock Bar', action: 'Timed simulation (3 hours)', color: '#ef4444' },
              { day: 'Sun',       subject: 'Review & Rest', action: 'Light review + weekly analytics', color: '#6366f1' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-navy-800/60 rounded-xl border border-navy-700/60">
                <div className="w-14 shrink-0 text-center">
                  <span className="text-[10px] font-bold text-gray-600 uppercase">{item.day}</span>
                </div>
                <div className="w-px h-8 bg-navy-700" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: item.color }}>{item.subject}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}
