import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-500 to-accent-orange flex items-center justify-center shadow-glow"
      >
        <Scale size={20} className="text-navy-950" />
      </motion.div>
      <p className="text-sm text-gray-500">Loading your session...</p>
    </div>
  )
}

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, isEnabled } = useAuth()

  // Supabase not configured → allow full local access, no auth required
  if (!isEnabled) return children

  // Checking session
  if (loading) return <LoadingScreen />

  // Not authenticated → go to login
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return children
}
