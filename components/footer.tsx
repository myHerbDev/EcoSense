import Link from "next/link"
import { Logo } from "@/components/logo"
import { Leaf, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground">
              Track and improve your digital sustainability footprint with AI-powered insights and recommendations.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link href="/ai-advisor" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Advisor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://myherb.co.il"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  <Heart className="h-3 w-3 mr-1 text-red-500" />
                  myHerb
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} EcoSense. All rights reserved. Developed by{" "}
            <a
              href="https://myherb.co.il"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              myHerb
            </a>
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="/sustainability-commitment"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <Leaf className="h-3 w-3 mr-1 text-primary" />
              Our Sustainability Commitment
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
