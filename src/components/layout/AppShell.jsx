import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const PAGE_TITLES = {
  '/':              'Dashboard',
  '/codal':         'Codal Study',
  '/bar-review':    'Bar Review',
  '/flashcards':    'Flashcards',
  '/oral':          'Oral Recitation',
  '/issue-spotting':'Issue Spotting',
  '/irac':          'IRAC Trainer',
  '/analytics':     'Analytics',
  '/settings':      'Settings',
}

export default function AppShell() {
  const [collapsed, setCollapsed]     = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const location                       = useLocation()
  const pageTitle = PAGE_TITLES[location.pathname] || 'Philippine Law AI'

  return (
    <div className="flex h-screen bg-navy-950 overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-3xl" />
      </div>

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar
          pageTitle={pageTitle}
          onMenuToggle={() => setMobileOpen(o => !o)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
