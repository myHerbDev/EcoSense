"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Droplet, Wind, Zap } from "lucide-react"

type ImpactMetricsProps = {
  data: {
    carbon: {
      value: number
      equivalent: string
      reduction: number
    }
    water: {
      value: number
      equivalent: string
      reduction: number
    }
    energy: {
      value: number
      equivalent: string
      reduction: number
    }
    trees: {
      value: number
      equivalent: string
      reduction: number
    }
  }
}

export function ImpactMetrics({ data }: ImpactMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Carbon Footprint</CardTitle>
          <Leaf className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-2xl font-bold">{data.carbon.value} kg CO₂e</div>
            <p className="text-sm text-muted-foreground">Equivalent to {data.carbon.equivalent}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Potential Reduction</span>
              <span className="font-medium">{data.carbon.reduction}%</span>
            </div>
            <Progress value={data.carbon.reduction} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Water Usage</CardTitle>
          <Droplet className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-2xl font-bold">{data.water.value} liters</div>
            <p className="text-sm text-muted-foreground">Equivalent to {data.water.equivalent}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Potential Reduction</span>
              <span className="font-medium">{data.water.reduction}%</span>
            </div>
            <Progress value={data.water.reduction} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Energy Consumption</CardTitle>
          <Zap className="h-5 w-5 text-yellow-500" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-2xl font-bold">{data.energy.value} kWh</div>
            <p className="text-sm text-muted-foreground">Equivalent to {data.energy.equivalent}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Potential Reduction</span>
              <span className="font-medium">{data.energy.reduction}%</span>
            </div>
            <Progress value={data.energy.reduction} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Trees Required</CardTitle>
          <Wind className="h-5 w-5 text-green-700" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-2xl font-bold">{data.trees.value} trees</div>
            <p className="text-sm text-muted-foreground">{data.trees.equivalent}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Potential Reduction</span>
              <span className="font-medium">{data.trees.reduction}%</span>
            </div>
            <Progress value={data.trees.reduction} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
