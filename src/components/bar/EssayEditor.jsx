import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, ChevronDown, ChevronUp, Lightbulb, BookOpen } from 'lucide-react'
import { BAR_SUBJECTS } from '../../data/bar/index.js'

const IRAC_SECTIONS = [
  { key: 'issue',       label: 'I — Issue',       color: '#6366f1', placeholder: 'State the precise legal question to be resolved...' },
  { key: 'rule',        label: 'R — Rule',        color: '#f59e0b', placeholder: 'State the applicable legal rules, articles, and jurisprudence...' },
  { key: 'application', label: 'A — Application', color: '#10b981', placeholder: 'Apply the rule to the specific facts of the scenario...' },
  { key: 'conclusion',  label: 'C — Conclusion',  color: '#ef4444', placeholder: 'State the definitive legal conclusion...' },
]

function IRACSection({ section, value, onChange, modelAnswer, submitted }) {
  const [showModel, setShowModel] = useState(false)
  const [open, setOpen]          = useState(true)

  return (
    <div className="rounded-2xl border border-navy-700/60 overflow-hidden" style={{ background: `${section.color}04` }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${section.color}18` }}>
          <span className="text-xs font-bold" style={{ color: section.color }}>{section.key[0].toUpperCase()}</span>
        </div>
        <span className="text-sm font-bold flex-1 text-left" style={{ color: section.color }}>{section.label}</span>
        {value && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />}
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
            <div className="px-4 pb-4 border-t border-navy-700/40 space-y-3 pt-3">
              <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={section.placeholder}
                rows={4}
                className="w-full bg-navy-800/60 border border-navy-700/60 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-700 outline-none focus:border-opacity-60 resize-none font-sans leading-relaxed transition-colors"
                style={{ '--tw-border-opacity': 0.6, borderColor: value ? `${section.color}30` : undefined }}
                readOnly={submitted}
              />

              {submitted && modelAnswer && (
                <div>
                  <button
                    onClick={() => setShowModel(m => !m)}
                    className="flex items-center gap-2 text-xs font-medium transition-colors"
                    style={{ color: showModel ? section.color : '#6b7280' }}
                  >
                    {showModel ? <EyeOff size={12} /> : <Eye size={12} />}
                    {showModel ? 'Hide model answer' : 'Show model answer'}
                  </button>
                  <AnimatePresence>
                    {showModel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 px-4 py-3 rounded-xl border text-sm text-gray-300 leading-relaxed overflow-hidden"
                        style={{ background: `${section.color}08`, borderColor: `${section.color}25` }}
                      >
                        {modelAnswer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EssayEditor({ question, answers, onChange, submitted }) {
  const subject = BAR_SUBJECTS[question.subject]
  const [activeSubQ, setActiveSubQ] = useState(0)
  const [showTaglish, setShowTaglish] = useState({})

  const subQuestion = question.subQuestions?.[activeSubQ]

  const handleIRACChange = (subIdx, section, value) => {
    const key = `${question.id}-${subIdx}-${section}`
    onChange(key, value)
  }

  const getIRACValue = (subIdx, section) =>
    answers[`${question.id}-${subIdx}-${section}`] || ''

  return (
    <div className="space-y-5">
      {/* Essay header */}
      <div className="bg-navy-800/40 border border-navy-700/60 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider"
            style={{ background: `${subject?.color}15`, color: subject?.color }}>
            {subject?.name}
          </span>
          <span className="text-[10px] text-gray-600">{question.year} Bar Examination</span>
          <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-md">Essay</span>
        </div>
        <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{question.scenario}</p>
      </div>

      {/* Sub-question tabs */}
      {question.subQuestions && question.subQuestions.length > 1 && (
        <div className="flex gap-2">
          {question.subQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => setActiveSubQ(i)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                activeSubQ === i
                  ? 'bg-gold-500/15 text-gold-400 border-gold-500/30'
                  : 'bg-navy-800 text-gray-500 border-navy-700 hover:text-gray-300'
              }`}
            >
              Part ({sq.part?.toUpperCase()}) · {sq.points}pts
            </button>
          ))}
        </div>
      )}

      {/* Active sub-question */}
      {subQuestion && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubQ}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-gold-500/15 flex items-center justify-center shrink-0 text-xs font-bold text-gold-400 mt-0.5">
                {subQuestion.part?.toUpperCase()}
              </div>
              <p className="text-sm text-gray-200 leading-relaxed flex-1">{subQuestion.question}</p>
              <span className="text-xs text-gray-600 shrink-0 font-mono">{subQuestion.points}pts</span>
            </div>

            {/* IRAC sections */}
            <div className="space-y-3">
              {IRAC_SECTIONS.map(section => (
                <IRACSection
                  key={section.key}
                  section={section}
                  value={getIRACValue(activeSubQ, section.key)}
                  onChange={(v) => handleIRACChange(activeSubQ, section.key, v)}
                  modelAnswer={submitted ? subQuestion.irac?.[section.key] : null}
                  submitted={submitted}
                />
              ))}
            </div>

            {/* Taglish explanation after submission */}
            {submitted && subQuestion.taglishExplanation && (
              <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setShowTaglish(p => ({ ...p, [activeSubQ]: !p[activeSubQ] }))}
                  className="w-full flex items-center gap-3 px-4 py-3"
                >
                  <Lightbulb size={14} className="text-teal-400 shrink-0" />
                  <span className="text-sm font-semibold text-teal-400 flex-1 text-left">Taglish Analysis 🇵🇭</span>
                  {showTaglish[activeSubQ] ? <ChevronUp size={13} className="text-gray-600" /> : <ChevronDown size={13} className="text-gray-600" />}
                </button>
                <AnimatePresence>
                  {showTaglish[activeSubQ] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-teal-500/15">
                        <p className="text-sm text-gray-300 leading-relaxed mt-3">
                          {subQuestion.taglishExplanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Model answer (full) after submission */}
            {submitted && subQuestion.modelAnswer && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={13} className="text-emerald-400" />
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Complete Model Answer</p>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{subQuestion.modelAnswer}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
