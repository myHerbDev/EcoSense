"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Upload, ImageIcon, FileText, Loader2 } from "lucide-react"
import { uploadProfileImage } from "@/app/actions/upload-actions"

export function CommunityUploads() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string; type: string }>>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const result = await uploadProfileImage(formData)

      if (result.success && result.url) {
        toast({
          title: "File uploaded successfully",
          description: "Your file has been uploaded to our secure storage.",
        })

        setUploadedFiles([
          ...uploadedFiles,
          {
            name: file.name,
            url: result.url,
            type: file.type.startsWith("image/") ? "image" : "document",
          },
        ])
      } else {
        toast({
          title: "Upload failed",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your sustainability tip.",
        variant: "destructive",
      })
      return
    }

    if (uploadedFiles.length === 0) {
      toast({
        title: "File required",
        description: "Please upload at least one image or document to share.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically save this to a database
    toast({
      title: "Tip shared successfully",
      description: "Your sustainability tip has been shared with the community.",
    })

    // Reset form
    setTitle("")
    setDescription("")
    setUploadedFiles([])
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Community Uploads</h1>
        <p className="text-muted-foreground">Share sustainability tips, guides, and images with the community.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Share a Sustainability Tip</CardTitle>
          <CardDescription>Upload images or documents to share your eco-friendly practices</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="E.g., How to reduce plastic waste at home"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Share details about your sustainability tip..."
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  disabled={isUploading}
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-2" />
                      <p className="text-sm text-muted-foreground">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">Images, PDFs, or documents (max 5MB)</p>
                    </div>
                  )}
                </Label>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center p-2 bg-muted rounded">
                      {file.type === "image" ? (
                        <ImageIcon className="h-5 w-5 mr-2" />
                      ) : (
                        <FileText className="h-5 w-5 mr-2" />
                      )}
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isUploading}>
              Share with Community
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Contributions</CardTitle>
          <CardDescription>Explore sustainability tips shared by other members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Community tips will appear here as they are shared.</p>
            <p className="text-sm text-muted-foreground mt-2">Be the first to share your sustainability tip!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
