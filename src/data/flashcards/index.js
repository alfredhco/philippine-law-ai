import civilLawCards    from './civilLawCards.js'
import criminalLawCards from './criminalLawCards.js'
import politicalLawCards from './politicalLawCards.js'
import remedialLawCards from './remedialLawCards.js'
import { commercialLawCards, taxationLawCards, laborLawCards, legalEthicsCards } from './otherSubjectCards.js'

// ─── Flat registry with SRS defaults ────────────────────────────────────────

const INITIAL_SRS = {
  interval:     0,       // days until next review
  easeFactor:   2.5,     // SM-2 ease factor (default 2.5)
  repetitions:  0,       // number of successful reviews
  dueDate:      new Date().toISOString().split('T')[0],  // today
  lastReviewed: null,
  totalReviews: 0,
  correctReviews: 0,
  state: 'new',          // 'new' | 'learning' | 'review' | 'mastered'
  ratings: [],           // history: 1=again, 2=hard, 3=good, 4=easy
}

export const ALL_FLASHCARDS = [
  ...civilLawCards,
  ...criminalLawCards,
  ...politicalLawCards,
  ...remedialLawCards,
  ...commercialLawCards,
  ...taxationLawCards,
  ...laborLawCards,
  ...legalEthicsCards,
].map(card => ({ ...INITIAL_SRS, ...card }))

export const TOTAL_CARDS = ALL_FLASHCARDS.length

// ─── Subject meta ────────────────────────────────────────────────────────────

export const SUBJECT_INFO = {
  'civil-law':     { name: 'Civil Law',     color: '#6366f1', count: civilLawCards.length },
  'criminal-law':  { name: 'Criminal Law',  color: '#ef4444', count: criminalLawCards.length },
  'political-law': { name: 'Political Law', color: '#0ea5e9', count: politicalLawCards.length },
  'remedial-law':  { name: 'Remedial Law',  color: '#10b981', count: remedialLawCards.length },
  'commercial-law':{ name: 'Commercial Law',color: '#f59e0b', count: commercialLawCards.length },
  'taxation-law':  { name: 'Taxation Law',  color: '#8b5cf6', count: taxationLawCards.length },
  'labor-law':     { name: 'Labor Law',     color: '#f97316', count: laborLawCards.length },
  'legal-ethics':  { name: 'Legal Ethics',  color: '#ec4899', count: legalEthicsCards.length },
}

// ─── SM-2 Algorithm ──────────────────────────────────────────────────────────
// rating: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy

export function calculateSRS(card, rating) {
  let { interval, easeFactor, repetitions } = card
  const today = new Date()

  let newInterval, newEF, newReps, newState

  if (rating === 1) {
    // Again — reset
    newInterval   = 1
    newReps       = 0
    newEF         = Math.max(1.3, easeFactor - 0.2)
    newState      = 'learning'
  } else if (rating === 2) {
    // Hard
    newInterval   = repetitions === 0 ? 1 : Math.max(1, Math.round(interval * 1.2))
    newReps       = repetitions + 1
    newEF         = Math.max(1.3, easeFactor - 0.15)
    newState      = repetitions < 2 ? 'learning' : 'review'
  } else if (rating === 3) {
    // Good
    if      (repetitions === 0) newInterval = 1
    else if (repetitions === 1) newInterval = 6
    else                         newInterval = Math.round(interval * easeFactor)
    newReps  = repetitions + 1
    newEF    = easeFactor
    newState = newInterval >= 21 ? 'mastered' : newReps < 3 ? 'learning' : 'review'
  } else {
    // Easy
    if      (repetitions === 0) newInterval = 4
    else if (repetitions === 1) newInterval = 10
    else                         newInterval = Math.round(interval * easeFactor * 1.3)
    newReps  = repetitions + 1
    newEF    = Math.min(2.5, easeFactor + 0.15)
    newState = newInterval >= 21 ? 'mastered' : 'review'
  }

  const dueDate = new Date(today)
  dueDate.setDate(today.getDate() + newInterval)

  return {
    interval:      newInterval,
    easeFactor:    Math.round(newEF * 100) / 100,
    repetitions:   newReps,
    dueDate:       dueDate.toISOString().split('T')[0],
    lastReviewed:  today.toISOString().split('T')[0],
    totalReviews:  (card.totalReviews || 0) + 1,
    correctReviews:(card.correctReviews || 0) + (rating >= 3 ? 1 : 0),
    state:         newState,
    ratings:       [...(card.ratings || []).slice(-20), rating],
  }
}

// ─── Queue builders ──────────────────────────────────────────────────────────

const today = () => new Date().toISOString().split('T')[0]

export function getDueCards(cardStates, allCards) {
  return allCards.filter(c => {
    const s = cardStates[c.id]
    if (!s) return true  // new card
    return s.dueDate <= today() && s.state !== 'mastered'
  })
}

export function getNewCards(cardStates, allCards, limit = 20) {
  return allCards
    .filter(c => !cardStates[c.id] || cardStates[c.id].state === 'new')
    .slice(0, limit)
}

export function getWeakCards(cardStates, allCards) {
  return allCards.filter(c => {
    const s = cardStates[c.id]
    if (!s || s.totalReviews < 2) return false
    const rate = s.correctReviews / s.totalReviews
    return rate < 0.6 || (s.ratings?.slice(-3).filter(r => r <= 2).length >= 2)
  })
}

export function getDifficultCards(cardStates, allCards) {
  return allCards.filter(c => {
    const s = cardStates[c.id]
    if (!s) return false
    return s.ratings?.slice(-5).filter(r => r === 1).length >= 2
      || s.easeFactor < 1.7
  })
}

export function getMasteredCards(cardStates, allCards) {
  return allCards.filter(c => cardStates[c.id]?.state === 'mastered')
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
