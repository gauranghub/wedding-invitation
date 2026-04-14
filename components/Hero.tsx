'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import StarField from './StarField'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─── Gold diamond ornament ──────────────────────────────────────────── */
const Diamond = ({ size = 8 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 10 10">
    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--color-gold)" opacity="0.7"/>
  </svg>
)

/* ─── Thin constellation line ────────────────────────────────────────── */
const ConstellationBar = () => (
  <div className="flex items-center gap-3 w-full max-w-[260px]">
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,60,0.6))' }}/>
    <Diamond size={7}/>
    <div className="h-px w-4" style={{ background: 'rgba(201,162,60,0.6)' }}/>
    <Diamond size={10}/>
    <div className="h-px w-4" style={{ background: 'rgba(201,162,60,0.6)' }}/>
    <Diamond size={7}/>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,162,60,0.6), transparent)' }}/>
  </div>
)

/* ─── Stagger animation for entrance ────────────────────────────────── */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.3 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
}

const fade: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 1.8, ease: 'easeInOut' } },
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  /* Scroll-linked parallax: content rises and fades as you scroll out */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY      = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const starsY        = useTransform(scrollYProgress, [0, 1], [0, 60])   // stars drift down slower

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden aurora-bg"
    >
      {/* Starfield — parallax layer */}
      <motion.div className="absolute inset-0" style={{ y: starsY }} aria-hidden>
        <StarField />
      </motion.div>

      {/* Radial spotlight from centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(26,62,200,0.12) 0%, transparent 70%)',
        }}
      />
      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-space), transparent)' }}
      />

      {/* Content — scroll-parallax */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 py-20"
      >
        {/* Pre-heading */}
        <motion.p
          variants={rise}
          className="font-display text-[9px] tracking-[0.5em] uppercase mb-4"
          style={{ color: 'var(--color-gold)', letterSpacing: '0.5em' }}
        >
          The Wedding of
        </motion.p>

        {/* Name: Sophia — paddingTop pushes the tall script ascender down inside the element,
            guaranteeing no overlap with the heading above regardless of font render */}
        <motion.h1
          variants={rise}
          className="font-script script-safe select-none"
          style={{
            fontSize: 'clamp(5rem, 22vw, 7rem)',
            lineHeight: 1.25,
            background: 'linear-gradient(135deg, var(--color-gold-dark) 0%, var(--color-gold-pale) 50%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(201,162,60,0.35))',
            padding: '1rem 1rem 0 0',
            overflow: 'visible'
          }}
        >
          Kumud
        </motion.h1>

        {/* Ampersand row */}
        <motion.div variants={rise} className="flex items-center gap-4 my-2">
          <div className="h-px w-12 opacity-40" style={{ background: 'var(--color-gold)' }}/>
          <span className="font-display text-xl" style={{ color: 'rgba(201,162,60,0.7)' }}>&amp;</span>
          <div className="h-px w-12 opacity-40" style={{ background: 'var(--color-gold)' }}/>
        </motion.div>

        {/* Name: Groom */}
        <motion.h1
          variants={rise}
          className="font-script script-safe select-none"
          style={{
            fontSize: 'clamp(5rem, 22vw, 7rem)',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, var(--color-gold-dark) 0%, var(--color-gold-pale) 50%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(201,162,60,0.35))',
            padding: '1rem 1rem 0 0',
          }}
        >
          Utsav
        </motion.h1>

        {/* Constellation bar */}
        <motion.div variants={fade} className="mt-8 mb-7 flex flex-col items-center gap-2" style={{marginTop: '2rem'}}>
          <ConstellationBar />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={rise}
          className="font-display text-xs tracking-[0.45em] uppercase mb-2"
          style={{ color: 'var(--color-mist)', letterSpacing: '0.45em', marginTop: '2rem' }}
        >
          Request the Honour of Your Presence
        </motion.p>
        <motion.p
          variants={rise}
          className="font-serif italic text-base font-light"
          style={{ color: 'rgba(160,180,202,0.7)' }}
        >
          at Their Wedding
        </motion.p>

        {/* Date */}
        <motion.div variants={rise} className="mt-8 flex flex-col items-center gap-1">
          <p className="font-display text-[10px] tracking-[0.4em] uppercase"
            style={{ color: 'var(--color-gold)', marginTop: '1rem' }}>Thursday</p>
          <p className="font-display text-5xl font-light"
            style={{ color: 'var(--color-ice)', textShadow: '0 0 30px rgba(201,162,60,0.3)' }}>
            30
          </p>
          <p className="font-display text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'var(--color-gold)' }}>April · 2026</p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={fade}
          className="mt-14 flex flex-col items-center gap-2"
          style={{ color: 'var(--color-silver)', marginTop: '4.5rem' }}
        >
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase opacity-60">Scroll</span>
          <div className="scroll-bob opacity-50">
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
              <rect x="6" y="1" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="8" cy="4" r="1.2" fill="currentColor" opacity="0.6"/>
              <path d="M3 14l5 6 5-6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
