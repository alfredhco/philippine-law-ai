import { useState, useEffect, useCallback } from 'react'
import { ALL_ARTICLES } from '../data/codal/index.js'

const STORAGE_KEY = 'ph-law-codal-progress'

const initial = () => ({
  readArticles:   [],     // string[]
  bookmarks:      [],     // string[]
  favorites:      [],     // string[]
  history:        [],     // { id, title, timestamp }[]
  highlights:     {},     // { [articleId]: { text, color }[] }
  lastReadId:     null,   // string | null
  readingPosition:{},     // { [articleId]: number } scroll%
})

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...initial(), ...JSON.parse(raw) } : initial()
  } catch {
    return initial()
  }
}

export function useCodalProgress() {
  const [state, setState] = useState(load)

  // persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const patch = useCallback((updater) =>
    setState(prev => ({ ...prev, ...updater(prev) })), [])

  // ── read tracking ────────────────────────────────────────────────────────
  const markRead = useCallback((id) => {
    patch(prev => {
      if (prev.readArticles.includes(id)) return {}
      const article = ALL_ARTICLES.find(a => a.id === id)
      const entry   = article
        ? { id, title: article.title, article: article.article, subject: article.subject, timestamp: Date.now() }
        : { id, title: id, timestamp: Date.now() }
      return {
        readArticles: [...prev.readArticles, id],
        history:      [entry, ...prev.history].slice(0, 50),
        lastReadId:   id,
      }
    })
  }, [patch])

  const isRead = useCallback((id) =>
    state.readArticles.includes(id), [state.readArticles])

  // ── bookmarks ────────────────────────────────────────────────────────────
  const toggleBookmark = useCallback((id) => {
    patch(prev => ({
      bookmarks: prev.bookmarks.includes(id)
        ? prev.bookmarks.filter(b => b !== id)
        : [...prev.bookmarks, id],
    }))
  }, [patch])

  const isBookmarked = useCallback((id) =>
    state.bookmarks.includes(id), [state.bookmarks])

  // ── favorites ────────────────────────────────────────────────────────────
  const toggleFavorite = useCallback((id) => {
    patch(prev => ({
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter(f => f !== id)
        : [...prev.favorites, id],
    }))
  }, [patch])

  const isFavorited = useCallback((id) =>
    state.favorites.includes(id), [state.favorites])

  // ── highlights ───────────────────────────────────────────────────────────
  const addHighlight = useCallback((articleId, text, color = '#f59e0b') => {
    patch(prev => ({
      highlights: {
        ...prev.highlights,
        [articleId]: [
          ...(prev.highlights[articleId] || []),
          { text, color, id: Date.now() },
        ],
      },
    }))
  }, [patch])

  const removeHighlight = useCallback((articleId, highlightId) => {
    patch(prev => ({
      highlights: {
        ...prev.highlights,
        [articleId]: (prev.highlights[articleId] || []).filter(h => h.id !== highlightId),
      },
    }))
  }, [patch])

  // ── reading position ─────────────────────────────────────────────────────
  const savePosition = useCallback((id, pct) => {
    patch(prev => ({
      readingPosition: { ...prev.readingPosition, [id]: pct },
      lastReadId: id,
    }))
  }, [patch])

  // ── stats ────────────────────────────────────────────────────────────────
  const stats = {
    totalRead:     state.readArticles.length,
    totalArticles: ALL_ARTICLES.length,
    totalBookmarks:state.bookmarks.length,
    totalFavorites:state.favorites.length,
    readPct: Math.round((state.readArticles.length / ALL_ARTICLES.length) * 100),
  }

  return {
    // state
    readArticles: state.readArticles,
    bookmarks:    state.bookmarks,
    favorites:    state.favorites,
    history:      state.history,
    highlights:   state.highlights,
    lastReadId:   state.lastReadId,
    readingPosition: state.readingPosition,
    stats,
    // actions
    markRead,
    isRead,
    toggleBookmark,
    isBookmarked,
    toggleFavorite,
    isFavorited,
    addHighlight,
    removeHighlight,
    savePosition,
  }
}
