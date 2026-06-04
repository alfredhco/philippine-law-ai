import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Lightbulb, BookOpen, ChevronDown, ChevronUp, Hash } from 'lucide-react'
import { BAR_SUBJECTS } from '../../data/bar/index.js'
import { useState } from 'react'

const CHOICE_LETTERS = ['A', 'B', 'C', 'D']

export default function MCQQuestion({
  question,
  selectedAnswer,
  onSelect,
  submitted,
  questionNumber,
  totalQuestions,
}) {
  const [showExplanation, setShowExplanation] = useState(false)
  const [showTaglish, setShowTaglish]         = useState(false)
  const subject = BAR_SUBJECTS[question.subject]

  const getChoiceStyle = (idx) => {
    if (!submitted) {
      return selectedAnswer === idx
        ? 'bg-gold-500/15 border-gold-500/50 text-white'
        : 'bg-navy-800/40 border-navy-700/60 text-gray-300 hover:border-navy-600 hover:bg-navy-800/80 hover:text-white'
    }
    if (idx === question.correctAnswer) return 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
    if (idx === selectedAnswer && idx !== question.correctAnswer) return 'bg-red-500/10 border-red-500/40 text-red-300'
    return 'bg-navy-800/20 border-navy-700/40 text-gray-600'
  }

  return (
    <div className="space-y-5">
      {/* Question header */}
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
            style={{ background: `${subject?.color}18`, color: subject?.color }}>
            {questionNumber}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider"
              style={{ background: `${subject?.color}15`, color: subject?.color }}>
              {subject?.name}
            </span>
            <span className="text-[10px] text-gray-600">{question.topic?.replace(/-/g, ' ')}</span>
            {question.year && (
              <span className="text-[10px] text-gray-700 flex items-center gap-1">
                <Hash size={8} />{question.year} Bar
              </span>
            )}
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
              question.difficulty === 'hard'   ? 'bg-red-500/10 text-red-400' :
              question.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-400' :
              'bg-emerald-500/10 text-emerald-400'
            }`}>{question.difficulty}</span>
          </div>
          <p className="text-base text-gray-100 leading-relaxed font-medium">{question.question}</p>
        </div>
      </div>

      {/* Choices */}
      <div className="space-y-2.5">
        {question.choices.map((choice, idx) => (
          <motion.button
            key={idx}
            whileHover={!submitted ? { scale: 1.005, x: 2 } : undefined}
            whileTap={!submitted ? { scale: 0.998 } : undefined}
            onClick={() => !submitted && onSelect(idx)}
            disabled={submitted}
            className={`w-full text-left flex items-start gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${getChoiceStyle(idx)} ${submitted ? 'cursor-default' : ''}`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
              !submitted && selectedAnswer === idx ? 'bg-gold-500/30 text-gold-300' :
              submitted && idx === question.correctAnswer ? 'bg-emerald-500/30 text-emerald-300' :
              submitted && idx === selectedAnswer && idx !== question.correctAnswer ? 'bg-red-500/20 text-red-400' :
              'bg-navy-700 text-gray-500'
            }`}>
              {CHOICE_LETTERS[idx]}
            </div>
            <p className="flex-1 text-sm leading-relaxed">{choice}</p>
            {submitted && idx === question.correctAnswer && (
              <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            )}
            {submitted && idx === selectedAnswer && idx !== question.correctAnswer && (
              <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Post-submission explanation */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* Result banner */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
              selectedAnswer === question.correctAnswer
                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                : 'bg-red-500/10 border-red-500/25 text-red-300'
            }`}>
              {selectedAnswer === question.correctAnswer
                ? <CheckCircle size={16} />
                : <XCircle size={16} />}
              <span className="text-sm font-semibold">
                {selectedAnswer === question.correctAnswer
                  ? 'Correct! Well done, Counsel.'
                  : `Incorrect. The answer is ${CHOICE_LETTERS[question.correctAnswer]}.`}
              </span>
            </div>

            {/* Explanation accordion */}
            <div className="bg-navy-800/40 border border-navy-700/60 rounded-2xl overflow-hidden">
              <button
                onClick={() => setShowExplanation(e => !e)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-navy-700/30 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                  <BookOpen size={12} className="text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-blue-400 flex-1 text-left">Legal Explanation</span>
                {showExplanation ? <ChevronUp size={14} className="text-gray-600" /> : <ChevronDown size={14} className="text-gray-600" />}
              </button>
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-navy-700/40">
                      <p className="text-sm text-gray-300 leading-relaxed">{question.explanation}</p>
                      {question.relatedArticle && (
                        <p className="text-xs text-gold-400/70 mt-2 font-medium">📜 {question.relatedArticle}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Taglish explanation */}
            {question.taglishExplanation && (
              <div className="bg-navy-800/40 border border-navy-700/60 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setShowTaglish(t => !t)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-navy-700/30 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center shrink-0">
                    <Lightbulb size={12} className="text-teal-400" />
                  </div>
                  <span className="text-sm font-semibold text-teal-400 flex-1 text-left">Taglish Explanation 🇵🇭</span>
                  {showTaglish ? <ChevronUp size={14} className="text-gray-600" /> : <ChevronDown size={14} className="text-gray-600" />}
                </button>
                <AnimatePresence>
                  {showTaglish && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-navy-700/40">
                        <p className="text-sm text-gray-300 leading-relaxed">{question.taglishExplanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
