import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Database, Bell, Palette, User, ExternalLink, CheckCircle } from 'lucide-react'

const SECTIONS = [
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    fields: [
      { key: 'name', label: 'Display Name', type: 'text', placeholder: 'Counsel', value: 'Counsel' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', value: '' },
      { key: 'barYear', label: 'Target Bar Year', type: 'select', options: ['2024', '2025', '2026', '2027'], value: '2025' },
    ],
  },
  {
    id: 'supabase',
    label: 'Supabase (Database)',
    icon: Database,
    description: 'Connect your Supabase project for cloud sync, AI features, and persistent data.',
    fields: [
      { key: 'supabase_url', label: 'Supabase URL', type: 'text', placeholder: 'https://xxxx.supabase.co', value: '' },
      { key: 'supabase_key', label: 'Anon Key', type: 'password', placeholder: 'eyJhbGc...', value: '' },
    ],
  },
  {
    id: 'notifications',
    label: 'Study Reminders',
    icon: Bell,
    toggles: [
      { key: 'daily_reminder', label: 'Daily study reminder', value: true },
      { key: 'streak_alert', label: 'Streak at-risk alert', value: true },
      { key: 'bar_countdown', label: 'Bar exam countdown', value: false },
    ],
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: Palette,
    toggles: [
      { key: 'animations', label: 'Enable animations', value: true },
      { key: 'compact', label: 'Compact sidebar', value: false },
      { key: 'sound', label: 'Sound effects', value: false },
    ],
  },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [toggles, setToggles] = useState({
    daily_reminder: true, streak_alert: true, bar_countdown: false,
    animations: true, compact: false, sound: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const section = SECTIONS.find(s => s.id === activeSection)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-500/10 flex items-center justify-center">
          <SettingsIcon size={20} className="text-gray-400" />
        </div>
        <div>
          <h2 className="section-title">Settings</h2>
          <p className="text-xs text-gray-500 mt-0.5">Configure your Philippine Law AI Companion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <div className="lg:col-span-1">
          <div className="glass-card p-3 space-y-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                  activeSection === s.id
                    ? 'bg-gold-500/10 text-gold-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-navy-800'
                }`}
              >
                <s.icon size={16} />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 space-y-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <section.icon size={18} className="text-gold-400" />
              <h3 className="section-title">{section.label}</h3>
            </div>

            {section.description && (
              <div className="bg-blue-500/5 border border-blue-500/15 rounded-lg p-4">
                <p className="text-xs text-blue-400 leading-relaxed">{section.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2 transition-colors"
                >
                  View Supabase docs <ExternalLink size={10} />
                </a>
              </div>
            )}

            {section.fields?.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="w-full px-3 py-2.5 bg-navy-800 border border-navy-700 rounded-lg text-sm text-gray-200 outline-none focus:border-gold-500/40"
                    defaultValue={field.value}
                  >
                    {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    defaultValue={field.value}
                    className="w-full px-3 py-2.5 bg-navy-800 border border-navy-700 rounded-lg text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-gold-500/40 transition-colors"
                  />
                )}
              </div>
            ))}

            {section.toggles?.map(toggle => (
              <div key={toggle.key} className="flex items-center justify-between py-2 border-b border-navy-700 last:border-0">
                <span className="text-sm text-gray-300">{toggle.label}</span>
                <button
                  onClick={() => setToggles(prev => ({ ...prev, [toggle.key]: !prev[toggle.key] }))}
                  className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                    toggles[toggle.key] ? 'bg-gold-500' : 'bg-navy-700'
                  }`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                    toggles[toggle.key] ? 'left-5' : 'left-0.5'
                  }`} />
                </button>
              </div>
            ))}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-accent-orange text-navy-950 font-semibold text-sm rounded-lg hover:opacity-90 transition-all"
              >
                {saved ? <CheckCircle size={14} /> : null}
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
              <button className="px-5 py-2.5 text-sm text-gray-400 hover:text-gray-200 transition-colors">
                Reset
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
