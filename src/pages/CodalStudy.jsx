import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal, BookOpen, ChevronDown, PanelLeft } from 'lucide-react'

import ArticleNavigator from '../components/codal/ArticleNavigator'
import ArticleReader    from '../components/codal/ArticleReader'
import { Tabs }         from '../components/ui/Tabs'

import {
  ALL_ARTICLES,
  CODAL_REGISTRY,
  getArticle,
  getAdjacentArticles,
  searchArticles,
  SUBJECT_META,
} from '../data/codal/index.js'
import { useCodalProgress } from '../hooks/useCodalProgress'

const SUBJECT_TABS = [
  { label: 'All',          value: 'all'          },
  { label: 'Civil Law',    value: 'civil-law'    },
  { label: 'Criminal Law', value: 'criminal-law' },
  { label: 'Political',    value: 'political-law'},
]

export default function CodalStudy() {
  const progress = useCodalProgress()

  const [activeId,     setActiveId]     = useState(ALL_ARTICLES[0]?.id ?? null)
  const [query,        setQuery]        = useState('')
  const [subjectFilter,setSubjectFilter]= useState('all')
  const [navOpen,      setNavOpen]      = useState(true)
  const [searchResults,setSearchResults]= useState([])
  const [showSearch,   setShowSearch]   = useState(false)

  // run search
  useEffect(() => {
    if (!query.trim()) { setSearchResults([]); return }
    const results = searchArticles(query).filter(
      a => subjectFilter === 'all' || a.subject === subjectFilter
    )
    setSearchResults(results)
  }, [query, subjectFilter])

  const navigate = useCallback((id) => {
    setActiveId(id)
    setShowSearch(false)
    setQuery('')
  }, [])

  const article = getArticle(activeId)
  const { prev, next } = activeId ? getAdjacentArticles(activeId) : { prev: null, next: null }

  // reading stats
  const totalRead  = progress.stats.totalRead
  const totalArts  = progress.stats.totalArticles
  const readPct    = progress.stats.readPct

  return (
    <div className="flex h-[calc(100vh-72px)] -mx-4 md:-mx-6 -mt-4 md:-mt-6 overflow-hidden">

      {/* ── Left navigator panel ─────────────────────── */}
      <AnimatePresence initial={false}>
        {navOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden md:flex flex-col shrink-0 border-r border-navy-700/80 bg-navy-900/50 overflow-hidden"
          >
            {/* Navigator header */}
            <div className="px-3 py-3 border-b border-navy-700/80">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-gold-400" />
                  <span className="text-xs font-bold text-white">Codal Library</span>
                </div>
                <span className="text-[10px] text-gray-600 font-mono">{totalRead}/{totalArts}</span>
              </div>
              {/* Progress */}
              <div className="h-1 bg-navy-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-accent-orange rounded-full"
                  animate={{ width: `${readPct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            <ArticleNavigator
              activeId={activeId}
              onSelect={navigate}
              bookmarks={progress.bookmarks}
              favorites={progress.favorites}
              history={progress.history}
              isRead={progress.isRead}
              isBookmarked={progress.isBookmarked}
              isFavorited={progress.isFavorited}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main reading pane ──────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-navy-700/80 bg-navy-900/60 backdrop-blur-sm shrink-0">

          {/* Nav toggle */}
          <button
            onClick={() => setNavOpen(o => !o)}
            className={`p-2 rounded-xl transition-all ${navOpen ? 'bg-gold-500/10 text-gold-400' : 'text-gray-500 hover:text-gray-300 hover:bg-navy-800'}`}
            title="Toggle navigator"
          >
            <PanelLeft size={15} />
          </button>

          {/* Subject filter */}
          <div className="hidden md:block">
            <Tabs
              tabs={SUBJECT_TABS}
              active={subjectFilter}
              onChange={setSubjectFilter}
              variant="default"
              className="scale-90 origin-left"
            />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm ml-auto">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSearch(true) }}
                onFocus={() => setShowSearch(true)}
                placeholder="Search articles, topics, provisions..."
                className="w-full pl-8 pr-8 py-2 bg-navy-800/60 border border-navy-700/60 rounded-xl text-xs text-gray-200 placeholder-gray-600 outline-none focus:border-gold-500/40 transition-colors"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setShowSearch(false) }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Stats pill */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-navy-800/40 rounded-xl border border-navy-700/40 text-xs text-gray-500">
            <span><span className="text-gold-400 font-semibold">{progress.stats.totalBookmarks}</span> saved</span>
            <span><span className="text-emerald-400 font-semibold">{totalRead}</span> read</span>
          </div>
        </div>

        {/* Search results dropdown */}
        <AnimatePresence>
          {showSearch && query && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-[110px] left-1/2 -translate-x-1/2 z-30 w-full max-w-lg bg-navy-800 border border-navy-600 rounded-2xl shadow-navy-lg overflow-hidden"
            >
              <div className="px-4 py-2 border-b border-navy-700 flex items-center justify-between">
                <span className="text-xs text-gray-500">{searchResults.length} results for "{query}"</span>
                <button onClick={() => setShowSearch(false)} className="text-gray-600 hover:text-gray-400">
                  <X size={12} />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {searchResults.slice(0, 8).map(a => {
                  const meta = SUBJECT_META[a.subject]
                  return (
                    <button
                      key={a.id}
                      onClick={() => navigate(a.id)}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-navy-700/50 transition-colors text-left border-b border-navy-700/40 last:border-0"
                    >
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: meta?.color ?? '#f59e0b' }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono font-bold text-gray-500">Art. {a.article}</span>
                          <span className="text-[10px] text-gray-700">{meta?.name}</span>
                        </div>
                        <p className="text-sm text-gray-300 truncate">{a.title}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Article reader */}
        <div className="flex-1 overflow-hidden">
          <ArticleReader
            article={article}
            prev={prev}
            next={next}
            onNavigate={navigate}
            isBookmarked={progress.isBookmarked}
            isFavorited={progress.isFavorited}
            onToggleBookmark={progress.toggleBookmark}
            onToggleFavorite={progress.toggleFavorite}
            onMarkRead={progress.markRead}
            isRead={progress.isRead}
          />
        </div>
      </div>

      {/* ── Mobile bottom article picker ──────────────── */}
      <MobileArticlePicker
        articles={ALL_ARTICLES}
        activeId={activeId}
        onSelect={navigate}
        isRead={progress.isRead}
      />
    </div>
  )
}

// Compact mobile bottom-sheet article selector
function MobileArticlePicker({ articles, activeId, onSelect, isRead }) {
  const [open, setOpen] = useState(false)
  const active = articles.find(a => a.id === activeId)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? articles : articles.filter(a => a.subject === filter)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-20">
      {/* Trigger bar */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-navy-800 border-t border-navy-700/80 backdrop-blur-xl"
      >
        <BookOpen size={15} className="text-gold-400 shrink-0" />
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-semibold text-white truncate">
            {active ? `Art. ${active.article} — ${active.title}` : 'Select article'}
          </p>
        </div>
        <ChevronDown size={14} className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm z-10"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed bottom-0 left-0 right-0 z-20 bg-navy-900 border-t border-navy-700 rounded-t-2xl max-h-[60vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-navy-700">
                <span className="text-sm font-semibold text-white">All Articles</span>
                <button onClick={() => setOpen(false)} className="text-gray-500">
                  <X size={16} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1">
                {filtered.map(a => (
                  <button
                    key={a.id}
                    onClick={() => { onSelect(a.id); setOpen(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 border-b border-navy-800/60 transition-all ${
                      a.id === activeId ? 'bg-gold-500/10' : 'hover:bg-navy-800'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isRead(a.id) ? 'bg-emerald-500' : 'bg-navy-600'}`} />
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-xs font-mono text-gray-500">Art. {a.article}</span>
                      <p className="text-sm text-gray-300 truncate">{a.title}</p>
                    </div>
                    {a.id === activeId && <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
