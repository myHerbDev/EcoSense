"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { recommendations } from "@/lib/utils"
import { CommunityTips } from "@/components/community-tips"
import { Leaf, Zap, Clock, Battery, CheckCircle2, Circle, ThumbsUp, Trophy, Lightbulb } from "lucide-react"

type Recommendation = {
  title: string
  description: string
  impact: "low" | "medium" | "high"
  category?: string
  implemented?: boolean
  progress?: number
}

export function RecommendationsHub() {
  const [userRecommendations, setUserRecommendations] = useState<Recommendation[]>(
    recommendations.map((rec) => ({
      ...rec,
      implemented: false,
      progress: 0,
      category: getRandomCategory(),
    })),
  )

  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [implementedOnly, setImplementedOnly] = useState<boolean>(false)

  function getRandomCategory() {
    const categories = ["screen-time", "energy", "habits", "hardware"]
    return categories[Math.floor(Math.random() * categories.length)]
  }

  const filteredRecommendations = userRecommendations.filter((rec) => {
    if (implementedOnly && !rec.implemented) return false
    if (activeFilter === "all") return true
    return rec.category === activeFilter
  })

  const toggleImplemented = (index: number) => {
    const newRecommendations = [...userRecommendations]
    newRecommendations[index].implemented = !newRecommendations[index].implemented
    newRecommendations[index].progress = newRecommendations[index].implemented ? 100 : 0
    setUserRecommendations(newRecommendations)
  }

  const updateProgress = (index: number, progress: number) => {
    const newRecommendations = [...userRecommendations]
    newRecommendations[index].progress = progress
    newRecommendations[index].implemented = progress === 100
    setUserRecommendations(newRecommendations)
  }

  const implementedCount = userRecommendations.filter((rec) => rec.implemented).length
  const totalCount = userRecommendations.length
  const implementationRate = Math.round((implementedCount / totalCount) * 100)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "screen-time":
        return <Clock className="h-4 w-4" />
      case "energy":
        return <Zap className="h-4 w-4" />
      case "habits":
        return <Leaf className="h-4 w-4" />
      case "hardware":
        return <Battery className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Sustainability Recommendations</h1>
          <Badge variant="outline" className="px-3 py-1">
            <Trophy className="mr-1 h-4 w-4 text-yellow-500" />
            <span>
              {implementedCount}/{totalCount} Implemented
            </span>
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Personalized recommendations to reduce your digital carbon footprint and improve sustainability.
        </p>
        <p className="text-xs text-muted-foreground italic">
          by myHerb (DevSphere project for open source sustainability development hub)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="col-span-4 md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setActiveFilter("all")}
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  All Recommendations
                </Button>
                <Button
                  variant={activeFilter === "screen-time" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setActiveFilter("screen-time")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Screen Time
                </Button>
                <Button
                  variant={activeFilter === "energy" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setActiveFilter("energy")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Energy Usage
                </Button>
                <Button
                  variant={activeFilter === "habits" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setActiveFilter("habits")}
                >
                  <Leaf className="mr-2 h-4 w-4" />
                  Digital Habits
                </Button>
                <Button
                  variant={activeFilter === "hardware" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setActiveFilter("hardware")}
                >
                  <Battery className="mr-2 h-4 w-4" />
                  Hardware Settings
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Status</h3>
              <div className="flex items-center space-x-2">
                <Switch id="implemented-only" checked={implementedOnly} onCheckedChange={setImplementedOnly} />
                <Label htmlFor="implemented-only">Show implemented only</Label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Your Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Implementation Rate</span>
                  <span className="font-medium">{implementationRate}%</span>
                </div>
                <Progress value={implementationRate} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  You've implemented {implementedCount} out of {totalCount} recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-4 md:col-span-3 space-y-4">
          <Tabs defaultValue="personalized">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personalized">Personalized</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="personalized" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredRecommendations.map((recommendation, index) => (
                  <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(recommendation.category || "")}
                          <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                        </div>
                        <Badge
                          className={
                            recommendation.impact === "high"
                              ? "bg-green-500"
                              : recommendation.impact === "medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }
                        >
                          {recommendation.impact} impact
                        </Badge>
                      </div>
                      <CardDescription>{recommendation.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Implementation Progress</span>
                          <span className="text-sm font-medium">{recommendation.progress}%</span>
                        </div>
                        <Slider
                          value={[recommendation.progress || 0]}
                          min={0}
                          max={100}
                          step={25}
                          onValueChange={(value) => updateProgress(index, value[0])}
                          className="py-2"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status</span>
                          <div className="flex items-center">
                            {recommendation.implemented ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-300 mr-1" />
                            )}
                            <span className="text-sm">
                              {recommendation.implemented ? "Implemented" : "Not Implemented"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={recommendation.implemented ? "outline" : "default"}
                        size="sm"
                        className="w-full"
                        onClick={() => toggleImplemented(index)}
                      >
                        {recommendation.implemented ? "Mark as Not Implemented" : "Mark as Implemented"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Recommendations</CardTitle>
                  <CardDescription>Popular recommendations among users like you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Use Battery Saver Mode",
                      description: "Enable battery saver mode when your battery is below 50% to extend usage time.",
                      popularity: 92,
                      impact: "medium",
                    },
                    {
                      title: "Schedule Digital Detox",
                      description: "Set aside 2 hours each day as a 'no-screen' period to reduce overall usage.",
                      popularity: 87,
                      impact: "high",
                    },
                    {
                      title: "Enable Dark Mode",
                      description: "Using dark mode can reduce power consumption on OLED screens by up to 30%.",
                      popularity: 85,
                      impact: "medium",
                    },
                    {
                      title: "Optimize Video Streaming Quality",
                      description: "Lower video streaming quality when on mobile data to reduce energy consumption.",
                      popularity: 78,
                      impact: "medium",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          {item.popularity}%
                        </Badge>
                        <Badge
                          className={
                            item.impact === "high"
                              ? "bg-green-500"
                              : item.impact === "medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }
                        >
                          {item.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Trending Tips
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-4 mt-4">
              <CommunityTips />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
