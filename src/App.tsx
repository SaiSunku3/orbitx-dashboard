import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from './stores/useStore'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './Pages/Dashboard'
import Watchlist from './Pages/Watchlist'
import Alerts from './Pages/Alerts'
import Settings from './Pages/Settings'
import StockPanel from './components/StockPanel'
import AIInsights from './components/AIInsights'
import VoiceListener from './components/VoiceListener'
import Marquee from './components/Marquee'
import { lazy, Suspense } from 'react'

// ...

const Dashboard = lazy(() => import('./Pages/Dashboard'))
const Watchlist = lazy(() => import('./Pages/Watchlist'))
const Alerts   = lazy(() => import('./Pages/Alerts'))
const Settings = lazy(() => import('./Pages/Settings'))

function App() {
  const { currentUser, activeView, selectedStock } = useStore()
  const [showAI, setShowAI] = useState(false)

  // Simulate live prices
  useEffect(() => {
    const interval = setInterval(() => useStore.getState().refreshPrices(), 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white relative">
      <div id="noise" />
      <Marquee />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar onAskAI={() => setShowAI(true)} />

        <div className="flex-1 overflow-auto p-6 relative">
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' && <Dashboard key="dash" />}
            {activeView === 'watchlist' && <Watchlist key="wl" />}
            {activeView === 'alerts' && <Alerts key="alerts" />}
            {activeView === 'settings' && <Settings key="settings" />}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel */}
<AnimatePresence mode="wait">
  {activeView === 'dashboard' && (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
      <Dashboard key="dash" />
    </Suspense>
  )}
  {/* same for others */}
</AnimatePresence>

      {/* Floating AI Orb */}
      <motion.button
        onClick={() => setShowAI(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition"
        whileHover={{ scale: 1.1, rotate: 12 }}
      >
        <span className="text-3xl">🧠</span>
      </motion.button>

      <AIInsights isOpen={showAI} onClose={() => setShowAI(false)} />
      <VoiceListener />
    </div>
  )
}

export default App
