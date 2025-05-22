"use server"

import { GroqChat } from "@/lib/groq-client"

export async function generateGroqRecommendations(prompt: string) {
  try {
    const groqApiKey = process.env.GROQ_API_KEY || process.env.AI_GROQ_API_KEY

    if (!groqApiKey) {
      return {
        success: false,
        error: "API key not found",
        fallbackRecommendations: generateFallbackRecommendations(prompt),
      }
    }

    const groq = new GroqChat(groqApiKey)

    const response = await groq.chat({
      messages: [
        {
          role: "system",
          content:
            "You are a sustainability advisor specializing in digital carbon footprint reduction. Provide concise, actionable recommendations to help users reduce their environmental impact from digital device usage.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 800,
    })

    return {
      success: true,
      recommendations: response.choices[0].message.content,
    }
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      fallbackRecommendations: generateFallbackRecommendations(prompt),
    }
  }
}

function generateFallbackRecommendations(prompt: string) {
  // Extract user data from prompt
  const screenTimeMatch = prompt.match(/Daily screen time: (\d+\.?\d*) hours/)
  const screenTime = screenTimeMatch ? Number.parseFloat(screenTimeMatch[1]) : 5.2

  const energyMatch = prompt.match(/Daily energy consumption: (\d+\.?\d*) kWh/)
  const energyConsumption = energyMatch ? Number.parseFloat(energyMatch[1]) : 0.8

  // Generate recommendations based on the extracted data
  const recommendations = []

  // Screen time recommendations
  if (screenTime > 4) {
    recommendations.push(
      "• **Reduce Screen Time**: Your daily screen time of " +
        screenTime +
        " hours is above the recommended limit. Consider setting app timers to reduce usage by 20%, which could save approximately " +
        (energyConsumption * 0.2).toFixed(2) +
        " kWh per day.",
    )
  }

  // Add more generic recommendations
  recommendations.push(
    "• **Enable Dark Mode**: Using dark mode on OLED screens can reduce power consumption by up to 30%. This could save approximately " +
      (energyConsumption * 0.3).toFixed(2) +
      " kWh per day.",
  )

  recommendations.push(
    "• **Optimize Video Streaming Quality**: Lowering video streaming resolution when on mobile data can significantly reduce energy consumption and data usage. Try setting video quality to 720p instead of 1080p or 4K.",
  )

  recommendations.push(
    "• **Use Wi-Fi Instead of Mobile Data**: Wi-Fi consumes less battery than cellular data connections. When possible, connect to Wi-Fi networks to reduce energy consumption.",
  )

  recommendations.push(
    "• **Uninstall Unused Apps**: Remove apps you rarely use to reduce background processes and save battery. This can improve device performance and reduce energy consumption.",
  )

  // Return at least 3 recommendations
  return recommendations.slice(0, 5).join("\n\n")
}
