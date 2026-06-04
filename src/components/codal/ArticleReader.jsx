import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bookmark, Star, Copy, ChevronLeft, ChevronRight,
  BookOpen, Lightbulb, Brain, Clipboard, AlertTriangle,
  FileEdit, CheckCircle, Maximize2, Minimize2, Share2,
  Clock, Hash,
} from 'lucide-react'
import { SUBJECT_META } from '../../data/codal/index.js'
import { useToast } from '../../context/ToastContext'

const SECTIONS = [
  { key: 'text',                icon: BookOpen,      label: 'Official Provision',  color: '#f59e0b', alwaysOpen: true },
  { key: 'taglishExplanation',  icon: Lightbulb,     label: 'Taglish Explanation', color: '#38bdf8' },
  { key: 'mnemonic',            icon: Brain,         label: 'Mnemonic',            color: '#a78bfa' },
  { key: 'practicalExample',    icon: Clipboard,     label: 'Practical Example',   color: '#34d399' },
  { key: 'barIssue',            icon: AlertTriangle, label: 'Common Bar Issue',    color: '#f87171' },
  { key: 'practiceScenario',    icon: FileEdit,      label: 'Practice Scenario',   color: '#fb923c' },
]

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/\*\*(.+?)\*\*/g,  '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g,       '<em class="italic text-gray-300">$1</em>')
    .replace(/`(.+?)`/g,         '<code class="px-1 py-0.5 bg-navy-700 rounded text-xs font-mono text-gold-300">$1</code>')
    .split('\n')
    .map(line =>
      line.startsWith('•')
        ? `<li class="ml-3 text-gray-300">${line.slice(1).trim()}</li>`
        : `<p class="mb-1.5">${line}</p>`
    )
    .join('')
}

