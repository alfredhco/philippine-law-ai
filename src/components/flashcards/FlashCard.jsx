import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, RotateCcw, Tag, BookOpen } from 'lucide-react'
import { SUBJECT_INFO } from '../../data/flashcards/index.js'

function renderMarkdown(text = '') {
  if (!text) return ''
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g,      '<em class="text-gray-300 italic">$1</em>')
    .replace(/`(.+?)`/g,        '<code class="px-1.5 py-0.5 bg-navy-700 rounded text-xs font-mono text-gold-300">$1</code>')
    .split('\n')
    .map(line =>
      line.startsWith('•')
        ? `<li class="ml-4 mb-1 text-gray-300">${line.slice(1).trim()}</li>`
        : line.includes('|')
          ? `<p class="mb-0.5 font-mono text-xs text-gray-400">${line}</p>`
          : `<p class="mb-2">${line}</p>`
    ).join('')
}

const DIFFICULTY_BADGE = {
  easy:   { cls: 'bg-emerald-500/15 text-emerald-400', label: 'Easy'   },
  medium: { cls: 'bg-amber-500/15   text-amber-400',   label: 'Medium' },
  hard:   { cls: 'bg-red-500/15     text-red-400',     label: 'Hard'   },
}

export default function FlashCard({ card, flipped, onFlip, cardState, showHint, onHintToggle }) {
  const subject  = SUBJECT_INFO[card.subject]
  const diffBadge = DIFFICULTY_BADGE[card.difficulty] || DIFFICULTY_BADGE.medium
  const state     = cardState || card

  const successRate = state.totalReviews > 0
    ? Math.round((state.correctReviews / state.totalReviews) * 100)
    : null

  return (
    <div className="w-full max-w-2xl mx-auto select-none" style={{ perspective: '1400px' }}>
      <motion.div
        onClick={onFlip}
        className="relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d', minHeight: 320 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 120, damping: 20 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* ── Front ─────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col bg-navy-800/80 backdrop-blur-xl border border-navy-600/80 rounded-2xl overflow-hidden shadow-navy-lg"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Color top stripe */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${subject?.color ?? '#f59e0b'}, #f97316)` }} />

          <div className="flex-1 flex flex-col p-7">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider"
                  style={{ background: `${subject?.color ?? '#f59e0b'}18`, color: subject?.color ?? '#f59e0b' }}>
                  {subject?.name ?? card.subject}
                </span>
                <span className={`text-[10px] font-medium px-2 py-1 rounded-lg ${diffBadge.cls}`}>
                  {diffBadge.label}
                </span>
                {successRate !== null && (
                  <span className={`text-[10px] px-2 py-1 rounded-lg ${
                    successRate >= 75 ? 'bg-emerald-500/10 text-emerald-400' :
                    successRate >= 50 ? 'bg-amber-500/10 text-amber-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {successRate}% success
                  </span>
                )}
              </div>
              {card.tags?.slice(0, 2).map(t => (
                <span key={t} className="flex items-center gap-1 text-[9px] text-gray-700 bg-navy-700/50 px-1.5 py-0.5 rounded">
                  <Tag size={8} />{t}
                </span>
              ))}
            </div>

            {/* Question */}
            <div className="flex-1 flex items-center justify-center">
              <p className="font-serif text-xl md:text-2xl text-white text-center leading-relaxed font-semibold">
                {card.front}
              </p>
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && card.hint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 px-4 py-3 bg-blue-500/8 border border-blue-500/20 rounded-xl overflow-hidden"
                >
                  <p className="text-xs text-blue-300 flex items-start gap-2">
                    <Lightbulb size={12} className="mt-0.5 shrink-0 text-blue-400" />
                    {card.hint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-navy-700/60">
              <button
                onClick={(e) => { e.stopPropagation(); onHintToggle?.() }}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  showHint ? 'text-blue-400' : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                <Lightbulb size={12} />
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                <RotateCcw size={11} />
                <span>Tap to reveal</span>
              </div>
              {state.repetitions > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <BookOpen size={11} />
                  <span>{state.repetitions} reviews</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Back ──────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col bg-navy-800/90 backdrop-blur-xl border border-gold-500/20 rounded-2xl overflow-hidden shadow-gold"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Color top stripe */}
          <div className="h-1 w-full bg-gradient-to-r from-gold-500 to-accent-orange" />

          <div className="flex-1 flex flex-col p-7 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest">Answer</span>
              <div className="flex-1 h-px bg-gold-500/20" />
            </div>

            {/* Answer content */}
            <div
              className="text-sm text-gray-300 leading-relaxed flex-1"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(card.back) }}
            />
          </div>

          {/* Bottom tap hint */}
          <div className="flex items-center justify-center gap-1.5 py-3 border-t border-navy-700/60 text-xs text-gray-600">
            <RotateCcw size={10} />
            <span>Tap to flip back</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
