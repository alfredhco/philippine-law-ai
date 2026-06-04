import { motion } from 'framer-motion'
import { BookOpen, CreditCard, Award, Mic, Clock } from 'lucide-react'

const ACTIVITIES = [
  { icon: CreditCard, label: 'Flashcard session', subject: 'Civil Law', time: '2h ago', color: '#6366f1' },
  { icon: Award, label: 'Bar Q answered', subject: 'Criminal Law', time: '3h ago', color: '#ef4444' },
  { icon: BookOpen, label: 'Codal reading', subject: 'Political Law', time: '5h ago', color: '#0ea5e9' },
  { icon: Mic, label: 'Oral recitation', subject: 'Remedial Law', time: 'Yesterday', color: '#10b981' },
  { icon: Award, label: 'Mock bar exam', subject: 'Civil Law', time: 'Yesterday', color: '#f59e0b' },
]

export default function RecentActivity() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Recent Activity</h2>
        <button className="text-xs text-gray-500 hover:text-gold-400 transition-colors">Clear all</button>
      </div>

      <div className="space-y-3">
        {ACTIVITIES.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${activity.color}18` }}
            >
              <activity.icon size={14} style={{ color: activity.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                {activity.label}
              </p>
              <p className="text-xs text-gray-600">{activity.subject}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 shrink-0">
              <Clock size={10} />
              <span>{activity.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
