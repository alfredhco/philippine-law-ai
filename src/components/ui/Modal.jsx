import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, size = 'md', footer }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-6xl' }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={    { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`relative w-full ${sizes[size]} bg-navy-800 border border-navy-600 rounded-2xl shadow-navy-lg overflow-hidden`}
          >
            {/* Gold top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-navy-700">
                <h3 className="font-serif text-lg font-bold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-navy-700 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="px-6 pb-5 pt-3 border-t border-navy-700 flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
