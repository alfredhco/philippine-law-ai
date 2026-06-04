const PROG_KEY = 'ph_law_prog_v1'

export const LEVELS = [
  { level: 1,  title: 'First Year',        xp: 0,      color: '#6b7280', icon: '📖' },
  { level: 2,  title: 'Second Year',       xp: 250,    color: '#60a5fa', icon: '📚' },
  { level: 3,  title: 'Third Year',        xp: 600,    color: '#a78bfa', icon: '🎓' },
  { level: 4,  title: 'Law Graduate',      xp: 1200,   color: '#34d399', icon: '⚖️' },
  { level: 5,  title: 'Bar Candidate',     xp: 2500,   color: '#fb923c', icon: '📋' },
  { level: 6,  title: 'Bar Reviewer',      xp: 4500,   color: '#fbbf24', icon: '🏛️' },
  { level: 7,  title: 'Associate Counsel', xp: 7000,   color: '#f97316', icon: '⚔️' },
  { level: 8,  title: 'Junior Associate',  xp: 10000,  color: '#ef4444', icon: '🔱' },
  { level: 9,  title: 'Senior Associate',  xp: 14000,  color: '#ec4899', icon: '🌟' },
  { level: 10, title: 'Partner',           xp: 19000,  color: '#8b5cf6', icon: '👑' },
  { level: 11, title: 'Bar Passer',        xp: 25000,  color: '#0ea5e9', icon: '🏆' },
  { level: 12, title: 'Counselor',         xp: 35000,  color: '#10b981', icon: '⚜️' },
]

export const XP_REWARDS = {
  flashcard_mastered:    10,
  flashcard_reviewed:     3,
  bar_correct:           15,
  bar_attempted:          5,
  recitation_session:    30,
  irac_submission:       20,
  issue_spotting:        20,
  codal_article:          8,
  study_minute:           1,
  daily_target_complete:  50,
  perfect_bar_score:     100,
  streak_bonus:            5,
}

export const ACHIEVEMENTS = [
  { id: 'first_card',    name: 'First Flashcard',       desc: 'Review your first flashcard',           icon: '🃏', color: '#6366f1', rarity: 'common'    },
  { id: 'first_session', name: 'Scholar in the Making', desc: 'Complete your first study session',     icon: '📖', color: '#60a5fa', rarity: 'common'    },
  { id: 'week_streak',   name: 'Week Warrior',          desc: 'Maintain a 7-day study streak',         icon: '🔥', color: '#f97316', rarity: 'uncommon'  },
  { id: 'month_streak',  name: 'Iron Discipline',       desc: '30-day study streak',                   icon: '⚡', color: '#fbbf24', rarity: 'rare'      },
  { id: 'century_cards', name: 'Century Club',          desc: 'Master 100 flashcards',                 icon: '💯', color: '#10b981', rarity: 'uncommon'  },
  { id: 'all_cards',     name: 'Card Shark',            desc: 'Master every single flashcard',         icon: '🦈', color: '#0ea5e9', rarity: 'legendary' },
  { id: 'perfect_score', name: 'Perfect Marks',         desc: 'Score 100% on a bar review session',   icon: '✨', color: '#f59e0b', rarity: 'rare'      },
  { id: 'bar_ready',     name: 'Bar Ready',             desc: 'Reach 75%+ overall bar readiness',     icon: '🏛️', color: '#f97316', rarity: 'rare'      },
  { id: 'night_owl',     name: 'Night Owl',             desc: 'Study past 10:00 PM',                   icon: '🦉', color: '#8b5cf6', rarity: 'common'    },
  { id: 'early_bird',    name: 'Early Bird',            desc: 'Study before 7:00 AM',                  icon: '🌅', color: '#fbbf24', rarity: 'common'    },
  { id: 'recit_vet',     name: 'Recitation Veteran',    desc: 'Complete 10 recitation sessions',       icon: '🎤', color: '#ec4899', rarity: 'uncommon'  },
  { id: 'undefeated',    name: 'Undefeated',            desc: '5 consecutive recitations at 80%+',    icon: '🛡️', color: '#10b981', rarity: 'rare'      },
  { id: 'irac_master',   name: 'IRAC Champion',         desc: 'Submit 10 IRAC analyses',               icon: '📝', color: '#a78bfa', rarity: 'uncommon'  },
  { id: 'issue_hawk',    name: 'Issue Hawk',            desc: 'Spot issues in 20 fact patterns',       icon: '🦅', color: '#ef4444', rarity: 'uncommon'  },
  { id: 'codal_devotee', name: 'Codal Devotee',         desc: 'Read 50 codal articles',                icon: '📜', color: '#34d399', rarity: 'uncommon'  },
  { id: 'comeback_kid',  name: 'Comeback Kid',          desc: 'Return to studying after a 3-day break',icon: '💪', color: '#f97316', rarity: 'common'    },
  { id: 'level_5',       name: 'Halfway There',         desc: 'Reach Level 5: Bar Candidate',          icon: '⭐', color: '#fb923c', rarity: 'uncommon'  },
  { id: 'level_10',      name: 'Almost There',          desc: 'Reach Level 10: Partner',               icon: '🌟', color: '#8b5cf6', rarity: 'rare'      },
  { id: 'max_level',     name: 'True Counselor',        desc: 'Reach Level 12: Counselor',             icon: '⚜️', color: '#10b981', rarity: 'legendary' },
  { id: 'all_subjects',  name: 'Renaissance Lawyer',    desc: 'Study all 9 bar subjects',              icon: '🎯', color: '#f59e0b', rarity: 'rare'      },
]

