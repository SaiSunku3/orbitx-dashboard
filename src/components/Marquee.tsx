import { useStore } from '../stores/useStore'
import { useEffect, useState } from 'react'

export default function Marquee() {
  const { prices } = useStore()
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    const live = Object.entries(prices).map(([sym, p]) => 
      `${sym} ${p.price.toFixed(2)} ${p.change >= 0 ? '▲' : '▼'} ${p.change.toFixed(2)}%`
    )
    setItems(live.length ? live : ['AAPL 227.85 ▲ 1.2%', 'TSLA 248.12 ▼ 0.8%', 'RELIANCE.NS 2984.50 ▲ 0.4%'])
  }, [prices])

  return (
    <div className="bg-black/70 text-xs py-1 overflow-hidden border-b border-white/10">
      <div className="flex animate-marquee whitespace-nowrap gap-8">
        {[...items, ...items].map((t, i) => <span key={i} className="inline-block">{t}</span>)}
      </div>
    </div>
  )
}
