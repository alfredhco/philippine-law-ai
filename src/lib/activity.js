// Lightweight cross-module activity logger.
// Each module calls logActivity() when a meaningful event occurs.
// Analytics and Dashboard read the log to show real usage data.

const ACTIVITY_KEY = 'ph_law_activity_v1'

function today() { return new Date().toISOString().split('T')[0] }
function dayLabel(iso) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en', { weekday: 'short' })
}

function readLog() {
  try { return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '{}') }
  catch { return {} }
}

function writeLog(log) {
  try {
    // Keep only last 90 days to avoid unbounded growth
    const keys = Object.keys(log).sort().slice(-90)
    const pruned = Object.fromEntries(keys.map(k => [k, log[k]]))
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(pruned))
  } catch {}
}

// Call from any module when a study event occurs
export function logActivity({ minutes = 0, cards = 0, barQuestions = 0, recitations = 0, issueSpots = 0 } = {}) {
  const log = readLog()
  const d = today()
  const prev = log[d] || { minutes: 0, cards: 0, barQuestions: 0, recitations: 0, issueSpots: 0 }
  log[d] = {
    minutes:      prev.minutes      + minutes,
    cards:        prev.cards        + cards,
    barQuestions: prev.barQuestions + barQuestions,
    recitations:  prev.recitations  + recitations,
    issueSpots:   prev.issueSpots   + issueSpots,
  }
  writeLog(log)
}

// Returns the last 7 days of activity for the weekly chart
export function getWeeklyActivity() {
  const log = readLog()
  const days = []
  for (let i = 6; i >= 0; i--) {
    const iso = new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
    const d = log[iso] || {}
    days.push({
      date:         iso,
      day:          dayLabel(iso),
      minutes:      d.minutes      ?? 0,
      cards:        d.cards        ?? 0,
      barQuestions: d.barQuestions ?? 0,
      recitations:  d.recitations  ?? 0,
    })
  }
  return days
}

// Returns 15 weeks of heatmap data (real activity log)
export function getHeatmapData(weeks = 15) {
  const log = readLog()
  const days = weeks * 7
  const result = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const iso = d.toISOString().split('T')[0]
    const entry = log[iso] || {}
    result.push({ date: d, dateStr: d.toDateString(), iso, minutes: entry.minutes || 0 })
  }
  return result
}

// Returns total study minutes this month
export function getMonthlyMinutes() {
  const log = readLog()
  const thisMonth = today().slice(0, 7) // 'YYYY-MM'
  return Object.entries(log)
    .filter(([k]) => k.startsWith(thisMonth))
    .reduce((s, [, v]) => s + (v.minutes ?? 0), 0)
}
