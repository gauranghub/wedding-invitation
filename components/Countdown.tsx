'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const WEDDING_DATE = new Date('2026-04-30T11:00:00')

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now())
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Number cell */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: '68px', height: '76px',
          background: 'linear-gradient(180deg, rgba(26,62,200,0.15) 0%, rgba(14,20,40,0.9) 100%)',
          border: '1px solid rgba(201,162,60,0.25)',
          borderRadius: '3px',
        }}
      >
        {/* Top/bottom fold line */}
        <div className="absolute inset-x-0 top-1/2 h-px"
          style={{ background: 'rgba(201,162,60,0.12)' }}/>

        {/* Inner glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(26,62,200,0.12) 0%, transparent 70%)' }}/>

        <motion.span
          key={display}
          initial={{ opacity: 0, y: -10, rotateX: 50 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="font-display text-4xl font-semibold tabular-nums"
          style={{
            color: 'var(--color-gold-pale)',
            textShadow: '0 0 20px rgba(201,162,60,0.5)',
          }}
        >
          {display}
        </motion.span>

        {/* Corner bolts */}
        {['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'].map(pos => (
          <div key={pos} className={`absolute ${pos} w-1 h-1 rounded-full opacity-50`}
            style={{ background: 'var(--color-gold-dark)' }}/>
        ))}
      </div>

      <p className="font-display text-[8px] tracking-[0.35em] uppercase opacity-50"
        style={{ color: 'var(--color-gold-pale)' }}>
        {label}
      </p>
    </div>
  )
}

const Separator = () => (
  <div className="flex flex-col gap-2 pb-8 self-end">
    <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(201,162,60,0.4)' }}/>
    <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(201,162,60,0.4)' }}/>
  </div>
)

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06])

  useEffect(() => {
    setTime(getTimeLeft())
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-5 py-20 overflow-hidden"
      style={{ background: 'var(--color-midnight)' }}
    >
      {/* Parallax background orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ scale: bgScale }} aria-hidden>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '90vw', height: '90vw', maxWidth: '540px', maxHeight: '540px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,62,200,0.1) 0%, transparent 65%)',
        }}/>
        <div style={{
          position: 'absolute', top: '45%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '50vw', height: '50vw', maxWidth: '300px', maxHeight: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,162,60,0.07) 0%, transparent 65%)',
        }}/>
      </motion.div>

      {/* Distant star specks */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: i % 7 === 0 ? '2px' : '1px',
              height: i % 7 === 0 ? '2px' : '1px',
              background: i % 3 === 0 ? '#E0BE5C' : '#A0B4CA',
              opacity: 0.08 + (i % 5) * 0.038,
              left: `${(i * 37 + 11) % 100}%`,
              top:  `${(i * 53 + 7 ) % 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative z-10 flex flex-col items-center gap-10 w-full"
      >
        {/* Header */}
        <div className="text-center">
          <p className="font-display text-[9px] tracking-[0.5em] uppercase mb-3"
            style={{ color: 'var(--color-gold)' }}>
            The Big Day
          </p>
          <h2 className="font-script script-safe text-5xl"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-pale) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(201,162,60,0.3))',
              padding:'1rem 0'
            }}>
            Counting Down
          </h2>
          <p className="font-serif italic font-light text-sm"
            style={{ color: 'rgba(160,180,202,0.55)' }}>
            30th April, 2026 · 11:00 AM
          </p>
        </div>

        {/* Timer */}
        {time ? (
          <div className="flex items-start gap-2">
            <CountUnit value={time.days}    label="Days"    />
            <Separator />
            <CountUnit value={time.hours}   label="Hours"   />
            <Separator />
            <CountUnit value={time.minutes} label="Minutes" />
            <Separator />
            <CountUnit value={time.seconds} label="Seconds" />
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center">
            <motion.div
              className="w-6 h-6 rounded-full border border-gold opacity-30"
              animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        )}

        {/* Quote */}
        <p className="font-serif italic font-light text-center text-base max-w-xs leading-relaxed"
          style={{ color: 'rgba(160,180,202,0.4)' }}>
          "Every love story is beautiful, but ours is my favourite."
        </p>
      </motion.div>
    </section>
  )
}
