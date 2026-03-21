import { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [country, setCountry] = useState<'IN' | 'US'>('IN');

  const indices = country === 'IN' 
    ? [
        { name: 'NIFTY', value: '23456', change: '+26.75', pct: '+0.11%' },
        { name: 'SENSEX', value: '77885', change: '+30.25', pct: '+0.04%' },
      ]
    : [
        { name: 'DOW', value: '42345', change: '+120.50', pct: '+0.29%' },
        { name: 'NASDAQ', value: '17890', change: '-45.20', pct: '-0.25%' },
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white flex">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col gap-8 fixed h-full"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">O</div>
          <h1 className="text-2xl font-bold">OrbitX</h1>
        </div>

        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition">
            Dashboard
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">
            Watchlist
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">
            Alerts
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition">
            Settings
          </button>
        </nav>

        {/* Country Toggle */}
        <div className="mt-auto">
          <div className="flex bg-black/50 rounded-full p-1">
            <button 
              onClick={() => setCountry('IN')}
              className={`flex-1 py-2 rounded-full transition ${country === 'IN' ? 'bg-cyan-500 text-black' : 'text-gray-400'}`}
            >
              🇮🇳 IN
            </button>
            <button 
              onClick={() => setCountry('US')}
              className={`flex-1 py-2 rounded-full transition ${country === 'US' ? 'bg-cyan-500 text-black' : 'text-gray-400'}`}
            >
              🇺🇸 US
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Market Pulse
          </h2>
        </header>

        {/* Major Indices Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indices.map((idx) => (
            <motion.div
              key={idx.name}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">{idx.name}</p>
                  <p className="text-3xl font-bold mt-1">{idx.value}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${idx.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {idx.pct}
                </div>
              </div>
              <p className="text-sm mt-2 text-gray-500">{idx.change}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
