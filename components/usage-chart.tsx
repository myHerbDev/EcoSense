"use client"

type UsageChartProps = {
  data: Array<{
    name?: string
    time?: number
    percentage: number
    [key: string]: any
  }>
  type: "app" | "time"
}

const COLORS = ["#4ade80", "#60a5fa", "#f97316", "#a78bfa", "#f43f5e"]

export function UsageChart({ data, type }: UsageChartProps) {
  // Calculate total for percentage calculations
  const total = data.reduce((sum, item) => sum + (type === "app" ? item.time || 0 : item.percentage), 0)

  return (
    <div className="h-[300px] w-full p-4">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">
            {type === "app" ? "App Usage (hours)" : "Usage Distribution (%)"}
          </h3>
        </div>

        <div className="flex flex-col space-y-4 flex-1">
          {data.map((item, index) => {
            const value = type === "app" ? item.time || 0 : item.percentage
            const percentage = (value / total) * 100

            return (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{item.name || item.time}</span>
                  <span className="text-sm font-medium">{type === "app" ? `${value} hours` : `${value}%`}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5 mb-1">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
