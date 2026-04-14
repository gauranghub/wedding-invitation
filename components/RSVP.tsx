'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Status = 'idle' | 'submitting' | 'success'

const StarBurst = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mx-auto">
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
      const r = i % 3 === 0 ? 28 : 22
      const x2 = 36 + r * Math.cos((deg * Math.PI) / 180)
      const y2 = 36 + r * Math.sin((deg * Math.PI) / 180)
      return (
        <line key={i}
          x1="36" y1="36" x2={x2} y2={y2}
          stroke={i % 3 === 0 ? 'var(--color-gold-light)' : 'rgba(201,162,60,0.35)'}
          strokeWidth={i % 3 === 0 ? '0.8' : '0.5'}
        />
      )
    })}
    <circle cx="36" cy="36" r="6"  fill="none" stroke="var(--color-gold)" strokeWidth="0.8"/>
    <circle cx="36" cy="36" r="2.5" fill="var(--color-gold-pale)"/>
  </svg>
)

export default function RSVP() {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null)
  const [note, setNote]           = useState('')
  const [status, setStatus]       = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !attending) return
    setStatus('submitting')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
  }

  return (
    <section
      className="relative px-5 py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-midnight) 0%, var(--color-surface) 50%, var(--color-midnight) 100%)',
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,162,60,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,162,60,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Fade grid at edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, var(--color-midnight) 100%)
          `,
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: EASE }}
        className="text-center mb-12 relative z-10"
      >
        <p className="font-display text-[9px] tracking-[0.5em] uppercase mb-3"
          style={{ color: 'var(--color-gold)' }}>
          Kindly Reply By May 30th
        </p>
        <h2 className="font-script text-5xl mb-2"
          style={{
            background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-pale) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
          Will You Join Us?
        </h2>
        <p className="font-serif italic text-sm font-light"
          style={{ color: 'var(--color-silver)' }}>
          We can't wait to celebrate with you
        </p>
      </motion.div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex flex-col items-center gap-6 text-center max-w-xs mx-auto py-8"
            >
              <StarBurst />
              <h3 className="font-script text-4xl"
                style={{
                  background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-pale) 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                {attending === 'yes' ? 'See You There!' : "We'll Miss You"}
              </h3>
              <p className="font-serif italic text-base font-light leading-relaxed"
                style={{ color: 'var(--color-mist)' }}>
                {attending === 'yes'
                  ? 'Thank you for accepting. We are so excited to celebrate this special day with you!'
                  : 'Thank you for letting us know. You will be in our thoughts on our special day.'}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="flex flex-col gap-8 max-w-xs mx-auto"
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="font-display text-[8px] tracking-[0.4em] uppercase"
                  style={{ color: 'var(--color-gold)' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  className="field"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-display text-[8px] tracking-[0.4em] uppercase"
                  style={{ color: 'var(--color-gold)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="field"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              {/* Attendance */}
              <div className="flex flex-col gap-3">
                <label className="font-display text-[8px] tracking-[0.4em] uppercase"
                  style={{ color: 'var(--color-gold)' }}>
                  Attendance *
                </label>
                <div className="flex gap-3">
                  {(['yes', 'no'] as const).map(opt => (
                    <motion.button
                      key={opt}
                      type="button"
                      onClick={() => setAttending(opt)}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-3 font-display text-[9px] tracking-[0.25em] uppercase transition-all duration-300 relative overflow-hidden"
                      style={{
                        border: `1px solid ${attending === opt ? 'var(--color-gold)' : 'rgba(201,162,60,0.2)'}`,
                        background: attending === opt
                          ? 'linear-gradient(135deg, rgba(26,62,200,0.25), rgba(201,162,60,0.1))'
                          : 'transparent',
                        color: attending === opt ? 'var(--color-gold-pale)' : 'var(--color-silver)',
                        boxShadow: attending === opt ? '0 0 20px rgba(201,162,60,0.15)' : 'none',
                      }}
                    >
                      {opt === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines'}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="flex flex-col gap-2">
                <label className="font-display text-[8px] tracking-[0.4em] uppercase"
                  style={{ color: 'var(--color-gold)' }}>
                  A Note (Optional)
                </label>
                <textarea
                  className="field resize-none"
                  placeholder="Message or dietary requirements..."
                  rows={3}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  style={{ paddingTop: '0.5rem' }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!name || !attending || status === 'submitting'}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="relative py-4 font-display text-[10px] tracking-[0.4em] uppercase overflow-hidden btn-ripple disabled:opacity-40 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-sapphire) 100%)',
                  color: 'var(--color-gold-pale)',
                  border: '1px solid rgba(201,162,60,0.3)',
                  boxShadow: '0 0 30px rgba(26,62,200,0.3)',
                }}
              >
                {status === 'submitting' ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-3 h-3 border border-gold-pale/60 border-t-transparent rounded-full"
                    />
                    Sending…
                  </span>
                ) : 'Send My RSVP'}
                {/* Shimmer sweep */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(201,162,60,0.12) 50%, transparent 100%)',
                  }}
                />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
