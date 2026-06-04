import { supabase, isSupabaseEnabled } from './supabase'

function readLocal(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback } catch { return fallback }
}
function writeLocal(key, data) { try { localStorage.setItem(key, JSON.stringify(data)) } catch {} }

// ─── Progression ──────────────────────────────────────────────────────────────
async function pushProgression(userId) {
  const s = readLocal('ph_law_prog_v1', {})
  if (!s.xp && !s.unlocked?.length) return
  await supabase.from('progression').upsert({
    user_id: userId,
    xp: s.xp || 0,
    unlocked_achievements: s.unlocked || [],
    recitation_current: s.recitation?.current || 0,
    recitation_best:    s.recitation?.best    || 0,
    recitation_total:   s.recitation?.total   || 0,
    irac_count:  s.iracCount  || 0,
    issue_count: s.issueCount || 0,
    codal_count: s.codalCount || 0,
    daily_targets: s.dailyTargets || { minutes: 30, flashcards: 10, barQuestions: 5 },
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' })
}

async function pullProgression(userId) {
  const { data } = await supabase.from('progression').select('*').eq('user_id', userId).single()
  if (!data) return
  const local = readLocal('ph_law_prog_v1', {})
  writeLocal('ph_law_prog_v1', {
    ...local,
    xp: Math.max(local.xp || 0, data.xp || 0),
    unlocked: [...new Set([...(local.unlocked || []), ...(data.unlocked_achievements || [])])],
    recitation: {
      current: Math.max(local.recitation?.current || 0, data.recitation_current || 0),
      best:    Math.max(local.recitation?.best    || 0, data.recitation_best    || 0),
      total:   Math.max(local.recitation?.total   || 0, data.recitation_total   || 0),
    },
    iracCount:  Math.max(local.iracCount  || 0, data.irac_count  || 0),
    issueCount: Math.max(local.issueCount || 0, data.issue_count || 0),
    codalCount: Math.max(local.codalCount || 0, data.codal_count || 0),
    dailyTargets: data.daily_targets || local.dailyTargets,
  })
}

// ─── Activity log ─────────────────────────────────────────────────────────────
async function pushActivity(userId) {
  const log = readLocal('ph_law_activity_v1', {})
  const rows = Object.entries(log).map(([date, d]) => ({
    user_id: userId, date,
    minutes: d.minutes || 0, cards: d.cards || 0,
    bar_questions: d.barQuestions || 0, recitations: d.recitations || 0,
    issue_spots: d.issueSpots || 0, updated_at: new Date().toISOString(),
  }))
  if (!rows.length) return
  for (let i = 0; i < rows.length; i += 50)
    await supabase.from('activity_log').upsert(rows.slice(i, i + 50), { onConflict: 'user_id,date' })
}

async function pullActivity(userId) {
  const { data } = await supabase.from('activity_log').select('*').eq('user_id', userId)
  if (!data?.length) return
  const local = readLocal('ph_law_activity_v1', {})
  data.forEach(r => {
    const e = local[r.date] || {}
    local[r.date] = {
      minutes:      Math.max(e.minutes      || 0, r.minutes       || 0),
      cards:        Math.max(e.cards        || 0, r.cards         || 0),
      barQuestions: Math.max(e.barQuestions || 0, r.bar_questions || 0),
      recitations:  Math.max(e.recitations  || 0, r.recitations   || 0),
      issueSpots:   Math.max(e.issueSpots   || 0, r.issue_spots   || 0),
    }
  })
  writeLocal('ph_law_activity_v1', local)
}

// ─── Bar sessions ─────────────────────────────────────────────────────────────
async function pushBarHistory(userId) {
  const history = readLocal('bar_review_history', [])
  if (!history.length) return
  const rows = history.map(h => ({
    user_id: userId,
    client_key: `${userId}_${h.date || h.score + h.qCount}`,
    mode_label: h.modeLabel || '',
    subject: h.subject || 'all',
    score: h.score || 0,
    q_count: h.qCount || 0,
    created_at: h.date || new Date().toISOString(),
  }))
  await supabase.from('bar_sessions').upsert(rows, { onConflict: 'user_id,client_key', ignoreDuplicates: true })
}

async function pullBarHistory(userId) {
  const { data } = await supabase.from('bar_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(50)
  if (!data?.length) return
  const cloud = data.map(r => ({ modeLabel: r.mode_label, subject: r.subject, score: r.score, qCount: r.q_count, date: r.created_at }))
  const local = readLocal('bar_review_history', [])
  const merged = [...local, ...cloud]
    .filter((h, i, arr) => arr.findIndex(x => x.date === h.date && x.score === h.score) === i)
    .sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 50)
  writeLocal('bar_review_history', merged)
}

// ─── Recitation sessions ──────────────────────────────────────────────────────
async function pushRecitationHistory(userId) {
  const history = readLocal('recitation_history_v2', [])
  if (!history.length) return
  const rows = history.map(h => ({
    user_id: userId,
    client_key: `${userId}_${h.date || h.score + h.subject}`,
    professor: h.professor || '',
    subject: h.subject || 'all',
    score: h.score || 0,
    q_count: h.qCount || 0,
    created_at: h.date || new Date().toISOString(),
  }))
  await supabase.from('recitation_sessions').upsert(rows, { onConflict: 'user_id,client_key', ignoreDuplicates: true })
}

async function pullRecitationHistory(userId) {
  const { data } = await supabase.from('recitation_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(50)
  if (!data?.length) return
  const cloud = data.map(r => ({ professor: r.professor, subject: r.subject, score: r.score, qCount: r.q_count, date: r.created_at }))
  const local = readLocal('recitation_history_v2', [])
  const merged = [...local, ...cloud]
    .filter((h, i, arr) => arr.findIndex(x => x.date === h.date && x.score === h.score) === i)
    .sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 50)
  writeLocal('recitation_history_v2', merged)
}

// ─── SRS states ───────────────────────────────────────────────────────────────
async function pushSRSStates(userId) {
  const states = readLocal('ph-law-srs-v2', {})
  const rows = Object.entries(states).map(([cardId, s]) => ({
    user_id: userId, card_id: cardId,
    state: s.state || 'new', interval: s.interval || 1,
    ease_factor: s.easeFactor || 2.5, due_date: s.dueDate || '',
    review_count: s.reviewCount || 0, updated_at: new Date().toISOString(),
  }))
  if (!rows.length) return
  for (let i = 0; i < rows.length; i += 100)
    await supabase.from('srs_states').upsert(rows.slice(i, i + 100), { onConflict: 'user_id,card_id' })
}

async function pullSRSStates(userId) {
  const { data } = await supabase.from('srs_states').select('*').eq('user_id', userId)
  if (!data?.length) return
  const local = readLocal('ph-law-srs-v2', {})
  data.forEach(r => {
    const e = local[r.card_id]
    if (!e || (r.state === 'mastered' && e.state !== 'mastered') || (r.review_count || 0) > (e.reviewCount || 0))
      local[r.card_id] = { state: r.state, interval: r.interval, easeFactor: r.ease_factor, dueDate: r.due_date, reviewCount: r.review_count }
  })
  writeLocal('ph-law-srs-v2', local)
}

// ─── AI history ───────────────────────────────────────────────────────────────
async function pushAIHistory(userId) {
  const messages = readLocal('ai_coach_history_v1', [])
  const valid = messages.filter(m => m.id && m.content && m.role)
  if (!valid.length) return
  const rows = valid.map(m => ({
    user_id: userId, message_id: String(m.id),
    role: m.role, content: String(m.content).slice(0, 4000),
    subject: 'all', created_at: new Date(typeof m.id === 'number' ? m.id : Date.now()).toISOString(),
  }))
  await supabase.from('ai_messages').upsert(rows, { onConflict: 'user_id,message_id', ignoreDuplicates: true })
}

async function pullAIHistory(userId) {
  const { data } = await supabase.from('ai_messages').select('*').eq('user_id', userId).order('created_at', { ascending: true }).limit(60)
  if (!data?.length) return
  writeLocal('ai_coach_history_v1', data.map(r => ({ id: parseInt(r.message_id) || Date.now(), role: r.role, content: r.content })))
}

// ─── Bookmarks ────────────────────────────────────────────────────────────────
async function pushBookmarks(userId) {
  const list = readLocal('ph_law_bookmarks_v1', [])
  if (!list.length) return
  const rows = list.map(b => ({
    user_id: userId, type: b.type, ref_id: b.refId,
    subject: b.subject || '', title: b.title || '', note: b.note || '',
    created_at: b.createdAt || new Date().toISOString(),
  }))
  await supabase.from('bookmarks').upsert(rows, { onConflict: 'user_id,type,ref_id' })
}

async function pullBookmarks(userId) {
  const { data } = await supabase.from('bookmarks').select('*').eq('user_id', userId)
  if (!data?.length) return
  const cloud = data.map(r => ({ id: r.id, type: r.type, refId: r.ref_id, subject: r.subject, title: r.title, note: r.note, createdAt: r.created_at }))
  const local = readLocal('ph_law_bookmarks_v1', [])
  const merged = [...local, ...cloud].filter((b, i, arr) => arr.findIndex(x => x.type === b.type && x.refId === b.refId) === i)
  writeLocal('ph_law_bookmarks_v1', merged)
}

// ─── Full sync ────────────────────────────────────────────────────────────────
export async function syncAll(userId, direction = 'both') {
  if (!isSupabaseEnabled || !userId) return { success: false, reason: 'Supabase not configured' }
  try {
    if (direction === 'push' || direction === 'both')
      await Promise.allSettled([pushProgression(userId), pushActivity(userId), pushBarHistory(userId), pushRecitationHistory(userId), pushSRSStates(userId), pushAIHistory(userId), pushBookmarks(userId)])
    if (direction === 'pull' || direction === 'both')
      await Promise.allSettled([pullProgression(userId), pullActivity(userId), pullBarHistory(userId), pullRecitationHistory(userId), pullSRSStates(userId), pullAIHistory(userId), pullBookmarks(userId)])
    localStorage.setItem('ph_law_last_sync', new Date().toISOString())
    return { success: true }
  } catch (err) {
    return { success: false, reason: err.message }
  }
}

export function getLastSync() { return localStorage.getItem('ph_law_last_sync') }
