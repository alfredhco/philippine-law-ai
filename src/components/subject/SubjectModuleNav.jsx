import { motion } from 'framer-motion'
import { BookOpen, FileText, CreditCard, Award, Mic, Lightbulb, Target } from 'lucide-react'

const TABS = [
  { id: 'overview',       label: 'Overview',       icon: BookOpen },
  { id: 'codal',          label: 'Codal',           icon: FileText },
  { id: 'flashcards',     label: 'Flashcards',      icon: CreditCard },
  { id: 'bar-review',     label: 'Bar Review',      icon: Award },
  { id: 'recitations',    label: 'Recitations',     icon: Mic },
  { id: 'mnemonics',      label: 'Mnemonics',       icon: Lightbulb },
  { id: 'issue-spotting', label: 'Issue Spotting',  icon: Target },
]

export default function SubjectModuleNav({ activeTab, onTabChange, color }) {
  return (
    <div className="relative border-b border-navy-700/80">
      <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none pb-px">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 shrink-0 rounded-t-lg"
              style={{
                color: isActive ? color : undefined,
              }}
            >
              <span className={isActive ? '' : 'text-gray-600'}>
                <Icon size={14} />
              </span>
              <span className={isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}>
                {tab.label}
              </span>

              {/* Active underline */}
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
