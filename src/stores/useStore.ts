import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import emailjs from '@emailjs/browser'

type User = {
  id: string
  name: string
  email: string
  avatar: string
  color: string
}

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
      alerts: [] as { symbol: string; threshold: number; direction: 'above' | 'below' }[],
      selectedStock: null as Stock | null,
      activeView: 'dashboard' as 'dashboard' | 'watchlist' | 'alerts' | 'settings',
      prices: {} as Record<string, Stock>,

      currentUser: () => get().users.find(u => u.id === get().currentUserId)!,

      switchUser: (id: string) => set({ currentUserId: id, selectedStock: null }),

      setView: (view: string) => set({ activeView: view }),

      setSelectedStock: (stock: Stock | null) => set({ selectedStock: stock }),

      addToWatchlist: (symbol: string) => {
        const uid = get().currentUserId
        const upper = symbol.toUpperCase()
        if (!get().watchlists[uid]?.includes(upper)) {
          set(state => ({
            watchlists: {
              ...state.watchlists,
              [uid]: [...(state.watchlists[uid] || []), upper]
            }
          }))
        }
      },

      removeFromWatchlist: (symbol: string) => {
        const uid = get().currentUserId
        set(state => ({
          watchlists: {
            ...state.watchlists,
            [uid]: (state.watchlists[uid] || []).filter(s => s !== symbol.toUpperCase())
          }
        }))
      },

      refreshPrices: async () => {
        const symbols = ['AAPL', 'TSLA', 'RELIANCE.NS', '^NSEI', '^DJI', 'GC=F', 'BINANCE:BTCUSDT']
        const newPrices: Record<string, Stock> = { ...get().prices }

        for (const sym of symbols) {
          try {
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=d6qcnm1r01qhcrmjn9igd6qcnm1r01qhcrmjn9j0`)
            const data = await res.json()
            if (data.c) {
              newPrices[sym] = {
                symbol: sym,
                price: data.c,
                change: data.dp || 0,
                spark: Array.from({ length: 20 }, () => Math.random() * 200 + data.c * 0.9)
              }
            }
          } catch (err) {
            console.warn(`Finnhub fetch failed for ${sym}:`, err)
          }
        }

        set({ prices: newPrices })
      },

      sendAlertEmail: async (symbol: string, message: string) => {
        const user = get().currentUser()
        if (!user.email) {
          console.warn('No email set for user')
          return
        }

        try {
          await emailjs.send(
            'YOUR_EMAILJS_SERVICE_ID',
            'YOUR_EMAILJS_TEMPLATE_ID',
            {
              to_email: user.email,
              symbol,
              message
            },
            'YOUR_EMAILJS_PUBLIC_KEY'
          )
          console.log('Email sent successfully')
        } catch (err) {
          console.error('EmailJS send failed:', err)
        }
      }
    }),
    {
      name: 'orbitx-storage-v1'
    }
  )
)
