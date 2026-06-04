import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Keyboard, X, Clock,
  Pause, Play, SkipForward, Flame,
} from 'lucide-react'

import FlashCard        from '../components/flashcards/FlashCard'
import ConfidenceRater  from '../components/flashcards/ConfidenceRater'
import SessionSetup     from '../components/flashcards/SessionSetup'
import SessionSummary   from '../components/flashcards/SessionSummary'

import { useSRS }        from '../hooks/useSRS'
import { shuffle, calculateSRS } from '../data/flashcards/index.js'

// ─── Keyboard hints tooltip ───────────────────────────────────────────────────
function KeyHints({ visible }) {
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-navy-800 border border-navy-700 rounded-xl px-4 py-3 flex items-center gap-5 text-xs text-gray-500 shadow-navy z-30"
    >
      {[
        ['Space / →', 'Flip card'],
        ['1', 'Again'],
        ['2', 'Hard'],
        ['3', 'Good'],
        ['4', 'Easy'],
        ['H', 'Toggle hint'],
        ['Esc', 'Exit'],
      ].map(([key, label]) => (
        <span key={key} className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-navy-700 rounded text-[10px] font-mono text-gray-400">{key}</kbd>
          <span>{label}</span>
        </span>
      ))}
    </motion.div>
  )
}

