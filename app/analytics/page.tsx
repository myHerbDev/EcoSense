import { MobileNav } from "@/components/mobile-nav"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Footer } from "@/components/footer"

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow">
        <AnalyticsDashboard />
      </div>
      <Footer />
    </main>
  )
}