export const RARITY_COLORS = {
  common:   '#6b7280',
  uncommon: '#10b981',
  rare:     '#6366f1',
  legendary:'#f59e0b',
}

export const RARITY_LABELS = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', legendary: 'Legendary' }

// ─── Storage ──────────────────────────────────────────────────────────────────
function read() {
  try {
    const def = {
      xp: 0, unlocked: [], recitation: { current: 0, best: 0, total: 0 },
      studiedSubjects: [], iracCount: 0, issueCount: 0, codalCount: 0,
      dailyTargets: { minutes: 30, flashcards: 10, barQuestions: 5 },
      reminderTime: '19:00', reminderEnabled: false, xpLog: [],
    }
    return { ...def, ...JSON.parse(localStorage.getItem(PROG_KEY) || '{}') }
  } catch { return { xp: 0, unlocked: [], recitation: { current: 0, best: 0, total: 0 }, studiedSubjects: [], iracCount: 0, issueCount: 0, codalCount: 0, dailyTargets: { minutes: 30, flashcards: 10, barQuestions: 5 }, reminderTime: '19:00', reminderEnabled: false, xpLog: [] } }
}

function save(s) { try { localStorage.setItem(PROG_KEY, JSON.stringify(s)) } catch {} }
function readActivity() { try { return JSON.parse(localStorage.getItem('ph_law_activity_v1') || '{}') } catch { return {} } }

// ─── Level helpers ─────────────────────────────────────────────────────────────
export function getLevelInfo(xp) {
  let cur = LEVELS[0]
  for (const l of LEVELS) { if (xp >= l.xp) cur = l; else break }
  const idx = LEVELS.indexOf(cur)
  const nxt = LEVELS[idx + 1] ?? null
  const pct = nxt ? Math.min(100, Math.round(((xp - cur.xp) / (nxt.xp - cur.xp)) * 100)) : 100
  return { current: cur, next: nxt, pct, xpToNext: nxt ? nxt.xp - xp : 0 }
}

// ─── Award XP ─────────────────────────────────────────────────────────────────
export function awardXP(type, count = 1, meta = {}) {
  const s = read()
  const amount = (XP_REWARDS[type] ?? 0) * count
  if (amount === 0) return { newAchievements: [], leveledUp: false, xpGained: 0 }

  const oldLvl = getLevelInfo(s.xp)
  s.xp += amount

  const today = new Date().toISOString().split('T')[0]
  const entry = s.xpLog.find(e => e.date === today)
  if (entry) entry.xp += amount
  else s.xpLog.push({ date: today, xp: amount })
  s.xpLog = s.xpLog.slice(-30)

  const newLvl = getLevelInfo(s.xp)
  const leveledUp = newLvl.current.level > oldLvl.current.level
  const earned = []
  const na = (id) => { if (!s.unlocked.includes(id)) { s.unlocked.push(id); earned.push(id) } }

  if (newLvl.current.level >= 5)  na('level_5')
  if (newLvl.current.level >= 10) na('level_10')
  if (newLvl.current.level >= 12) na('max_level')

  if (type === 'flashcard_reviewed') na('first_card')
  if (type === 'study_minute')       na('first_session')
  if (type === 'irac_submission')    { s.iracCount = (s.iracCount || 0) + 1; if (s.iracCount >= 10) na('irac_master') }
  if (type === 'issue_spotting')     { s.issueCount = (s.issueCount || 0) + 1; if (s.issueCount >= 20) na('issue_hawk') }
  if (type === 'codal_article')      { s.codalCount = (s.codalCount || 0) + 1; if (s.codalCount >= 50) na('codal_devotee') }

  if ((meta.streak ?? 0) >= 7)           na('week_streak')
  if ((meta.streak ?? 0) >= 30)          na('month_streak')
  if ((meta.masteredCards ?? 0) >= 100)  na('century_cards')
  if (meta.allCardsMastered)             na('all_cards')
  if (meta.perfectScore)                 na('perfect_score')
  if ((meta.barReadiness ?? 0) >= 75)    na('bar_ready')

  const h = new Date().getHours()
  if (h >= 22) na('night_owl')
  if (h < 7)   na('early_bird')

  save(s)
  return {
    newAchievements: earned.map(id => ACHIEVEMENTS.find(a => a.id === id)).filter(Boolean),
    leveledUp,
    newLevel: newLvl.current,
    xpGained: amount,
  }
}

