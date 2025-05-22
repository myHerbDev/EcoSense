"use client"

import * as React from "react"
import type { ChartConfig } from "@/lib/types"

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined)

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider")
  }
  return context
}

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  className?: string
}

function ChartContainer({ config, children, className }: ChartContainerProps) {
  const value = React.useMemo(() => ({ config }), [config])

  return (
    <ChartContext.Provider value={value}>
      <div
        className={className}
        style={
          {
            "--color-primary": "hsl(var(--primary))",
            "--color-secondary": "hsl(var(--secondary))",
            "--color-muted": "hsl(var(--muted))",
            "--color-muted-foreground": "hsl(var(--muted-foreground))",
            "--color-border": "hsl(var(--border))",
            ...Object.entries(config).reduce(
              (vars, [key, value]) => {
                vars[`--color-${key}`] = value.color
                return vars
              },
              {} as Record<string, string>,
            ),
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipProps {
  className?: string
  children?: React.ReactNode
}

function ChartTooltip({ className, children }: ChartTooltipProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "hsl(var(--background))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius)",
        padding: "0.5rem",
        boxShadow: "var(--shadow)",
      }}
    >
      {children}
    </div>
  )
}

interface ChartTooltipContentProps {
  payload?: Array<{
    name: string
    value: number
    dataKey: string
    payload: Record<string, any>
  }>
  label?: string
  active?: boolean
}

function ChartTooltipContent({ payload, label, active }: ChartTooltipContentProps) {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <ChartTooltip>
      <div className="text-xs font-medium">{label}</div>
      <div className="mt-1 space-y-0.5">
        {payload.map(({ dataKey, value, name }) => {
          const { label, color } = config[dataKey] || {
            label: name,
            color: "hsl(var(--primary))",
          }

          return (
            <div key={dataKey} className="flex items-center">
              <div className="mr-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground">{label}:</span>
              <span className="ml-1 text-xs font-medium">{value}</span>
            </div>
          )
        })}
      </div>
    </ChartTooltip>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }
