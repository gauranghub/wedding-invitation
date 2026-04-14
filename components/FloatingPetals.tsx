'use client'

import { useEffect, useState } from 'react'

type Particle = {
  id: number
  left: string
  top: string
  size: number
  dur: string
  delay: string
  drift: string
  spin: string
  maxOpacity: number
  isGold: boolean
}

export default function FloatingPetals() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const gen: Particle[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${80 + Math.random() * 20}%`,  // start from bottom area
      size: 2 + Math.random() * 3,
      dur: `${10 + Math.random() * 14}s`,
      delay: `${Math.random() * 18}s`,
      drift: `${(Math.random() - 0.5) * 80}px`,
      spin: `${Math.random() > 0.5 ? '' : '-'}${60 + Math.random() * 120}deg`,
      maxOpacity: 0.4 + Math.random() * 0.4,
      isGold: Math.random() > 0.4,
    }))
    setParticles(gen)
  }, [])

  return (
    <div aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: p.left,
            bottom: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.isGold
              ? 'radial-gradient(circle, #E0BE5C, #C9A23C)'
              : 'radial-gradient(circle, #A0B4CA, #6A88A8)',
            boxShadow: p.isGold
              ? `0 0 ${p.size * 2}px ${p.size}px rgba(201,162,60,0.5)`
              : `0 0 ${p.size * 2}px ${p.size}px rgba(100,140,180,0.3)`,
            '--dur': p.dur,
            '--delay': p.delay,
            '--drift': p.drift,
            '--spin': p.spin,
            '--max-opacity': p.maxOpacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
