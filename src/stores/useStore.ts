import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import emailjs from '@emailjs/browser'

type User = { id: string; name: string; email: string; avatar: string; color: string }

const sampleUsers: User[] = [
  { id: 'sai', name: 'Sai', email: 'saiprasadind@gmail.com', avatar: '🧿', color: '#22d3ee' },
  { id: 'raghav', name: 'Raghav', email: '', avatar: '🔥', color: '#f97316' },
  { id: 'priya', name: 'Priya', email: '', avatar: '🌸', color: '#ec4899' },
]

type Stock = {
  symbol: string
  price: number
  change: number
  spark: number[]
}

export const useStore = create(
  persist(
    (set, get) => ({
      users: sampleUsers,
      currentUserId: 'sai',
      watchlists: { sai: ['AAPL', 'TSLA', 'RELIANCE.NS'], raghav: ['NVDA'], priya: ['GOLD'] },
      alerts: [],
      selectedStock: null as Stock | null,
      activeView: 'dashboard' as 'dashboard' | 'watchlist' | 'alerts' | 'settings',
      prices: {} as Record<string, Stock>,
      theme: 'cyan' as 'cyan' | 'violet' | 'muted',

      currentUser: () => get().users.find(u => u.id === get().currentUserId)!,

      switchUser: (id: string) => set({ currentUserId: id, selectedStock: null }),

      setView: (view: string) => set({ activeView: view }),

      addToWatchlist: (symbol: string) => {
        const uid = get().currentUserId
        set(state => ({
          watchlists: { ...state.watchlists, [uid]: [...(state.watchlists[uid] || []), symbol] }
        }))
      },

      refreshPrices: async () => {
        // Finnhub placeholder — replace YOUR_KEY
        const symbols = ['AAPL', 'TSLA', 'RELIANCE.NS', 'NVDA', '^NSEI', '^BSESN', '^DJI', '^IXIC', 'GC=F', 'SI=F', 'BINANCE:BTCUSDT', 'BINANCE:ETHUSDT']
        const newPrices: any = {}

        for (const sym of symbols) {
          try {
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=YOUR_FINNHUB_KEY`)
            const data = await res.json()
            newPrices[sym] = {
              symbol: sym,
              price: data.c || 150,
              change: data.dp || (Math.random() * 4 - 2),
              spark: Array.from({ length: 20 }, () => Math.random() * 200 + 100)
            }
          } catch {
            // fallback mock
            newPrices[sym] = { symbol: sym, price: 150 + Math.random() * 50, change: Math.random() * 6 - 3, spark: [] }
          }
        }
        set({ prices: newPrices })
      },

      sendAlertEmail: async (symbol: string, message: string) => {
        const user = get().currentUser()
        if (!user.email) return

        await emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          { to_email: user.email, symbol, message },
          'YOUR_PUBLIC_KEY'
        )
      }
    }),
    { name: 'orbitx-storage' }
  )
)
