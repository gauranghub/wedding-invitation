import Hero from '@/components/Hero'
import InvitationMessage from '@/components/InvitationMessage'
import EventDetails from '@/components/EventDetails'
import PhotoGallery from '@/components/PhotoGallery'
import Countdown from '@/components/Countdown'
import Closing from '@/components/Closing'
import FloatingPetals from '@/components/FloatingPetals'
import MusicToggle from '@/components/MusicToggle'
import ScrollProgress from '@/components/ScrollProgress'

export default function WeddingPage() {
  return (
    <main className="relative w-full max-w-lg mx-auto">
      {/* <ScrollProgress /> */}
      <FloatingPetals />
      <MusicToggle />
      <Hero />
      <InvitationMessage />
      <EventDetails />
      <PhotoGallery />
      <Countdown />
      <Closing />
    </main>
  )
}
