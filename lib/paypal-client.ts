// This file handles PayPal API interactions
import type { PayPalScriptOptions } from "@paypal/react-paypal-js"

export const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  "AYLl6sKc5fOb4uSAcQEk2RgQsKPSub2aTiJv4RL2XXeb2EBx912ApcaT3znkUjmqASBaOQjJ2LMANW63"

// Pricing constants
export const PRICING = {
  ONE_TIME: {
    amount: 29.99,
    displayAmount: "$29.99",
    description: "One-time access to AI Sustainability Advisor",
    carbonOffset: 0.3, // 1% of transaction
  },
  SUBSCRIPTION: {
    amount: 9.99,
    displayAmount: "$9.99",
    description: "Monthly subscription to AI Sustainability Advisor",
    carbonOffset: 0.1, // 1% of transaction
    interval: "MONTH",
  },
}

// PayPal script configuration
export const paypalScriptOptions: PayPalScriptOptions = {
  "client-id": PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  components: "buttons,marks",
}

// Function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Function to generate a unique order ID
export const generateOrderId = (): string => {
  return `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

// Function to generate a unique subscription ID
export const generateSubscriptionId = (): string => {
  return `sub_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}
