const KEY = 'ph_law_bookmarks_v1'

function read() { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } }
function write(b) { try { localStorage.setItem(KEY, JSON.stringify(b)) } catch {} }

export function getBookmarks(type = null) {
  const all = read()
  return type ? all.filter(b => b.type === type) : all
}

export function addBookmark({ type, refId, subject = '', title = '', note = '' }) {
  const list = read()
  if (list.some(b => b.type === type && b.refId === refId)) return false
  list.unshift({ id: Date.now().toString(), type, refId, subject, title, note, createdAt: new Date().toISOString() })
  write(list)
  return true
}

export function removeBookmark(type, refId) {
  write(read().filter(b => !(b.type === type && b.refId === refId)))
}

export function isBookmarked(type, refId) {
  return read().some(b => b.type === type && b.refId === refId)
}

export function updateBookmarkNote(type, refId, note) {
  const list = read()
  const idx = list.findIndex(b => b.type === type && b.refId === refId)
  if (idx >= 0) { list[idx] = { ...list[idx], note }; write(list) }
}
