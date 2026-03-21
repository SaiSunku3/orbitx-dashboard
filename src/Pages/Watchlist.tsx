import { motion } from 'framer-motion'
import { useStore } from '../stores/useStore'
import { X, Plus } from 'lucide-react'
import { useState } from 'react'

export default function Watchlist() {
  const { watchlists, currentUser, prices, addToWatchlist, removeFromWatchlist, setSelectedStock } = useStore()
  const myList = watchlists[currentUser().id] || []
  const [newSymbol, setNewSymbol] = useState('')

  const handleAdd = () => {
    if (newSymbol.trim()) {
      addToWatchlist(newSymbol.trim().toUpperCase())
      setNewSymbol('')
    }
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">My Watchlist</h1>
        <div className="flex w-full sm:w-auto gap-3">
          <input
            value={newSymbol}
            onChange={e => setNewSymbol(e.target.value.toUpperCase())}
            placeholder="Add symbol e.g. NVDA"
            className="flex-1 bg-white/5 border border-white/20 px-4 py-3 rounded-2xl focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-cyan-600 rounded-2xl flex items-center gap-2 hover:bg-cyan-500 transition whitespace-nowrap"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {myList.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-xl">
          Your watchlist is empty — add symbols above!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myList.map(sym => {
            const p = prices[sym.toUpperCase()]
            const isPositive = p?.change >= 0
            return (
              <motion.div
                key={sym}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => p && setSelectedStock(p)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-2xl font-bold">{sym}</p>
                    {p ? (
                      <p className="text-3xl mt-1 font-semibold">${p.price.toFixed(2)}</p>
                    ) : (
                      <p className="text-xl mt-1 text-gray-500">Loading...</p>
                    )}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); removeFromWatchlist(sym) }}
                    className="text-red-400 opacity-70 hover:opacity-100 transition"
                  >
                    <X size={20} />
                  </button>
                </div>
                {p && (
                  <div className={`flex items-center gap-2 text-lg ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(p.change).toFixed(2)}%
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
