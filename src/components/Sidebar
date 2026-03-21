import { motion } from 'framer-motion'
import { useStore } from '../stores/useStore'
import { Home, List, Bell, Settings as SettingsIcon, Globe } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'watchlist', label: 'Watchlist', icon: List },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

export default function Sidebar() {
  const { setView, activeView, currentUser, switchUser, users } = useStore()
  const isAdmin = currentUser().id === 'sai'

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-72 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen p-6"
    >
      <div className="flex items-center gap-3 mb-12">
        <div className="text-4xl">🛰️</div>
        <h1 className="text-2xl font-bold tracking-tight">OrbitX</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map(item => {
          const Icon = item.icon
          const active = activeView === item.id
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                active
                  ? 'bg-white/10 text-cyan-400'
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Country toggle + User switch (admin only) */}
      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-2xl">
          <span className="text-sm text-gray-400">Market</span>
          <div className="flex gap-3">
            <button className="text-xl hover:scale-110 transition">🇮🇳</button>
            <button className="text-xl hover:scale-110 transition opacity-50">🇺🇸</button>
          </div>
        </div>

        {isAdmin && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 px-4">Switch User</p>
            <div className="flex flex-wrap gap-2">
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => switchUser(user.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 transition-all ${
                    currentUser().id === user.id
                      ? 'border-cyan-400 scale-110'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: user.color + '33' }}
                >
                  {user.avatar}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
