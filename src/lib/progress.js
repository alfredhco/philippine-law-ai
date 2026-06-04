// Real progress aggregator — reads from all localStorage sources and returns
// a unified snapshot. Pure functions, no hooks — safe to call anywhere.

import { ALL_FLASHCARDS, SUBJECT_INFO } from '../data/flashcards/index.js'
import { SUBJECTS } from '../data/subjects.js'
import { getWeeklyActivity, getMonthlyMinutes } from './activity.js'

const BAR_HISTORY_KEY    = 'bar_review_history'
const RECITATION_KEY     = 'recitation_history_v2'
const SRS_KEY            = 'ph-law-srs-v2'
const SRS_STREAK_KEY     = 'ph-law-srs-streak'

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback }
  catch { return fallback }
}

// ─── Flashcard stats ──────────────────────────────────────────────────────────
function getSRSStats() {
  const states = readJson(SRS_KEY, {})
  const streak = readJson(SRS_STREAK_KEY, { count: 0 })

  const total    = ALL_FLASHCARDS.length
  const mastered = ALL_FLASHCARDS.filter(c => states[c.id]?.state === 'mastered').length
  const learning = ALL_FLASHCARDS.filter(c => states[c.id]?.state === 'learning').length

  const bySubject = SUBJECTS.map(sub => {
    const cards = ALL_FLASHCARDS.filter(c => c.subject === sub.id)
    const m     = cards.filter(c => states[c.id]?.state === 'mastered').length
    const pct   = cards.length > 0 ? Math.round((m / cards.length) * 100) : 0
    return { id: sub.id, name: sub.name, color: sub.color, barWeight: sub.barWeight, total: cards.length, mastered: m, pct }
  })

  return { total, mastered, learning, streak: streak.count ?? 0, bySubject }
}

// ─── Bar review stats ─────────────────────────────────────────────────────────
function getBarStats() {
  const history = readJson(BAR_HISTORY_KEY, [])
  if (!history.length) return { sessions: 0, avgScore: 0, bestScore: 0, lastScore: null, history: [] }
  const scores   = history.map(h => h.score)
  return {
    sessions:  history.length,
    avgScore:  Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    bestScore: Math.max(...scores),
    lastScore: history[0]?.score ?? null,
    history:   history.slice(0, 10),
  }
}

// ─── Recitation stats ─────────────────────────────────────────────────────────
function getRecitationStats() {
  const history = readJson(RECITATION_KEY, [])
  if (!history.length) return { sessions: 0, avgScore: 0, history: [] }
  const scores = history.map(h => h.score)
  return {
    sessions: history.length,
    avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    history:  history.slice(0, 10),
  }
}

// ─── Overall readiness ────────────────────────────────────────────────────────
// Weighted: 50% flashcard mastery, 30% bar review avg, 20% recitation avg
function computeReadiness(srs, bar, rec) {
  const flashPct  = srs.total > 0 ? Math.round((srs.mastered / srs.total) * 100) : 0
  const barPct    = bar.avgScore
  const recPct    = rec.avgScore

  if (!bar.sessions && !rec.sessions) {
    // No session data yet — use flashcard mastery only
    return flashPct
  }
  const barW  = bar.sessions  > 0 ? 0.30 : 0
  const recW  = rec.sessions  > 0 ? 0.20 : 0
  const flashW = 1 - barW - recW
  return Math.round(flashPct * flashW + barPct * barW + recPct * recW)
}

// ─── Insights ─────────────────────────────────────────────────────────────────
function computeInsights(srsSubjects, weekly) {
  const sorted     = [...srsSubjects].sort((a, b) => b.pct - a.pct)
  const strongest  = sorted[0]
  const weakest    = sorted[sorted.length - 1]
  const bestDay    = [...weekly].sort((a, b) => b.minutes - a.minutes)[0]

  return {
    strongest: strongest ? { name: strongest.name, pct: strongest.pct, color: strongest.color } : null,
    weakest:   weakest   ? { name: weakest.name,   pct: weakest.pct,   color: weakest.color   } : null,
    bestDay:   bestDay?.minutes > 0 ? bestDay : null,
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function getProgressSnapshot() {
  const srs     = getSRSStats()
  const bar     = getBarStats()
  const rec     = getRecitationStats()
  const weekly  = getWeeklyActivity()
  const readiness = computeReadiness(srs, bar, rec)
  const insights  = computeInsights(srs.bySubject, weekly)
  const monthlyMinutes = getMonthlyMinutes()

  return {
    // headline numbers
    readiness,
    masteredCards:  srs.mastered,
    totalCards:     srs.total,
    streak:         srs.streak,
    monthlyMinutes,

    // per-module
    flashcards: srs,
    barReview:  bar,
    recitation: rec,

    // charts
    weekly,
    subjectBreakdown: srs.bySubject,
    insights,
  }
}

// ─── Bar review session saver ─────────────────────────────────────────────────
export function saveBarSession({ modeLabel, subject, score, qCount, date }) {
  const history = readJson(BAR_HISTORY_KEY, [])
  history.unshift({ modeLabel, subject, score, qCount, date: date ?? new Date().toISOString() })
  try { localStorage.setItem(BAR_HISTORY_KEY, JSON.stringify(history.slice(0, 50))) } catch {}
}
