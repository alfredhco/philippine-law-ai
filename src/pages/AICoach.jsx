import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Send, RotateCcw, BookOpen, Brain,
  Lightbulb, Search, FileText, ChevronDown, Copy, Check,
  Zap,
} from 'lucide-react'
import { createCoach }          from '../services/ai/aiCoach.js'
import { generateMnemonic }     from '../services/ai/mnemonicGenerator.js'
import { simplifyCase }         from '../services/ai/caseSimplifier.js'
import { spotIssues }           from '../services/ai/issueSpotter.js'
import { hasApiKey }            from '../services/ai/base.js'
import Button from '../components/ui/Button'

const SUBJECTS = [
  { id: 'all',           label: 'All Subjects' },
  { id: 'civil-law',     label: 'Civil Law' },
  { id: 'criminal-law',  label: 'Criminal Law' },
  { id: 'political-law', label: 'Political Law' },
  { id: 'remedial-law',  label: 'Remedial Law' },
  { id: 'commercial-law',label: 'Commercial Law' },
  { id: 'taxation-law',  label: 'Taxation Law' },
  { id: 'labor-law',     label: 'Labor Law' },
  { id: 'legal-ethics',  label: 'Legal Ethics' },
]

const SUGGESTED_PROMPTS = [
  { text: 'Explain the fortuitous event doctrine under Art. 1174',     subject: 'civil-law'     },
  { text: 'What are the elements of self-defense under Art. 11 RPC?',  subject: 'criminal-law'  },
  { text: 'Distinguish procedural from substantive due process',       subject: 'political-law' },
  { text: 'When is a dying declaration admissible in evidence?',       subject: 'remedial-law'  },
  { text: 'Explain the two-notice rule in employee dismissal',         subject: 'labor-law'     },
  { text: 'What is the alter ego doctrine in corporation law?',        subject: 'commercial-law'},
  { text: 'Explain the Nacar ruling on legal interest rates',          subject: 'remedial-law'  },
  { text: 'How does TRAIN Law affect estate tax computation?',         subject: 'taxation-law'  },
  { text: 'What is the incontestability clause in insurance law?',     subject: 'commercial-law'},
  { text: 'Explain attorney-client privilege and its exceptions',      subject: 'legal-ethics'  },
]

const QUICK_ACTIONS = [
  { id: 'mnemonic',  icon: Brain,    label: 'Mnemonic',    color: '#8b5cf6', placeholder: 'Enter legal concept to memorize...',    hint: 'e.g. "elements of self-defense"' },
  { id: 'case',      icon: BookOpen, label: 'Case Brief',  color: '#0ea5e9', placeholder: 'Enter case name or doctrine...',         hint: 'e.g. "Valenzuela v. People"' },
  { id: 'issues',    icon: Search,   label: 'Spot Issues', color: '#ec4899', placeholder: 'Paste a fact pattern here...',           hint: 'Paste any bar exam scenario' },
  { id: 'ask',       icon: Sparkles, label: 'Ask Anything',color: '#f59e0b', placeholder: 'Ask any bar exam question...',           hint: 'Open Q&A mode' },
]

const HISTORY_KEY = 'ai_coach_history_v1'
function loadHistory() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') } catch { return [] } }
function saveHistory(h) { try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 60))) } catch {} }

// ─── Lightweight markdown renderer ───────────────────────────────────────────
function renderInline(str) {
  const parts = str.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i} className="italic text-gold-300/90">{part.slice(1, -1)}</em>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="bg-navy-700 px-1.5 py-0.5 rounded text-[11px] text-emerald-300 font-mono">{part.slice(1, -1)}</code>
    return part
  })
}

