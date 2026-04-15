'use client'

import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const DAY_ONE = {
  date: '29 April 2026',
  label: 'Day 1 · Tuesday',
  events: [
    { time: '11:00 AM', name: 'Haldi Carnival',  sub: 'Colors & celebration' },
    { time: '02:00 PM', name: 'Mayra',          sub: 'Family blessings & rituals' },
    { time: '06:00 PM', name: 'Sagai',           sub: 'Ring ceremony' },
    { time: '08:00 PM', name: 'Sangeet',         sub: 'Music & dance evening' },
  ],
}

const DAY_TWO = {
  date: '30 April 2026',
  label: 'Day 2 · Wednesday',
  events: [
    { time: '11:00 AM', name: 'Barat Swaagat',  sub: 'Welcome of the groom\'s procession' },
    { time: '12:30 PM', name: 'Phere',          sub: 'Sacred wedding ceremony' },
    { time: '08:00 PM', name: 'Reception',       sub: 'Dinner & celebration' },
  ],
}

interface EventItemProps {
  time: string
  name: string
  sub: string
  index: number
  isLast: boolean
}

function EventItem({ time, name, sub, index, isLast }: EventItemProps) {
  return (
    <div className="flex gap-4 relative">
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '20px' }}>
        {/* Gold dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: EASE, delay: index * 0.1 }}
          className="relative flex-shrink-0 rounded-full"
          style={{
            width: '10px', height: '10px', marginTop: '6px',
            background: 'var(--color-gold)',
            boxShadow: '0 0 10px rgba(201,162,60,0.6)',
          }}
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(201,162,60,0.5)' }}
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.3, ease: 'easeOut' }}
          />
        </motion.div>
        {/* Vertical line connecting to next */}
        {!isLast && (
          <div className="flex-1 w-px mt-2" style={{ background: 'rgba(201,162,60,0.2)', minHeight: '32px' }} />
        )}
      </div>

      {/* Content — sweeps in from left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 + 0.05 }}
        className="pb-7"
      >
        <p className="font-display text-[10px] tracking-[0.3em] uppercase mb-0.5"
          style={{ color: 'var(--color-gold)' }}>
          {time}
        </p>
        <p className="font-serif text-lg font-medium"
          style={{ color: 'var(--color-ice)', lineHeight: 1.2 }}>
          {name}
        </p>
        {/* <p className="font-serif italic text-sm font-light mt-0.5"
          style={{ color: 'var(--color-silver)' }}>
          {sub}
        </p> */}
      </motion.div>
    </div>
  )
}

interface DayBlockProps {
  day: typeof DAY_ONE
  indexOffset: number
}

function DayBlock({ day, indexOffset }: DayBlockProps) {
  return (
    <div className="w-full">
      {/* Day header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-center gap-4 mb-7"
      >
        <div>
          <p className="font-display text-[9px] tracking-[0.4em] uppercase"
            style={{ color: 'var(--color-gold)' }}>
            {day.label}
          </p>
          <p className="font-display text-base font-semibold"
            style={{ color: 'var(--color-ice)' }}>
            {day.date}
          </p>
        </div>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,162,60,0.4), transparent)' }} />
      </motion.div>

      {/* Events */}
      {day.events.map((event, i) => (
        <EventItem
          key={event.name}
          time={event.time}
          name={event.name}
          sub={event.sub}
          index={indexOffset + i}
          isLast={i === day.events.length - 1}
        />
      ))}
    </div>
  )
}

export default function EventDetails() {
  return (
    <section
      className="relative px-6 py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-space) 0%, var(--color-surface) 50%, var(--color-space) 100%)',
        paddingBottom: '2rem'
      }}
    >
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,162,60,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="flex flex-col items-center gap-3 mb-14 relative z-10"
      >
        {/* Clock icon */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ opacity: 0.7 }}>
          <circle cx="14" cy="14" r="12" stroke="var(--color-gold)" strokeWidth="1"/>
          <line x1="14" y1="7" x2="14" y2="14" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="14" y1="14" x2="19" y2="17" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>

        <h2 className="font-script script-safe text-5xl"
          style={{
            background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-pale) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            padding: '1rem 1rem',
          }}>
          Program Timeline
        </h2>

        <div className="flex items-center gap-2">
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,60,0.5))' }}/>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-gold)', opacity: 0.7 }}/>
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(201,162,60,0.5), transparent)' }}/>
        </div>

        {/* Venue */}
        <p className="font-serif italic text-sm text-center"
          style={{ color: 'var(--color-silver)' }}>
          Vrinda Anandam Resort, Vrindavan
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative z-10 max-w-xs mx-auto flex flex-col gap-10" style={{marginTop:'1rem', marginLeft:'2rem'}}>
        <DayBlock day={DAY_ONE} indexOffset={0} />
        <DayBlock day={DAY_TWO} indexOffset={DAY_ONE.events.length} />
      </div>
    </section>
  )
}
