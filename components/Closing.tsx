'use client'

import { useRef } from 'react'
import Image from 'next/image';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import logoImg from '../public/logo3.png';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─── Royal monogram ring ────────────────────────────────────────────── */
const MonogramRing = () => (
  <svg width="130" height="130" viewBox="0 0 130 130" fill="none" className="mx-auto">
    {/* Outer decorative ring */}
    <circle cx="65" cy="65" r="58" stroke="rgba(201,162,60,0.2)" strokeWidth="0.6"/>
    {/* Inner ring */}
    <circle cx="65" cy="65" r="52" stroke="rgba(26,62,200,0.3)"  strokeWidth="0.5"/>

    {/* Tick marks */}
    {Array.from({ length: 36 }).map((_, i) => {
      const a = (i * 10 * Math.PI) / 180
      const r1 = 56, r2 = i % 6 === 0 ? 50 : 53
      return (
        <line key={i}
          x1={65 + r1 * Math.cos(a)} y1={65 + r1 * Math.sin(a)}
          x2={65 + r2 * Math.cos(a)} y2={65 + r2 * Math.sin(a)}
          stroke={i % 6 === 0 ? 'rgba(201,162,60,0.6)' : 'rgba(201,162,60,0.2)'}
          strokeWidth={i % 6 === 0 ? '1' : '0.5'}
        />
      )
    })}

    {/* Diamond markers at cardinal points */}
    {[0, 90, 180, 270].map(deg => {
      const a = (deg * Math.PI) / 180
      const x = 65 + 58 * Math.cos(a)
      const y = 65 + 58 * Math.sin(a)
      return <circle key={deg} cx={x} cy={y} r="2" fill="var(--color-gold)" opacity="0.7"/>
    })}

    {/* K monogram */}
    <text x="28" y="78"
      style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '44px', fill: 'rgba(201,162,60,0.9)' }}>
      K
    </text>
    {/* & */}
    <text x="58" y="66"
      style={{ fontFamily: 'var(--font-cinzel)', fontSize: '13px', fill: 'rgba(224,190,92,0.6)' }}>
      &amp;
    </text>
    {/* U monogram */}
    <text x="68" y="84"
      style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '44px', fill: 'rgba(201,162,60,0.9)' }}>
      U
    </text>
  </svg>
)

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.3, ease: EASE } },
}
const fade: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 1.8, ease: 'easeInOut' } },
}

export default function Closing() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const   ringScale = useTransform(scrollYProgress, [0.3, 0.7], [0.5, 1])
//   const ringScale = useTransform(
//   scrollYProgress,
//   [0, 0.3, 0.6],
//   [0.7, 1, 1]
// )
  const ringOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-midnight) 50%, #030408 100%)',
      }}
    >
      {/* Large ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          style={{
            scale: ringScale, opacity: ringOpacity,
            width: 'min(100vw, 560px)', height: 'min(100vw, 560px)',
            position: 'absolute', top: '50%', left: '50%',
            translateX: '-50%', translateY: '-50%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,62,200,0.09) 0%, transparent 70%)',
          }}
        />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '50vw', height: '50vw', maxWidth: '300px', maxHeight: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,162,60,0.06) 0%, transparent 70%)',
        }}/>
      </div>

      {/* Star specks */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: i % 8 === 0 ? '2px' : '1px', height: i % 8 === 0 ? '2px' : '1px',
              background: i % 3 === 0 ? '#E0BE5C' : '#8AA0C8',
              opacity: 0.06 + (i % 4) * 0.04,
              left: `${(i * 43 + 7) % 100}%`,
              top:  `${(i * 67 + 13) % 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 flex flex-col items-center text-center gap-8 max-w-xs"
      >
        {/* Monogram — scroll-linked scale */}
        <motion.div variants={fade} 
        style={{ scale: ringScale }}
        >
          {/* <MonogramRing /> */}
          <Image src={logoImg} alt="logo" style={{ width: "150px", height: "auto" }} />
        </motion.div>

        {/* Thank you heading */}
        <motion.div variants={rise} className="flex flex-col gap-2">
          <p className="font-display text-[9px] tracking-[0.5em] uppercase"
            style={{ color: 'var(--color-gold)' }}>
            From the Bottom of Our Hearts
          </p>
          <h2
            className="font-script script-safe leading-tight"
            style={{
              fontSize: 'clamp(3.5rem, 16vw, 5rem)',
              background: 'linear-gradient(135deg, var(--color-gold-dark) 0%, var(--color-gold-pale) 50%, var(--color-gold) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 24px rgba(201,162,60,0.3))',
            }}
          >
            Thank You
          </h2>
        </motion.div>

        {/* Message */}
        <motion.p
          variants={rise}
          className="font-serif italic text-base font-light leading-[1.9]"
          style={{ color: 'rgba(160,180,202,0.65)' }}
        >
          Your presence — your laughter, your love, your support — means
          everything to us. We are so grateful to share this journey with you.
        </motion.p>

        {/* Star divider */}
        <motion.div variants={fade} className="flex items-center gap-3">
          <div className="h-px w-14"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,60,0.5))' }}/>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M5 0 L6.4 3.6 L10 5 L6.4 6.4 L5 10 L3.6 6.4 L0 5 L3.6 3.6 Z"
              fill="var(--color-gold)" opacity="0.7"/>
          </svg>
          <div className="h-px w-14"
            style={{ background: 'linear-gradient(90deg, rgba(201,162,60,0.5), transparent)' }}/>
        </motion.div>

        {/* Signature */}
        <motion.div variants={rise} className="flex flex-col items-center gap-1">
          <p className="font-serif text-sm font-light italic"
            style={{ color: 'rgba(160,180,202,0.45)' }}>
            With all our love,
          </p>
          <p
            className="font-script script-safe"
            style={{
              fontSize: 'clamp(2.5rem, 12vw, 3.5rem)',
              wordSpacing: '0.3em',
              background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-pale) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            Kumud &amp; Utsav
          </p>
        </motion.div>

        {/* Roman date */}
        <motion.p
          variants={fade}
          className="font-display text-[9px] tracking-[0.45em] uppercase"
          style={{ color: 'rgba(201,162,60,0.3)' }}
        >
          XXX · IV · MMXXVI
        </motion.p>
      </motion.div>
    </section>
  )
}
