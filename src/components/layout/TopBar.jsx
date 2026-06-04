import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Play, Pause, Square, Menu, X, Command } from 'lucide-react'
import { useStudySession } from '../../hooks/useStudySession'
import { useToast } from '../../context/ToastContext'
import { getProgressionSnapshot } from '../../lib/progression.js'
import XPBar from '../progression/XPBar'

export default function TopBar({ pageTitle, onMenuToggle }) {
  const { isActive, formatElapsed, startSession, pauseSession, endSession } = useStudySession()
  const [searchOpen, setSearchOpen] = useState(false)
  const toast = useToast()
  const { levelInfo, xp } = getProgressionSnapshot()

  const handleEndSession = () => {
    endSession()
    toast.success('Session saved', 'Your study time has been recorded.')
  }

  const handleStartSession = () => {
    startSession()
    toast.info('Session started', 'Your study timer is now running.')
  }

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3.5 border-b border-navy-700/80 bg-navy-900/70 backdrop-blur-xl shrink-0 gap-3">
      {/* Left — mobile menu + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-navy-700 transition-all"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="font-serif text-lg font-bold text-white truncate leading-tight">{pageTitle}</h1>
          <p className="text-[10px] text-gray-600 hidden sm:block tracking-wide uppercase">Philippine Law AI</p>
        </div>
      </div>

      {/* Center — search */}
      <div className="hidden md:flex flex-1 max-w-sm mx-4">
        <AnimatePresence mode="wait">
          {searchOpen ? (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 bg-navy-800 border border-navy-600 rounded-xl w-full"
            >
              <Search size={13} className="text-gray-500 shrink-0" />
              <input
                autoFocus
                onBlur={() => setSearchOpen(false)}
                placeholder="Search cases, provisions, topics..."
                className="bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none w-full"
              />
              <button onClick={() => setSearchOpen(false)} className="text-gray-600 hover:text-gray-400">
                <X size={13} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-navy-800/60 border border-navy-700/80 rounded-xl text-gray-600 hover:text-gray-400 hover:border-navy-600 transition-all duration-200 text-sm w-full group"
            >
              <Search size={13} />
              <span className="text-xs">Quick search...</span>
              <div className="ml-auto flex items-center gap-0.5 opacity-50 group-hover:opacity-70">
                <Command size={9} />
                <span className="text-[9px]">K</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Right — timer + actions */}
      <div className="flex items-center gap-2">
        {/* Session timer */}
        <div className="flex items-center gap-2 px-2.5 py-2 bg-navy-800/60 rounded-xl border border-navy-700/60">
          {isActive && (
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
            />
          )}
          <span className="text-xs font-mono text-gray-300 tabular-nums hidden sm:block">{formatElapsed()}</span>
          <div className="flex items-center gap-0.5">
            {!isActive ? (
              <button onClick={handleStartSession}
                className="p-1 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-all" title="Start">
                <Play size={12} />
              </button>
            ) : (
              <button onClick={pauseSession}
                className="p-1 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-all" title="Pause">
                <Pause size={12} />
              </button>
            )}
            <button onClick={handleEndSession}
              className="p-1 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all" title="End">
              <Square size={12} />
            </button>
          </div>
        </div>

        {/* Level chip */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-navy-800/60 border border-navy-700/60 rounded-xl min-w-[120px]">
          <XPBar levelInfo={levelInfo} xp={xp} compact />
        </div>

        {/* Notifications */}
        <button
          onClick={() => toast.info('Reminder', '📚 Civil Law flashcards are due today!')}
          className="relative p-2 rounded-xl text-gray-500 hover:text-gold-400 hover:bg-navy-800 transition-all duration-200"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gold-500" />
        </button>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-500 to-accent-orange flex items-center justify-center text-navy-950 font-bold text-sm cursor-pointer shadow-glow"
        >
          L
        </motion.div>
      </div>
    </header>
  )
}
