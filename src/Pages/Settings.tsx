export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
      <h1 className="text-5xl font-bold">Settings</h1>
      <p className="text-xl text-gray-400">
        Theme toggle, animation speed, currency preferences, EmailJS config test — coming in next update.
      </p>
      <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
        <p className="text-lg mb-4">Current user: Sai (Admin)</p>
        <button className="px-8 py-4 bg-white/10 rounded-2xl hover:bg-white/20 transition">
          Log Out
        </button>
      </div>
    </div>
  )
}
