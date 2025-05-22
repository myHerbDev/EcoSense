"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, BarChart2, Lightbulb, User, Cpu, FileText, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [isPaid, setIsPaid] = useState(false)

  // Check if user has paid
  useEffect(() => {
    const checkPaymentStatus = () => {
      const paymentStatus = document.cookie
        .split("; ")
        .find((row) => row.startsWith("paymentStatus="))
        ?.split("=")[1]

      setIsPaid(paymentStatus === "paid")
    }

    checkPaymentStatus()

    // Check when the component mounts and when the route changes
    window.addEventListener("focus", checkPaymentStatus)

    return () => {
      window.removeEventListener("focus", checkPaymentStatus)
    }
  }, [pathname])

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close the mobile menu when the escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  // Prevent scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-2 flex items-center space-x-2">
            <Logo size="md" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/analytics"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/analytics" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Analytics
            </Link>
            <Link
              href="/recommendations"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/recommendations" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Recommendations
            </Link>
            <Link
              href="/ai-advisor"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/ai-advisor" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              AI Advisor
            </Link>
            <Link
              href="/community-uploads"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/community-uploads" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Community
            </Link>
            {!isPaid && (
              <Link
                href="/payment"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/payment" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Upgrade
              </Link>
            )}
            <Link
              href="/profile"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/profile" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Profile
            </Link>
          </nav>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative z-20 grid gap-6 rounded-md bg-background p-4 shadow-md">
            <Link
              href="/"
              className={`flex items-center space-x-2 text-sm font-medium ${pathname === "/" ? "text-primary" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/analytics"
              className={`flex items-center space-x-2 text-sm font-medium ${
                pathname === "/analytics" ? "text-primary" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <BarChart2 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/recommendations"
              className={`flex items-center space-x-2 text-sm font-medium ${
                pathname === "/recommendations" ? "text-primary" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Lightbulb className="h-5 w-5" />
              <span>Recommendations</span>
            </Link>
            <Link
              href="/ai-advisor"
              className={`flex items-center space-x-2 text-sm font-medium ${
                pathname === "/ai-advisor" ? "text-primary" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Cpu className="h-5 w-5" />
              <span>AI Advisor</span>
            </Link>
            <Link
              href="/community-uploads"
              className={`flex items-center space-x-2 text-sm font-medium ${
                pathname === "/community-uploads" ? "text-primary" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-5 w-5" />
              <span>Community</span>
            </Link>
            {!isPaid && (
              <Link
                href="/payment"
                className={`flex items-center space-x-2 text-sm font-medium ${
                  pathname === "/payment" ? "text-primary" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <CreditCard className="h-5 w-5" />
                <span>Upgrade</span>
              </Link>
            )}
            <Link
              href="/profile"
              className={`flex items-center space-x-2 text-sm font-medium ${
                pathname === "/profile" ? "text-primary" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
