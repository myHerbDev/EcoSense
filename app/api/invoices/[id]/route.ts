import { type NextRequest, NextResponse } from "next/server"
import { generateInvoiceHtml } from "@/lib/invoice-generator"

// Mock database for storing invoices
// In a real app, you would use a database like MongoDB or PostgreSQL
const invoiceDatabase = new Map()

// Helper function to create a mock invoice
function createMockInvoice(id: string) {
  return {
    id,
    paymentId: `payment_${id}`,
    userId: "user_123",
    amount: 29.99,
    carbonOffset: 0.3,
    createdAt: new Date(),
    items: [
      {
        description: "One-time access to AI Sustainability Advisor",
        amount: 29.99,
        quantity: 1,
      },
    ],
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    paymentMethod: "PayPal",
    status: "COMPLETED",
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // Check if invoice exists in database, if not create a mock one
  let invoice = invoiceDatabase.get(id)
  if (!invoice) {
    invoice = createMockInvoice(id)
    invoiceDatabase.set(id, invoice)
  }

  // Generate HTML invoice
  const invoiceHtml = generateInvoiceHtml(invoice)

  return new NextResponse(invoiceHtml, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}
