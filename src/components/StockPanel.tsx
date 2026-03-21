import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, TrendingDown } from 'lucide-react'
import { useStore } from '../stores/useStore'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

export default function StockPanel() {
  const { selectedStock, setSelectedStock } = useStore()
  if (!selectedStock) return null

  const isPositive = selectedStock.change >= 0
  const data = selectedStock.spark.map((val, i) => ({ time: i, value: val }))

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-96 bg-black/60 backdrop-blur-2xl border-l border-white/10 flex flex-col h-screen overflow-auto"
    >
      <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-black/60 backdrop-blur-2xl z-10">
        <div>
          <h2 className="text-3xl font-bold">{selectedStock.symbol}</h2>
          <p className="text-4xl mt-2">
            ${selectedStock.price.toFixed(2)}
            <span className={`ml-4 text-xl ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="inline mr-1" size={20} /> : <TrendingDown className="inline mr-1" size={20} />}
              {selectedStock.change.toFixed(2)}%
            </span>
          </p>
        </div>
        <button onClick={() => setSelectedStock(null)} className="p-2 hover:bg-white/10 rounded-full">
          <X size={24} />
        </button>
      </div>

      {/* Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex gap-2 mt-4">
          {['1D', '1W', '1M', '3M', '1Y'].map(tf => (
            <button key={tf} className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition text-sm">
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Placeholder for more metrics, notes, position */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">Open</p>
            <p className="text-xl">${(selectedStock.price * 0.98).toFixed(2)}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">High</p>
            <p className="text-xl">${(selectedStock.price * 1.03).toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl">
          <h3 className="font-semibold mb-3">My Notes</h3>
          <textarea
            className="w-full h-32 bg-transparent border border-white/20 rounded-xl p-3 focus:outline-none focus:border-cyan-400 resize-none"
            placeholder="Add personal notes here..."
          />
        </div>
      </div>
    </motion.div>
  )
}
