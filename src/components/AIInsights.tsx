interface AIInsightsProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIInsights({ isOpen, onClose }: AIInsightsProps) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black/90 p-8 rounded-3xl border border-cyan-500/30 max-w-lg w-full">
        <h2 className="text-3xl mb-4">OrbitX AI Insights</h2>
        <p className="mb-6">Coming soon — ask anything about stocks!</p>
        <button onClick={onClose} className="px-6 py-3 bg-cyan-600 rounded-xl">
          Close
        </button>
      </div>
    </div>
  )
}
