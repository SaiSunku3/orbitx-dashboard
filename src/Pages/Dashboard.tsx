
import { motion } from 'framer-motion'
import { useStore } from '../stores/useStore'
import { TrendingUp, TrendingDown } from 'lucide-react'

const tabItems = [
  'Top 10 Revenue',
  'Top 11-20 Revenue',
  'Top 21-30 Revenue',
  'Attractive Buys Now',
]

export default function Dashboard() {
  const { prices, currentUser, addToWatchlist } = useStore()

  const majorIndices = [
    { name: 'NIFTY 50', key: '^NSEI' },
    { name: 'SENSEX', key: '^BSESN' },
    { name: 'DOW', key: '^DJI' },
    { name: 'NASDAQ', key: '^IXIC' },
    { name: 'GOLD', key: 'GC=F' },
    { name: 'SILVER', key: 'SI=F' },
    { name: 'BTC', key: 'BINANCE:BTCUSDT' },
    { name: 'ETH', key: 'BINANCE:ETHUSDT' },
  ]
onClick={() => useStore.getState().setSelectedStock(prices[idx.key])}
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10 pt-16" // pt-16 to clear fixed marquee + topbar
    >
      {/* Hero Indices Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {majorIndices.map(idx => {
          const data = prices[idx.key]
          if (!data) return null
          const isPos = data.change >= 0

          return (
            <motion.div
              key={idx.key}
              whileHover={{ scale: 1.04, y: -4 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 cursor-pointer"
              onClick={() => {/* Later: open StockPanel with this symbol */}}
            >
              <p className="text-sm text-gray-400">{idx.name}</p>
              <p className="text-2xl font-bold mt-1">
                {data.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <div className={`flex items-center gap-1 mt-1 text-sm ${isPos ? 'text-green-400' : 'text-red-400'}`}>
                {isPos ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isPos ? '+' : ''}{data.change.toFixed(2)}%
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Tabs placeholder */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {tabItems.map(tab => (
          <button
            key={tab}
            className="px-6 py-3 bg-white/5 rounded-2xl hover:bg-white/10 transition whitespace-nowrap text-sm font-medium"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* User's Watchlist Card (simple for now) */}
      <div className="bg-gradient-to-br from-cyan-950/30 to-purple-950/30 border border-cyan-500/20 rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">{currentUser().name}'s Watchlist Pulse</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(useStore.getState().watchlists[currentUser().id] || []).map(sym => (
            <motion.div
              key={sym}
              whileHover={{ scale: 1.02 }}
              className="bg-black/40 p-4 rounded-2xl border border-white/10"
            >
              <p className="font-medium">{sym}</p>
              <p className="text-2xl mt-2">
                ${prices[sym]?.price?.toFixed(2) || '—'}
                <span className="text-sm ml-2 text-gray-400">({prices[sym]?.change?.toFixed(2) || '—'}%)</span>
              </p>
              <button
                onClick={() => addToWatchlist(sym)} // dummy, already in list
                className="mt-3 text-xs text-cyan-400 hover:underline"
              >
                Quick View
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Placeholder for activity feed */}
      {/* Placeholder for activity feed */}
<div className="bg-white/5 rounded-3xl p-6">
  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
  <ul className="space-y-3 text-sm text-gray-300">
    <li>• TSLA dipped 3.2% — added note: "Waiting for earnings"</li>
    <li>• AAPL +1.8% — alert triggered for {' > '} $220</li>
    <li>• Priya added NVDA to watchlist</li>
  </ul>
</div>
     
    </motion.div>
  )
}
