import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import {
  Mic, ChevronRight, AlertTriangle, CheckCircle, XCircle,
  Clock, BookOpen, History, ArrowLeft, Flame, Trophy,
  Volume2, Zap, Target, BarChart2,
} from 'lucide-react'
import { PROFESSORS, PROF_LIST } from '../data/recitation/professors.js'
import { logActivity } from '../lib/activity.js'
import {
  RECITATION_QUESTIONS, QUESTIONS_BY_SUBJECT, SUBJECTS_WITH_QUESTIONS,
  getQuestionsForSession, scoreAnswer,
} from '../data/recitation/questions.js'
import Button from '../components/ui/Button'

const SUBJECT_LABELS = {
  'civil-law': 'Civil Law', 'criminal-law': 'Criminal Law',
  'political-law': 'Political Law', 'remedial-law': 'Remedial Law',
  'commercial-law': 'Commercial Law', 'taxation-law': 'Taxation Law',
  'labor-law': 'Labor Law', 'legal-ethics': 'Legal Ethics',
  'legal-writing': 'Legal Writing',
}

const HISTORY_KEY = 'recitation_history_v2'

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') } catch { return [] }
}
function saveHistory(history) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20))) } catch {}
}

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, msPerChar = 40, onDone) {
  const [shown, setShown] = useState('')
  const [done, setDone]   = useState(false)
  const ref               = useRef(null)

  useEffect(() => {
    setShown(''); setDone(false)
    if (!text) return
    let i = 0
    ref.current = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(ref.current)
        setDone(true)
        onDone?.()
      }
    }, msPerChar + (Math.random() * 12))
    return () => clearInterval(ref.current)
  }, [text])

  return { shown, done }
}

