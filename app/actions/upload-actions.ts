"use server"

import { put } from "@vercel/blob"
import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"

export async function uploadProfileImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" }
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File size must be less than 5MB" }
    }

    // Generate a unique filename with the original extension
    const fileExtension = file.name.split(".").pop()
    const fileName = `profile-images/${nanoid()}.${fileExtension}`

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
      contentType: file.type,
    })

    // Revalidate the profile page to show the new image
    revalidatePath("/profile")

    return {
      success: true,
      url: blob.url,
      error: null,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return {
      success: false,
      url: null,
      error: "Failed to upload image. Please try again.",
    }
  }
}