// ─── Recitation survival ──────────────────────────────────────────────────────
export function recordRecitation(score) {
  const s = read()
  s.recitation = s.recitation || { current: 0, best: 0, total: 0 }
  s.recitation.total = (s.recitation.total || 0) + 1
  const earned = []
  const na = (id) => { if (!s.unlocked.includes(id)) { s.unlocked.push(id); earned.push(id) } }

  if (score >= 75) {
    s.recitation.current++
    s.recitation.best = Math.max(s.recitation.best, s.recitation.current)
    if (score >= 80 && s.recitation.current >= 5) na('undefeated')
  } else {
    s.recitation.current = 0
  }
  if (s.recitation.total >= 10) na('recit_vet')
  save(s)
  return { survival: s.recitation, newAchievements: earned.map(id => ACHIEVEMENTS.find(a => a.id === id)).filter(Boolean) }
}

// ─── Subject tracking ─────────────────────────────────────────────────────────
export function recordSubject(subjectId) {
  const s = read()
  if (!s.studiedSubjects.includes(subjectId)) {
    s.studiedSubjects.push(subjectId)
    if (s.studiedSubjects.length >= 9 && !s.unlocked.includes('all_subjects')) s.unlocked.push('all_subjects')
    save(s)
  }
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export function setTargets(targets) { const s = read(); s.dailyTargets = { ...s.dailyTargets, ...targets }; save(s) }
export function setReminder(time, enabled) { const s = read(); s.reminderTime = time; s.reminderEnabled = enabled; save(s) }

// ─── Today's targets ──────────────────────────────────────────────────────────
export function getTodayTargets() {
  const s = read()
  const t = s.dailyTargets
  const today = new Date().toISOString().split('T')[0]
  const d = readActivity()[today] || {}
  const mins = d.minutes || 0, cards = d.cards || 0, barQs = d.barQuestions || 0
  return {
    minutes:      { current: mins,  goal: t.minutes,      pct: Math.min(100, Math.round((mins  / t.minutes) * 100)),      done: mins  >= t.minutes      },
    flashcards:   { current: cards, goal: t.flashcards,   pct: Math.min(100, Math.round((cards / t.flashcards) * 100)),   done: cards >= t.flashcards   },
    barQuestions: { current: barQs, goal: t.barQuestions, pct: Math.min(100, Math.round((barQs / t.barQuestions) * 100)), done: barQs >= t.barQuestions },
    allDone: mins >= t.minutes && cards >= t.flashcards && barQs >= t.barQuestions,
  }
}

// ─── Full snapshot ─────────────────────────────────────────────────────────────
export function getProgressionSnapshot() {
  const s = read()
  return {
    xp: s.xp,
    levelInfo: getLevelInfo(s.xp),
    achievements: ACHIEVEMENTS.map(a => ({ ...a, unlocked: s.unlocked.includes(a.id), rarityColor: RARITY_COLORS[a.rarity] })),
    unlockedCount: s.unlocked.length,
    totalAchievements: ACHIEVEMENTS.length,
    recitation: s.recitation || { current: 0, best: 0, total: 0 },
    studiedSubjects: s.studiedSubjects || [],
    todayTargets: getTodayTargets(),
    dailyTargetConfig: s.dailyTargets,
    reminderTime: s.reminderTime,
    reminderEnabled: s.reminderEnabled,
    xpLog: s.xpLog || [],
  }
}
