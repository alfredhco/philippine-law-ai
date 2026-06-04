import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, ChevronRight, ChevronDown, ChevronUp,
  Eye, EyeOff, Lightbulb, BookOpen, CheckCircle,
  ArrowLeft, Sparkles,
} from 'lucide-react'
import { ALL_ESSAYS, BAR_SUBJECTS } from '../data/bar/index.js'
import Button from '../components/ui/Button'

const IRAC_SECTIONS = [
  { key: 'issue',       label: 'I — Issue',       color: '#6366f1', placeholder: 'State the precise legal question to be resolved. Frame it as: "Whether [party] [legal right/duty] under [law]..."' },
  { key: 'rule',        label: 'R — Rule',        color: '#f59e0b', placeholder: 'State the applicable legal rules, articles, and jurisprudence. Cite: Article/Section of the law, Case name (G.R. No.), Legal principle.' },
  { key: 'application', label: 'A — Application', color: '#10b981', placeholder: 'Apply the rule to the specific facts. Address each element of the rule against the facts. Bridge the law to the problem.' },
  { key: 'conclusion',  label: 'C — Conclusion',  color: '#ef4444', placeholder: 'State the definitive legal conclusion. Answer the Issue directly and completely.' },
]

// ─── IRAC Section Block ────────────────────────────────────────────────────────
function IRACBlock({ section, value, onChange, modelAnswer, revealed, onReveal, disabled }) {
  const [open, setOpen] = useState(true)
  const hasContent = value.trim().length > 0

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-colors duration-200"
      style={{ borderColor: revealed ? `${section.color}30` : '#1e2a3a', background: revealed ? `${section.color}05` : undefined }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${section.color}18` }}>
          <span className="text-xs font-bold" style={{ color: section.color }}>
            {section.key[0].toUpperCase()}
          </span>
        </div>
        <span className="text-sm font-bold flex-1 text-left" style={{ color: section.color }}>
          {section.label}
        </span>
        {hasContent && !revealed && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />}
        {revealed && <CheckCircle size={13} className="text-emerald-400 shrink-0" />}
        {open ? <ChevronUp size={13} className="text-gray-600" /> : <ChevronDown size={13} className="text-gray-600" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-navy-700/40 space-y-3">
              <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={section.placeholder}
                rows={4}
                disabled={disabled}
                className="w-full bg-navy-800/60 border border-navy-700/60 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-700 outline-none resize-none font-sans leading-relaxed transition-colors disabled:opacity-60"
                style={{ borderColor: value ? `${section.color}30` : undefined }}
              />

              {/* Peek / model answer */}
              {!revealed ? (
                <button
                  onClick={onReveal}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <Eye size={12} /> Peek at model answer
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border px-4 py-3 space-y-1.5"
                  style={{ background: `${section.color}08`, borderColor: `${section.color}25` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: section.color }}>
                    Model Answer
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">{modelAnswer}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Session ──────────────────────────────────────────────────────────────────
function Session({ essay, onBack }) {
  const [activeSubQ, setActiveSubQ]     = useState(0)
  const [userText, setUserText]         = useState({})
  const [revealed, setRevealed]         = useState({})
  const [showFullAnswer, setShowFullAnswer] = useState({})
  const [showTaglish, setShowTaglish]   = useState({})
  const [scenarioOpen, setScenarioOpen] = useState(true)
  const [checklist, setChecklist]       = useState({})

  const subQ = essay.subQuestions?.[activeSubQ]
  const subject = BAR_SUBJECTS[essay.subject]

  const key = (section) => `${activeSubQ}-${section}`

  const handleTextChange = (section, val) =>
    setUserText(p => ({ ...p, [key(section)]: val }))

  const handleReveal = (section) =>
    setRevealed(p => ({ ...p, [key(section)]: true }))

  const allRevealed = IRAC_SECTIONS.every(s => revealed[key(s.key)])

  const CHECKLIST_ITEMS = [
    'Issue is framed as a precise legal question',
    'Rule cites specific article/provision/case',
    'Application bridges every rule element to the facts',
    'Conclusion directly and completely answers the Issue',
    'Legal terms of art used correctly',
    'Analysis flows logically I → R → A → C',
  ]

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft size={13} /> Back
        </button>
        <span className="text-gray-700">/</span>
        <span className="text-xs font-semibold" style={{ color: subject?.color }}>{subject?.name}</span>
        <span className="text-gray-700">/</span>
        <span className="text-xs text-gray-500 truncate max-w-[200px]">{essay.year} Bar</span>
      </div>

      {/* Scenario */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => setScenarioOpen(o => !o)}
          className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-navy-700/20 transition-colors"
        >
          <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${subject?.color}15` }}>
            <BookOpen size={13} style={{ color: subject?.color }} />
          </div>
          <span className="text-sm font-semibold text-white flex-1 text-left">Problem Scenario</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-lg uppercase tracking-wider font-bold"
              style={{ background: `${subject?.color}15`, color: subject?.color }}>
              {subject?.name}
            </span>
            <span className="text-[10px] text-gray-600">{essay.year} Bar</span>
            {scenarioOpen ? <ChevronUp size={13} className="text-gray-600" /> : <ChevronDown size={13} className="text-gray-600" />}
          </div>
        </button>
        <AnimatePresence>
          {scenarioOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-5 pb-5 border-t border-navy-700/50">
                <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap mt-4">{essay.scenario}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sub-question tabs */}
      {essay.subQuestions && essay.subQuestions.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {essay.subQuestions.map((sq, i) => {
            const subAllRevealed = IRAC_SECTIONS.every(s => revealed[`${i}-${s.key}`])
            return (
              <button
                key={i}
                onClick={() => setActiveSubQ(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  activeSubQ === i
                    ? 'bg-gold-500/15 text-gold-400 border-gold-500/30'
                    : 'bg-navy-800 text-gray-500 border-navy-700 hover:text-gray-300'
                }`}
              >
                Part ({sq.part?.toUpperCase()})
                <span className="text-[9px] opacity-60">{sq.points}pts</span>
                {subAllRevealed && <CheckCircle size={10} className="text-emerald-400" />}
              </button>
            )
          })}
        </div>
      )}

      {/* Active sub-question */}
      {subQ && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubQ}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            {/* Question */}
            <div className="bg-navy-800/50 border border-navy-700/60 rounded-2xl px-5 py-4 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-gold-500/15 flex items-center justify-center shrink-0 text-xs font-bold text-gold-400 mt-0.5">
                {subQ.part?.toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-200 leading-relaxed">{subQ.question}</p>
                <p className="text-[10px] text-gray-600 mt-1">{subQ.points} points</p>
              </div>
            </div>

            {/* IRAC blocks */}
            <div className="space-y-2.5">
              {IRAC_SECTIONS.map(section => (
                <IRACBlock
                  key={section.key}
                  section={section}
                  value={userText[key(section.key)] || ''}
                  onChange={val => handleTextChange(section.key, val)}
                  modelAnswer={subQ.irac?.[section.key]}
                  revealed={!!revealed[key(section.key)]}
                  onReveal={() => handleReveal(section.key)}
                />
              ))}
            </div>

            {/* Full answer + Taglish — shown once all sections revealed */}
            <AnimatePresence>
              {allRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  {/* Full model answer */}
                  <div className="bg-navy-800/40 border border-navy-700/60 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setShowFullAnswer(p => ({ ...p, [activeSubQ]: !p[activeSubQ] }))}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-navy-700/30 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                        <BookOpen size={12} className="text-emerald-400" />
                      </div>
                      <span className="text-sm font-semibold text-emerald-400 flex-1 text-left">Complete Model Answer</span>
                      {showFullAnswer[activeSubQ] ? <ChevronUp size={13} className="text-gray-600" /> : <ChevronDown size={13} className="text-gray-600" />}
                    </button>
                    <AnimatePresence>
                      {showFullAnswer[activeSubQ] && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 pt-1 border-t border-navy-700/40">
                            <p className="text-sm text-gray-300 leading-relaxed mt-2">{subQ.modelAnswer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Taglish */}
                  {subQ.taglishExplanation && (
                    <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setShowTaglish(p => ({ ...p, [activeSubQ]: !p[activeSubQ] }))}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-500/5 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center shrink-0">
                          <Lightbulb size={12} className="text-teal-400" />
                        </div>
                        <span className="text-sm font-semibold text-teal-400 flex-1 text-left">Taglish Breakdown 🇵🇭</span>
                        {showTaglish[activeSubQ] ? <ChevronUp size={13} className="text-gray-600" /> : <ChevronDown size={13} className="text-gray-600" />}
                      </button>
                      <AnimatePresence>
                        {showTaglish[activeSubQ] && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="px-4 pb-4 pt-1 border-t border-teal-500/15">
                              <p className="text-sm text-gray-300 leading-relaxed mt-2">{subQ.taglishExplanation}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Self-assessment checklist */}
      <div className="glass-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-gold-400" />
          <p className="text-sm font-semibold text-white">Self-Assessment</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CHECKLIST_ITEMS.map((item, i) => (
            <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checklist[i]}
                onChange={e => setChecklist(p => ({ ...p, [i]: e.target.checked }))}
                className="w-3.5 h-3.5 accent-gold-500 cursor-pointer rounded shrink-0"
              />
              <span className={`text-xs transition-colors ${checklist[i] ? 'text-gray-300 line-through opacity-60' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {item}
              </span>
            </label>
          ))}
        </div>
        {Object.values(checklist).filter(Boolean).length === CHECKLIST_ITEMS.length && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 font-semibold">
            ✓ All checks passed — excellent IRAC analysis!
          </motion.p>
        )}
      </div>
    </div>
  )
}

// ─── Lobby ────────────────────────────────────────────────────────────────────
function Lobby({ onStart }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? ALL_ESSAYS : ALL_ESSAYS.filter(e => e.subject === filter)
  const subjects = [...new Set(ALL_ESSAYS.map(e => e.subject))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
          <FileText size={20} className="text-gold-400" />
        </div>
        <div>
          <h2 className="section-title">IRAC Trainer</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {ALL_ESSAYS.length} essay problems · Write your IRAC, then peek at model answers
          </p>
        </div>
      </div>

      {/* IRAC explainer */}
      <div className="grid grid-cols-4 gap-2">
        {IRAC_SECTIONS.map(s => (
          <div key={s.key} className="glass-card p-3 text-center">
            <div className="text-xl font-bold font-serif mb-0.5" style={{ color: s.color }}>
              {s.key[0].toUpperCase()}
            </div>
            <p className="text-[10px] text-gray-500">{s.label.split(' — ')[1]}</p>
          </div>
        ))}
      </div>

      {/* Subject filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
            filter === 'all'
              ? 'bg-gold-500/15 text-gold-400 border-gold-500/30'
              : 'bg-navy-800 text-gray-500 border-navy-700 hover:text-gray-300'
          }`}
        >
          All ({ALL_ESSAYS.length})
        </button>
        {subjects.map(subId => {
          const sub = BAR_SUBJECTS[subId]
          const count = ALL_ESSAYS.filter(e => e.subject === subId).length
          return (
            <button
              key={subId}
              onClick={() => setFilter(subId)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                filter === subId ? 'border-opacity-40' : 'bg-navy-800 text-gray-500 border-navy-700 hover:text-gray-300'
              }`}
              style={filter === subId ? { background: `${sub?.color}15`, color: sub?.color, borderColor: `${sub?.color}40` } : undefined}
            >
              {sub?.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Problem list */}
      <div className="space-y-3">
        {filtered.map((essay, i) => {
          const subject = BAR_SUBJECTS[essay.subject]
          return (
            <motion.div
              key={essay.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-5 hover:border-navy-600/80 transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider"
                      style={{ background: `${subject?.color}15`, color: subject?.color }}>
                      {subject?.name}
                    </span>
                    <span className="text-[10px] text-gray-600">{essay.year} Bar</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                      essay.difficulty === 'hard' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>{essay.difficulty}</span>
                    <span className="text-[10px] text-gray-700">
                      {essay.subQuestions?.length ?? 1} sub-question{(essay.subQuestions?.length ?? 1) > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{essay.scenario}</p>
                </div>
                <Button
                  onClick={() => onStart(essay)}
                  variant="outline"
                  size="sm"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Analyze <ChevronRight size={13} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function IRACTrainer() {
  const [activeEssay, setActiveEssay] = useState(null)

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {activeEssay ? (
          <motion.div key="session" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Session essay={activeEssay} onBack={() => setActiveEssay(null)} />
          </motion.div>
        ) : (
          <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Lobby onStart={setActiveEssay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
