'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* Constellation dots decoration */
const ConstellationDots = () => (
  <svg width="160" height="40" viewBox="0 0 160 40" fill="none" className="mx-auto opacity-50">
    {/* Connecting lines */}
    <line x1="10" y1="20" x2="40" y2="10" stroke="rgba(201,162,60,0.4)" strokeWidth="0.5"/>
    <line x1="40" y1="10" x2="80" y2="20" stroke="rgba(201,162,60,0.4)" strokeWidth="0.5"/>
    <line x1="80" y1="20" x2="120" y2="10" stroke="rgba(201,162,60,0.4)" strokeWidth="0.5"/>
    <line x1="120" y1="10" x2="150" y2="20" stroke="rgba(201,162,60,0.4)" strokeWidth="0.5"/>
    {/* Dots */}
    <circle cx="10"  cy="20" r="2"   fill="var(--color-gold-light)" opacity="0.8"/>
    <circle cx="40"  cy="10" r="1.5" fill="var(--color-sapphire)"   opacity="0.9"/>
    <circle cx="80"  cy="20" r="3"   fill="var(--color-gold)"       opacity="0.9"/>
    <circle cx="120" cy="10" r="1.5" fill="var(--color-sapphire)"   opacity="0.9"/>
    <circle cx="150" cy="20" r="2"   fill="var(--color-gold-light)" opacity="0.8"/>
    {/* Halos */}
    <circle cx="80" cy="20" r="6" stroke="rgba(201,162,60,0.25)" strokeWidth="0.5" fill="none"/>
  </svg>
)

export default function InvitationMessage() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  /* Scroll-linked: section scales up slightly as it enters */
  const scale   = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.96, 1, 1, 0.96])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-5 py-24 section-dark"
    >
      {/* Ambient sapphire orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div style={{
          position: 'absolute', top: '30%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '80vw', height: '80vw', maxWidth: '500px', maxHeight: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,62,200,0.1) 0%, transparent 70%)',
        }}/>
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Glass card */}
        <div
          className="glass-card rounded-sm px-7 py-10 flex flex-col items-center gap-7 text-center"
          style={{ boxShadow: '0 0 60px rgba(26,62,200,0.15), inset 0 1px 0 rgba(201,162,60,0.1)' }}
        >
          {/* Corner dot ornaments */}
          {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map(pos => (
            <div key={pos} className={`absolute ${pos} w-1.5 h-1.5 rounded-full`}
              style={{ background: 'var(--color-gold)', opacity: 0.5 }}/>
          ))}

          {/* Sapphire top glow stripe */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-sapphire), transparent)' }}/>

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.42em' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display text-[9px] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            An Invitation
          </motion.p>

          <ConstellationDots />

          <motion.blockquote
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            className="font-serif italic text-xl font-light leading-[1.85]"
            style={{ color: 'var(--color-mist)', lineHeight: '1.85' }}
          >
            "Two souls, one star —{' '}
            <span style={{ color: 'var(--color-gold-light)' }}>a love</span>{' '}
            written in the cosmos before either of us arrived."
          </motion.blockquote>

          {/* Thin rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="w-10 h-px"
            style={{ background: 'var(--color-gold)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            className="font-serif text-base font-light leading-relaxed"
            style={{ color: 'var(--color-silver)', lineHeight: '1.95' }}
          >
            With hearts full of joy and wonder, we invite you to witness the
            beginning of our forever — to share in the laughter, the tears,
            and the quiet magic of two lives becoming one.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
            className="font-script script-safe text-4xl"
            style={{
              color: 'transparent',
              background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-pale) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 12px rgba(201,162,60,0.4))',
            }}
          >
            Come celebrate with us
          </motion.p>

          <ConstellationDots />
        </div>
      </motion.div>
    </section>
  )
}
