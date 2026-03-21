import { motion } from 'framer-motion'
import { Mic, RefreshCw, Globe } from 'lucide-react/icons' // or your working import style
import { useStore } from '../stores/useStore'
import { useState } from 'react'

interface TopbarProps {
  onAskAI: () => void
}

export default function Topbar({ onAskAI }: TopbarProps) {
  const { currentUser, refreshPrices } = useStore()
  const [listening, setListening] = useState(false)

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-40"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🛰️</div>
          <span className="text-xl font-semibold tracking-tight">OrbitX • Live Pulse</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-full transition ${
            listening ? 'bg-red-500/30' : 'bg-white/5 hover:bg-white/10'
          }`}
          onClick={() => setListening(!listening)}
        >
          <Mic size={20} className={listening ? 'text-red-400' : 'text-cyan-400'} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition"
          onClick={refreshPrices}
        >
          <RefreshCw size={16} />
          <span className="text-sm">Refresh All</span>
        </motion.button>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={onAskAI}
          className="text-sm text-gray-400 hover:text-cyan-300 transition flex items-center gap-2"
        >
          Ask OrbitX anything...
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
            {currentUser().avatar}
          </div>
          <div>
            <p className="font-medium">{currentUser().name}</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>

        <Globe size={20} className="text-gray-400" />
      </div>

      {/* Pass listening state to VoiceListener */}
      <VoiceListener listening={listening} />
    </motion.header>
  )
}
