"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function AddNoteForm() {
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would call a server action to create a note
      console.log("Creating note:", title)

      // Simulate success
      setTimeout(() => {
        setTitle("")
        router.refresh()
        setIsSubmitting(false)
      }, 500)
    } catch (error) {
      console.error("Error creating note:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <Input
            placeholder="Enter a new note..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={!title.trim() || isSubmitting}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Note
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