// ─── Timer bar ────────────────────────────────────────────────────────────────
function TimerBar({ seconds, maxSeconds, onExpire }) {
  const pct     = (seconds / maxSeconds) * 100
  const warning = seconds <= 10
  const danger  = seconds <= 5

  useEffect(() => {
    if (seconds <= 0) onExpire?.()
  }, [seconds, onExpire])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <div className={`flex items-center gap-1.5 font-mono font-bold ${
          danger ? 'text-red-400' : warning ? 'text-amber-400' : 'text-gray-400'
        }`}>
          <Clock size={12} />
          <span>{seconds}s</span>
        </div>
        <span className="text-gray-700 text-[10px]">Timed mode</span>
      </div>
      <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full transition-colors duration-300 ${
            danger ? 'bg-red-500' : warning ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

// ─── Session progress bar ─────────────────────────────────────────────────────
function SessionProgress({ current, total, correct, streak }) {
  const pct = total > 0 ? (current / total) * 100 : 0
  return (
    <div className="w-full max-w-2xl mx-auto space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500 tabular-nums">{current}/{total} cards</span>
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <span className="flex items-center gap-1 text-orange-400 font-semibold">
              <Flame size={11} />{streak} streak
            </span>
          )}
          <span className="text-emerald-400 font-semibold tabular-nums">
            {total > 0 ? Math.round((correct / Math.max(current, 1)) * 100) : 0}% correct
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-500 to-accent-orange rounded-full relative overflow-hidden"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-shimmer opacity-30" />
        </motion.div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Flashcards() {
  const srs = useSRS()

  // screen: 'setup' | 'session' | 'summary'
  const [screen,   setScreen]   = useState('setup')
  const [queue,    setQueue]    = useState([])
  const [queueIdx, setQueueIdx] = useState(0)
  const [flipped,  setFlipped]  = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [mode,     setMode]     = useState('daily')
  const [subject,  setSubject]  = useState('all')
  const [paused,   setPaused]   = useState(false)
  const [showKeys, setShowKeys] = useState(false)

  // timed mode
  const TIMED_SECONDS = 60
  const [timeLeft,   setTimeLeft]  = useState(TIMED_SECONDS)
  const timerRef = useRef(null)

  // session stats
  const [sessionStats, setStats] = useState({
    correct: 0, hard: 0, again: 0, total: 0,
    timeSeconds: 0, streak: 0, bestStreak: 0,
  })
  const sessionStartRef = useRef(null)
  const localStreakRef   = useRef(0)

  const card = queue[queueIdx] ?? null

  // ── timed mode tick ──────────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== 'timed' || screen !== 'session' || paused || flipped) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleRate(2)  // auto-rate as Hard on expiry
          return TIMED_SECONDS
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [mode, screen, paused, flipped, queueIdx])

  // ── keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== 'session') return
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'Escape') { endSession(); return }
      if (e.key === 'h' || e.key === 'H') { setShowHint(h => !h); return }
      if ((e.key === ' ' || e.key === 'ArrowRight') && !flipped) {
        e.preventDefault(); setFlipped(true); return
      }
      if (flipped) {
        if (e.key === '1') handleRate(1)
        if (e.key === '2') handleRate(2)
        if (e.key === '3') handleRate(3)
        if (e.key === '4') handleRate(4)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [screen, flipped, queueIdx])

  // ── session start ────────────────────────────────────────────────────────
  const startSession = useCallback((selectedMode, selectedSubject) => {
    let cards = srs.getQueue(selectedMode, selectedSubject)
    if (selectedMode === 'random' || selectedMode === 'timed') cards = shuffle(cards)
    if (cards.length === 0) {
      cards = srs.getQueue('random', selectedSubject).slice(0, 10)
    }
    setQueue(cards)
    setQueueIdx(0)
    setFlipped(false)
    setShowHint(false)
    setPaused(false)
    setMode(selectedMode)
    setSubject(selectedSubject)
    setTimeLeft(TIMED_SECONDS)
    setStats({ correct: 0, hard: 0, again: 0, total: 0, timeSeconds: 0, streak: 0, bestStreak: 0 })
    localStreakRef.current = 0
    sessionStartRef.current = Date.now()
    setScreen('session')
  }, [srs])

  // ── rate card ────────────────────────────────────────────────────────────
  const handleRate = useCallback((rating) => {
    if (!card || !flipped) return
    srs.rateCard(card.id, rating)

    const isCorrect = rating >= 3
    localStreakRef.current = isCorrect ? localStreakRef.current + 1 : 0

    setStats(prev => ({
      ...prev,
      correct:    prev.correct + (isCorrect ? 1 : 0),
      hard:       prev.hard    + (rating === 2 ? 1 : 0),
      again:      prev.again   + (rating === 1 ? 1 : 0),
      total:      prev.total   + 1,
      streak:     localStreakRef.current,
      bestStreak: Math.max(prev.bestStreak, localStreakRef.current),
    }))

    clearInterval(timerRef.current)
    setTimeLeft(TIMED_SECONDS)
    setFlipped(false)
    setShowHint(false)

    const next = queueIdx + 1
    if (next >= queue.length) {
      finishSession()
    } else {
      setQueueIdx(next)
    }
  }, [card, flipped, queueIdx, queue.length, srs])

  const finishSession = useCallback(() => {
    const elapsed = sessionStartRef.current
      ? Math.round((Date.now() - sessionStartRef.current) / 1000)
      : 0
    setStats(prev => ({ ...prev, timeSeconds: elapsed, mode, subject }))
    setScreen('summary')
  }, [mode, subject])

  const endSession = useCallback(() => {
    clearInterval(timerRef.current)
    setScreen('setup')
  }, [])

  const skipCard = useCallback(() => {
    setFlipped(false)
    setShowHint(false)
    const next = queueIdx + 1
    if (next >= queue.length) finishSession()
    else setQueueIdx(next)
  }, [queueIdx, queue.length, finishSession])

  // preview intervals for current card
  const nextIntervals = card ? {
    1: 1,
    2: Math.max(1, Math.round((srs.getState(card.id)?.interval || 1) * 1.2)),
    3: Math.max(1, Math.round((srs.getState(card.id)?.interval || 1) * (srs.getState(card.id)?.easeFactor || 2.5))),
    4: Math.max(4, Math.round((srs.getState(card.id)?.interval || 1) * (srs.getState(card.id)?.easeFactor || 2.5) * 1.3)),
  } : null

  return (
    <div className="min-h-[calc(100vh-144px)] pb-8">
      <AnimatePresence mode="wait">

        {/* ── SETUP ─────────────────────────────────────────────── */}
        {screen === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <SessionSetup stats={srs.stats} onStart={startSession} />
          </motion.div>
        )}

        {/* ── SESSION ───────────────────────────────────────────── */}
        {screen === 'session' && card && (
          <motion.div
            key="session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto space-y-5"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <button
                onClick={endSession}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                <ChevronLeft size={14} />
                Exit
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKeys(k => !k)}
                  className="p-1.5 text-gray-600 hover:text-gray-400 transition-colors"
                  title="Keyboard shortcuts"
                >
                  <Keyboard size={13} />
                </button>
                <button
                  onClick={() => setPaused(p => !p)}
                  className="p-1.5 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {paused ? <Play size={13} /> : <Pause size={13} />}
                </button>
                <button
                  onClick={skipCard}
                  className="p-1.5 text-gray-600 hover:text-gray-400 transition-colors"
                  title="Skip card"
                >
                  <SkipForward size={13} />
                </button>
              </div>
            </div>

            {/* Timer (timed mode only) */}
            {mode === 'timed' && (
              <TimerBar seconds={timeLeft} maxSeconds={TIMED_SECONDS} onExpire={() => handleRate(2)} />
            )}

            {/* Progress */}
            <SessionProgress
              current={queueIdx}
              total={queue.length}
              correct={sessionStats.correct}
              streak={localStreakRef.current}
            />

            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0,  scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <FlashCard
                  card={card}
                  flipped={flipped}
                  onFlip={() => setFlipped(f => !f)}
                  cardState={srs.getState(card.id)}
                  showHint={showHint}
                  onHintToggle={() => setShowHint(h => !h)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Flip prompt / Confidence rater */}
            <AnimatePresence mode="wait">
              {!flipped ? (
                <motion.div
                  key="flip-prompt"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-center"
                >
                  <button
                    onClick={() => setFlipped(true)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold-500/20 to-accent-orange/20 border border-gold-500/30 text-gold-400 font-semibold rounded-2xl hover:from-gold-500/30 hover:to-accent-orange/30 transition-all duration-200 text-sm"
                  >
                    Reveal Answer
                    <kbd className="px-1.5 py-0.5 bg-navy-700 rounded text-[10px] font-mono text-gray-500">Space</kbd>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="rater"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <ConfidenceRater
                    onRate={handleRate}
                    nextIntervals={nextIntervals}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Keyboard shortcuts */}
            <AnimatePresence>
              {showKeys && <KeyHints visible />}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── SUMMARY ───────────────────────────────────────────── */}
        {screen === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <SessionSummary
              sessionStats={sessionStats}
              onRestart={() => startSession(mode, subject)}
              onHome={() => setScreen('setup')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
