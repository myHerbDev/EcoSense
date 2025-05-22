"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PRICING, generateOrderId, generateSubscriptionId } from "@/lib/paypal-client"
import { PaymentStatus, PaymentType } from "@/types/payment"
import { generateInvoice } from "@/lib/invoice-generator"

// Mock database for storing payment information
// In a real app, you would use a database like MongoDB or PostgreSQL
const paymentDatabase = new Map()
const subscriptionDatabase = new Map()
const userDatabase = new Map()

// Function to create a payment record
export async function createPayment(formData: FormData) {
  const paymentType = formData.get("paymentType") as PaymentType
  const userId = cookies().get("userId")?.value || "guest-user"
  const userEmail = (formData.get("email") as string) || "user@example.com"
  const userName = (formData.get("name") as string) || "Guest User"

  // Store user information
  userDatabase.set(userId, {
    id: userId,
    email: userEmail,
    name: userName,
  })

  if (paymentType === PaymentType.ONE_TIME) {
    const orderId = generateOrderId()
    const paymentDetails = {
      id: orderId,
      userId,
      amount: PRICING.ONE_TIME.amount,
      status: PaymentStatus.PENDING,
      type: PaymentType.ONE_TIME,
      createdAt: new Date(),
      updatedAt: new Date(),
      carbonOffset: PRICING.ONE_TIME.carbonOffset,
    }

    paymentDatabase.set(orderId, paymentDetails)
    return { success: true, orderId }
  } else if (paymentType === PaymentType.SUBSCRIPTION) {
    const subscriptionId = generateSubscriptionId()
    const paymentDetails = {
      id: subscriptionId,
      userId,
      amount: PRICING.SUBSCRIPTION.amount,
      status: PaymentStatus.PENDING,
      type: PaymentType.SUBSCRIPTION,
      createdAt: new Date(),
      updatedAt: new Date(),
      carbonOffset: PRICING.SUBSCRIPTION.carbonOffset,
    }

    paymentDatabase.set(subscriptionId, paymentDetails)
    return { success: true, subscriptionId }
  }

  return { success: false, error: "Invalid payment type" }
}

// Function to complete a payment
export async function completePayment(paymentId: string, paypalOrderId: string) {
  const payment = paymentDatabase.get(paymentId)

  if (!payment) {
    return { success: false, error: "Payment not found" }
  }

  // Update payment status
  payment.status = PaymentStatus.COMPLETED
  payment.updatedAt = new Date()
  payment.paypalOrderId = paypalOrderId

  // For one-time payments, set expiration to 1 year from now
  if (payment.type === PaymentType.ONE_TIME) {
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    payment.expiresAt = expiresAt
  }

  // Generate invoice
  const user = userDatabase.get(payment.userId)
  const invoice = generateInvoice({
    id: `INV-${Date.now()}`,
    paymentId: payment.id,
    userId: payment.userId,
    amount: payment.amount,
    carbonOffset: payment.carbonOffset,
    createdAt: new Date(),
    items: [
      {
        description:
          payment.type === PaymentType.ONE_TIME ? PRICING.ONE_TIME.description : PRICING.SUBSCRIPTION.description,
        amount: payment.amount,
        quantity: 1,
      },
    ],
    customerName: user?.name || "Guest User",
    customerEmail: user?.email || "user@example.com",
    paymentMethod: "PayPal",
    status: PaymentStatus.COMPLETED,
  })

  payment.invoiceUrl = `/api/invoices/${invoice.id}`
  paymentDatabase.set(paymentId, payment)

  // Set a cookie to indicate the user has paid
  cookies().set("paymentStatus", "paid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge:
      payment.type === PaymentType.ONE_TIME
        ? 60 * 60 * 24 * 365 // 1 year
        : 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  cookies().set("paymentType", payment.type, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge:
      payment.type === PaymentType.ONE_TIME
        ? 60 * 60 * 24 * 365 // 1 year
        : 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  return { success: true, invoiceUrl: payment.invoiceUrl }
}

// Function to complete a subscription
export async function completeSubscription(subscriptionId: string, paypalSubscriptionId: string) {
  const payment = paymentDatabase.get(subscriptionId)

  if (!payment) {
    return { success: false, error: "Subscription not found" }
  }

  // Update payment status
  payment.status = PaymentStatus.COMPLETED
  payment.updatedAt = new Date()
  payment.paypalSubscriptionId = paypalSubscriptionId

  // Create subscription record
  const currentPeriodEnd = new Date()
  currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)

  const subscriptionDetails = {
    id: subscriptionId,
    userId: payment.userId,
    status: "ACTIVE",
    startDate: new Date(),
    currentPeriodEnd,
    paypalSubscriptionId,
    cancelAtPeriodEnd: false,
  }

  subscriptionDatabase.set(subscriptionId, subscriptionDetails)

  // Generate invoice
  const user = userDatabase.get(payment.userId)
  const invoice = generateInvoice({
    id: `INV-${Date.now()}`,
    paymentId: payment.id,
    userId: payment.userId,
    amount: payment.amount,
    carbonOffset: payment.carbonOffset,
    createdAt: new Date(),
    items: [
      {
        description: PRICING.SUBSCRIPTION.description,
        amount: payment.amount,
        quantity: 1,
      },
    ],
    customerName: user?.name || "Guest User",
    customerEmail: user?.email || "user@example.com",
    paymentMethod: "PayPal Subscription",
    status: PaymentStatus.COMPLETED,
  })

  payment.invoiceUrl = `/api/invoices/${invoice.id}`
  paymentDatabase.set(subscriptionId, payment)

  // Set a cookie to indicate the user has a subscription
  cookies().set("paymentStatus", "paid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  cookies().set("paymentType", PaymentType.SUBSCRIPTION, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  return { success: true, invoiceUrl: payment.invoiceUrl }
}

// Function to check if a user has access to premium content
export async function checkUserAccess() {
  const paymentStatus = cookies().get("paymentStatus")?.value
  const paymentType = cookies().get("paymentType")?.value as PaymentType | undefined

  if (paymentStatus === "paid") {
    return {
      hasAccess: true,
      type: paymentType || null,
    }
  }

  return { hasAccess: false, type: null }
}

// Function to redirect to payment page if user doesn't have access
export async function requirePayment() {
  const { hasAccess } = await checkUserAccess()

  if (!hasAccess) {
    redirect("/payment")
  }
}
