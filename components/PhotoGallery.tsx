'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PHOTOS = [
  {
    src: '/gallery/img6.jpeg',
    overlay:  'linear-gradient(135deg, rgba(26,62,200,0.12) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
    caption: 'Written in the Stars',
    accent: 'rgba(26,62,200,0.8)',
  },
  {
    src: '/gallery/img3.jpeg',
    overlay:  'linear-gradient(125deg, rgba(201,162,60,0.15) 0%, transparent 55%, rgba(0,0,0,0.35) 100%)',
    caption: 'Two Souls, One Journey',
    accent: 'rgba(201,162,60,0.8)',
  },
  {
    src: '/gallery/img7.jpeg',
    overlay:  'linear-gradient(145deg, rgba(201,162,60,0.1) 0%, transparent 50%, rgba(0,0,0,0.28) 100%)',
    caption: 'Home is Wherever You Are',
    accent: 'rgba(26,62,200,0.7)',
  },
]

/* Mouse-tilt for individual photo */
function PhotoCard({ photo, index }: { photo: typeof PHOTOS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, glow: false })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -6
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  6
    setTilt({ x: rx, y: ry, glow: true })
  }

  return (
    <div
      ref={ref}
      className="flex-shrink-0 w-full h-full px-4"
      style={{ perspective: '700px' }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0, glow: false })}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="relative w-full h-full rounded-sm overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: tilt.glow
            ? `0 24px 80px rgba(6,9,17,0.7), 0 0 40px ${photo.accent.replace('0.8', '0.3')}`
            : '0 12px 50px rgba(6,9,17,0.6)',
        }}
      >
        {/* Photo */}
        <Image
          src={photo.src}
          alt={photo.caption}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 380px"
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0" style={{ background: photo.overlay }}/>

        {/* Film grain */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
        />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-16"
          style={{ background: 'linear-gradient(to top, rgba(4,6,12,0.85), transparent)' }}>
          <p className="font-script text-2xl" style={{ color: '#F0D898', marginLeft: '1rem' }}>
            {photo.caption}
          </p>
        </div>

        {/* Frame corner accents — 3D lift */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-sm"
          style={{
            border: '1px solid rgba(201,162,60,0.18)',
            translateZ: tilt.glow ? 4 : 0,
          }}
        />

        {/* Index badge */}
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(14,20,40,0.7)',
            border: '1px solid rgba(201,162,60,0.35)',
            color: 'var(--color-gold-light)',
            fontSize: '10px',
            fontFamily: 'var(--font-cinzel)',
          }}>
          {index + 1}
        </div>
      </motion.div>
    </div>
  )
}

export default function PhotoGallery() {
  /* The outer wrapper is tall (300vh) so the inner sticky section
     gets 3 "pages" of vertical scroll to drive horizontal movement */
  const outerRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const [slideW, setSlideW] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (slideRef.current) setSlideW(slideRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: outerRef })
  const x = useTransform(scrollYProgress, [0, 1], [0, -(slideW * (PHOTOS.length - 1))])

  /* Subtle vertical parallax on background text */
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div ref={outerRef} style={{ height: '320vh', position: 'relative' }}>
      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
        className="section-void flex flex-col">

        {/* Ambient watermark */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ y: bgY }}
          aria-hidden
        >
          <p className="font-script opacity-[0.035] text-center"
            style={{ fontSize: 'clamp(8rem, 35vw, 14rem)', color: 'var(--color-gold)', lineHeight: 1 }}>
            Us
          </p>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10 text-center pt-10 pb-4 flex-shrink-0"
          style={{marginTop:'5rem'}}
        >
          <p className="font-display text-[9px] tracking-[0.5em] uppercase"
            style={{ color: 'var(--color-gold)' }}>
            A Love Story in Frames
          </p>
          <h2 className="font-script script-safe text-4xl"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-pale) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              padding:'1rem 0'
            }}>
            Our Moments
          </h2>
        </motion.div>

        {/* Horizontal track */}
        <div ref={slideRef} className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex h-full"
            style={{
              x,
              width: `${PHOTOS.length * 100}%`,
            }}
          >
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center py-6"
                style={{ width: `${100 / PHOTOS.length}%` }}
              >
                <div className="w-full" style={{ maxWidth: '380px', height: 'min(55vh, 420px)' }}>
                  <PhotoCard photo={photo} index={i} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll-progress pills at bottom */}
        <div className="relative z-10 flex justify-center gap-2 pb-8 flex-shrink-0">
          {PHOTOS.map((_, i) => {
            const start = i / PHOTOS.length
            const end = (i + 1) / PHOTOS.length
            return (
              <ScrollPill key={i} scrollYProgress={scrollYProgress} start={start} end={end} />
            )
          })}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p className="font-sans text-[8px] tracking-[0.35em] uppercase opacity-25"
            style={{ color: 'var(--color-silver)' }}>
            Scroll to browse
          </p>
        </div>
      </div>
    </div>
  )
}

function ScrollPill({ scrollYProgress, start, end }: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
}) {
  const opacity = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.3, 1, 0.3])
  const scaleX  = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.6, 1, 0.6])

  return (
    <motion.div
      style={{ opacity, scaleX, background: 'var(--color-gold)' }}
      className="h-0.5 w-8 rounded-full"
    />
  )
}