// ─── Keyword chips ────────────────────────────────────────────────────────────
function KeywordChips({ keywords, answer, submitted }) {
  const lower = answer.toLowerCase()
  return (
    <div className="flex flex-wrap gap-1.5">
      {keywords.map(kw => {
        const found = lower.includes(kw.toLowerCase())
        return (
          <span
            key={kw}
            className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-all duration-300 border ${
              found
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : submitted
                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                : 'bg-navy-800 text-gray-600 border-navy-700'
            }`}
          >
            {found && '✓ '}{kw}
          </span>
        )
      })}
    </div>
  )
}

// ─── Professor header ─────────────────────────────────────────────────────────
function ProfessorHeader({ prof, mood, status, escalation }) {
  const moodColor = mood === 'angry' ? '#dc2626' : mood === 'impatient' ? '#f97316' : prof.color
  return (
    <div className="flex items-center gap-4">
      <motion.div
        animate={mood === 'angry' ? { scale: [1, 1.05, 1], x: [0, -2, 2, -2, 0] } : {}}
        transition={{ duration: 0.4, repeat: mood === 'angry' ? 2 : 0 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold font-serif shrink-0 border-2"
        style={{
          background: `${moodColor}20`,
          borderColor: `${moodColor}50`,
          color: moodColor,
          boxShadow: mood !== 'neutral' ? `0 0 20px ${moodColor}30` : undefined,
        }}
      >
        {prof.initials}
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">{prof.name}</p>
        <p className="text-[10px] text-gray-500">{prof.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-semibold border"
            style={{ color: moodColor, borderColor: `${moodColor}40`, background: `${moodColor}10` }}
          >
            {mood === 'angry' ? '⚡ IMPATIENT' : mood === 'impatient' ? '⏳ Waiting' : '● Listening'}
          </span>
          {escalation > 0 && (
            <span className="text-[10px] text-red-400 font-semibold">
              {'▲'.repeat(escalation)} Pressure
            </span>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-600 uppercase tracking-wider">{status}</p>
      </div>
    </div>
  )
}

// ─── Interruption banner ──────────────────────────────────────────────────────
function InterruptionBanner({ text, profColor, onDismiss }) {
  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -400, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="rounded-2xl border-l-4 px-5 py-4 flex items-start gap-3"
      style={{ borderLeftColor: profColor, background: `${profColor}08`, borderTopColor: `${profColor}20`, borderRightColor: `${profColor}20`, borderBottomColor: `${profColor}20` }}
    >
      <AlertTriangle size={16} style={{ color: profColor }} className="shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: profColor }}>
          Professor interrupts —
        </p>
        <p className="text-sm text-gray-200 italic leading-relaxed">"{text}"</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-gray-600 hover:text-gray-400 text-[10px] shrink-0">dismiss</button>
      )}
    </motion.div>
  )
}

// ─── Pressure timer ───────────────────────────────────────────────────────────
function PressureTimer({ seconds, total, color }) {
  const pct = (seconds / total) * 100
  const critical = pct < 20
  const warning  = pct < 40
  const c = critical ? '#ef4444' : warning ? '#f97316' : color

  const r = 22, circumference = 2 * Math.PI * r

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="56" height="56" className="-rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#1e2a3a" strokeWidth="3" />
        <motion.circle
          cx="28" cy="28" r={r} fill="none"
          stroke={c} strokeWidth="3"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
          transition={{ duration: 0.5 }}
          strokeLinecap="round"
        />
      </svg>
      <motion.p
        className="text-xs font-mono font-bold absolute"
        style={{ color: c }}
        animate={critical ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        {seconds}s
      </motion.p>
    </div>
  )
}

// ─── Evaluation screen ────────────────────────────────────────────────────────
function EvaluationCard({ prof, result, question, onContinue, continueLabel, isLast }) {
  const pct  = result.pct
  const good = pct >= 75
  const color = pct >= 75 ? '#10b981' : pct >= 50 ? '#f97316' : '#ef4444'

  const comment = pct >= 75
    ? prof.passComments[Math.floor(Math.random() * prof.passComments.length)]
    : prof.failComments[Math.floor(Math.random() * prof.failComments.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Score */}
      <div className="glass-card p-6 text-center">
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="text-5xl font-bold font-serif"
          style={{ color }}
        >
          {pct}
        </motion.p>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">/ 100</p>

        {/* Professor comment */}
        <div className="mt-5 flex items-start gap-3 text-left">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs border"
            style={{ background: `${prof.color}18`, borderColor: `${prof.color}40`, color: prof.color }}>
            {prof.initials}
          </div>
          <p className="text-sm text-gray-300 italic leading-relaxed flex-1">"{comment}"</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="glass-card p-4 space-y-3">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Answer Analysis</p>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Words written</span>
          <span className={result.wordCount >= 40 ? 'text-emerald-400' : 'text-amber-400'}>
            {result.wordCount} words
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Article / Section cited</span>
          {result.hasArticle
            ? <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={11} /> Yes</span>
            : <span className="text-red-400 flex items-center gap-1"><XCircle size={11} /> Missing</span>}
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Key terms covered</span>
          <span style={{ color }}>
            {result.keywordsFound.length}/{question.keywords.length}
          </span>
        </div>

        {result.keywordsMissing.length > 0 && (
          <div>
            <p className="text-[10px] text-red-400 font-semibold mb-1.5">Missing keywords:</p>
            <div className="flex flex-wrap gap-1">
              {result.keywordsMissing.map(k => (
                <span key={k} className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md">{k}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Model answer */}
      <details className="glass-card p-4">
        <summary className="text-xs font-semibold text-gold-400 cursor-pointer select-none list-none flex items-center gap-2">
          <BookOpen size={12} /> View model answer
        </summary>
        <p className="text-xs text-gray-400 leading-relaxed mt-3 border-t border-navy-700 pt-3">
          {question.modelAnswer}
        </p>
      </details>

      <Button variant="primary" size="md" onClick={onContinue} className="w-full">
        {isLast ? 'See Final Results' : continueLabel} <ChevronRight size={14} className="ml-1" />
      </Button>
    </motion.div>
  )
}

// ─── Active session ───────────────────────────────────────────────────────────
function RecitationSession({ prof, questions, onComplete, onExit }) {
  const [qIdx,           setQIdx]           = useState(0)
  const [phase,          setPhase]          = useState('intro')  // intro | questioning | answering | evaluating | followup
  const [followUpIdx,    setFollowUpIdx]    = useState(0)
  const [answer,         setAnswer]         = useState('')
  const [submitted,      setSubmitted]      = useState(false)
  const [evalResult,     setEvalResult]     = useState(null)
  const [escalation,     setEscalation]     = useState(0)
  const [mood,           setMood]           = useState('neutral')
  const [interruption,   setInterruption]   = useState(null)
  const [timeLeft,       setTimeLeft]       = useState(90)
  const [confidence,     setConfidence]     = useState(5)
  const [sessionResults, setSessionResults] = useState([])
  const [nudgeCount,     setNudgeCount]     = useState(0)
  const [activeQuestion, setActiveQuestion] = useState(null)

  const timerRef    = useRef(null)
  const patienceRef = useRef(null)
  const answerRef   = useRef(answer)
  const shakeCtrl   = useAnimation()

  answerRef.current = answer

  const q = questions[qIdx]
  const currentFollowUp = q?.followUps?.[followUpIdx - 1]

  // Stable intro text — computed once on mount to prevent typewriter restart on every re-render
  const introText = useRef(prof.openings[Math.floor(Math.random() * prof.openings.length)])

  const displayedQuestion = useMemo(() => {
    if (phase === 'intro') return introText.current
    if (phase === 'followup' && currentFollowUp) return currentFollowUp.question
    return q?.question ?? ''
  }, [phase, qIdx, followUpIdx])

  const { shown: typedText, done: typingDone } = useTypewriter(
    displayedQuestion,
    prof.typingSpeed,
    () => {
      if (phase === 'intro') {
        setTimeout(() => { setPhase('questioning') }, prof.thinkDelay[0])
      } else if (phase === 'questioning' || phase === 'followup') {
        setPhase('answering')
        setTimeLeft(90)
        setAnswer('')
        setSubmitted(false)
        setNudgeCount(0)
      }
    }
  )

  // Countdown timer during answering
  useEffect(() => {
    if (phase !== 'answering') { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleSubmit(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  // Patience / nudge system
  useEffect(() => {
    if (phase !== 'answering' || submitted) return
    clearTimeout(patienceRef.current)
    patienceRef.current = setTimeout(() => {
      const words = answerRef.current.trim().split(/\s+/).filter(Boolean).length
      if (words < prof.minWords / 2) {
        const newNudge = nudgeCount + 1
        setNudgeCount(newNudge)
        if (newNudge >= 2 && escalation < 3) {
          const interrupts = prof.interruptions
          showInterruption(interrupts[Math.floor(Math.random() * interrupts.length)])
          setEscalation(e => Math.min(e + 1, 3))
          setMood(m => m === 'neutral' ? 'impatient' : 'angry')
          if (escalation >= 2) shakeCtrl.start({ x: [0, -6, 6, -6, 6, 0], transition: { duration: 0.4 } })
        } else {
          const nudges = prof.nudges
          showInterruption(nudges[Math.floor(Math.random() * nudges.length)])
        }
      }
    }, prof.patience * 1000)
    return () => clearTimeout(patienceRef.current)
  }, [answer, phase, submitted])

  const showInterruption = (text) => {
    setInterruption(text)
    setTimeout(() => setInterruption(null), 5000)
  }

  const handleSubmit = useCallback((timedOut = false) => {
    clearInterval(timerRef.current)
    clearTimeout(patienceRef.current)
    setSubmitted(true)

    const currentQ = phase === 'followup' ? { ...q, keywords: q.keywords } : q
    const result = scoreAnswer(answer, currentQ, confidence)
    setEvalResult(result)

    if (result.pct >= 75) {
      setMood('neutral')
      setEscalation(e => Math.max(e - 1, 0))
    } else if (result.pct < 50) {
      setEscalation(e => Math.min(e + 1, 3))
      setMood(result.pct < 30 ? 'angry' : 'impatient')
    }

    setPhase('evaluating')
  }, [answer, q, phase, confidence])

  const handleContinue = () => {
    const result = evalResult
    const qLabel = phase === 'followup' && currentFollowUp ? currentFollowUp.question : q.question

    setSessionResults(prev => [...prev, {
      questionText: qLabel,
      answer,
      result,
      confidence,
      subject: q.subject,
    }])

    // Decide next: follow-up or next question
    const hasFollowUp = result.pct < 75 && q.followUps && followUpIdx < q.followUps.length
    if (hasFollowUp) {
      setFollowUpIdx(i => i + 1)
      setPhase('followup')
      setAnswer('')
      setSubmitted(false)
      setEvalResult(null)
    } else if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1)
      setFollowUpIdx(0)
      setPhase('questioning')
      setAnswer('')
      setSubmitted(false)
      setEvalResult(null)
      setActiveQuestion(questions[qIdx + 1])
    } else {
      // Session complete
      const allResults = [...sessionResults, { questionText: qLabel, answer, result, confidence, subject: q.subject }]
      const totalScore = Math.round(allResults.reduce((s, r) => s + r.result.pct, 0) / allResults.length)
      onComplete({ prof, questions, results: allResults, totalScore, date: new Date().toISOString() })
    }
  }

  const isEvaluating = phase === 'evaluating'
  const isAnswering  = phase === 'answering'
  const isTyping     = phase === 'intro' || phase === 'questioning' || phase === 'followup'

  return (
    <motion.div animate={shakeCtrl} className="space-y-4 max-w-2xl mx-auto">
      {/* Exit */}
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft size={12} /> Exit session
        </button>
        <span className="text-xs text-gray-600">
          Q {qIdx + 1}/{questions.length}
          {followUpIdx > 0 && <span className="text-amber-400 ml-1">· Follow-up {followUpIdx}</span>}
        </span>
      </div>

      {/* Professor panel */}
      <div
        className="glass-card p-5 border transition-all duration-700"
        style={{
          borderColor: mood === 'angry' ? '#dc262640' : mood === 'impatient' ? '#f9731640' : `${prof.color}20`,
          boxShadow: mood !== 'neutral' ? `0 0 30px ${mood === 'angry' ? '#dc262615' : '#f9731615'}` : undefined,
        }}
      >
        <ProfessorHeader
          prof={prof}
          mood={mood}
          escalation={escalation}
          status={isTyping ? 'Speaking...' : isAnswering ? 'Listening' : 'Evaluating'}
        />

        {/* Question typewriter */}
        <div className="mt-5 pl-2 border-l-2 min-h-[60px]" style={{ borderColor: `${prof.color}40` }}>
          <p className="text-sm text-gray-200 leading-relaxed italic">
            "{typedText}
            {!typingDone && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="ml-0.5 inline-block w-0.5 h-4 bg-current align-middle"
                style={{ color: prof.color }}
              />
            )}"
          </p>
        </div>
      </div>

      {/* Interruption */}
      <AnimatePresence>
        {interruption && (
          <InterruptionBanner
            text={interruption}
            profColor={mood === 'angry' ? '#dc2626' : prof.color}
            onDismiss={() => setInterruption(null)}
          />
        )}
      </AnimatePresence>

      {/* Answer area */}
      <AnimatePresence mode="wait">
        {isAnswering && !isEvaluating && (
          <motion.div
            key="answer-area"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-3"
          >
            <div className="glass-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-600 uppercase tracking-wider">Your Answer</span>
                <div className="flex items-center gap-4">
                  {/* Confidence slider */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-600">Confidence</span>
                    <input
                      type="range" min="1" max="10" value={confidence}
                      onChange={e => setConfidence(Number(e.target.value))}
                      className="w-20 accent-gold-500 h-1"
                    />
                    <span className="text-[10px] font-bold text-gold-400 w-4">{confidence}</span>
                  </div>
                  {/* Timer */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <PressureTimer seconds={timeLeft} total={90} color={prof.color} />
                    <p className="absolute text-[10px] font-mono font-bold" style={{ color: timeLeft < 20 ? '#ef4444' : timeLeft < 40 ? '#f97316' : prof.color }}>
                      {timeLeft}
                    </p>
                  </div>
                </div>
              </div>

              <textarea
                autoFocus
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && e.ctrlKey && answer.trim() && handleSubmit()}
                placeholder="Counsel, state your answer... (Ctrl+Enter to submit)"
                rows={6}
                className="w-full bg-navy-800/60 border border-navy-700/60 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-700 outline-none resize-none font-sans leading-relaxed focus:border-opacity-60 transition-colors"
                style={{ borderColor: answer.length > 10 ? `${prof.color}25` : undefined }}
              />

              {/* Keyword tracker */}
              <div>
                <p className="text-[10px] text-gray-600 mb-1.5">Key terms to cover:</p>
                <KeywordChips keywords={q.keywords} answer={answer} submitted={false} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-600">{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSubmit()}
                  disabled={!answer.trim()}
                >
                  Submit Answer <ChevronRight size={13} className="ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {isEvaluating && evalResult && (
          <motion.div key="evaluation" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <EvaluationCard
              prof={prof}
              result={evalResult}
              question={q}
              onContinue={handleContinue}
              continueLabel={
                evalResult.pct < 75 && followUpIdx < (q.followUps?.length ?? 0)
                  ? `Follow-up question →`
                  : 'Next question →'
              }
              isLast={qIdx === questions.length - 1 && !(evalResult.pct < 75 && followUpIdx < (q.followUps?.length ?? 0))}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === qIdx ? 24 : 8,
              background: i < qIdx ? '#10b981' : i === qIdx ? prof.color : '#1e2a3a',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Session Results ──────────────────────────────────────────────────────────
function SessionResults({ session, onBack, onRetry }) {
  const { prof, results, totalScore } = session
  const professor = PROFESSORS[prof.id]
  const comment = professor.evalComment(totalScore)

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Grade */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold font-serif mx-auto mb-4 border-2"
          style={{ background: `${prof.color}15`, borderColor: `${prof.color}40`, color: prof.color }}
        >
          {prof.initials}
        </div>
        <p className="text-4xl font-bold font-serif mb-1" style={{ color: totalScore >= 75 ? '#10b981' : totalScore >= 50 ? '#f97316' : '#ef4444' }}>
          {totalScore}%
        </p>
        <p className="text-sm text-white font-semibold mt-1">
          {totalScore >= 88 ? 'Outstanding' : totalScore >= 75 ? 'Passed' : totalScore >= 60 ? 'Average' : totalScore >= 40 ? 'Poor' : 'Failing'}
        </p>
        <p className="text-xs text-gray-500 italic mt-4 max-w-xs mx-auto">"{comment}"<br/>— {prof.name}</p>
      </motion.div>

      {/* Per-question breakdown */}
      <div className="space-y-2">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Session Breakdown</p>
        {results.map((r, i) => (
          <div key={i} className="glass-card px-4 py-3 flex items-center gap-4">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: `${r.result.pct >= 75 ? '#10b981' : r.result.pct >= 50 ? '#f97316' : '#ef4444'}15`, color: r.result.pct >= 75 ? '#10b981' : r.result.pct >= 50 ? '#f97316' : '#ef4444' }}
            >
              {r.result.pct}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-300 truncate">{r.questionText}</p>
              <p className="text-[10px] text-gray-600 mt-0.5">
                {r.result.keywordsFound.length}/{r.result.keywordsFound.length + r.result.keywordsMissing.length} keywords ·{' '}
                {r.result.wordCount} words
                {r.result.hasArticle && ' · cited article'}
              </p>
            </div>
            <div className="text-[10px] font-bold" style={{ color: r.result.pct >= 75 ? '#10b981' : '#ef4444' }}>
              C:{r.confidence}/10
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex-1"><ArrowLeft size={12} className="mr-1" /> Back</Button>
        <Button variant="outline" size="sm" onClick={onRetry} className="flex-1">Retry Session</Button>
      </div>
    </div>
  )
}

// ─── History ──────────────────────────────────────────────────────────────────
function RecitationHistory({ onBack }) {
  const history = loadHistory()
  if (history.length === 0) return (
    <div className="text-center py-16 space-y-3">
      <History size={32} className="text-gray-700 mx-auto" />
      <p className="text-gray-500 text-sm">No sessions yet</p>
      <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft size={12} className="mr-1" /> Back</Button>
    </div>
  )
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="section-title">Recitation History</h2>
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft size={12} className="mr-1" /> Back</Button>
      </div>
      {history.map((s, i) => {
        const prof = PROFESSORS[s.profId]
        if (!prof) return null
        return (
          <div key={i} className="glass-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-serif shrink-0 border"
              style={{ background: `${prof.color}15`, borderColor: `${prof.color}30`, color: prof.color }}>
              {prof.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{prof.name}</p>
              <p className="text-[10px] text-gray-500">
                {SUBJECT_LABELS[s.subject] ?? s.subject} · {s.qCount} questions · {new Date(s.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold" style={{ color: s.score >= 75 ? '#10b981' : s.score >= 50 ? '#f97316' : '#ef4444' }}>
                {s.score}%
              </p>
              <p className="text-[10px] text-gray-600">{s.score >= 75 ? 'Passed' : 'Failed'}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Lobby ────────────────────────────────────────────────────────────────────
function Lobby({ onStart, onHistory, historyCount }) {
  const [selectedProf,    setSelectedProf]    = useState(null)
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [questionCount,   setQuestionCount]   = useState(3)

  const canStart = !!selectedProf

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Mic size={20} className="text-red-400" />
          </div>
          <div>
            <h2 className="section-title">Professor Recitation Stand</h2>
            <p className="text-xs text-gray-500 mt-0.5">Face a professor. Answer on your feet.</p>
          </div>
        </div>
        {historyCount > 0 && (
          <button onClick={onHistory} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            <History size={13} /> History ({historyCount})
          </button>
        )}
      </div>

      {/* Professor selection */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Choose Your Professor</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PROF_LIST.map(prof => {
            const selected = selectedProf?.id === prof.id
            return (
              <motion.button
                key={prof.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProf(prof)}
                className="text-left p-5 rounded-2xl border-2 transition-all duration-200"
                style={{
                  borderColor: selected ? `${prof.color}60` : '#1e2a3a',
                  background: selected ? `${prof.color}10` : '#0d1521',
                  boxShadow: selected ? `0 0 20px ${prof.color}15` : undefined,
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold font-serif shrink-0 border-2"
                    style={{ background: `${prof.color}15`, borderColor: `${prof.color}40`, color: prof.color }}
                  >
                    {prof.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">{prof.name}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{prof.title}</p>
                  </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: prof.color }}>
                  {prof.personality} · {prof.difficulty}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{prof.tagline}</p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Subject + count */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Subject</p>
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 bg-navy-800 border border-navy-700 rounded-xl text-xs text-gray-300 outline-none focus:border-navy-600"
          >
            <option value="all">All Subjects ({RECITATION_QUESTIONS.length} questions)</option>
            {SUBJECTS_WITH_QUESTIONS.map(s => (
              <option key={s} value={s}>
                {SUBJECT_LABELS[s] ?? s} ({QUESTIONS_BY_SUBJECT[s]?.length ?? 0})
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Questions per Session</p>
          <div className="flex gap-2">
            {[2, 3, 5].map(n => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                  questionCount === n
                    ? 'border-gold-500/40 bg-gold-500/10 text-gold-400'
                    : 'border-navy-700 bg-navy-800 text-gray-500 hover:text-gray-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start */}
      <Button
        variant="primary"
        size="lg"
        onClick={() => selectedProf && onStart(selectedProf, selectedSubject, questionCount)}
        disabled={!canStart}
        className="w-full"
      >
        <Mic size={15} className="mr-2" />
        {canStart ? `Face ${selectedProf.name}` : 'Select a Professor'}
      </Button>

      {!canStart && (
        <p className="text-center text-xs text-gray-600">Choose a professor to begin</p>
      )}

      {/* How it works */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {[
          { icon: '🎤', title: 'Face the Professor', desc: 'A professor grills you with real bar exam questions. No notes. No hints.' },
          { icon: '⏱️', title: '90-Second Clock',    desc: 'You have 90 seconds to answer each question. The clock adds pressure.' },
          { icon: '📊', title: 'Instant Feedback',   desc: 'Keywords, score, and professor commentary after every answer.' },
        ].map(item => (
          <div key={item.title} className="flex gap-3 p-4 rounded-2xl bg-navy-800/40 border border-navy-700/50">
            <span className="text-xl shrink-0">{item.icon}</span>
            <div>
              <p className="text-xs font-semibold text-white mb-1">{item.title}</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OralRecitation() {
  const [phase,          setPhase]          = useState('lobby')
  const [activeProf,     setActiveProf]     = useState(null)
  const [activeQuestions,setActiveQuestions]= useState([])
  const [sessionResult,  setSessionResult]  = useState(null)
  const [history,        setHistory]        = useState(loadHistory)

  const handleStart = (prof, subject, count) => {
    const qs = getQuestionsForSession(subject, count)
    if (!qs.length) return
    setActiveProf(prof)
    setActiveQuestions(qs)
    setSessionResult(null)
    setPhase('session')
  }

  const handleComplete = (result) => {
    setSessionResult(result)
    const entry = {
      profId: result.prof.id,
      subject: result.questions[0]?.subject ?? 'all',
      qCount: result.results.length,
      score: result.totalScore,
      date: result.date,
    }
    const updated = [entry, ...history].slice(0, 20)
    setHistory(updated)
    saveHistory(updated)
    logActivity({ recitations: result.results.length, minutes: result.results.length * 5 })
    setPhase('results')
  }

  const handleRetry = () => {
    if (!activeProf || !activeQuestions.length) return
    setPhase('session')
    setSessionResult(null)
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {phase === 'lobby' && (
          <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Lobby
              onStart={handleStart}
              onHistory={() => setPhase('history')}
              historyCount={history.length}
            />
          </motion.div>
        )}

        {phase === 'session' && activeProf && (
          <motion.div key="session" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RecitationSession
              prof={activeProf}
              questions={activeQuestions}
              onComplete={handleComplete}
              onExit={() => setPhase('lobby')}
            />
          </motion.div>
        )}

        {phase === 'results' && sessionResult && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SessionResults
              session={sessionResult}
              onBack={() => setPhase('lobby')}
              onRetry={handleRetry}
            />
          </motion.div>
        )}

        {phase === 'history' && (
          <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RecitationHistory onBack={() => setPhase('lobby')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
