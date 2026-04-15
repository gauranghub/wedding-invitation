import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Great_Vibes, Josefin_Sans } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400'],
  variable: '--font-josefin',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kumud & Utsav — Wedding Invitation',
  description: 'Join us to celebrate the marriage of Kumud & Utsav on 30th April, 2026.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060911',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} ${josefin.variable}`}
    >
      <body style={{display:'flex', justifyContent:'center'}}>{children}</body>
    </html>
  )
}
