import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadProfileImage(file: File) {
  try {
    // Generate a unique filename with the original extension
    const fileExtension = file.name.split(".").pop()
    const fileName = `profile-images/${nanoid()}.${fileExtension}`

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
      contentType: file.type,
    })

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
