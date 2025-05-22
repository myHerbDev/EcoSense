"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { uploadProfileImage } from "@/app/actions/upload-actions"

interface ImageUploadProps {
  currentImageUrl?: string
  name: string
  onImageUploaded: (url: string) => void
}

export function ImageUpload({ currentImageUrl, name, onImageUploaded }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const result = await uploadProfileImage(formData)

      if (result.success && result.url) {
        toast({
          title: "Image uploaded successfully",
          description: "Your profile image has been updated.",
        })
        onImageUploaded(result.url)
      } else {
        toast({
          title: "Upload failed",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
        // Reset preview if upload failed
        setPreviewUrl(null)
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      // Reset preview if upload failed
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const displayUrl = previewUrl || currentImageUrl

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24 cursor-pointer relative group" onClick={triggerFileInput}>
        <AvatarImage src={displayUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`} alt={name} />
        <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Upload className="h-8 w-8 text-white" />
        </div>
      </Avatar>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      <Button variant="outline" size="sm" onClick={triggerFileInput} disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Change Photo
          </>
        )}
      </Button>
    </div>
  )
}
