import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { CommunityUploads } from "@/components/community-uploads"

export default function CommunityUploadsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow">
        <CommunityUploads />
      </div>
      <Footer />
    </main>
  )
}
