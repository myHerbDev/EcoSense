import { Leaf, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "full" | "icon"
}

export function Logo({ className, size = "md", variant = "full" }: LogoProps) {
  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="relative">
        <Leaf className={cn("text-primary", iconSizes[size])} />
        <Zap
          className={cn(
            "absolute -bottom-0.5 -right-0.5 text-primary/80",
            size === "sm" ? "h-2.5 w-2.5" : size === "md" ? "h-3 w-3" : "h-3.5 w-3.5",
          )}
        />
      </div>
      {variant === "full" && (
        <span className={cn("font-bold tracking-tight", textSizes[size])}>
          <span className="text-primary">Eco</span>
          <span>Sense</span>
        </span>
      )}
    </div>
  )
}