export default function ArticleReader({
  article,
  prev,
  next,
  onNavigate,
  isBookmarked,
  isFavorited,
  onToggleBookmark,
  onToggleFavorite,
  onMarkRead,
  isRead,
}) {
  const toast           = useToast()
  const containerRef    = useRef(null)
  const [openSections, setOpen]   = useState({ text: true, taglishExplanation: true })
  const [focusMode, setFocusMode] = useState(false)
  const [readPct, setReadPct]     = useState(0)
  const [copied, setCopied]       = useState(false)

  // reset on article change
  useEffect(() => {
    setOpen({ text: true, taglishExplanation: true })
    setReadPct(0)
    if (containerRef.current) containerRef.current.scrollTop = 0
  }, [article?.id])

  // reading progress via scroll
  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const pct = Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    setReadPct(Math.min(100, Math.max(0, pct)))
    if (pct >= 80 && !isRead(article?.id)) {
      onMarkRead(article?.id)
    }
  }, [article?.id, isRead, onMarkRead])

  const toggleSection = (key) =>
    setOpen(p => ({ ...p, [key]: !p[key] }))

  const expandAll = () =>
    setOpen(Object.fromEntries(SECTIONS.map(s => [s.key, true])))

  const copyArticle = () => {
    const text = `Art. ${article.article} — ${article.title}\n\n${article.text}`
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    toast.success('Copied!', `Article ${article.article} copied to clipboard.`)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20 px-6">
        <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center mb-4">
          <BookOpen size={24} className="text-gray-700" />
        </div>
        <p className="text-sm font-semibold text-gray-500 mb-1">Select an article</p>
        <p className="text-xs text-gray-700">Choose from the navigator on the left to begin reading.</p>
      </div>
    )
  }

  const subjectMeta = SUBJECT_META[article.subject] || { name: article.subject, color: '#f59e0b', accent: '#fcd34d' }
  const difficultyColor = { easy: '#10b981', medium: '#f59e0b', hard: '#ef4444' }[article.difficulty] || '#f59e0b'

  return (
    <div className={`flex flex-col h-full ${focusMode ? 'bg-navy-950' : ''}`}>
      {/* Reading progress bar */}
      <div className="h-0.5 bg-navy-800 shrink-0">
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${subjectMeta.color}, #f97316)` }}
          animate={{ width: `${readPct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Action toolbar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-navy-700/80 shrink-0 bg-navy-900/60">
        {/* Subject + article badge */}
        <div className="flex items-center gap-2 mr-auto min-w-0">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${subjectMeta.color}18`, color: subjectMeta.color }}>
            <Hash size={9} />
            Art. {article.article}
          </div>
          <span className="text-[10px] text-gray-600 hidden sm:block truncate">
            {article.topicLabel}
          </span>
          {isRead(article.id) && (
            <div className="flex items-center gap-1 text-emerald-500/70">
              <CheckCircle size={11} />
              <span className="text-[10px] hidden sm:block">Read</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={expandAll}
            className="px-2.5 py-1.5 text-[10px] text-gray-500 hover:text-gray-300 bg-navy-800 rounded-lg transition-all border border-navy-700"
          >
            Expand all
          </button>

          <ActionBtn
            onClick={() => onToggleFavorite(article.id)}
            active={isFavorited(article.id)}
            activeClass="text-amber-400"
            title={isFavorited(article.id) ? 'Remove favorite' : 'Add to favorites'}
          >
            <Star size={14} className={isFavorited(article.id) ? 'fill-amber-400' : ''} />
          </ActionBtn>

          <ActionBtn
            onClick={() => onToggleBookmark(article.id)}
            active={isBookmarked(article.id)}
            activeClass="text-gold-400"
            title={isBookmarked(article.id) ? 'Remove bookmark' : 'Bookmark'}
          >
            <Bookmark size={14} className={isBookmarked(article.id) ? 'fill-gold-400' : ''} />
          </ActionBtn>

          <ActionBtn onClick={copyArticle} title="Copy article">
            {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </ActionBtn>

          <ActionBtn
            onClick={() => setFocusMode(f => !f)}
            title={focusMode ? 'Exit focus mode' : 'Focus mode'}
            active={focusMode}
            activeClass="text-gold-400"
          >
            {focusMode ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </ActionBtn>
        </div>
      </div>

      {/* Main scrollable content */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        <div className={`mx-auto px-5 md:px-8 py-6 ${focusMode ? 'max-w-2xl' : 'max-w-3xl'}`}>

          {/* Article header */}
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-[10px] font-bold px-2 py-1 rounded-lg"
                style={{ background: `${subjectMeta.color}15`, color: subjectMeta.color }}>
                {subjectMeta.name}
              </span>
              <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-navy-800 text-gray-500">
                {article.chapter}
              </span>
              {article.difficulty && (
                <span className="text-[10px] font-medium px-2 py-1 rounded-lg"
                  style={{ background: `${difficultyColor}12`, color: difficultyColor }}>
                  {article.difficulty}
                </span>
              )}
              {article.readTime && (
                <span className="flex items-center gap-1 text-[10px] text-gray-600">
                  <Clock size={9} />
                  {article.readTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight mb-1">
              {article.title}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Article {article.article} · {article.topicLabel}
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-3">
            {SECTIONS.map(({ key, icon: Icon, label, color, alwaysOpen }) => {
              const content = article[key]
              if (!content) return null
              const isOpen = alwaysOpen || openSections[key]

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden border border-navy-700/60"
                  style={{ background: `${color}04` }}
                >
                  {/* Section header */}
                  <button
                    onClick={() => !alwaysOpen && toggleSection(key)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 transition-all ${alwaysOpen ? 'cursor-default' : 'hover:bg-white/[0.02]'}`}
                  >
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}18` }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <span className="text-sm font-semibold flex-1 text-left" style={{ color }}>
                      {label}
                    </span>
                    {!alwaysOpen && (
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronLeft
                          size={14}
                          className="text-gray-600 rotate-90"
                          style={{ transform: `rotate(${isOpen ? 270 : 90}deg)` }}
                        />
                      </motion.div>
                    )}
                  </button>

                  {/* Section body */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-navy-700/40">
                          {key === 'text' ? (
                            // Official text — prominent serif treatment
                            <blockquote className="mt-4 pl-4 border-l-2 border-opacity-60"
                              style={{ borderColor: color }}>
                              <p className="font-serif text-base md:text-lg text-gray-100 leading-relaxed italic">
                                "{content}"
                              </p>
                            </blockquote>
                          ) : (
                            <div
                              className="mt-3 text-sm text-gray-400 leading-relaxed space-y-1.5 prose-sm"
                              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Read % indicator */}
          <div className="flex items-center gap-2 mt-6 mb-2">
            <div className="flex-1 h-1 bg-navy-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${subjectMeta.color}, #f97316)` }}
                animate={{ width: `${readPct}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-600 tabular-nums shrink-0">{readPct}% read</span>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex items-stretch gap-3 px-5 md:px-8 pb-8 mt-2 max-w-3xl mx-auto">
          {prev ? (
            <motion.button
              whileHover={{ x: -2 }}
              onClick={() => onNavigate(prev.id)}
              className="flex-1 flex items-center gap-3 p-4 bg-navy-800/60 border border-navy-700/60 rounded-2xl hover:border-navy-600 transition-all group text-left"
            >
              <ChevronLeft size={16} className="text-gray-600 group-hover:text-gold-400 transition-colors shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-gray-600 mb-0.5 uppercase tracking-wider">Previous</p>
                <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors truncate">
                  Art. {prev.article} — {prev.title}
                </p>
              </div>
            </motion.button>
          ) : <div className="flex-1" />}

          {next ? (
            <motion.button
              whileHover={{ x: 2 }}
              onClick={() => onNavigate(next.id)}
              className="flex-1 flex items-center gap-3 p-4 bg-navy-800/60 border border-navy-700/60 rounded-2xl hover:border-navy-600 transition-all group text-right justify-end"
            >
              <div className="min-w-0">
                <p className="text-[10px] text-gray-600 mb-0.5 uppercase tracking-wider">Next</p>
                <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors truncate">
                  Art. {next.article} — {next.title}
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-600 group-hover:text-gold-400 transition-colors shrink-0" />
            </motion.button>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ children, onClick, active, activeClass = 'text-gold-400', title }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all duration-150 ${
        active
          ? `bg-gold-500/10 ${activeClass}`
          : 'text-gray-500 hover:text-gray-300 hover:bg-navy-800'
      }`}
    >
      {children}
    </motion.button>
  )
}
