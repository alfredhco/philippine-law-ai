import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Award, CreditCard, Mic,
  Search, FileText, BarChart2, Settings, Scale,
  ChevronLeft, ChevronRight, Flame, Clock, X, Library, Sparkles,
} from 'lucide-react'
import { useStudySession } from '../../hooks/useStudySession'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard',      icon: LayoutDashboard, path: '/' },
  { label: 'Subject Library',icon: Library,         path: '/subjects' },
  { label: 'Codal Study',    icon: BookOpen,        path: '/codal' },
  { label: 'Bar Review',     icon: Award,           path: '/bar-review' },
  { label: 'Flashcards',     icon: CreditCard,      path: '/flashcards' },
  { label: 'Oral Recitation',icon: Mic,             path: '/oral' },
  { label: 'Issue Spotting', icon: Search,          path: '/issue-spotting' },
  { label: 'IRAC Trainer',   icon: FileText,        path: '/irac' },
  { label: 'Analytics',      icon: BarChart2,       path: '/analytics' },
  { label: 'AI Coach',       icon: Sparkles,        path: '/ai-coach' },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { streak, todayMinutes } = useStudySession()
  const location = useLocation()

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-navy-700/80 min-h-[72px]">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500 to-accent-orange shrink-0 shadow-glow">
          <Scale size={17} className="text-navy-950" />
        </div>
        <AnimatePresence>
          {(!collapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <p className="font-serif font-bold text-white text-sm leading-tight tracking-wide">PH Law AI</p>
              <p className="text-[10px] text-gold-500/70 leading-tight tracking-wider uppercase">Companion</p>
            </motion.div>
          )}
        </AnimatePresence>
        {mobile && (
          <button onClick={onMobileClose} className="ml-auto text-gray-500 hover:text-white p-1 rounded-lg hover:bg-navy-700 transition-all">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Streak pill */}
      <AnimatePresence>
        {(!collapsed || mobile) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-3 mt-3 mb-1 overflow-hidden"
          >
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-orange-500/8 border border-orange-500/12">
              <div className="flex items-center gap-1.5">
                <Flame size={13} className="text-orange-400" />
                <span className="text-xs font-semibold text-orange-300">{streak.count} day streak</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock size={10} />
                <span className="text-[10px]">{todayMinutes}m</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        <AnimatePresence>
          {(!collapsed || mobile) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-3 pt-1 pb-2 text-[9px] font-bold text-gray-600 uppercase tracking-[0.15em]"
            >
              Study Modules
            </motion.p>
          )}
        </AnimatePresence>

        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink key={item.path} to={item.path} onClick={mobile ? onMobileClose : undefined}>
              <motion.div
                whileHover={{ x: collapsed && !mobile ? 0 : 2 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                  isActive
                    ? 'bg-gold-500/10 text-gold-400'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-navy-700/60'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-gold-400 to-accent-orange rounded-full"
                  />
                )}
                <item.icon
                  size={18}
                  className={cn(
                    'shrink-0 transition-colors duration-200',
                    isActive ? 'text-gold-400' : 'text-gray-600 group-hover:text-gray-300'
                  )}
                />
                <AnimatePresence>
                  {(!collapsed || mobile) && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tooltip on collapsed */}
                {collapsed && !mobile && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-navy-700 border border-navy-600 rounded-lg text-xs text-gray-200 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-navy z-50">
                    {item.label}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-navy-700 border-l border-t border-navy-600 rotate-[-45deg]" />
                  </div>
                )}
              </motion.div>
            </NavLink>
          )
        })}
      </nav>

      {/* Settings + collapse */}
      <div className="px-2 py-3 border-t border-navy-700/80 space-y-0.5">
        <NavLink to="/settings" onClick={mobile ? onMobileClose : undefined}>
          <div className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-gray-200 hover:bg-navy-700/60 transition-all duration-200',
            location.pathname === '/settings' && 'bg-gold-500/10 text-gold-400'
          )}>
            <Settings size={18} className="shrink-0" />
            <AnimatePresence>
              {(!collapsed || mobile) && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-sm font-medium whitespace-nowrap">
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </NavLink>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 248 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative hidden md:flex flex-col h-screen bg-navy-900 border-r border-navy-700/80 overflow-hidden shrink-0"
      >
        <SidebarContent />

        {/* Collapse toggle */}
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -right-3 top-20 z-10 w-6 h-6 rounded-full bg-navy-700 border border-navy-600 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-200 shadow-navy"
        >
          {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </motion.button>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40 md:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] z-50 md:hidden bg-navy-900 border-r border-navy-700/80 flex flex-col"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
