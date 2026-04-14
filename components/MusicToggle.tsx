'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/wedding.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE }}
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
          className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(14, 20, 40, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(201, 162, 60, 0.35)',
            color: 'var(--color-gold-light)',
          }}
        >
          {playing ? (
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="2" width="3.5" height="10" rx="1"/>
              <rect x="8.5" y="2" width="3.5" height="10" rx="1"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 2.5v9l9-4.5L3 2.5z"/>
            </svg>
          )}
          {playing && (
            <>
              {[1.4, 2].map((scale, i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(201,162,60,0.4)' }}
                  animate={{ scale: [1, scale], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
