import { motion } from 'framer-motion'
import { useStore } from '../stores/useStore'

const marqueeItems = [
  { symbol: 'NIFTY 50', key: '^NSEI' },
  { symbol: 'SENSEX', key: '^BSESN' },
  { symbol: 'DOW', key: '^DJI' },
  { symbol: 'NASDAQ', key: '^IXIC' },
  { symbol: 'GOLD', key: 'GC=F' },
  { symbol: 'SILVER', key: 'SI=F' },
  { symbol: 'BTC', key: 'BINANCE:BTCUSDT' }, // Finnhub supports crypto like this
  { symbol: 'ETH', key: 'BINANCE:ETHUSDT' },
]

export default function Marquee() {
  const { prices } = useStore()

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-r from-black via-purple-950/30 to-black border-b border-white/5 overflow-hidden z-50">
      <motion.div
        className="flex items-center h-full whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {/* Duplicate for seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((item, i) => {
          const data = prices[item.key]
          const change = data?.change ?? (Math.random() * 4 - 2).toFixed(2)
          const isPositive = Number(change) >= 0

          return (
            <div key={i} className="flex items-center gap-6 mx-8 text-sm">
              <span className="font-medium">{item.symbol}</span>
              <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
                {isPositive ? '+' : ''}{change}%
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
