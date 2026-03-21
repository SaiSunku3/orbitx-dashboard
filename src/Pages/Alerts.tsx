import { useStore } from '../stores/useStore'
import { useState } from 'react'

export default function Alerts() {
  const { alerts, sendAlertEmail } = useStore()
  const [symbol, setSymbol] = useState('')
  const [threshold, setThreshold] = useState(0)

  const addAlert = () => {
    // Simple add logic (expand later)
    alert(`Alert set for ${symbol} > ${threshold}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Alerts</h1>
      <div className="bg-white/5 p-8 rounded-3xl">
        <input placeholder="Symbol" value={symbol} onChange={e => setSymbol(e.target.value)} className="bg-transparent border border-white/20 p-4 rounded-2xl w-full mb-4" />
        <input type="number" placeholder="Price threshold" value={threshold} onChange={e => setThreshold(Number(e.target.value))} className="bg-transparent border border-white/20 p-4 rounded-2xl w-full mb-6" />
        <button onClick={addAlert} className="w-full py-4 bg-cyan-500 rounded-2xl">Create Alert</button>
      </div>

      <button onClick={() => sendAlertEmail('AAPL', 'Test alert from OrbitX')} className="mt-8 text-sm text-cyan-400 hover:text-white">
        Send Test Email to Sai
      </button>
    </div>
  )
}
