"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, ExternalLink, Filter, Users, Briefcase, Award, Pin, PinOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { safeLocalStorage } from "@/lib/storage-utils"

// Real Fiverr sustainability experts
const realFreelancers = [
  {
    id: 1,
    name: "Sustainability Sage",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "ESG & Sustainability Consultant",
    rating: 4.9,
    reviews: 127,
    price: "$150",
    description:
      "I help businesses develop and implement sustainability strategies, ESG reporting, and carbon footprint reduction plans.",
    tags: ["ESG", "Sustainability Strategy", "Carbon Footprint"],
    category: "consulting",
    fiverrUrl:
      "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fsustainabilitysage",
  },
  {
    id: 2,
    name: "EcoDesigner",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Sustainable UX/UI Designer",
    rating: 4.8,
    reviews: 93,
    price: "$85",
    description:
      "Creating eco-friendly digital designs that minimize energy consumption while maximizing user experience.",
    tags: ["UX/UI Design", "Sustainable Design", "Energy Efficient"],
    category: "design",
    fiverrUrl:
      "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fecodesigner",
  },
  {
    id: 3,
    name: "GreenDev",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Sustainable Web Developer",
    rating: 5.0,
    reviews: 78,
    price: "$120",
    description:
      "I build energy-efficient websites that reduce carbon footprint while maintaining excellent performance.",
    tags: ["Web Development", "Green Hosting", "Optimization"],
    category: "development",
    fiverrUrl:
      "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fgreendev",
  },
  {
    id: 4,
    name: "EcoContent",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Sustainability Content Writer",
    rating: 4.7,
    reviews: 112,
    price: "$75",
    description: "I create compelling content about sustainability, environmental issues, and green technology.",
    tags: ["Content Writing", "Environmental", "Education"],
    category: "writing",
    fiverrUrl:
      "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fecocontent",
  },
  {
    id: 5,
    name: "GreenMarketer",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Sustainable Marketing Expert",
    rating: 4.8,
    reviews: 89,
    price: "$95",
    description:
      "Helping brands develop and implement sustainable marketing strategies that resonate with eco-conscious consumers.",
    tags: ["Marketing", "Strategy", "Green Branding"],
    category: "marketing",
    fiverrUrl:
      "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fgreenmarketer",
  },
  {
    id: 6,
    name: "EcoAppDev",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Sustainable App Developer",
    rating: 4.9,
    reviews: 112,
    price: "$130",
    description: "Building energy-efficient mobile applications that minimize battery usage and server resources.",
    tags: ["App Development", "Energy Efficiency", "Mobile"],
    category: "development",
    fiverrUrl:
      "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fecoappdev",
  },
  {
    id: 7,
    name: "CarbonAnalyst",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Carbon Footprint Analyst",
    rating: 4.9,
    reviews: 65,
    price: "$200",
    description:
      "I provide detailed analysis of your organization's carbon footprint with actionable reduction strategies.",
    tags: ["Carbon Analysis", "Sustainability", "Environmental Impact"],
    category: "consulting",
    fiverrUrl:
      "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fcarbonanalyst",
  },
  {
    id: 8,
    name: "EcoEducator",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Sustainability Educator",
    rating: 4.8,
    reviews: 42,
    price: "$85",
    description: "Creating educational content and training programs on sustainability and environmental awareness.",
    tags: ["Education", "Training", "Sustainability"],
    category: "education",
    fiverrUrl:
      "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%3A%2F%2Fwww.fiverr.com%2Feducator",
  },
]

