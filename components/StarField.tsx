'use client'

import { useEffect, useRef } from 'react'

type Star = {
  x: number; y: number; r: number
  phase: number; speed: number
  gold: boolean
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      initStars()
    }
    window.addEventListener('resize', onResize)

    let stars: Star[] = []
    const initStars = () => {
      const count = Math.min(180, Math.floor((W * H) / 5000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
        gold: Math.random() > 0.82,
      }))
    }
    initStars()

    let raf: number
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.016

      for (const s of stars) {
        const brightness = 0.35 + Math.sin(t * s.speed + s.phase) * 0.32
        const r = s.r * (0.8 + Math.sin(t * s.speed * 0.6 + s.phase) * 0.22)

        const [cr, cg, cb] = s.gold
          ? [220, 178, 90]   // warm gold star
          : [188, 212, 240]  // cool blue-white star

        // Soft glow halo
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 5)
        glow.addColorStop(0, `rgba(${cr},${cg},${cb},${brightness * 0.35})`)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(s.x, s.y, r * 5, 0, Math.PI * 2)
        ctx.fill()

        // Star core
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${brightness})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
        ctx.fill()

        // Cross sparkle on bright stars
        if (s.r > 1.1 && brightness > 0.55) {
          const len = r * 5 * brightness
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${brightness * 0.4})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(s.x - len, s.y)
          ctx.lineTo(s.x + len, s.y)
          ctx.moveTo(s.x, s.y - len)
          ctx.lineTo(s.x, s.y + len)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}
    />
  )
}
