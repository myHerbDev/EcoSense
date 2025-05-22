import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data for the dashboard
export const mockUsageData = {
  screenTime: {
    daily: 5.2, // hours
    weekly: 36.4, // hours
    monthly: 156, // hours
    baseline: 4, // hours (recommended daily limit)
  },
  energyConsumption: {
    daily: 0.8, // kWh
    weekly: 5.6, // kWh
    monthly: 24, // kWh
    baseline: 0.6, // kWh (average daily consumption)
  },
  appUsage: [
    { name: "Social Media", time: 2.5, percentage: 48 },
    { name: "Productivity", time: 1.2, percentage: 23 },
    { name: "Entertainment", time: 1.0, percentage: 19 },
    { name: "Other", time: 0.5, percentage: 10 },
  ],
  timeOfDay: [
    { time: "Morning", percentage: 15 },
    { time: "Afternoon", percentage: 30 },
    { time: "Evening", percentage: 40 },
    { time: "Night", percentage: 15 },
  ],
  sustainabilityScore: 68, // out of 100
}

// Recommendations based on usage patterns
export const recommendations = [
  {
    title: "Reduce Screen Brightness",
    description: "Lowering your screen brightness by 30% can save up to 15% of battery power.",
    impact: "high",
  },
  {
    title: "Set App Time Limits",
    description: "Configure time limits for social media apps to reduce overall screen time.",
    impact: "high",
  },
  {
    title: "Enable Dark Mode",
    description: "Using dark mode can reduce power consumption on OLED screens by up to 30%.",
    impact: "medium",
  },
  {
    title: "Schedule Digital Detox",
    description: "Set aside 2 hours each day as a 'no-screen' period to reduce overall usage.",
    impact: "high",
  },
  {
    title: "Use Wi-Fi Instead of Mobile Data",
    description: "Wi-Fi consumes less battery than cellular data connections.",
    impact: "medium",
  },
  {
    title: "Optimize Night Usage",
    description: "Reduce late-night device usage to improve sleep quality and save energy.",
    impact: "high",
  },
  {
    title: "Uninstall Unused Apps",
    description: "Remove apps you rarely use to reduce background processes and save battery.",
    impact: "low",
  },
  {
    title: "Use Battery Saver Mode",
    description: "Enable battery saver mode when your battery is below 50% to extend usage time.",
    impact: "medium",
  },
  {
    title: "Disable Unnecessary Notifications",
    description: "Turn off notifications for non-essential apps to reduce screen wake-ups.",
    impact: "medium",
  },
  {
    title: "Adjust Auto-Lock Time",
    description: "Set your screen to lock after 30 seconds of inactivity to save power.",
    impact: "low",
  },
]
