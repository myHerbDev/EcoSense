export interface PaymentDetails {
  id: string
  userId: string
  amount: number
  status: PaymentStatus
  type: PaymentType
  createdAt: Date
  updatedAt: Date
  carbonOffset: number
  invoiceUrl?: string
  paypalOrderId?: string
  paypalSubscriptionId?: string
  expiresAt?: Date
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentType {
  ONE_TIME = "ONE_TIME",
  SUBSCRIPTION = "SUBSCRIPTION",
}

export interface SubscriptionDetails {
  id: string
  userId: string
  status: SubscriptionStatus
  startDate: Date
  currentPeriodEnd: Date
  paypalSubscriptionId: string
  cancelAtPeriodEnd: boolean
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
}

export interface UserSubscription {
  isActive: boolean
  expiresAt?: Date
  type: PaymentType | null
}

export interface Invoice {
  id: string
  paymentId: string
  userId: string
  amount: number
  carbonOffset: number
  createdAt: Date
  items: InvoiceItem[]
  customerName: string
  customerEmail: string
  paymentMethod: string
  status: PaymentStatus
}

export interface InvoiceItem {
  description: string
  amount: number
  quantity: number
}
