import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { Leaf, Zap, Recycle, Globe, TreesIcon as Tree } from "lucide-react"

export default function SustainabilityCommitmentPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="container py-8 flex-grow">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Our Sustainability Commitment</h1>

        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="bg-primary/10 p-6 rounded-lg mb-8">
            <h2 className="flex items-center text-primary mt-0">
              <Leaf className="h-5 w-5 mr-2" />
              Our Mission
            </h2>
            <p className="mb-0">
              At EcoSense, we're committed to helping individuals and organizations reduce their digital carbon
              footprint and promote sustainable technology practices. We believe that small changes in how we use
              technology can collectively make a significant positive impact on our planet.
            </p>
          </div>

          <h2 className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Our Approach to Digital Sustainability
          </h2>
          <p>
            Digital sustainability focuses on reducing the environmental impact of our digital activities. This
            includes:
          </p>
          <ul>
            <li>Minimizing energy consumption from device usage</li>
            <li>Optimizing digital workflows to reduce resource usage</li>
            <li>Extending the lifecycle of digital devices</li>
            <li>Promoting sustainable digital habits</li>
          </ul>

          <h2 className="flex items-center">
            <Recycle className="h-5 w-5 mr-2 text-primary" />
            Our Platform's Environmental Impact
          </h2>
          <p>We practice what we preach. Our platform is designed with sustainability in mind:</p>
          <ul>
            <li>
              <strong>Energy-efficient code:</strong> Our application is optimized to minimize CPU usage and battery
              drain
            </li>
            <li>
              <strong>Green hosting:</strong> We use hosting providers powered by renewable energy
            </li>
            <li>
              <strong>Dark mode by default:</strong> Reducing screen brightness and energy consumption on OLED devices
            </li>
            <li>
              <strong>Minimal data transfer:</strong> Optimized assets and caching to reduce network usage
            </li>
          </ul>

          <h2 className="flex items-center">
            <Tree className="h-5 w-5 mr-2 text-primary" />
            Reforestation Initiatives
          </h2>
          <p>We're proud to partner with leading reforestation organizations to plant trees around the world:</p>
          <ul>
            <li>For every new user who registers, we plant one tree</li>
            <li>Our user contributions have helped plant over 10,000 trees to date</li>
            <li>
              We carefully select partners who follow sustainable planting practices and support local communities
            </li>
          </ul>

          <h2 className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-primary" />
            Our Ongoing Commitments
          </h2>
          <p>We're continuously working to improve our sustainability efforts:</p>
          <ul>
            <li>
              <strong>Carbon-neutral operations:</strong> We offset all carbon emissions from our operations
            </li>
            <li>
              <strong>Regular sustainability audits:</strong> We conduct quarterly reviews of our environmental impact
            </li>
            <li>
              <strong>Transparent reporting:</strong> We publish annual sustainability reports
            </li>
            <li>
              <strong>Community engagement:</strong> We actively participate in digital sustainability initiatives
            </li>
          </ul>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="mt-0">Join Us in Making a Difference</h3>
            <p className="mb-0">
              By using EcoSense, you're not just reducing your own digital carbon footprint—you're part of a growing
              community committed to sustainable technology practices. Together, we can make a significant positive
              impact on our planet.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
