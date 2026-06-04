import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Star, StarOff, ChevronDown, ChevronUp,
  BookOpen, Layers, RotateCcw, Check, X, ChevronRight,
  Lightbulb, MessageSquare, Target, Award, Clock, Zap,
} from 'lucide-react'
import { getSubject } from '../data/subjects/index.js'
import SubjectProgressRing from '../components/subject/SubjectProgressRing'
import SubjectModuleNav from '../components/subject/SubjectModuleNav'
import { useSubjectProgress } from '../hooks/useSubjectProgress'
import EmptyState from '../components/ui/EmptyState'

// ─── Shared helpers ─────────────────────────────────────────────────────────

const difficultyColor = (d) => {
  if (d === 'easy') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  if (d === 'hard') return 'text-red-400 bg-red-500/10 border-red-500/20'
  return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
}

// ─── Tab panels ─────────────────────────────────────────────────────────────

function OverviewTab({ subject }) {
  return (
    <div className="space-y-3">
      <p className="text-gray-400 text-sm leading-relaxed">{subject.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {subject.topics.map((topic) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-navy-800/60 border border-navy-600/40"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-white font-semibold text-sm">{topic.title}</h4>
              {topic.articleRange && (
                <span className="text-[10px] text-gray-600 ml-2 shrink-0">{topic.articleRange}</span>
              )}
            </div>
            {topic.description && (
              <p className="text-gray-500 text-xs leading-relaxed mb-2">{topic.description}</p>
            )}
            <div className="flex flex-wrap gap-1">
              {topic.subtopics.map((sub) => (
                <span
                  key={sub}
                  className="px-2 py-0.5 text-[10px] rounded-md bg-navy-700/60 text-gray-500 border border-navy-600/40"
                >
                  {sub}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CodalTab({ subject }) {
  const [expanded, setExpanded] = useState(null)
  const [starred, setStarred] = useState(() =>
    Object.fromEntries(subject.codals.map((c) => [c.id, c.starred]))
  )
  const [query, setQuery] = useState('')

  const filtered = subject.codals.filter(
    (c) =>
      !query ||
      c.article.toLowerCase().includes(query.toLowerCase()) ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.text.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-3">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search provisions..."
        className="w-full px-4 py-2.5 rounded-xl bg-navy-800/60 border border-navy-600/60 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-all"
      />
      {filtered.map((codal) => (
        <motion.div
          key={codal.id}
          layout
          className="rounded-xl bg-navy-800/60 border border-navy-600/40 overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-navy-700/30 transition-colors"
            onClick={() => setExpanded(expanded === codal.id ? null : codal.id)}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setStarred((prev) => ({ ...prev, [codal.id]: !prev[codal.id] }))
                }}
                className="text-gray-600 hover:text-gold-400 transition-colors shrink-0"
              >
                {starred[codal.id]
                  ? <Star size={14} className="text-gold-400 fill-gold-400/30" />
                  : <StarOff size={14} />
                }
              </button>
              <div>
                <p className="text-xs text-gray-500 font-medium">{codal.article}</p>
                <p className="text-white text-sm font-semibold">{codal.title}</p>
              </div>
            </div>
            {expanded === codal.id ? <ChevronUp size={14} className="text-gray-600 shrink-0" /> : <ChevronDown size={14} className="text-gray-600 shrink-0" />}
          </button>

          <AnimatePresence>
            {expanded === codal.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3 border-t border-navy-700/60 pt-3">
                  <p className="text-gray-300 text-sm leading-relaxed">{codal.text}</p>
                  {codal.notes && (
                    <div className="p-3 rounded-lg bg-gold-500/5 border border-gold-500/15">
                      <p className="text-[11px] text-gold-500/80 font-semibold uppercase tracking-wider mb-1">Notes</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{codal.notes}</p>
                    </div>
                  )}
                  <span className="inline-block px-2 py-0.5 text-[10px] rounded-md bg-navy-700 text-gray-500">
                    {codal.topic}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      {filtered.length === 0 && (
        <EmptyState compact title="No provisions found" description={`No codal provisions match "${query}".`} />
      )}
    </div>
  )
}

function FlashcardsTab({ subject }) {
  const [cards] = useState(subject.flashcards)
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, skipped: 0 })
  const [done, setDone] = useState(false)
  const { incrementProgress } = useSubjectProgress()

  const card = cards[idx]
  const progress = cards.length > 0 ? (idx / cards.length) * 100 : 0

  const advance = (result) => {
    setStats((prev) => ({ ...prev, [result]: prev[result] + 1 }))
    if (result === 'correct') {
      incrementProgress(subject.id, 'flashcardsMastered')
    }
    setFlipped(false)
    if (idx + 1 >= cards.length) setDone(true)
    else setTimeout(() => setIdx((i) => i + 1), 150)
  }

  const restart = () => {
    setIdx(0)
    setFlipped(false)
    setDone(false)
    setStats({ correct: 0, incorrect: 0, skipped: 0 })
  }

  if (done) {
    const total = stats.correct + stats.incorrect + stats.skipped
    const score = total > 0 ? Math.round((stats.correct / total) * 100) : 0
    return (
      <div className="max-w-sm mx-auto text-center space-y-5 py-6">
        <div>
          <div className="text-5xl mb-3">{score >= 80 ? '🎉' : score >= 50 ? '💪' : '📚'}</div>
          <h3 className="font-serif text-xl font-bold text-white mb-1">Session Complete!</h3>
          <p className="text-gray-400 text-sm">Score: <span className="text-gold-400 font-bold">{score}%</span></p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{ l: 'Correct', v: stats.correct, c: '#10b981' }, { l: 'Missed', v: stats.incorrect, c: '#ef4444' }, { l: 'Skipped', v: stats.skipped, c: '#f59e0b' }].map((s) => (
            <div key={s.l} className="p-3 rounded-xl bg-navy-800/60 border border-navy-600/40 text-center">
              <p className="text-xl font-bold" style={{ color: s.c }}>{s.v}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
        <button onClick={restart} className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-navy-800 border border-navy-600 text-sm text-gray-300 hover:text-white transition-colors">
          <RotateCcw size={14} /> Study Again
        </button>
      </div>
    )
  }

  if (!card) return <EmptyState compact title="No flashcards" description="No flashcards available for this subject yet." />

  return (
    <div className="space-y-4 max-w-xl">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{idx + 1} / {cards.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-navy-800 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: subject.color }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      {/* Card */}
      <div style={{ perspective: '1200px' }}>
        <motion.div
          className="cursor-pointer"
          onClick={() => setFlipped((f) => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.45, type: 'spring', stiffness: 120 }}
          style={{ transformStyle: 'preserve-3d', minHeight: 200 }}
        >
          {/* Front */}
          <div className="p-6 min-h-[200px] flex flex-col justify-between rounded-xl bg-navy-800/60 border border-navy-600/40" style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex items-start justify-between mb-3">
              <span className="px-2 py-0.5 text-[10px] rounded-md bg-navy-700 text-gray-500">{card.topic}</span>
              <span className={`px-2 py-0.5 text-[10px] rounded-md border font-medium ${difficultyColor(card.difficulty)}`}>{card.difficulty}</span>
            </div>
            <p className="text-gray-100 text-sm leading-relaxed font-medium flex-1 flex items-center">{card.front}</p>
            <p className="text-center text-xs text-gray-600 mt-3">Click to reveal</p>
          </div>

          {/* Back */}
          <div
            className="p-6 min-h-[200px] absolute inset-0 rounded-xl border flex flex-col"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: `${subject.color}08`, borderColor: `${subject.color}30` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: subject.accent }}>Answer</p>
            <p className="text-gray-200 text-sm leading-relaxed">{card.back}</p>
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <AnimatePresence>
        {flipped && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3">
            <button onClick={() => advance('incorrect')} className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-sm font-medium transition-all">
              <X size={14} /> Missed
            </button>
            <button onClick={() => advance('skipped')} className="px-4 py-2.5 rounded-xl bg-navy-800 text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Skip
            </button>
            <button onClick={() => advance('correct')} className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-sm font-medium transition-all">
              <Check size={14} /> Got it
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BarReviewTab({ subject }) {
  const [expanded, setExpanded] = useState(null)
  const { incrementProgress } = useSubjectProgress()

  const handleToggle = (id) => {
    if (expanded !== id) {
      incrementProgress(subject.id, 'barQuestionsAttempted')
    }
    setExpanded(expanded === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {subject.barQuestions.map((q) => (
        <motion.div key={q.id} layout className="rounded-xl bg-navy-800/60 border border-navy-600/40 overflow-hidden">
          <button
            className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-navy-700/30 transition-colors"
            onClick={() => handleToggle(q.id)}
          >
            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
              <span className="text-[10px] text-gray-600 font-medium">{q.year}</span>
              <span className={`px-1.5 py-0.5 text-[10px] rounded font-medium ${q.type === 'essay' ? 'bg-blue-500/15 text-blue-400' : 'bg-purple-500/15 text-purple-400'}`}>
                {q.type.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed flex-1">{q.question.length > 120 ? q.question.slice(0, 120) + '...' : q.question}</p>
            {expanded === q.id ? <ChevronUp size={14} className="text-gray-600 shrink-0 mt-1" /> : <ChevronDown size={14} className="text-gray-600 shrink-0 mt-1" />}
          </button>

          <AnimatePresence>
            {expanded === q.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3 border-t border-navy-700/60 pt-3">
                  <p className="text-gray-200 text-sm leading-relaxed">{q.question}</p>

                  {q.type === 'mcq' && q.choices && (
                    <div className="space-y-1.5">
                      {q.choices.map((c, i) => (
                        <div
                          key={i}
                          className={`px-3 py-2 rounded-lg text-sm ${
                            c.startsWith(q.correctAnswer + ')')
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                              : 'bg-navy-700/40 text-gray-400'
                          }`}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  )}

                  {(q.modelAnswer || q.explanation) && (
                    <div className="p-3 rounded-lg bg-gold-500/5 border border-gold-500/15">
                      <p className="text-[11px] text-gold-500/80 font-semibold uppercase tracking-wider mb-2">
                        {q.type === 'essay' ? 'Model Answer' : 'Explanation'}
                      </p>
                      <p className="text-gray-300 text-xs leading-relaxed">{q.modelAnswer || q.explanation}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      {subject.barQuestions.length === 0 && (
        <EmptyState compact title="No bar questions" description="Bar questions for this subject are being added." />
      )}
    </div>
  )
}

function RecitationsTab({ subject }) {
  const [activeCard, setActiveCard] = useState(null)
  const { incrementProgress } = useSubjectProgress()

  const startRecitation = (recitation) => {
    setActiveCard(recitation)
    incrementProgress(subject.id, 'recitationsCompleted')
  }

  if (activeCard) {
    return (
      <div className="space-y-4 max-w-xl">
        <button
          onClick={() => setActiveCard(null)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={12} /> Back to recitations
        </button>

        <div className="p-5 rounded-xl border" style={{ background: `${subject.color}08`, borderColor: `${subject.color}30` }}>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={14} style={{ color: subject.color }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: subject.accent }}>Socratic Question</span>
          </div>
          <p className="text-white text-sm leading-relaxed font-medium">{activeCard.socratesPrompt}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Follow-up Questions</p>
          {activeCard.followUps.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-navy-800/60 border border-navy-600/40"
            >
              <span className="text-[10px] font-bold text-gray-600 mt-0.5 shrink-0">{i + 1}</span>
              <p className="text-gray-400 text-sm leading-relaxed">{q}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {subject.recitations.map((r) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-navy-800/60 border border-navy-600/40"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 mr-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-gray-600">{r.topic}</span>
                <span className={`px-1.5 py-0.5 text-[10px] rounded border font-medium ${difficultyColor(r.difficulty)}`}>{r.difficulty}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{r.socratesPrompt}</p>
            </div>
            <button
              onClick={() => startRecitation(r)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: `${subject.color}15`,
                color: subject.accent,
                border: `1px solid ${subject.color}25`,
              }}
            >
              Start <ChevronRight size={12} />
            </button>
          </div>
          <p className="text-[11px] text-gray-600">{r.followUps.length} follow-up questions</p>
        </motion.div>
      ))}
      {subject.recitations.length === 0 && (
        <EmptyState compact title="No recitations" description="Recitation sessions for this subject are coming soon." />
      )}
    </div>
  )
}

function MnemonicsTab({ subject }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {subject.mnemonics.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 }}
          className="p-4 rounded-xl border"
          style={{ background: `${subject.color}06`, borderColor: `${subject.color}25` }}
        >
          <div className="flex items-start justify-between mb-2">
            <Lightbulb size={14} style={{ color: subject.color }} className="shrink-0 mt-0.5" />
            <span className="text-[10px] text-gray-600">{m.topic}</span>
          </div>
          <h4 className="text-white font-semibold text-sm mb-2">{m.title}</h4>

          {/* Mnemonic keyword highlight */}
          <div
            className="inline-block px-3 py-1.5 rounded-lg mb-3 font-bold text-lg tracking-widest"
            style={{ background: `${subject.color}20`, color: subject.color }}
          >
            {m.mnemonic}
          </div>

          <p className="text-[11px] text-gray-500 font-medium mb-1.5">{m.fullForm}</p>
          <p className="text-xs text-gray-500 leading-relaxed">{m.explanation}</p>
        </motion.div>
      ))}
      {subject.mnemonics.length === 0 && (
        <div className="col-span-2">
          <EmptyState compact title="No mnemonics" description="Mnemonic aids for this subject are coming soon." />
        </div>
      )}
    </div>
  )
}

function IssueSpottingTab({ subject }) {
  const [active, setActive] = useState(null)
  const [revealed, setRevealed] = useState({})

  if (active) {
    const scenario = active
    return (
      <div className="space-y-4 max-w-2xl">
        <button
          onClick={() => { setActive(null); setRevealed({}) }}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={12} /> Back to scenarios
        </button>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-serif font-bold text-white text-lg">{scenario.title}</h3>
            <span className={`px-2 py-0.5 text-[10px] rounded border font-medium ${difficultyColor(scenario.difficulty)}`}>{scenario.difficulty}</span>
          </div>
          <p className="text-[11px] text-gray-500">{scenario.topic}</p>
        </div>

        <div className="p-4 rounded-xl bg-navy-800/60 border border-navy-600/40">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Facts</p>
          <p className="text-gray-200 text-sm leading-relaxed">{scenario.facts}</p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Spot the Issues</p>
          {scenario.issues.map((issue, i) => (
            <div key={i} className="rounded-xl border border-navy-600/40 overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-navy-700/30 transition-colors"
                onClick={() => setRevealed((prev) => ({ ...prev, [i]: !prev[i] }))}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: `${subject.color}20`, color: subject.color }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-gray-200 text-sm font-medium">{issue.issue}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[10px] text-gray-600">{issue.points} pts</span>
                  {revealed[i] ? <ChevronUp size={14} className="text-gray-600" /> : <ChevronDown size={14} className="text-gray-600" />}
                </div>
              </button>

              <AnimatePresence>
                {revealed[i] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-navy-700/60 pt-3">
                      <p className="text-gray-300 text-sm leading-relaxed">{issue.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {subject.issueSpotting.map((scenario, i) => (
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="p-4 rounded-xl bg-navy-800/60 border border-navy-600/40 cursor-pointer hover:border-navy-500/60 transition-all"
          onClick={() => setActive(scenario)}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">{scenario.title}</h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-600">{scenario.topic}</span>
                <span className={`px-1.5 py-0.5 text-[10px] rounded border font-medium ${difficultyColor(scenario.difficulty)}`}>{scenario.difficulty}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-3">
              <span className="text-[11px] text-gray-600">{scenario.issues.length} issues</span>
              <Target size={14} style={{ color: subject.color }} />
            </div>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{scenario.facts}</p>
        </motion.div>
      ))}
      {subject.issueSpotting.length === 0 && (
        <EmptyState compact title="No scenarios" description="Issue spotting scenarios for this subject are coming soon." />
      )}
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function SubjectDashboard() {
  const { subjectId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const subject = getSubject(subjectId)
  const { getSubjectProgress, getSubjectPercent } = useSubjectProgress()

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <EmptyState
          title="Subject not found"
          description={`No subject with ID "${subjectId}" exists in the registry.`}
          action={() => navigate('/subjects')}
          actionLabel="Back to Subject Library"
        />
      </div>
    )
  }

  const sp = getSubjectProgress(subject.id)
  const percent = getSubjectPercent(subject.id)
  const totalCards = subject.flashcards.length

  const tabContent = {
    overview: <OverviewTab subject={subject} />,
    codal: <CodalTab subject={subject} />,
    flashcards: <FlashcardsTab subject={subject} />,
    'bar-review': <BarReviewTab subject={subject} />,
    recitations: <RecitationsTab subject={subject} />,
    mnemonics: <MnemonicsTab subject={subject} />,
    'issue-spotting': <IssueSpottingTab subject={subject} />,
  }

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <button
        onClick={() => navigate('/subjects')}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        <ArrowLeft size={13} /> Subject Library
      </button>

      {/* Top content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Left: Subject info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Card */}
          <div
            className="relative p-5 rounded-2xl border overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${subject.color}10, ${subject.color}06)`,
              borderColor: `${subject.color}30`,
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, ${subject.color}, ${subject.accent})` }}
            />

            {/* Progress ring */}
            <div className="flex justify-center mb-4">
              <SubjectProgressRing value={percent} size={100} strokeWidth={7} color={subject.color} showLabel label="mastered" />
            </div>

            <h1 className="font-serif font-bold text-white text-xl text-center mb-1">{subject.name}</h1>

            <div className="flex items-center justify-center gap-1.5 mb-4">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{ background: `${subject.color}15`, color: subject.accent, border: `1px solid ${subject.color}25` }}
              >
                {subject.barWeight}% of Bar
              </span>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2">
              <QuickStat icon={<BookOpen size={12} />} label="Topics" value={subject.topics.length} color={subject.color} />
              <QuickStat icon={<Layers size={12} />} label="Codals" value={subject.codals.length} color={subject.color} />
              <QuickStat icon={<Zap size={12} />} label="Cards" value={`${Math.min(sp.flashcardsMastered, totalCards)}/${totalCards}`} color={subject.color} />
              <QuickStat icon={<Award size={12} />} label="Bar Q's" value={subject.barQuestions.length} color={subject.color} />
            </div>

            {sp.lastStudied && (
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <Clock size={10} className="text-gray-600" />
                <span className="text-[10px] text-gray-600">
                  Last: {new Date(sp.lastStudied).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-navy-800/60 border border-navy-600/40">
            <p className="text-gray-400 text-xs leading-relaxed">{subject.description}</p>
          </div>
        </div>

        {/* Right: Module nav + content */}
        <div className="lg:col-span-3 space-y-4">
          <SubjectModuleNav activeTab={activeTab} onTabChange={setActiveTab} color={subject.color} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function QuickStat({ icon, label, value, color }) {
  return (
    <div className="p-2.5 rounded-lg bg-navy-800/50 border border-navy-700/60 flex flex-col gap-1">
      <div className="flex items-center gap-1.5" style={{ color }}>
        {icon}
        <span className="text-[10px] text-gray-600">{label}</span>
      </div>
      <span className="text-white text-sm font-bold">{value}</span>
    </div>
  )
}