function Markdown({ text }) {
  const lines = (text ?? '').split('\n')
  const elements = []
  let listBuf = []
  let inTable = false; let tableRows = []

  const flushList = () => {
    if (!listBuf.length) return
    elements.push(
      <ul key={`ul-${elements.length}`} className="space-y-1.5 my-2 pl-1">
        {listBuf.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
            <span className="text-gold-400/80 mt-1 shrink-0 text-xs">•</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    )
    listBuf = []
  }

  const flushTable = () => {
    if (!tableRows.length) return
    const [header, , ...body] = tableRows
    const cols = header.split('|').map(c => c.trim()).filter(Boolean)
    const rows = body.map(r => r.split('|').map(c => c.trim()).filter(Boolean))
    elements.push(
      <div key={`tbl-${elements.length}`} className="overflow-x-auto my-3">
        <table className="text-xs w-full border-collapse">
          <thead>
            <tr>{cols.map((c, i) => <th key={i} className="px-3 py-2 text-left text-gray-300 font-semibold border-b border-navy-600 bg-navy-800/60">{renderInline(c)}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-navy-700/40">
                {row.map((cell, ci) => <td key={ci} className="px-3 py-1.5 text-gray-400">{renderInline(cell)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    tableRows = []; inTable = false
  }

  lines.forEach((line, i) => {
    if (line.includes('|') && line.trim().startsWith('|')) {
      flushList(); inTable = true; tableRows.push(line)
      return
    }
    if (inTable && !line.includes('|')) { flushTable() }

    if (!line.trim()) { flushList(); elements.push(<div key={i} className="h-1.5" />); return }

    const h = line.match(/^(#{1,3})\s+(.+)/)
    if (h) {
      flushList()
      const lvl = h[1].length
      elements.push(
        <p key={i} className={`font-bold text-white mt-4 mb-1.5 ${lvl === 1 ? 'text-base' : lvl === 2 ? 'text-sm' : 'text-sm'}`}>
          {renderInline(h[2])}
        </p>
      )
      return
    }

    if (/^[-•*]\s+/.test(line)) {
      listBuf.push(line.replace(/^[-•*]\s+/, ''))
      return
    }
    if (/^\d+\.\s+/.test(line)) {
      listBuf.push(line.replace(/^\d+\.\s+/, ''))
      return
    }
    if (line.startsWith('> ')) {
      flushList()
      elements.push(
        <blockquote key={i} className="border-l-2 border-gold-500/50 pl-3 my-2 text-sm text-gray-400 italic leading-relaxed">
          {renderInline(line.slice(2))}
        </blockquote>
      )
      return
    }
    if (line.startsWith('---')) {
      flushList()
      elements.push(<hr key={i} className="border-navy-700/60 my-3" />)
      return
    }
    flushList()
    elements.push(
      <p key={i} className="text-sm text-gray-300 leading-relaxed">
        {renderInline(line)}
      </p>
    )
  })

  flushList(); flushTable()
  return <div className="space-y-0.5">{elements}</div>
}

// ─── Typing dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gold-400/60"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </div>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(msg.content).catch(() => {})
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  if (msg.role === 'user') {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="flex justify-end">
        <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm bg-gold-500/15 border border-gold-500/25 text-sm text-gray-200 leading-relaxed">
          {msg.content}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 group">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-500 to-accent-orange flex items-center justify-center shrink-0 mt-0.5 shadow-glow">
        <Sparkles size={14} className="text-navy-950" />
      </div>
      <div className="flex-1 min-w-0">
        {msg.isTyping && !msg.content ? (
          <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-sm inline-block">
            <TypingDots />
          </div>
        ) : (
          <div className="glass-card px-4 py-3.5 rounded-2xl rounded-tl-sm">
            <Markdown text={msg.content} />
            {msg.isStreaming && (
              <span className="inline-block w-0.5 h-4 bg-gold-400 animate-pulse ml-0.5 align-middle" />
            )}
          </div>
        )}
        {!msg.isTyping && !msg.isStreaming && msg.content && (
          <button onClick={copy} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-gray-600 hover:text-gray-400">
            {copied ? <Check size={10} /> : <Copy size={10} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ─── Quick action modal ───────────────────────────────────────────────────────
function QuickActionPanel({ action, onSubmit, onClose }) {
  const [input, setInput] = useState('')

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 space-y-3 border-2" style={{ borderColor: `${action.color}30` }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${action.color}18` }}>
          <action.icon size={14} style={{ color: action.color }} />
        </div>
        <p className="text-sm font-semibold" style={{ color: action.color }}>{action.label}</p>
        <button onClick={onClose} className="ml-auto text-gray-600 hover:text-gray-400 text-xs">✕</button>
      </div>
      <textarea
        autoFocus
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && e.ctrlKey && input.trim() && onSubmit(input)}
        placeholder={action.placeholder}
        rows={action.id === 'issues' ? 5 : 2}
        className="w-full bg-navy-800/60 border border-navy-700/60 rounded-xl px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none resize-none"
      />
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-600">{action.hint} · Ctrl+Enter to submit</span>
        <Button variant="primary" size="sm" onClick={() => input.trim() && onSubmit(input)}>
          Generate <Zap size={12} className="ml-1" />
        </Button>
      </div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AICoach() {
  const [messages,     setMessages]     = useState(loadHistory)
  const [input,        setInput]        = useState('')
  const [subject,      setSubject]      = useState('all')
  const [isLoading,    setIsLoading]    = useState(false)
  const [activeAction, setActiveAction] = useState(null)
  const [showSubjects, setShowSubjects] = useState(false)
  const coachRef   = useRef(null)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  // Persist history
  useEffect(() => { saveHistory(messages) }, [messages])

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  // Re-create coach when subject changes
  useEffect(() => {
    coachRef.current = null
  }, [subject])

  const addMessage = (msg) => setMessages(prev => [...prev, msg])

  async function runStream(userContent, streamFn) {
    if (isLoading) return
    setIsLoading(true)

    // Add user message
    addMessage({ id: Date.now(), role: 'user', content: userContent })

    // Add empty AI message (typing dots)
    const aiId = Date.now() + 1
    addMessage({ id: aiId, role: 'assistant', content: '', isTyping: true, isStreaming: false })

    let accumulated = ''

    const onChunk = (chunk) => {
      accumulated += chunk
      setMessages(prev => {
        const next = [...prev]
        const idx = next.findIndex(m => m.id === aiId)
        if (idx >= 0) next[idx] = { ...next[idx], content: accumulated, isTyping: false, isStreaming: true }
        return next
      })
    }

    const onDone = () => {
      setMessages(prev => {
        const next = [...prev]
        const idx = next.findIndex(m => m.id === aiId)
        if (idx >= 0) next[idx] = { ...next[idx], isStreaming: false, isTyping: false }
        return next
      })
      setIsLoading(false)
    }

    await streamFn(onChunk, onDone)
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    setActiveAction(null)

    if (!coachRef.current) {
      coachRef.current = createCoach({ subject })
    }
    const coach = coachRef.current

    await runStream(text, async (onChunk, onDone) => {
      let fullResponse = ''
      await coach.send(text, {
        onChunk: (c) => { fullResponse += c; onChunk(c) },
        onDone: () => { coach.addAssistantMessage(fullResponse); onDone() },
        onError: onDone,
      })
    })
  }

  const handleQuickAction = async (action, userInput) => {
    setActiveAction(null)
    const label = { mnemonic: '🧠 Mnemonic for:', case: '📖 Case brief:', issues: '🔍 Issue spotting:' }[action.id] ?? ''
    const display = `${label} ${userInput}`

    await runStream(display, async (onChunk, onDone) => {
      if (action.id === 'mnemonic') await generateMnemonic({ concept: userInput, subject, onChunk, onDone, onError: onDone })
      else if (action.id === 'case')    await simplifyCase({ caseNameOrConcept: userInput, subject, onChunk, onDone, onError: onDone })
      else if (action.id === 'issues')  await spotIssues({ factPattern: userInput, subject, onChunk, onDone, onError: onDone })
      else {
        setInput(userInput)
        onDone()
      }
    })
  }

  const clearHistory = () => { setMessages([]); coachRef.current = null }

  const visibleSubject = SUBJECTS.find(s => s.id === subject)

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-accent-orange flex items-center justify-center shadow-glow">
            <Sparkles size={18} className="text-navy-950" />
          </div>
          <div>
            <h2 className="section-title">AI Law Coach</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${hasApiKey() ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="text-[10px] text-gray-500">
                {hasApiKey() ? 'Claude API connected' : 'Demo mode — add VITE_ANTHROPIC_API_KEY for live AI'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button onClick={clearHistory} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded-lg hover:bg-navy-800">
              <RotateCcw size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Chat area ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1">

        {/* Empty state */}
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/20 to-accent-orange/20 border border-gold-500/20 flex items-center justify-center mx-auto">
                <Sparkles size={28} className="text-gold-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Bar Coach AI</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                Handa akong tumulong sa iyo sa bar review. Pwede kang magtanong ng kahit anong legal concept — sasagutin ko sa Taglish, complete with articles, cases, at bar exam tips.
              </p>
            </div>

            {/* Quick action cards */}
            <div className="grid grid-cols-3 gap-2">
              {QUICK_ACTIONS.filter(a => a.id !== 'ask').map(action => (
                <button
                  key={action.id}
                  onClick={() => setActiveAction(activeAction?.id === action.id ? null : action)}
                  className="p-3 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ borderColor: `${action.color}30`, background: `${action.color}08` }}
                >
                  <action.icon size={16} style={{ color: action.color }} className="mb-2" />
                  <p className="text-xs font-semibold text-white">{action.label}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{action.hint}</p>
                </button>
              ))}
            </div>

            {/* Quick action input panel */}
            <AnimatePresence>
              {activeAction && activeAction.id !== 'ask' && (
                <QuickActionPanel
                  action={activeAction}
                  onSubmit={(val) => handleQuickAction(activeAction, val)}
                  onClose={() => setActiveAction(null)}
                />
              )}
            </AnimatePresence>

            {/* Suggested prompts */}
            <div>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider font-bold mb-3">Suggested Questions</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.slice(0, 6).map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(p.text); inputRef.current?.focus() }}
                    className="text-xs px-3 py-1.5 rounded-xl border border-navy-700 bg-navy-800/60 text-gray-400 hover:text-gray-200 hover:border-navy-600 transition-all"
                  >
                    {p.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Messages */}
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ── Inline quick action (mid-conversation) ──────────────────── */}
      <AnimatePresence>
        {activeAction && activeAction.id !== 'ask' && messages.length > 0 && (
          <div className="shrink-0 mb-2">
            <QuickActionPanel
              action={activeAction}
              onSubmit={(val) => handleQuickAction(activeAction, val)}
              onClose={() => setActiveAction(null)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── Input bar ──────────────────────────────────────────────────── */}
      <div className="shrink-0 space-y-2.5 pt-2 border-t border-navy-700/60">

        {/* Subject + Quick tools row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Subject selector */}
          <div className="relative">
            <button
              onClick={() => setShowSubjects(s => !s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800 border border-navy-700 text-xs text-gray-300 hover:border-navy-600 transition-all"
            >
              <span>{visibleSubject?.label ?? 'All Subjects'}</span>
              <ChevronDown size={11} className={`transition-transform ${showSubjects ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showSubjects && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  className="absolute bottom-full mb-1 left-0 w-48 bg-navy-800 border border-navy-700 rounded-xl overflow-hidden shadow-navy z-20"
                >
                  {SUBJECTS.map(s => (
                    <button key={s.id} onClick={() => { setSubject(s.id); setShowSubjects(false) }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${subject === s.id ? 'text-gold-400 bg-gold-500/10' : 'text-gray-400 hover:text-gray-200 hover:bg-navy-700'}`}>
                      {s.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mini quick-action buttons */}
          <div className="flex gap-1.5">
            {QUICK_ACTIONS.filter(a => a.id !== 'ask').map(action => (
              <button
                key={action.id}
                onClick={() => setActiveAction(activeAction?.id === action.id ? null : action)}
                title={action.label}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all border ${
                  activeAction?.id === action.id
                    ? 'border-opacity-50'
                    : 'border-navy-700 bg-navy-800 hover:border-navy-600'
                }`}
                style={activeAction?.id === action.id ? { background: `${action.color}15`, borderColor: `${action.color}50` } : undefined}
              >
                <action.icon size={12} style={{ color: activeAction?.id === action.id ? action.color : '#6b7280' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Text input */}
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
              }}
              disabled={isLoading}
              placeholder="Magtanong ng kahit ano, Counsel... (Enter to send, Shift+Enter for newline)"
              rows={1}
              className="w-full bg-navy-800/60 border border-navy-700/60 rounded-2xl px-4 py-3 pr-12 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-gold-500/30 resize-none transition-colors leading-relaxed disabled:opacity-50"
              style={{ maxHeight: '120px', overflowY: 'auto', fieldSizing: 'content' }}
            />
            <div className="absolute right-2 bottom-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-500 to-accent-orange flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-glow"
              >
                {isLoading
                  ? <div className="w-3 h-3 border-2 border-navy-950/60 border-t-transparent rounded-full animate-spin" />
                  : <Send size={13} className="text-navy-950" />
                }
              </motion.button>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-700 text-center">
          AI responses are educational aids — always verify with official sources before the actual bar exam.
        </p>
      </div>
    </div>
  )
}
