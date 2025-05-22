"use client"

type TrendChartProps = {
  data: Array<{
    date: string
    value: number
    [key: string]: any
  }>
  dataType: "screenTime" | "energy" | "appUsage" | "timeOfDay"
  timeRange: "week" | "month" | "year"
}

export function TrendChart({ data, dataType, timeRange }: TrendChartProps) {
  const getYAxisLabel = () => {
    switch (dataType) {
      case "screenTime":
        return "Hours"
      case "energy":
        return "kWh"
      case "appUsage":
        return "Hours"
      case "timeOfDay":
        return "% of Usage"
      default:
        return ""
    }
  }

  // Find max value for scaling
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="h-[350px] w-full p-4">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">
            {dataType} Trends ({getYAxisLabel()})
          </h3>
          <p className="text-xs text-muted-foreground">Time Range: {timeRange}</p>
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          {data.map((item, index) => {
            const percentage = (item.value / maxValue) * 100

            return (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{item.date}</span>
                  <span className="text-sm font-medium">
                    {item.value} {getYAxisLabel()}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5 mb-1">
                  <div className="h-2.5 rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
