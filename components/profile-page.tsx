"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Settings, Trophy, Award, Download, Share2, CreditCard, TreesIcon as Tree, Leaf } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { PaymentModal } from "@/components/payment-modal"
import { safeLocalStorage } from "@/lib/storage-utils"
import { ImageUpload } from "@/components/image-upload"

export function ProfilePage() {
  const [user, setUser] = useState({
    name: "Alex Green",
    email: "alex.green@example.com",
    avatar: "",
    level: "Sustainability Enthusiast",
    points: 750,
    nextLevel: 1000,
    badges: [
      { name: "Early Adopter", description: "Joined the platform in its early stages" },
      { name: "Energy Saver", description: "Reduced energy consumption by 20%" },
      { name: "Digital Minimalist", description: "Maintained low screen time for 30 days" },
    ],
    achievements: [
      {
        name: "Screen Time Master",
        progress: 70,
        total: 100,
        description: "Maintain healthy screen time for 100 days",
      },
      {
        name: "Energy Efficient",
        progress: 45,
        total: 100,
        description: "Keep energy usage below average for 100 days",
      },
      { name: "Sustainability Advocate", progress: 30, total: 50, description: "Share 50 tips with the community" },
    ],
    preferences: {
      darkMode: true,
      notifications: true,
      weeklyReport: true,
      dataSharing: false,
    },
    devices: [
      { name: "iPhone 13", type: "smartphone", lastActive: "Today" },
      { name: "MacBook Pro", type: "laptop", lastActive: "Yesterday" },
      { name: "iPad Air", type: "tablet", lastActive: "Last week" },
    ],
    contributions: [
      { date: "2023-05-15", amount: 10, trees: 2 },
      { date: "2023-06-20", amount: 25, trees: 5 },
    ],
    treeCount: 7,
  })

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = safeLocalStorage.getItem("userData")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  // Save user data to localStorage when it changes
  useEffect(() => {
    safeLocalStorage.setItem("userData", JSON.stringify(user))
  }, [user])

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const { toast } = useToast()

  const handlePreferenceChange = (key: keyof typeof user.preferences, value: boolean) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        [key]: value,
      },
    })
    toast({
      title: "Preference updated",
      description: `Your ${key} preference has been updated.`,
    })
  }

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleContribution = (amount: number, trees: number) => {
    const newContribution = {
      date: new Date().toISOString().split("T")[0],
      amount,
      trees,
    }

    setUser({
      ...user,
      contributions: [...user.contributions, newContribution],
      treeCount: user.treeCount + trees,
      points: user.points + trees * 50, // Add points for contribution
    })

    toast({
      title: "Thank you for your contribution!",
      description: `You've helped plant ${trees} trees and earned ${trees * 50} sustainability points.`,
    })

    setIsPaymentModalOpen(false)
  }

  const handleImageUploaded = (url: string) => {
    setUser({
      ...user,
      avatar: url,
    })
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and track your sustainability journey.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center space-y-4">
              <ImageUpload currentImageUrl={user.avatar} name={user.name} onImageUploaded={handleImageUploaded} />
              <div className="text-center">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge className="mt-2">{user.level}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sustainability Points</span>
                  <span className="font-medium">
                    {user.points}/{user.nextLevel}
                  </span>
                </div>
                <Progress value={(user.points / user.nextLevel) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {user.nextLevel - user.points} points to next level
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="py-1">
                      <Award className="mr-1 h-3 w-3" />
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Trees Planted</h3>
                <div className="flex items-center justify-center gap-2 p-3 bg-primary/10 rounded-lg">
                  <Tree className="h-8 w-8 text-primary" />
                  <span className="text-3xl font-bold">{user.treeCount}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Your contributions have helped plant {user.treeCount} trees so far!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Trophy className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="contributions">
                <Leaf className="h-4 w-4 mr-2" />
                Contributions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details and personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Sustainability Level</Label>
                    <Select defaultValue={user.level}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sustainability Novice">Sustainability Novice</SelectItem>
                        <SelectItem value="Sustainability Enthusiast">Sustainability Enthusiast</SelectItem>
                        <SelectItem value="Sustainability Expert">Sustainability Expert</SelectItem>
                        <SelectItem value="Sustainability Champion">Sustainability Champion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience and notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode to reduce eye strain and save energy
                      </p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={user.preferences.darkMode}
                      onCheckedChange={(checked) => handlePreferenceChange("darkMode", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your sustainability goals
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={user.preferences.notifications}
                      onCheckedChange={(checked) => handlePreferenceChange("notifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-report">Weekly Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your sustainability metrics
                      </p>
                    </div>
                    <Switch
                      id="weekly-report"
                      checked={user.preferences.weeklyReport}
                      onCheckedChange={(checked) => handlePreferenceChange("weeklyReport", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-sharing">Anonymous Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymous usage data to help improve the platform
                      </p>
                    </div>
                    <Switch
                      id="data-sharing"
                      checked={user.preferences.dataSharing}
                      onCheckedChange={(checked) => handlePreferenceChange("dataSharing", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Track your progress towards sustainability milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {user.achievements.map((achievement, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-medium">{achievement.name}</h3>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        <Badge variant="outline">
                          <Trophy className="mr-1 h-3 w-3 text-yellow-500" />
                          {achievement.progress}/{achievement.total}
                        </Badge>
                      </div>
                      <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Achievements
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="contributions" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reforestation Contributions</CardTitle>
                  <CardDescription>Support environmental sustainability by planting trees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary/10 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Tree className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-medium">Plant Trees, Save the Planet</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your contributions help plant trees around the world, offsetting carbon emissions and supporting
                      biodiversity.
                    </p>
                    <Button onClick={() => setIsPaymentModalOpen(true)} className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Contribute Now
                    </Button>
                  </div>

                  <h3 className="text-md font-medium">Contribution History</h3>
                  {user.contributions.length > 0 ? (
                    <div className="space-y-3">
                      {user.contributions.map((contribution, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">{new Date(contribution.date).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">${contribution.amount} contributed</p>
                          </div>
                          <Badge className="bg-green-600">
                            <Tree className="mr-1 h-3 w-3" />
                            {contribution.trees} trees
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      You haven't made any contributions yet. Start planting trees today!
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    We partner with verified reforestation organizations to ensure your contributions have the maximum
                    impact.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentComplete={handleContribution}
      />
    </div>
  )
}
