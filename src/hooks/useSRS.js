import { useState, useEffect, useCallback } from 'react'
import {
  ALL_FLASHCARDS, calculateSRS,
  getDueCards, getNewCards, getWeakCards, getDifficultCards,
  getMasteredCards, shuffle, SUBJECT_INFO,
} from '../data/flashcards/index.js'

const STORAGE_KEY  = 'ph-law-srs-v2'
const STREAK_KEY   = 'ph-law-srs-streak'
const SESSION_KEY  = 'ph-law-srs-session'

const loadStates = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

const loadStreak = () => {
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    const d   = raw ? JSON.parse(raw) : { count: 0, lastDate: null, longestStreak: 0 }
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    if (d.lastDate !== today && d.lastDate !== yesterday) {
      return { ...d, count: 0 }  // streak broken
    }
    return d
  } catch { return { count: 0, lastDate: null, longestStreak: 0 } }
}

export function useSRS() {
  const [cardStates, setCardStates] = useState(loadStates)
  const [streak, setStreak] = useState(loadStreak)
  const [todayReviewed, setTodayReviewed] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}')
      const today = new Date().toISOString().split('T')[0]
      return s.date === today ? s.reviewed : 0
    } catch { return 0 }
  })

  // persist card states
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardStates))
  }, [cardStates])

  // persist streak
  useEffect(() => {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak))
  }, [streak])

  const getState = useCallback((id) =>
    cardStates[id] || ALL_FLASHCARDS.find(c => c.id === id), [cardStates])

  const rateCard = useCallback((cardId, rating) => {
    const card = { ...ALL_FLASHCARDS.find(c => c.id === cardId), ...(cardStates[cardId] || {}) }
    const updates = calculateSRS(card, rating)

    setCardStates(prev => ({ ...prev, [cardId]: { ...card, ...updates } }))

    // update streak + today count
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    setStreak(prev => {
      if (prev.lastDate === today) return prev
      const newCount = prev.lastDate === yesterday ? prev.count + 1 : 1
      return {
        count: newCount,
        lastDate: today,
        longestStreak: Math.max(newCount, prev.longestStreak || 0),
      }
    })

    const newReviewed = todayReviewed + 1
    setTodayReviewed(newReviewed)
    localStorage.setItem(SESSION_KEY, JSON.stringify({ date: today, reviewed: newReviewed }))

    return updates
  }, [cardStates, todayReviewed])

  // ── queue builders ─────────────────────────────────────────────────────────

  const getQueue = useCallback((mode, subjectFilter = 'all') => {
    let base = subjectFilter === 'all'
      ? ALL_FLASHCARDS
      : ALL_FLASHCARDS.filter(c => c.subject === subjectFilter)

    switch (mode) {
      case 'daily':    return getDueCards(cardStates, base)
      case 'new':      return getNewCards(cardStates, base)
      case 'weak':     return getWeakCards(cardStates, base)
      case 'difficult':return getDifficultCards(cardStates, base)
      case 'mastered': return getMasteredCards(cardStates, base)
      case 'random':   return shuffle(base).slice(0, 20)
      default:         return getDueCards(cardStates, base)
    }
  }, [cardStates])

  // ── stats ──────────────────────────────────────────────────────────────────

  const stats = {
    total:      ALL_FLASHCARDS.length,
    mastered:   Object.values(cardStates).filter(s => s.state === 'mastered').length,
    learning:   Object.values(cardStates).filter(s => s.state === 'learning').length,
    review:     Object.values(cardStates).filter(s => s.state === 'review').length,
    newCards:   ALL_FLASHCARDS.length - Object.keys(cardStates).length,
    dueToday:   getDueCards(cardStates, ALL_FLASHCARDS).length,
    todayReviewed,
    streak:     streak.count,
    longestStreak: streak.longestStreak || streak.count,

    bySubject: Object.entries(SUBJECT_INFO).map(([id, info]) => {
      const subjectCards  = ALL_FLASHCARDS.filter(c => c.subject === id)
      const masteredCount = subjectCards.filter(c => cardStates[c.id]?.state === 'mastered').length
      return {
        ...info, id,
        total:    subjectCards.length,
        mastered: masteredCount,
        pct:      Math.round((masteredCount / subjectCards.length) * 100),
      }
    }),
  }

  return { cardStates, getState, rateCard, getQueue, stats }
}
