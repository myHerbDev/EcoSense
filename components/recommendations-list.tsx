import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Recommendation = {
  title: string
  description: string
  impact: "low" | "medium" | "high"
}

type RecommendationsListProps = {
  recommendations: Recommendation[]
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {recommendations.map((recommendation, index) => (
        <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{recommendation.title}</CardTitle>
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
            <div className="text-sm text-muted-foreground">
              Implementing this recommendation could help reduce your energy consumption and improve your sustainability
              score.
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
