"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormData = {
  dailyScreenTime: number
  weeklyScreenTime: number
  dailyEnergyConsumption: number
  socialMediaTime: number
  productivityTime: number
  entertainmentTime: number
  otherTime: number
  morningUsage: number
  afternoonUsage: number
  eveningUsage: number
  nightUsage: number
}

type DataInputFormProps = {
  onSubmit: (data: FormData) => void
}

export function DataInputForm({ onSubmit }: DataInputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    dailyScreenTime: 5.2,
    weeklyScreenTime: 36.4,
    dailyEnergyConsumption: 0.8,
    socialMediaTime: 2.5,
    productivityTime: 1.2,
    entertainmentTime: 1.0,
    otherTime: 0.5,
    morningUsage: 15,
    afternoonUsage: 30,
    eveningUsage: 40,
    nightUsage: 15,
  })

  const handleChange = (field: keyof FormData, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  // Calculate total app usage time
  const totalAppTime =
    formData.socialMediaTime + formData.productivityTime + formData.entertainmentTime + formData.otherTime

  // Calculate total time of day percentages
  const totalTimeOfDay = formData.morningUsage + formData.afternoonUsage + formData.eveningUsage + formData.nightUsage

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Enter Your Device Usage Data</CardTitle>
          <CardDescription>
            Provide information about your device usage to get personalized sustainability insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Screen Time</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dailyScreenTime">Daily Screen Time (hours)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="dailyScreenTime"
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={formData.dailyScreenTime}
                    onChange={(e) => handleChange("dailyScreenTime", Number.parseFloat(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weeklyScreenTime">Weekly Screen Time (hours)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="weeklyScreenTime"
                    type="number"
                    step="0.1"
                    min="0"
                    max="168"
                    value={formData.weeklyScreenTime}
                    onChange={(e) => handleChange("weeklyScreenTime", Number.parseFloat(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Energy Consumption</h3>
            <div className="space-y-2">
              <Label htmlFor="dailyEnergyConsumption">Daily Energy Consumption (kWh)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="dailyEnergyConsumption"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.dailyEnergyConsumption}
                  onChange={(e) => handleChange("dailyEnergyConsumption", Number.parseFloat(e.target.value) || 0)}
                />
                <span className="text-sm text-muted-foreground">kWh</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">App Usage Breakdown (hours)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="socialMediaTime">Social Media</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="socialMediaTime"
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={formData.socialMediaTime}
                    onChange={(e) => handleChange("socialMediaTime", Number.parseFloat(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="productivityTime">Productivity</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="productivityTime"
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={formData.productivityTime}
                    onChange={(e) => handleChange("productivityTime", Number.parseFloat(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="entertainmentTime">Entertainment</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="entertainmentTime"
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={formData.entertainmentTime}
                    onChange={(e) => handleChange("entertainmentTime", Number.parseFloat(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherTime">Other</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="otherTime"
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    value={formData.otherTime}
                    onChange={(e) => handleChange("otherTime", Number.parseFloat(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>
            </div>
            {totalAppTime !== formData.dailyScreenTime && (
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Note: Your app usage total ({totalAppTime.toFixed(1)} hours) doesn't match your daily screen time (
                {formData.dailyScreenTime.toFixed(1)} hours).
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Usage by Time of Day (%)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="morningUsage">Morning (6am-12pm)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="morningUsage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.morningUsage}
                    onChange={(e) => handleChange("morningUsage", Number.parseInt(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="afternoonUsage">Afternoon (12pm-6pm)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="afternoonUsage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.afternoonUsage}
                    onChange={(e) => handleChange("afternoonUsage", Number.parseInt(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eveningUsage">Evening (6pm-12am)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="eveningUsage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.eveningUsage}
                    onChange={(e) => handleChange("eveningUsage", Number.parseInt(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nightUsage">Night (12am-6am)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="nightUsage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.nightUsage}
                    onChange={(e) => handleChange("nightUsage", Number.parseInt(e.target.value) || 0)}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
            </div>
            {totalTimeOfDay !== 100 && (
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Note: Your time of day percentages should add up to 100% (currently {totalTimeOfDay}%).
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Generate Dashboard
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
