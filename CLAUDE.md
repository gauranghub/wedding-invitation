# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build (also runs TypeScript check)
npm run start   # Serve production build
npm run lint    # ESLint
```

Always use Node v22+ (nvm use 22) — the project was scaffolded with Next.js 16 / Tailwind v4.

## Architecture

Single-page wedding invitation built as a vertical scroll experience. All sections live in `components/` and are composed in `app/page.tsx`.

**Stack**: Next.js 16 App Router · Tailwind CSS v4 · Framer Motion 12 · Google Fonts via `next/font`

**Design tokens** live in `app/globals.css` under `@theme { ... }`. Tailwind v4 CSS-first config — no `tailwind.config.ts`. Colors like `--color-gold` are available as both CSS variables and Tailwind utilities (`text-gold`, `bg-gold`, etc.). Custom utility classes (`gold-shimmer`, `bg-parchment-wash`, `bg-dark-velvet`, `.field`, `.petal`) are defined in the same file.

**Fonts** are loaded in `app/layout.tsx` as CSS variables (`--font-cormorant`, `--font-great-vibes`, `--font-raleway`) and mapped to `font-serif`, `font-script`, `font-sans` Tailwind utilities via `@theme`.

**Components** — each section is a separate `'use client'` component:
- `Hero` — full-screen opener with staggered Framer Motion variants
- `InvitationMessage` — romantic message with scroll-reveal
- `EventDetails` — three staggered cards (ceremony, reception, venue)
- `PhotoGallery` — parallax photo frames using `useScroll` + `useTransform`
- `Countdown` — live countdown timer; targets `const WEDDING_DATE` at top of file
- `RSVP` — controlled form with success state; wire up the submit handler to a real endpoint
- `Closing` — dark velvet section with monogram SVG
- `FloatingPetals` — CSS-animated SVG petals (fixed-position overlay)
- `MusicToggle` — floating music button; reads `/public/music/wedding.mp3`

**Framer Motion easing**: Bezier arrays must be typed as `[number, number, number, number]` (not inferred `number[]`) — use `const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]` at the top of each component that needs it. Variant objects must be typed `as Variants`.

## Customisation

| What | Where |
|------|-------|
| Couple names | `Hero.tsx`, `Closing.tsx` |
| Wedding date/time | `Countdown.tsx` `WEDDING_DATE` constant |
| Event details | `EventDetails.tsx` card `lines` arrays |
| Background music | Drop `wedding.mp3` into `public/music/` |
| Real photos | Replace gradient `div`s in `PhotoGallery.tsx` with `<Image>` |
| RSVP backend | Replace `setTimeout` in `RSVP.tsx` `handleSubmit` with a real API call |
