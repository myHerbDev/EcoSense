import { MobileNav } from "@/components/mobile-nav"
import { Dashboard } from "@/components/dashboard"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow">
        <Dashboard />
      </div>
      <Footer />
    </main>
  )
}
