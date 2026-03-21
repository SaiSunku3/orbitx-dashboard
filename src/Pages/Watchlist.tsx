import { useStore } from '../stores/useStore'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function Watchlist() {
  const { watchlists, currentUser, prices, removeFromWatchlist, setSelectedStock } = useStore()
  const myList = watchlists[currentUser().id] || []

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">My Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myList.map(sym => {
          const p = prices[sym]
          return (
            <motion.div
              key={sym}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer"
              onClick={() => p && setSelectedStock(p)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{sym}</p>
                  <p className="text-4xl mt-2">${p?.price?.toFixed(2) || '—'}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeFromWatchlist(sym) }} className="text-red-400">
                  <X size={20} />
                </button>
              </div>
              {p && <p className={`text-xl ${p.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{p.change.toFixed(2)}%</p>}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
