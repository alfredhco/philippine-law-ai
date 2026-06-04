import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings as SettingsIcon, Database, Bell, Palette, User,
  CheckCircle, LogOut, RefreshCw, Cloud, CloudOff, Loader,
  Shield, ExternalLink,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${value ? 'bg-gold-500' : 'bg-navy-700'}`}
    >
      <motion.div
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
      />
    </button>
  )
}

function SyncBadge({ syncing, lastSync, enabled }) {
  if (!enabled) return (
    <span className="flex items-center gap-1 text-[10px] text-gray-600">
      <CloudOff size={10} /> Local only
    </span>
  )
  if (syncing) return (
    <span className="flex items-center gap-1 text-[10px] text-blue-400">
      <Loader size={10} className="animate-spin" /> Syncing…
    </span>
  )
  if (lastSync) return (
    <span className="flex items-center gap-1 text-[10px] text-emerald-400">
      <Cloud size={10} /> Synced {new Date(lastSync).toLocaleTimeString()}
    </span>
  )
  return (
    <span className="flex items-center gap-1 text-[10px] text-gray-600">
      <Cloud size={10} /> Not synced yet
    </span>
  )
}

// ─── Account section ──────────────────────────────────────────────────────────
function AccountSection({ auth, toast }) {
  const { user, profile, isEnabled, isAuthenticated, syncing, lastSync, signOut, updateProfile, manualSync } = auth
  const [name,    setName]    = useState(profile?.display_name || '')
  const [barYear, setBarYear] = useState(profile?.bar_year || '2026')
  const [saving,  setSaving]  = useState(false)
  const [syncLoading, setSyncLoading] = useState(false)

  const handleSave = async () => {
    if (!isEnabled || !isAuthenticated) return
    setSaving(true)
    const { error } = await updateProfile({ display_name: name, bar_year: barYear })
    setSaving(false)
    if (error) toast.error('Save failed', error.message)
    else toast.success('Profile updated', 'Your changes have been saved.')
  }

  const handleSync = async () => {
    setSyncLoading(true)
    const result = await manualSync()
    setSyncLoading(false)
    if (result?.success) toast.success('Sync complete', 'All data synced to cloud.')
    else toast.error('Sync failed', result?.reason || 'Unknown error')
  }

  const handleSignOut = async () => {
    await signOut()
    toast.info('Signed out', 'Your data was saved before signing out.')
  }

  if (!isEnabled) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <Database size={16} className="text-amber-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-400">Supabase not configured</p>
            <p className="text-xs text-gray-500 mt-0.5">Add <code className="text-amber-400/80 bg-navy-700 px-1 rounded">VITE_SUPABASE_URL</code> and <code className="text-amber-400/80 bg-navy-700 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to your <code className="text-amber-400/80 bg-navy-700 px-1 rounded">.env</code> file to enable cloud sync and authentication.</p>
            <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2">
              Create a Supabase project <ExternalLink size={10} />
            </a>
          </div>
        </div>
        <div className="p-4 bg-navy-800/60 border border-navy-700 rounded-xl">
          <p className="text-xs text-gray-400 font-semibold mb-1">Your <code className="text-gold-400">.env</code> file should contain:</p>
          <pre className="text-[11px] text-emerald-400 font-mono mt-2 leading-relaxed bg-navy-900/60 p-3 rounded-lg">
{`VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...`}
          </pre>
          <p className="text-[10px] text-gray-600 mt-2">Run <code className="text-gray-400">npm run dev</code> after adding the keys. The app works without them — all data is stored locally.</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center space-y-4 py-4">
        <Shield size={32} className="text-gray-600 mx-auto" />
        <p className="text-sm text-gray-400">You're not signed in.</p>
        <a href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-accent-orange text-navy-950 font-semibold text-sm rounded-xl hover:opacity-90 transition-all">
          Sign In / Create Account
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* User info */}
      <div className="flex items-center gap-3 p-4 bg-navy-800/60 border border-navy-700/60 rounded-xl">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-accent-orange flex items-center justify-center text-navy-950 font-bold text-sm shadow-glow shrink-0">
          {(profile?.display_name || user.email || 'C')[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{profile?.display_name || 'Counsel'}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
        <SyncBadge syncing={syncing} lastSync={lastSync} enabled={isEnabled} />
      </div>

      {/* Profile edit */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Display Name</label>
          <input value={name} onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-sm text-gray-200 outline-none focus:border-gold-500/40 transition-colors" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Target Bar Year</label>
          <select value={barYear} onChange={e => setBarYear(e.target.value)}
            className="w-full px-3 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-sm text-gray-200 outline-none focus:border-gold-500/40">
            {['2025','2026','2027','2028'].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-500 to-accent-orange text-navy-950 font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-50">
          {saving ? <Loader size={13} className="animate-spin" /> : <CheckCircle size={13} />}
          Save Profile
        </button>
        <button onClick={handleSync} disabled={syncLoading || syncing}
          className="flex items-center gap-2 px-4 py-2 bg-navy-700 text-gray-300 text-sm rounded-xl hover:bg-navy-600 hover:text-white transition-all disabled:opacity-50">
          <RefreshCw size={13} className={(syncLoading || syncing) ? 'animate-spin' : ''} />
          Sync Now
        </button>
        <button onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-red-400 border border-red-500/20 text-sm rounded-xl hover:bg-red-500/10 transition-all ml-auto">
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </div>
  )
}

// ─── Notifications section ─────────────────────────────────────────────────────
function NotificationsSection() {
  const [toggles, setToggles] = useState({
    daily_reminder: true, streak_alert: true, bar_countdown: false,
  })
  const toggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }))
  const items = [
    { key: 'daily_reminder', label: 'Daily study reminder',  desc: 'Remind me to study each day' },
    { key: 'streak_alert',   label: 'Streak at-risk alert',  desc: 'Alert when streak may break' },
    { key: 'bar_countdown',  label: 'Bar exam countdown',    desc: 'Weekly countdown to bar date' },
  ]
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.key} className="flex items-center justify-between py-3 border-b border-navy-700/60 last:border-0">
          <div>
            <p className="text-sm text-gray-200">{item.label}</p>
            <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
          </div>
          <Toggle value={toggles[item.key]} onChange={() => toggle(item.key)} />
        </div>
      ))}
    </div>
  )
}

// ─── Appearance section ───────────────────────────────────────────────────────
function AppearanceSection() {
  const [toggles, setToggles] = useState({ animations: true, compact: false, sound: false })
  const toggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }))
  const items = [
    { key: 'animations', label: 'Enable animations', desc: 'Motion and transitions throughout the app' },
    { key: 'compact',    label: 'Compact sidebar',   desc: 'Collapse sidebar by default' },
    { key: 'sound',      label: 'Sound effects',     desc: 'Audio feedback on interactions' },
  ]
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.key} className="flex items-center justify-between py-3 border-b border-navy-700/60 last:border-0">
          <div>
            <p className="text-sm text-gray-200">{item.label}</p>
            <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
          </div>
          <Toggle value={toggles[item.key]} onChange={() => toggle(item.key)} />
        </div>
      ))}
    </div>
  )
}

// ─── Main Settings page ───────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'account',       label: 'Account',           icon: User     },
  { id: 'notifications', label: 'Notifications',     icon: Bell     },
  { id: 'appearance',    label: 'Appearance',        icon: Palette  },
  { id: 'database',      label: 'Database / Sync',   icon: Database },
]

export default function Settings() {
  const [active, setActive] = useState('account')
  const auth = useAuth()
  const toast = useToast()

  const renderSection = () => {
    switch (active) {
      case 'account':       return <AccountSection auth={auth} toast={toast} />
      case 'notifications': return <NotificationsSection />
      case 'appearance':    return <AppearanceSection />
      case 'database':      return <DatabaseSection auth={auth} toast={toast} />
      default:              return null
    }
  }

  return (
    <div className="space-y-6">
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
        <div className="lg:col-span-1">
          <div className="glass-card p-3 space-y-1">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                  active === s.id ? 'bg-gold-500/10 text-gold-400' : 'text-gray-400 hover:text-gray-200 hover:bg-navy-800'
                }`}>
                <s.icon size={15} />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 space-y-5">
            <div className="flex items-center gap-2 pb-1 border-b border-navy-700/60">
              {(() => { const s = SECTIONS.find(x => x.id === active); return <><s.icon size={16} className="text-gold-400" /><h3 className="section-title">{s.label}</h3></> })()}
            </div>
            {renderSection()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Database section (schema setup info) ────────────────────────────────────
function DatabaseSection({ auth }) {
  const { isEnabled, isAuthenticated, syncing, lastSync, manualSync } = auth
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleSync = async () => {
    setLoading(true)
    const result = await manualSync()
    setLoading(false)
    if (result?.success) toast.success('Sync complete', 'All local data pushed to cloud.')
    else toast.error('Sync failed', result?.reason || 'Not signed in')
  }

  return (
    <div className="space-y-4">
      <div className={`flex items-center gap-3 p-3 rounded-xl border ${isEnabled ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-gray-500/5 border-gray-700'}`}>
        {isEnabled ? <Cloud size={14} className="text-emerald-400 shrink-0" /> : <CloudOff size={14} className="text-gray-600 shrink-0" />}
        <div>
          <p className={`text-xs font-semibold ${isEnabled ? 'text-emerald-400' : 'text-gray-500'}`}>
            {isEnabled ? 'Supabase connected' : 'Running in local mode'}
          </p>
          {isEnabled && lastSync && <p className="text-[10px] text-gray-600 mt-0.5">Last sync: {new Date(lastSync).toLocaleString()}</p>}
        </div>
        {isEnabled && isAuthenticated && (
          <button onClick={handleSync} disabled={loading || syncing}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-navy-700 hover:bg-navy-600 text-gray-300 rounded-lg transition-all disabled:opacity-50">
            <RefreshCw size={11} className={(loading || syncing) ? 'animate-spin' : ''} />
            Sync Now
          </button>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-400">What gets synced</p>
        {[
          { icon: '🃏', label: 'Flashcard SRS states & mastery progress' },
          { icon: '📊', label: 'Bar review session history & scores' },
          { icon: '🎤', label: 'Oral recitation history & survival streak' },
          { icon: '💬', label: 'AI Coach conversation history' },
          { icon: '⚡', label: 'XP, level, and achievement badges' },
          { icon: '📅', label: 'Study activity log (heatmap data)' },
          { icon: '🔖', label: 'Bookmarks (codal articles, flashcards)' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2.5 text-xs text-gray-500">
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      {!isEnabled && (
        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-2">Setup instructions:</p>
          <ol className="space-y-1.5 text-xs text-gray-500">
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">1.</span>Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">supabase.com</a></li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">2.</span>Run <code className="text-gray-300 bg-navy-700 px-1 rounded">supabase/schema.sql</code> in the SQL editor</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">3.</span>Copy URL + anon key to <code className="text-gray-300 bg-navy-700 px-1 rounded">.env</code></li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">4.</span>Restart the dev server</li>
          </ol>
        </div>
      )}
    </div>
  )
}
