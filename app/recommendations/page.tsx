import { MobileNav } from "@/components/mobile-nav"
import { RecommendationsHub } from "@/components/recommendations-hub"
import { Footer } from "@/components/footer"

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow">
        <RecommendationsHub />
      </div>
      <Footer />
    </main>
  )
}
