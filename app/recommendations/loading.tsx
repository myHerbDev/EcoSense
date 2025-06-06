import { Skeleton } from "@/components/ui/skeleton"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"

export default function RecommendationsLoading() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow container py-6">
        <div className="space-y-2 mb-6">
          <Skeleton className="h-10 w-3/4 max-w-md" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="pt-4">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