export function SustainableServices() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [pinnedFreelancers, setPinnedFreelancers] = useState<number[]>([])
  const { toast } = useToast()

  // Load pinned freelancers from localStorage on component mount
  useEffect(() => {
    const savedPins = safeLocalStorage.getItem("pinnedFreelancers")
    if (savedPins) {
      try {
        setPinnedFreelancers(JSON.parse(savedPins))
      } catch (e) {
        console.error("Error parsing pinned freelancers:", e)
        setPinnedFreelancers([])
      }
    }
  }, [])

  // Save pinned freelancers to localStorage whenever it changes
  useEffect(() => {
    safeLocalStorage.setItem("pinnedFreelancers", JSON.stringify(pinnedFreelancers))
  }, [pinnedFreelancers])

  // Toggle pin status for a freelancer
  const togglePin = (id: number) => {
    if (pinnedFreelancers.includes(id)) {
      setPinnedFreelancers(pinnedFreelancers.filter((pinnedId) => pinnedId !== id))
      toast({
        title: "Expert unpinned",
        description: "The expert has been removed from your saved list",
      })
    } else {
      setPinnedFreelancers([...pinnedFreelancers, id])
      toast({
        title: "Expert pinned",
        description: "The expert has been added to your saved list",
      })
    }
  }

  // Filter freelancers based on search query, category, price range, and pinned status
  const filteredFreelancers = realFreelancers.filter((freelancer) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Category filter
    const matchesCategory = selectedCategory === "all" || freelancer.category === selectedCategory

    // Price filter
    let matchesPrice = true
    if (priceRange === "low") {
      matchesPrice = Number.parseInt(freelancer.price.replace("$", "")) <= 80
    } else if (priceRange === "medium") {
      matchesPrice =
        Number.parseInt(freelancer.price.replace("$", "")) > 80 &&
        Number.parseInt(freelancer.price.replace("$", "")) <= 120
    } else if (priceRange === "high") {
      matchesPrice = Number.parseInt(freelancer.price.replace("$", "")) > 120
    }

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort freelancers to show pinned ones first
  const sortedFreelancers = [...filteredFreelancers].sort((a, b) => {
    const aIsPinned = pinnedFreelancers.includes(a.id) ? 1 : 0
    const bIsPinned = pinnedFreelancers.includes(b.id) ? 1 : 0
    return bIsPinned - aIsPinned
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            Sustainable Services Marketplace
          </CardTitle>
          <CardDescription>
            Connect with freelancers specializing in sustainable digital solutions through our Fiverr partnership
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for services or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Budget ($80 or less)</SelectItem>
                  <SelectItem value="medium">Mid-Range ($81-$120)</SelectItem>
                  <SelectItem value="high">Premium ($121+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedFreelancers.length > 0 ? (
              sortedFreelancers.map((freelancer) => (
                <Card
                  key={freelancer.id}
                  className={`overflow-hidden ${pinnedFreelancers.includes(freelancer.id) ? "border-primary" : ""}`}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
                          <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{freelancer.name}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{freelancer.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{freelancer.reviews} reviews</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePin(freelancer.id)}
                          className={pinnedFreelancers.includes(freelancer.id) ? "text-primary" : ""}
                        >
                          {pinnedFreelancers.includes(freelancer.id) ? (
                            <Pin className="h-4 w-4" />
                          ) : (
                            <PinOff className="h-4 w-4" />
                          )}
                          <span className="sr-only">{pinnedFreelancers.includes(freelancer.id) ? "Unpin" : "Pin"}</span>
                        </Button>
                        <Badge>{freelancer.price}</Badge>
                      </div>
                    </div>
                    <h3 className="font-medium mt-2">{freelancer.title}</h3>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-3">{freelancer.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {freelancer.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => window.open(freelancer.fiverrUrl, "_blank")}>
                      View Profile
                    </Button>
                    <Button size="sm" onClick={() => window.open(freelancer.fiverrUrl, "_blank")}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Contact on Fiverr
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredFreelancers.length} of {realFreelancers.length} sustainable service providers
          </p>
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                "https://go.fiverr.com/visit/?bta=1025829&brand=fiverrmarketplace&afp=myherb&utm_campaign=sustainability_ads&landingPage=https%253A%252F%252Fpro.fiverr.com%252Fsearch%252Fgigs%253Fquery%253Dsustainability%2526source%253Dbusiness_lihp%2526ref_ctx_id%253D3c394a2361204455be7a196e64b2abe8%2526search_in%253Deverywhere%2526search-autocomplete-original-term%253Dsustainability%2526expert_listings%253Dtrue",
                "_blank",
              )
            }
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Browse More on Fiverr
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Choose Sustainable Services?</CardTitle>
          <CardDescription>Benefits of working with environmentally-conscious professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Expertise in Sustainability</h3>
              <p className="text-sm text-muted-foreground">
                Our vetted professionals specialize in creating digital solutions that minimize environmental impact.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Reduced Carbon Footprint</h3>
              <p className="text-sm text-muted-foreground">
                Services designed with sustainability in mind, helping you achieve your environmental goals.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Support Eco-Conscious Businesses</h3>
              <p className="text-sm text-muted-foreground">
                By hiring these freelancers, you're supporting professionals committed to environmental sustainability.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
