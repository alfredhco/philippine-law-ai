import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: { Icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  error:   { Icon: XCircle,     color: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20' },
  warning: { Icon: AlertTriangle,color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/20' },
  info:    { Icon: Info,         color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, type, title, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = {
    success: (title, message) => addToast({ type: 'success', title, message }),
    error:   (title, message) => addToast({ type: 'error',   title, message }),
    warning: (title, message) => addToast({ type: 'warning', title, message }),
    info:    (title, message) => addToast({ type: 'info',    title, message }),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map(t => {
            const { Icon, color, bg } = ICONS[t.type]
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0,  scale: 1    }}
                exit={    { opacity: 0, x: 60, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border backdrop-blur-xl shadow-navy-lg ${bg}`}
              >
                <Icon size={16} className={`${color} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  {t.title && <p className="text-sm font-semibold text-white leading-tight">{t.title}</p>}
                  {t.message && <p className="text-xs text-gray-400 mt-0.5 leading-snug">{t.message}</p>}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-gray-500 hover:text-gray-300 transition-colors shrink-0 mt-0.5"
                >
                  <X size={13} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
