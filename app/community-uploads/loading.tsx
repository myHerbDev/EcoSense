import { Skeleton } from "@/components/ui/skeleton"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"

export default function CommunityUploadsLoading() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow container py-6">
        <div className="space-y-2 mb-6">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Upload Form Skeleton */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
              <Skeleton className="h-12 w-12 rounded-full mb-4" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-1/4" />
          </div>
        </div>

        {/* Community Uploads Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-16" />
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
