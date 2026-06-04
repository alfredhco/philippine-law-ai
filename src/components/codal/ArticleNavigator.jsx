import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, BookOpen, Bookmark, Star,
  History, Hash, CheckCircle,
} from 'lucide-react'
import { CODAL_REGISTRY, ALL_ARTICLES } from '../../data/codal/index.js'
import { cn } from '../../lib/utils'

const NAV_MODES = [
  { id: 'browse',    label: 'Browse',    icon: BookOpen  },
  { id: 'bookmarks', label: 'Saved',     icon: Bookmark  },
  { id: 'favorites', label: 'Favorites', icon: Star      },
  { id: 'history',   label: 'History',   icon: History   },
]

export default function ArticleNavigator({
  activeId,
  onSelect,
  bookmarks,
  favorites,
  history,
  isRead,
  isBookmarked,
  isFavorited,
  searchQuery = '',
}) {
  const [mode, setMode]               = useState('browse')
  const [expandedSubject, setExpanded]= useState('civil-law')
  const [expandedTopics, setTopics]   = useState({ obligations: true })

  const toggleTopic = (k) => setTopics(p => ({ ...p, [k]: !p[k] }))

  const articleItem = (article) => {
    const active     = article.id === activeId
    const read       = isRead(article.id)
    const bookmarked = isBookmarked(article.id)
    const fav        = isFavorited(article.id)

    return (
      <motion.button
        key={article.id}
        onClick={() => onSelect(article.id)}
        whileHover={{ x: 2 }}
        className={cn(
          'w-full text-left flex items-start gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150 group',
          active
            ? 'bg-gold-500/12 text-gold-300'
            : 'text-gray-500 hover:text-gray-200 hover:bg-navy-700/50'
        )}
      >
        {active && (
          <motion.div
            layoutId="nav-pill"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gold-500 rounded-full"
          />
        )}
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          {read
            ? <CheckCircle size={11} className="text-emerald-500/70" />
            : <Hash size={11} className={active ? 'text-gold-400' : 'text-gray-700'} />
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className={cn(
              'font-mono font-bold text-[10px]',
              active ? 'text-gold-400' : 'text-gray-600'
            )}>
              Art. {article.article}
            </span>
            {bookmarked && <Bookmark size={8} className="text-gold-400 fill-gold-400 shrink-0" />}
            {fav        && <Star     size={8} className="text-amber-400 fill-amber-400 shrink-0" />}
          </div>
          <p className={cn(
            'leading-snug truncate',
            active ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-300'
          )}>
            {article.title}
          </p>
        </div>
        {article.starred && (
          <Star size={9} className="text-gold-500/60 fill-gold-500/40 shrink-0 mt-0.5" />
        )}
      </motion.button>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Mode switcher */}
      <div className="flex items-center gap-1 p-2 border-b border-navy-700/80">
        {NAV_MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-medium transition-all',
              mode === m.id
                ? 'bg-gold-500/15 text-gold-400'
                : 'text-gray-600 hover:text-gray-400'
            )}
          >
            <m.icon size={11} />
            <span className="hidden sm:block">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-1.5 py-2 space-y-1">
        {/* ── BROWSE ── */}
        {mode === 'browse' && CODAL_REGISTRY.map(subject => {
          const isOpen = expandedSubject === subject.id
          const subjectArticles = subject.topics.flatMap(t => t.articles)
          const readCount = subjectArticles.filter(a => isRead(a.id)).length

          return (
            <div key={subject.id}>
              <button
                onClick={() => setExpanded(isOpen ? null : subject.id)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-navy-700/40 transition-all group"
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: subject.color }} />
                <span className="text-xs font-semibold text-gray-300 group-hover:text-white flex-1 text-left">
                  {subject.name}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">{readCount}/{subjectArticles.length}</span>
                <ChevronDown
                  size={12}
                  className={cn('text-gray-600 transition-transform', isOpen && 'rotate-180')}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-2 space-y-1 pb-1">
                      {subject.topics.map(topic => {
                        const topicOpen = expandedTopics[topic.id] !== false
                        return (
                          <div key={topic.id} className="relative">
                            <button
                              onClick={() => toggleTopic(topic.id)}
                              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-bold text-gray-600 hover:text-gray-400 uppercase tracking-wider"
                            >
                              <span className="flex-1 text-left">{topic.label}</span>
                              <ChevronDown size={10} className={cn('transition-transform', topicOpen && 'rotate-180')} />
                            </button>
                            <AnimatePresence>
                              {topicOpen && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden space-y-0.5 relative"
                                >
                                  {/* Left line */}
                                  <div className="absolute left-3 top-0 bottom-0 w-px bg-navy-700" />
                                  <div className="pl-2">
                                    {topic.articles.map(articleItem)}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {/* ── BOOKMARKS ── */}
        {mode === 'bookmarks' && (
          bookmarks.length === 0
            ? <p className="text-xs text-gray-600 text-center py-8">No bookmarks yet</p>
            : ALL_ARTICLES
                .filter(a => bookmarks.includes(a.id))
                .map(articleItem)
        )}

        {/* ── FAVORITES ── */}
        {mode === 'favorites' && (
          favorites.length === 0
            ? <p className="text-xs text-gray-600 text-center py-8">No favorites yet</p>
            : ALL_ARTICLES
                .filter(a => favorites.includes(a.id))
                .map(articleItem)
        )}

        {/* ── HISTORY ── */}
        {mode === 'history' && (
          history.length === 0
            ? <p className="text-xs text-gray-600 text-center py-8">No reading history</p>
            : history.slice(0, 30).map(entry => {
                const article = ALL_ARTICLES.find(a => a.id === entry.id)
                if (!article) return null
                return (
                  <motion.button
                    key={entry.timestamp}
                    onClick={() => onSelect(entry.id)}
                    whileHover={{ x: 2 }}
                    className="w-full text-left flex items-start gap-2 px-3 py-2 rounded-xl hover:bg-navy-700/50 transition-all group"
                  >
                    <History size={11} className="text-gray-700 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 group-hover:text-gray-200 truncate">{article.title}</p>
                      <p className="text-[10px] text-gray-700 mt-0.5">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.button>
                )
              })
        )}
      </div>
    </div>
  )
}
