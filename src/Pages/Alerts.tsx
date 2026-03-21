import { useState } from 'react'
import { useStore } from '../stores/useStore'

export default function Alerts() {
  const { sendAlertEmail } = useStore()
  const [symbol, setSymbol] = useState('')
  const [threshold, setThreshold] = useState('')
  const [direction, setDirection] = useState<'above' | 'below'>('above')

  const handleCreate = () => {
    if (!symbol || !threshold) return alert('Fill symbol and threshold')
    alert(`Alert created: ${symbol} ${direction} ${threshold}`)
    // In real version: add to store.alerts array
  }

  return (
    <div className="max-w-xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold text-center">Create Alerts</h1>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
        <input
          placeholder="Symbol (e.g. AAPL)"
          value={symbol}
          onChange={e => setSymbol(e.target.value.toUpperCase())}
          className="w-full bg-transparent border border-white/20 px-5 py-4 rounded-2xl focus:border-cyan-400 outline-none"
        />
        <div className="flex gap-4">
          <select
            value={direction}
            onChange={e => setDirection(e.target.value as 'above' | 'below')}
            className="bg-white/10 border border-white/20 px-5 py-4 rounded-2xl flex-1"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={threshold}
            onChange={e => setThreshold(e.target.value)}
            className="flex-1 bg-transparent border border-white/20 px-5 py-4 rounded-2xl focus:border-cyan-400 outline-none"
          />
        </div>
        <button
          onClick={handleCreate}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-medium hover:opacity-90 transition"
        >
          Set Alert
        </button>
      </div>

      <button
        onClick={() => sendAlertEmail('TEST', 'This is a test alert from OrbitX Dashboard')}
        className="text-cyan-400 hover:text-white transition block mx-auto"
      >
        Send Test Email to Sai
      </button>

      <p className="text-center text-gray-500 text-sm">
        Full alert history & notifications coming soon
      </p>
    </div>
  )
}
