"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateGroqRecommendations } from "@/app/actions/groq-actions"
import { Cpu, Send, RefreshCw, User } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type AIChatProps = {
  userData: {
    screenTime: number
    energyConsumption: number
    appUsage: Array<{
      name: string
      time: number
      percentage: number
    }>
    timeOfDay: Array<{
      time: string
      percentage: number
    }>
  }
}

export function AIChat({ userData }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your sustainability advisor. How can I help you reduce your digital carbon footprint today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    // Show loading state
    setIsLoading(true)

    try {
      // Create context-aware prompt
      const prompt = `
        User query: ${userMessage}
        
        User context:
        - Daily screen time: ${userData.screenTime} hours
        - Daily energy consumption: ${userData.energyConsumption} kWh
        - App usage: ${userData.appUsage.map((app) => `${app.name} (${app.percentage}%)`).join(", ")}
        - Time of day usage: ${userData.timeOfDay.map((time) => `${time.time} (${time.percentage}%)`).join(", ")}
        
        Respond conversationally as a sustainability advisor. Provide helpful, specific advice related to reducing digital carbon footprint.
      `

      const result = await generateGroqRecommendations(prompt)

      if (result.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: result.recommendations || "I'm sorry, I couldn't generate a response. Please try again.",
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: result.fallbackRecommendations || "I'm sorry, I couldn't generate a response. Please try again.",
          },
        ])
      }
    } catch (error) {
      console.error("Error in chat:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "How can I reduce my screen time?",
    "What's the environmental impact of streaming videos?",
    "How does dark mode save energy?",
    "What are the best energy-saving settings for my devices?",
  ]

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cpu className="mr-2 h-5 w-5 text-primary" />
          Chat with EcoSense AI
        </CardTitle>
        <CardDescription>Ask questions about reducing your digital carbon footprint</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div className="flex items-start max-w-[80%]">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarFallback className="bg-secondary">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted text-foreground">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-4">
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-2 w-full">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-xs justify-start h-auto py-2 px-3"
                onClick={() => {
                  setInput(question)
                  setTimeout(() => handleSendMessage(), 100)
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        )}
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} size="icon">
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
