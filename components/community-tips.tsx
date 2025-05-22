"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare, Share2, Send } from "lucide-react"

type CommunityTip = {
  id: number
  author: {
    name: string
    avatar: string
    level: string
  }
  title: string
  content: string
  likes: number
  comments: number
  tags: string[]
  date: string
  liked?: boolean
}

const initialTips: CommunityTip[] = [
  {
    id: 1,
    author: {
      name: "EcoTech",
      avatar: "",
      level: "Sustainability Expert",
    },
    title: "Batch Process Your Emails",
    content:
      "Instead of checking emails throughout the day, set specific times to batch process them. This reduces the number of times your device needs to connect to servers, saving energy and reducing your digital carbon footprint.",
    likes: 124,
    comments: 18,
    tags: ["habits", "email", "productivity"],
    date: "2 days ago",
  },
  {
    id: 2,
    author: {
      name: "GreenBytes",
      avatar: "",
      level: "Power User",
    },
    title: "Clean Your Digital Clutter",
    content:
      "Regularly delete unnecessary files, emails, and apps. Not only does this free up storage space, but it also reduces the energy required to maintain and back up your data. I've reduced my cloud storage needs by 40% with this practice!",
    likes: 98,
    comments: 12,
    tags: ["storage", "cloud", "cleanup"],
    date: "5 days ago",
  },
  {
    id: 3,
    author: {
      name: "SustainableDev",
      avatar: "",
      level: "Community Contributor",
    },
    title: "Use Progressive Web Apps",
    content:
      "Instead of installing native apps for every service, consider using Progressive Web Apps (PWAs) where available. They typically use fewer resources and don't require constant updates, reducing both data usage and energy consumption.",
    likes: 76,
    comments: 8,
    tags: ["apps", "development", "optimization"],
    date: "1 week ago",
  },
]

export function CommunityTips() {
  const [tips, setTips] = useState<CommunityTip[]>(initialTips)
  const [newTipTitle, setNewTipTitle] = useState("")
  const [newTipContent, setNewTipContent] = useState("")
  const [showForm, setShowForm] = useState(false)

  const handleLike = (id: number) => {
    setTips(
      tips.map((tip) => {
        if (tip.id === id) {
          const liked = !tip.liked
          return {
            ...tip,
            liked,
            likes: liked ? tip.likes + 1 : tip.likes - 1,
          }
        }
        return tip
      }),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTipTitle.trim() || !newTipContent.trim()) return

    const newTip: CommunityTip = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "",
        level: "Community Member",
      },
      title: newTipTitle,
      content: newTipContent,
      likes: 0,
      comments: 0,
      tags: ["community"],
      date: "Just now",
    }

    setTips([newTip, ...tips])
    setNewTipTitle("")
    setNewTipContent("")
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Community Sustainability Tips</CardTitle>
          <CardDescription>
            Learn from and share with other users committed to reducing their digital carbon footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} className="w-full">
              Share Your Sustainability Tip
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Tip title"
                value={newTipTitle}
                onChange={(e) => setNewTipTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Share your sustainability tip or experience..."
                value={newTipContent}
                onChange={(e) => setNewTipContent(e.target.value)}
                required
                className="min-h-[100px]"
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Share Tip
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {tips.map((tip) => (
        <Card key={tip.id} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={tip.author.avatar} />
                  <AvatarFallback>{tip.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{tip.author.name}</div>
                  <div className="text-xs text-muted-foreground">{tip.author.level}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{tip.date}</div>
            </div>
            <CardTitle className="text-lg mt-2">{tip.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{tip.content}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {tip.tags.map((tag, i) => (
                <Badge key={i} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={tip.liked ? "text-primary" : ""}
                onClick={() => handleLike(tip.id)}
              >
                <ThumbsUp className="mr-1 h-4 w-4" />
                {tip.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-1 h-4 w-4" />
                {tip.comments}
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
