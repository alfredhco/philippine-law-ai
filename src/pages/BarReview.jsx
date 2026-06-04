import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award, GraduationCap, FileText, BookOpen, Shield, Landmark,
  TrendingDown, Clock, ChevronRight, ChevronLeft, CheckCircle,
  XCircle, RotateCcw, Trophy, Target, Zap, ArrowLeft,
  Scale, Briefcase, Receipt, Users, PenLine,
} from 'lucide-react'
import {
  EXAM_MODES, BAR_SUBJECTS, ALL_MCQ, ALL_ESSAYS,
  buildQueue, scoreSession, getGrade, shuffle,
} from '../data/bar/index.js'
import { saveBarSession } from '../lib/progress.js'
import { logActivity } from '../lib/activity.js'
import MCQQuestion from '../components/bar/MCQQuestion'
import EssayEditor from '../components/bar/EssayEditor'
import ExamTimer from '../components/bar/ExamTimer'
import Button from '../components/ui/Button'

// ─── Icon map for exam modes ──────────────────────────────────────────────────
const MODE_ICONS = {
  GraduationCap, FileText, BookOpen, Shield, Landmark, TrendingDown,
  Scale, Briefcase, Receipt, Users, Award, PenLine,
}

// ─── Lobby ────────────────────────────────────────────────────────────────────
function Lobby({ onStart }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <Award size={20} className="text-red-400" />
        </div>
        <div>
          <h2 className="section-title">Bar Examination Review</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {ALL_MCQ.length} MCQ · {ALL_ESSAYS.length} Essay questions · Timed simulation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {EXAM_MODES.map((mode) => {
          const Icon = MODE_ICONS[mode.icon] ?? FileText
          return (
            <motion.button
              key={mode.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStart(mode.id)}
              className="glass-card text-left p-5 hover:border-opacity-40 transition-all duration-200 group"
              style={{ '--hover-border': mode.color }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${mode.color}18` }}
                >
                  <Icon size={18} style={{ color: mode.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-snug">{mode.label}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{mode.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-navy-700/60">
                <div className="flex items-center gap-1 text-[10px] text-gray-600">
                  <Clock size={10} />
                  <span>{mode.timeMinutes} min</span>
                </div>
                {mode.questions != null && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-600">
                    <Target size={10} />
                    <span>{mode.questions} questions</span>
                  </div>
                )}
                <div
                  className="ml-auto flex items-center gap-1 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: mode.color }}
                >
                  Start <ChevronRight size={10} />
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Session ──────────────────────────────────────────────────────────────────
function Session({ mode, questions, onFinish }) {
  const [index, setIndex]         = useState(0)
  const [answers, setAnswers]     = useState({})
  const [submitted, setSubmitted] = useState({})
  const [essayAnswers, setEssayAnswers] = useState({})

  const q = questions[index]
  const isLast = index === questions.length - 1
  const isSubmitted = submitted[q?.id]
  const totalAnswered = Object.keys(submitted).length

  const handleMCQSelect = useCallback((idx) => {
    if (submitted[q.id]) return
    setAnswers(prev => ({ ...prev, [q.id]: idx }))
    setSubmitted(prev => ({ ...prev, [q.id]: true }))
  }, [q, submitted])

  const handleEssayChange = useCallback((key, value) => {
    setEssayAnswers(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmitEssay = () => {
    setSubmitted(prev => ({ ...prev, [q.id]: true }))
  }

  const handleFinish = () => {
    onFinish({ answers, essayAnswers, questions })
  }

  return (
    <div className="space-y-4">
      {/* Session header */}
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <p className="text-xs text-gray-500 font-medium">
            {mode.label} · Question {index + 1} of {questions.length}
          </p>
          <div className="mt-1.5 w-48 h-1 bg-navy-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: mode.color }}
              animate={{ width: `${((index + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="ml-auto w-48 shrink-0">
          <ExamTimer
            totalMinutes={mode.timeMinutes}
            onExpire={handleFinish}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="glass-card p-5 md:p-6"
        >
          {q.type === 'mcq' ? (
            <MCQQuestion
              question={q}
              selectedAnswer={answers[q.id] ?? null}
              onSelect={handleMCQSelect}
              submitted={!!submitted[q.id]}
              questionNumber={index + 1}
              totalQuestions={questions.length}
            />
          ) : (
            <EssayEditor
              question={q}
              answers={essayAnswers}
              onChange={handleEssayChange}
              submitted={!!submitted[q.id]}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ChevronLeft size={14} className="mr-1" /> Previous
        </Button>

        <span className="text-xs text-gray-600 flex-1 text-center">
          {totalAnswered} of {questions.length} answered
        </span>

        {/* Submit essay if not yet submitted */}
        {q.type === 'essay' && !isSubmitted && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSubmitEssay}
          >
            Submit Essay
          </Button>
        )}

        {isLast ? (
          <Button
            variant="primary"
            size="sm"
            onClick={handleFinish}
          >
            Finish Exam <Trophy size={13} className="ml-1" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIndex(i => Math.min(questions.length - 1, i + 1))}
          >
            Next <ChevronRight size={14} className="ml-1" />
          </Button>
        )}
      </div>

      {/* Question dot navigator */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {questions.map((question, i) => (
          <button
            key={question.id}
            onClick={() => setIndex(i)}
            className={`w-6 h-6 rounded-lg text-[10px] font-bold transition-all border ${
              i === index
                ? 'text-white border-opacity-60'
                : submitted[question.id]
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-navy-700 bg-navy-800/50 text-gray-600 hover:text-gray-400'
            }`}
            style={i === index ? { background: `${mode.color}25`, borderColor: `${mode.color}60`, color: mode.color } : undefined}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Results ──────────────────────────────────────────────────────────────────
function Results({ mode, questions, answers, essayAnswers, onRetry, onBack }) {
  const mcqQuestions   = questions.filter(q => q.type === 'mcq')
  const essayQuestions = questions.filter(q => q.type === 'essay')
  const essayOnly      = mcqQuestions.length === 0 && essayQuestions.length > 0

  const { correct, total, pct, passed } = scoreSession(answers, mcqQuestions)
  const grade = getGrade(pct)

  // Topic breakdown (MCQ only)
  const topicMap = {}
  mcqQuestions.forEach(q => {
    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, total: 0 }
    topicMap[q.topic].total++
    if (answers[q.id] === q.correctAnswer) topicMap[q.topic].correct++
  })
  const topicList = Object.entries(topicMap)
    .map(([topic, v]) => ({ topic, ...v, pct: Math.round((v.correct / v.total) * 100) }))
    .sort((a, b) => a.pct - b.pct)

  // Essay completion
  const essaySubmitted = essayQuestions.filter(q => {
    const keys = Object.keys(essayAnswers || {}).filter(k => k.startsWith(`${q.id}-`))
    return keys.some(k => (essayAnswers[k] || '').trim().length > 0)
  })

  return (
    <div className="space-y-6">
      {/* Grade banner — MCQ mode */}
      {!essayOnly && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <div className="text-5xl mb-3">{grade.emoji}</div>
          <p className="text-3xl font-bold font-serif" style={{ color: grade.color }}>{pct}%</p>
          <p className="text-lg font-semibold text-white mt-1">{grade.label}</p>
          <p className="text-sm text-gray-500 mt-1">
            {correct} correct out of {total} MCQ questions
          </p>
          <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-sm font-semibold ${
            passed ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {passed ? <CheckCircle size={15} /> : <XCircle size={15} />}
            {passed ? 'Passed — above 75% threshold' : 'Below 75% passing mark'}
          </div>
        </motion.div>
      )}

      {/* Essay-only completion banner */}
      {essayOnly && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <div className="text-5xl mb-3">📝</div>
          <p className="text-2xl font-bold font-serif text-white">
            {essaySubmitted.length}/{essayQuestions.length} Essays Attempted
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Essays are not auto-scored — review model answers in the IRAC Trainer
          </p>
        </motion.div>
      )}

      {/* Stats row — MCQ */}
      {!essayOnly && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Score',   value: `${pct}%`,      icon: <Zap size={14} />,         color: grade.color },
            { label: 'Correct', value: correct,         icon: <CheckCircle size={14} />, color: '#10b981' },
            { label: 'Wrong',   value: total - correct, icon: <XCircle size={14} />,     color: '#ef4444' },
          ].map(stat => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div>
              <p className="text-xl font-bold text-white" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Essay completion list */}
      {essayQuestions.length > 0 && (
        <div className="glass-card p-5 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Essay Attempts</p>
          {essayQuestions.map(q => {
            const attempted = essaySubmitted.includes(q)
            const subCount  = q.subQuestions?.length ?? 1
            const writtenSubs = q.subQuestions?.filter((_, i) => {
              return IRAC_SECTIONS_KEYS.some(s => (essayAnswers?.[`${q.id}-${i}-${s}`] || '').trim())
            }).length ?? 0
            return (
              <div key={q.id} className="flex items-center gap-3 py-2 border-b border-navy-700/40 last:border-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  attempted ? 'bg-emerald-500/20' : 'bg-navy-700'
                }`}>
                  {attempted
                    ? <CheckCircle size={11} className="text-emerald-400" />
                    : <XCircle size={11} className="text-gray-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-300 truncate">{q.subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} · {q.year} Bar</p>
                  <p className="text-[10px] text-gray-600">{writtenSubs}/{subCount} sub-questions written</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Topic breakdown — MCQ */}
      {topicList.length > 0 && (
        <div className="glass-card p-5 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Topic Breakdown</p>
          {topicList.map(({ topic, correct: c, total: t, pct: p }) => (
            <div key={topic} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300 capitalize">{topic.replace(/-/g, ' ')}</span>
                <span className={p >= 75 ? 'text-emerald-400' : p >= 50 ? 'text-amber-400' : 'text-red-400'}>
                  {c}/{t} · {p}%
                </span>
              </div>
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${p}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ background: p >= 75 ? '#10b981' : p >= 50 ? '#f59e0b' : '#ef4444' }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex-1">
          <ArrowLeft size={13} className="mr-1.5" /> Back to Modes
        </Button>
        <Button variant="outline" size="sm" onClick={onRetry} className="flex-1">
          <RotateCcw size={13} className="mr-1.5" /> Retry
        </Button>
      </div>
    </div>
  )
}

const IRAC_SECTIONS_KEYS = ['issue', 'rule', 'application', 'conclusion']

// ─── Main page ────────────────────────────────────────────────────────────────
export default function BarReview() {
  const [phase, setPhase]       = useState('lobby')
  const [activeMode, setActiveMode] = useState(null)
  const [sessionQ, setSessionQ] = useState([])
  const [sessionResult, setSessionResult] = useState(null)

  const handleStart = (modeId) => {
    const questions = buildQueue(modeId)
    setActiveMode(EXAM_MODES.find(m => m.id === modeId))
    setSessionQ(questions)
    setSessionResult(null)
    setPhase('session')
  }

  const handleFinish = ({ answers, essayAnswers, questions }) => {
    const mcqQs = questions.filter(q => q.type === 'mcq')
    const { pct } = scoreSession(answers, mcqQs)
    if (activeMode && mcqQs.length > 0) {
      saveBarSession({ modeLabel: activeMode.label, subject: activeMode.subjects?.[0] ?? 'all', score: pct, qCount: mcqQs.length })
      logActivity({ barQuestions: mcqQs.length, minutes: Math.round(activeMode.timeMinutes * 0.6) })
    }
    setSessionResult({ answers, essayAnswers, questions })
    setPhase('results')
  }

  const handleRetry = () => {
    if (!activeMode) return
    handleStart(activeMode.id)
  }

  const handleBack = () => {
    setPhase('lobby')
    setActiveMode(null)
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {phase === 'lobby' && (
          <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Lobby onStart={handleStart} />
          </motion.div>
        )}

        {phase === 'session' && activeMode && (
          <motion.div key="session" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={handleBack} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                <ArrowLeft size={13} /> Back
              </button>
              <span className="text-gray-700">/</span>
              <span className="text-xs font-semibold" style={{ color: activeMode.color }}>{activeMode.label}</span>
            </div>
            <Session
              mode={activeMode}
              questions={sessionQ}
              onFinish={handleFinish}
            />
          </motion.div>
        )}

        {phase === 'results' && activeMode && sessionResult && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-gray-500">Results</span>
              <span className="text-gray-700">/</span>
              <span className="text-xs font-semibold" style={{ color: activeMode.color }}>{activeMode.label}</span>
            </div>
            <Results
              mode={activeMode}
              questions={sessionResult.questions}
              answers={sessionResult.answers}
              essayAnswers={sessionResult.essayAnswers}
              onRetry={handleRetry}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
