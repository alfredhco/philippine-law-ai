import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import SubjectProgressRing from './SubjectProgressRing'
import { useSubjectProgress } from '../../hooks/useSubjectProgress'

export default function SubjectCard({ subject, index = 0 }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const { getSubjectProgress, getSubjectPercent } = useSubjectProgress()

  const sp = getSubjectProgress(subject.id)
  const percent = getSubjectPercent(subject.id)
  const totalCards = subject.flashcards.length
  const mastered = Math.min(sp.flashcardsMastered, totalCards)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(`/subjects/${subject.id}`)}
      className="relative cursor-pointer overflow-hidden rounded-2xl border border-navy-600/60 bg-navy-800/60 backdrop-blur-md group transition-all duration-300"
      style={{
        boxShadow: hovered ? `0 8px 32px ${subject.color}20, 0 0 0 1px ${subject.color}30` : undefined,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${subject.color}, ${subject.accent})` }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon area with glow */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: `${subject.color}18`,
              border: `1px solid ${subject.color}30`,
              boxShadow: hovered ? `0 0 20px ${subject.color}30` : undefined,
            }}
          >
            <BookOpen size={20} style={{ color: subject.color }} />
          </div>

          {/* Bar weight badge */}
          <div
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: `${subject.color}15`,
              color: subject.accent,
              border: `1px solid ${subject.color}25`,
            }}
          >
            {subject.barWeight}% of Bar
          </div>
        </div>

        {/* Subject name */}
        <h3 className="font-serif font-bold text-white text-base leading-snug mb-1">
          {subject.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {subject.description}
        </p>

        {/* Progress row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-500">
              <span className="text-white font-semibold">{mastered}</span>
              <span className="text-gray-600">/{totalCards}</span> cards
            </span>
            <span className="text-[10px] text-gray-600">
              {subject.topics.length} topics
            </span>
          </div>

          {/* Progress ring */}
          <SubjectProgressRing
            value={percent}
            size={56}
            strokeWidth={4}
            color={subject.color}
            showLabel
          />
        </div>

        {/* CTA - appears on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={hovered
            ? { opacity: 1, height: 36, marginTop: 12 }
            : { opacity: 0, height: 0, marginTop: 0 }
          }
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div
            className="w-full h-9 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
            style={{
              background: `linear-gradient(135deg, ${subject.color}25, ${subject.accent}20)`,
              border: `1px solid ${subject.color}35`,
              color: subject.accent,
            }}
          >
            Study Now
            <ArrowRight size={14} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
