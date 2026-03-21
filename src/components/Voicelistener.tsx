import { useEffect } from 'react'
import { useStore } from '../stores/useStore'

export default function VoiceListener() {
  const { setView, addToWatchlist } = useStore()

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Voice not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
        .toLowerCase()

      console.log('Voice heard:', transcript)

      // Simple command parser (expand later)
      if (transcript.includes('go to dashboard')) setView('dashboard')
      if (transcript.includes('go to watchlist')) setView('watchlist')
      if (transcript.includes('add ') && transcript.includes('to watchlist')) {
        const symbol = transcript.split('add ')[1]?.split(' to')[0]?.trim().toUpperCase()
        if (symbol) addToWatchlist(symbol)
      }
      // Add more commands in future chunks
    }

    recognition.onerror = (event) => {
      console.error('Voice error:', event.error)
    }

    // Start listening (you can toggle this from mic button later)
    recognition.start()

    // Restart on end (for continuous)
    recognition.onend = () => recognition.start()

    return () => {
      recognition.stop()
      recognition.onend = null
    }
  }, [setView, addToWatchlist])

  return null // Invisible component
}
