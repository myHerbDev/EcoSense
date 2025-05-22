import { MobileNav } from "@/components/mobile-nav"
import { ProfilePage } from "@/components/profile-page"
import { Footer } from "@/components/footer"

export default function Profile() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow">
        <ProfilePage />
      </div>
      <Footer />
    </main>
  )
}
