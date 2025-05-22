import { Skeleton } from "@/components/ui/skeleton"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"

export default function PaymentLoading() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow container py-6">
        <div className="space-y-2 mb-6 text-center">
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Pricing Tiers Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-10 w-1/2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>

                    <div className="space-y-2">
                      {Array(4)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="flex items-center space-x-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                        ))}
                    </div>

                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              ))}
          </div>

          {/* Payment Processing Skeleton */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
