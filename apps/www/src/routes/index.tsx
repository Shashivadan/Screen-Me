import HeroSection from '@/components/hero-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="">
      <HeroSection />
    </div>
  )
}
