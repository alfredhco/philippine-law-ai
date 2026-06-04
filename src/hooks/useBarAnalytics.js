import { useState, useEffect, useCallback } from 'react'
import { BAR_SUBJECTS, getWeakTopics, PASSING_SCORE } from '../data/bar/index.js'

const STORAGE_KEY = 'ph-law-bar-analytics'

const emptyState = () => ({
  sessions: [],
  topicPerformance: {},
  subjectPerformance: Object.fromEntries(
    Object.keys(BAR_SUBJECTS).map(id => [id, { correct: 0, total: 0 }])
  ),
  totalExamsAttempted: 0,
  bestScore: 0,
  lastSession: null,
})

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...emptyState(), ...JSON.parse(raw) } : emptyState()
  } catch {
    return emptyState()
  }
}

export function useBarAnalytics() {
  const [data, setData] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  // ── Save session ────────────────────────────────────────────────────────
  const saveSession = useCallback((session) => {
    setData(prev => {
      // update topic performance
      const tp = { ...prev.topicPerformance }
      session.questionResults?.forEach(r => {
        if (!tp[r.topic]) tp[r.topic] = { correct: 0, total: 0 }
        tp[r.topic].total++
        if (r.correct) tp[r.topic].correct++
      })

      // update subject performance
      const sp = { ...prev.subjectPerformance }
      session.questionResults?.forEach(r => {
        if (!sp[r.subject]) sp[r.subject] = { correct: 0, total: 0 }
        sp[r.subject].total++
        if (r.correct) sp[r.subject].correct++
      })

      const sessions = [
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          ...session,
        },
        ...prev.sessions,
      ].slice(0, 50)  // keep last 50 sessions

      return {
        ...prev,
        sessions,
        topicPerformance: tp,
        subjectPerformance: sp,
        totalExamsAttempted: prev.totalExamsAttempted + 1,
        bestScore: Math.max(prev.bestScore, session.pct || 0),
        lastSession: new Date().toISOString(),
      }
    })
  }, [])

  // ── Derived analytics ────────────────────────────────────────────────────

  const analytics = {
    totalSessions:   data.sessions.length,
    bestScore:       data.bestScore,
    lastScore:       data.sessions[0]?.pct ?? null,
    averageScore:    data.sessions.length > 0
      ? Math.round(data.sessions.reduce((s, sess) => s + (sess.pct || 0), 0) / data.sessions.length)
      : null,
    passingRate:     data.sessions.length > 0
      ? Math.round(data.sessions.filter(s => s.pct >= PASSING_SCORE).length / data.sessions.length * 100)
      : null,
    recentSessions:  data.sessions.slice(0, 5),
    scoreHistory:    data.sessions.slice(0, 10).reverse().map(s => ({
      date:  new Date(s.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }),
      score: s.pct,
      mode:  s.mode,
    })),

    weakTopics: getWeakTopics(data),

    subjectBreakdown: Object.entries(data.subjectPerformance).map(([id, v]) => ({
      id,
      name:    BAR_SUBJECTS[id]?.name || id,
      color:   BAR_SUBJECTS[id]?.color || '#888',
      correct: v.correct,
      total:   v.total,
      pct:     v.total > 0 ? Math.round((v.correct / v.total) * 100) : null,
    })),

    topicBreakdown: Object.entries(data.topicPerformance)
      .map(([topic, v]) => ({
        topic,
        correct: v.correct,
        total: v.total,
        pct: Math.round((v.correct / v.total) * 100),
      }))
      .sort((a, b) => a.pct - b.pct),

    recommendations: buildRecommendations(data),
  }

  return { analytics, saveSession, rawData: data }
}

function buildRecommendations(data) {
  const recs = []
  const weakTopics = getWeakTopics(data)

  if (weakTopics.length > 0) {
    recs.push({
      priority: 'high',
      type: 'weak-topic',
      title: `Review ${weakTopics.slice(0, 3).join(', ')}`,
      desc: `Your accuracy in these topics is below 60%. Drill these until you hit 80%+.`,
      action: 'Start Weak Area Review',
      mode: 'weak-areas',
    })
  }

  const subjectScores = Object.entries(data.subjectPerformance)
    .filter(([, v]) => v.total > 0)
    .map(([id, v]) => ({ id, pct: Math.round((v.correct / v.total) * 100) }))
    .sort((a, b) => a.pct - b.pct)

  if (subjectScores[0]?.pct < 60) {
    const weakSubject = BAR_SUBJECTS[subjectScores[0].id]?.name
    recs.push({
      priority: 'high',
      type: 'weak-subject',
      title: `Focus on ${weakSubject}`,
      desc: `Only ${subjectScores[0].pct}% accuracy. This subject needs intensive review before the bar.`,
      action: 'Drill This Subject',
      mode: `${subjectScores[0].id.replace('-law', '')}-sprint`,
    })
  }

  const avgScore = data.sessions.length > 0
    ? data.sessions.slice(0, 5).reduce((s, sess) => s + (sess.pct || 0), 0) / Math.min(data.sessions.length, 5)
    : 0

  if (avgScore >= 75) {
    recs.push({
      priority: 'normal',
      type: 'maintain',
      title: 'Maintain Your Momentum',
      desc: `You\'re averaging ${Math.round(avgScore)}% — above passing. Keep doing daily mock exams to stay sharp.`,
      action: 'Take Full Mock Exam',
      mode: 'full-mock',
    })
  }

  if (data.sessions.length === 0) {
    recs.push({
      priority: 'normal',
      type: 'start',
      title: 'Start Your Bar Prep Journey',
      desc: 'Take your first mock exam to establish a baseline score and identify your strengths.',
      action: 'Take First Exam',
      mode: 'full-mock',
    })
  }

  return recs
}
