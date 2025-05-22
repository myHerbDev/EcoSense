"use client"

type ComparisonChartProps = {
  data: Array<{
    category: string
    you: number
    average: number
    [key: string]: any
  }>
  dataType: "screenTime" | "energy" | "appUsage" | "timeOfDay"
}

export function ComparisonChart({ data, dataType }: ComparisonChartProps) {
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
  const maxValue = Math.max(...data.flatMap((item) => [item.you, item.average]))

  return (
    <div className="h-[350px] w-full p-4">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">
            {dataType} Comparison ({getYAxisLabel()})
          </h3>
          <div className="flex space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
              <span>Your Usage</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
              <span>Average User</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6 mt-4">
          {data.map((item, index) => {
            const yourPercentage = (item.you / maxValue) * 100
            const avgPercentage = (item.average / maxValue) * 100

            return (
              <div key={index} className="flex flex-col">
                <div className="text-sm font-medium mb-2">{item.category}</div>

                <div className="space-y-2">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">You</span>
                      <span className="text-xs font-medium">
                        {item.you} {getYAxisLabel()}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${yourPercentage}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Average</span>
                      <span className="text-xs font-medium">
                        {item.average} {getYAxisLabel()}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="h-2 rounded-full bg-gray-400" style={{ width: `${avgPercentage}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
