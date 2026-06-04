import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Library, TrendingUp, AlertTriangle, Scale } from 'lucide-react'
import { SUBJECT_REGISTRY } from '../data/subjects/index.js'
import SubjectCard from '../components/subject/SubjectCard'
import { useSubjectProgress } from '../hooks/useSubjectProgress'

const SORT_OPTIONS = [
  { id: 'default',    label: 'All' },
  { id: 'progress',   label: 'By Progress' },
  { id: 'weak',       label: 'Weak First' },
  { id: 'barweight',  label: 'By Bar Weight' },
]

export default function SubjectLibrary() {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const { getSubjectPercent, getOverallStats } = useSubjectProgress()
  const stats = getOverallStats()

  const filtered = useMemo(() => {
    let list = [...SUBJECT_REGISTRY]

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.shortName.toLowerCase().includes(q)
      )
    }

    // Sort
    switch (sortBy) {
      case 'progress':
        list = list.sort((a, b) => getSubjectPercent(b.id) - getSubjectPercent(a.id))
        break
      case 'weak':
        list = list.sort((a, b) => getSubjectPercent(a.id) - getSubjectPercent(b.id))
        break
      case 'barweight':
        list = list.sort((a, b) => b.barWeight - a.barWeight)
        break
      default:
        break
    }

    return list
  }, [query, sortBy, getSubjectPercent])

  const totalCards = SUBJECT_REGISTRY.reduce((sum, s) => sum + s.flashcards.length, 0)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-accent-orange flex items-center justify-center shadow-glow shrink-0">
          <Library size={18} className="text-navy-950" />
        </div>
        <div>
          <h1 className="font-serif font-bold text-white text-xl">Subject Library</h1>
          <p className="text-gray-500 text-xs">All 9 Philippine Bar subjects in one place</p>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-4 px-4 py-3 rounded-xl bg-navy-800/60 border border-navy-600/60 backdrop-blur-md"
      >
        <Stat
          icon={<Scale size={14} className="text-gold-400" />}
          label="Subjects"
          value={`${SUBJECT_REGISTRY.length}`}
        />
        <div className="w-px h-5 bg-navy-600/60" />
        <Stat
          icon={<TrendingUp size={14} className="text-emerald-400" />}
          label="Overall Progress"
          value={`${stats.overallPercent}%`}
          valueClass="text-emerald-400"
        />
        <div className="w-px h-5 bg-navy-600/60" />
        <Stat
          icon={<AlertTriangle size={14} className="text-gold-400" />}
          label="Cards Mastered"
          value={`${stats.totalMastered} / ${totalCards}`}
          valueClass="text-gold-400"
        />
      </motion.div>

      {/* Search + Sort controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-navy-800/60 border border-navy-600/60 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:bg-navy-800 transition-all"
          />
        </div>

        {/* Sort buttons */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-800/60 border border-navy-600/60">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                sortBy === opt.id
                  ? 'bg-gold-500/15 text-gold-400 border border-gold-500/25'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subject grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((subject, i) => (
            <SubjectCard key={subject.id} subject={subject} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center mb-4">
            <Search size={22} className="text-gray-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-400 mb-1">No subjects found</h3>
          <p className="text-xs text-gray-600 max-w-xs">
            No subjects match "{query}". Try a different search term.
          </p>
          <button
            onClick={() => setQuery('')}
            className="mt-4 px-4 py-2 rounded-lg bg-navy-800 border border-navy-700 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear search
          </button>
        </motion.div>
      )}
    </div>
  )
}

function Stat({ icon, label, value, valueClass = 'text-white' }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-sm font-bold ${valueClass}`}>{value}</span>
    </div>
  )
}
