"use client"

import { useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { paypalScriptOptions, PRICING, formatCurrency } from "@/lib/paypal-client"
import { PaymentType } from "@/types/payment"
import { createPayment, completePayment, completeSubscription } from "@/app/actions/payment-actions"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function PayPalPayment() {
  const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.ONE_TIME)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null)
  const { toast } = useToast()

  const handlePaymentTypeChange = (value: string) => {
    setPaymentType(value as PaymentType)
  }

  const handleCreateOrder = async (data: any, actions: any) => {
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("paymentType", paymentType)
      formData.append("email", (document.getElementById("email") as HTMLInputElement)?.value || "")
      formData.append("name", (document.getElementById("name") as HTMLInputElement)?.value || "")

      const result = await createPayment(formData)

      if (!result.success) {
        throw new Error(result.error || "Failed to create payment")
      }

      if (paymentType === PaymentType.ONE_TIME) {
        setOrderId(result.orderId)
      } else {
        setSubscriptionId(result.subscriptionId)
      }

      setLoading(false)

      // Create PayPal order
      return actions.order.create({
        purchase_units: [
          {
            description:
              paymentType === PaymentType.ONE_TIME ? PRICING.ONE_TIME.description : PRICING.SUBSCRIPTION.description,
            amount: {
              currency_code: "USD",
              value:
                paymentType === PaymentType.ONE_TIME
                  ? PRICING.ONE_TIME.amount.toString()
                  : PRICING.SUBSCRIPTION.amount.toString(),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value:
                    paymentType === PaymentType.ONE_TIME
                      ? PRICING.ONE_TIME.amount.toString()
                      : PRICING.SUBSCRIPTION.amount.toString(),
                },
              },
            },
            items: [
              {
                name:
                  paymentType === PaymentType.ONE_TIME
                    ? "One-time access to AI Sustainability Advisor"
                    : "Monthly subscription to AI Sustainability Advisor",
                quantity: "1",
                unit_amount: {
                  currency_code: "USD",
                  value:
                    paymentType === PaymentType.ONE_TIME
                      ? PRICING.ONE_TIME.amount.toString()
                      : PRICING.SUBSCRIPTION.amount.toString(),
                },
                category: "DIGITAL_GOODS",
              },
            ],
          },
        ],
        application_context: {
          brand_name: "EcoSense",
          shipping_preference: "NO_SHIPPING",
        },
      })
    } catch (err: any) {
      setLoading(false)
      setError(err.message || "An error occurred")
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: err.message || "An error occurred while processing your payment",
      })
      return null
    }
  }

  const handleApprove = async (data: any, actions: any) => {
    setLoading(true)

    try {
      // Capture the funds from the transaction
      const details = await actions.order.capture()

      if (details.status === "COMPLETED" && orderId) {
        // Complete the payment on our server
        const result = await completePayment(orderId, details.id)

        if (!result.success) {
          throw new Error(result.error || "Failed to complete payment")
        }

        setInvoiceUrl(result.invoiceUrl)
        setSuccess(true)
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully",
        })
      } else {
        throw new Error("Payment was not completed")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: err.message || "An error occurred while processing your payment",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubscriptionApprove = async (data: any, actions: any) => {
    setLoading(true)

    try {
      if (data.subscriptionID && subscriptionId) {
        // Complete the subscription on our server
        const result = await completeSubscription(subscriptionId, data.subscriptionID)

        if (!result.success) {
          throw new Error(result.error || "Failed to complete subscription")
        }

        setInvoiceUrl(result.invoiceUrl)
        setSuccess(true)
        toast({
          title: "Subscription Successful",
          description: "Your subscription has been processed successfully",
        })
      } else {
        throw new Error("Subscription was not completed")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
      toast({
        variant: "destructive",
        title: "Subscription Error",
        description: err.message || "An error occurred while processing your subscription",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleError = (err: Record<string, unknown>) => {
    setLoading(false)
    setError("An error occurred with the payment")
    toast({
      variant: "destructive",
      title: "Payment Error",
      description: "An error occurred with the PayPal payment",
    })
    console.error(err)
  }

  const handleCancel = () => {
    setLoading(false)
    toast({
      title: "Payment Cancelled",
      description: "You have cancelled the payment process",
    })
  }

  return (
    <PayPalScriptProvider options={paypalScriptOptions}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>AI Sustainability Advisor</CardTitle>
          <CardDescription>
            Choose a payment plan to access premium AI-powered sustainability recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {success ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-semibold text-center">Payment Successful!</h3>
              <p className="text-center text-muted-foreground">
                Thank you for your purchase. You now have access to the AI Sustainability Advisor.
              </p>
              {invoiceUrl && (
                <Button asChild variant="outline">
                  <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
                    View Invoice
                  </a>
                </Button>
              )}
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>
                  1% of your payment (
                  {formatCurrency(
                    paymentType === PaymentType.ONE_TIME
                      ? PRICING.ONE_TIME.carbonOffset
                      : PRICING.SUBSCRIPTION.carbonOffset,
                  )}
                  ) has been allocated to carbon footprint reduction initiatives.
                </p>
              </div>
              <Button asChild className="mt-4">
                <a href="/ai-advisor">Go to AI Advisor</a>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <RadioGroup
                defaultValue={PaymentType.ONE_TIME}
                onValueChange={handlePaymentTypeChange}
                className="grid grid-cols-1 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-4">
                  <RadioGroupItem value={PaymentType.ONE_TIME} id="one-time" />
                  <div className="grid gap-1 flex-1">
                    <Label htmlFor="one-time" className="font-medium">
                      One-time Payment
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {PRICING.ONE_TIME.displayAmount} for 1 year of access
                    </p>
                  </div>
                  <div className="font-bold">{PRICING.ONE_TIME.displayAmount}</div>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-4">
                  <RadioGroupItem value={PaymentType.SUBSCRIPTION} id="subscription" />
                  <div className="grid gap-1 flex-1">
                    <Label htmlFor="subscription" className="font-medium">
                      Monthly Subscription
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {PRICING.SUBSCRIPTION.displayAmount}/month, cancel anytime
                    </p>
                  </div>
                  <div className="font-bold">{PRICING.SUBSCRIPTION.displayAmount}/mo</div>
                </div>
              </RadioGroup>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                <p className="text-sm text-green-800 dark:text-green-300">
                  <strong>Sustainability Commitment:</strong> 1% of each transaction is allocated to carbon footprint
                  reduction initiatives.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                </div>
              )}

              {loading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {!loading && paymentType === PaymentType.ONE_TIME && (
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect" }}
                  createOrder={handleCreateOrder}
                  onApprove={handleApprove}
                  onError={handleError}
                  onCancel={handleCancel}
                />
              )}

              {!loading && paymentType === PaymentType.SUBSCRIPTION && (
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect" }}
                  createSubscription={(data, actions) => {
                    return handleCreateOrder(data, {
                      order: {
                        create: () => Promise.resolve("subscription-placeholder"),
                      },
                    }).then(() => {
                      return actions.subscription.create({
                        plan_id: "P-5ML4271244454362WXNWU5NQ", // This would be your actual plan ID from PayPal
                        quantity: "1",
                        application_context: {
                          brand_name: "EcoSense",
                          shipping_preference: "NO_SHIPPING",
                          user_action: "SUBSCRIBE_NOW",
                        },
                      })
                    })
                  }}
                  onApprove={handleSubscriptionApprove}
                  onError={handleError}
                  onCancel={handleCancel}
                />
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <div className="flex items-center space-x-2">
            <div className="text-xs text-muted-foreground">Secured by</div>
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8 3.6H7.2V13.2H12.8V3.6Z" fill="#253B80" />
              <path d="M7.2 3.6H1.6V13.2H7.2V3.6Z" fill="#179BD7" />
              <path d="M7.2 13.2H1.6C1.6 15.84 3.76 18 6.4 18H7.2C9.84 18 12 15.84 12 13.2H7.2Z" fill="#222D65" />
              <path
                d="M12.8 13.2H7.2C7.2 15.84 9.36 18 12 18H12.8C15.44 18 17.6 15.84 17.6 13.2H12.8Z"
                fill="#253B80"
              />
              <path
                d="M24.6998 6.4H22.6998C22.5398 6.4 22.3798 6.52 22.3398 6.68L21.0998 13.56C21.0998 13.64 21.1398 13.72 21.2198 13.72H22.1798C22.3398 13.72 22.4998 13.6 22.5398 13.44L22.8598 11.96C22.8998 11.8 23.0598 11.68 23.2198 11.68H24.0598C25.5798 11.68 26.4998 10.84 26.7398 9.4C26.8598 8.8 26.7798 8.32 26.5398 7.96C26.2598 7.6 25.5798 6.4 24.6998 6.4ZM25.0198 9.48C24.8998 10.28 24.2598 10.28 23.6998 10.28H23.3798L23.6998 8.8C23.6998 8.72 23.7798 8.64 23.8598 8.64H23.9798C24.3798 8.64 24.7398 8.64 24.9398 8.88C25.0598 9 25.0598 9.2 25.0198 9.48Z"
                fill="#253B80"
              />
              <path
                d="M32.6998 9.44H31.7398C31.6598 9.44 31.5798 9.52 31.5798 9.6L31.5398 9.84L31.4598 9.72C31.2198 9.4 30.7398 9.32 30.2598 9.32C29.0598 9.32 28.0198 10.24 27.8198 11.52C27.6998 12.16 27.8598 12.76 28.1798 13.16C28.4598 13.52 28.8998 13.68 29.4198 13.68C30.3798 13.68 30.9398 13.08 30.9398 13.08L30.8998 13.32C30.8998 13.4 30.9398 13.48 31.0198 13.48H31.8998C32.0598 13.48 32.2198 13.36 32.2598 13.2L32.9798 9.68C32.9798 9.6 32.9398 9.44 32.6998 9.44ZM31.1798 11.56C31.0598 12.16 30.5798 12.56 29.9798 12.56C29.6598 12.56 29.4198 12.48 29.2598 12.28C29.0998 12.08 29.0598 11.8 29.0998 11.48C29.1798 10.88 29.6998 10.48 30.2598 10.48C30.5798 10.48 30.7798 10.56 30.9798 10.76C31.1398 10.96 31.2198 11.24 31.1798 11.56Z"
                fill="#253B80"
              />
              <path
                d="M39.0998 9.44H38.1398C38.0198 9.44 37.9398 9.48 37.8598 9.56L36.1398 11.96L35.4598 9.64C35.4198 9.52 35.2998 9.44 35.1798 9.44H34.2598C34.1398 9.44 34.0598 9.56 34.0998 9.68L35.3398 13.08L34.1798 14.68C34.0998 14.8 34.1798 14.96 34.3398 14.96H35.2998C35.4198 14.96 35.4998 14.92 35.5798 14.84L39.2598 9.72C39.3398 9.56 39.2598 9.44 39.0998 9.44Z"
                fill="#253B80"
              />
              <path
                d="M44.6998 6.4H42.6998C42.5398 6.4 42.3798 6.52 42.3398 6.68L41.0998 13.56C41.0998 13.64 41.1398 13.72 41.2198 13.72H42.2998C42.3798 13.72 42.4598 13.64 42.4998 13.56L42.8198 11.96C42.8598 11.8 43.0198 11.68 43.1798 11.68H44.0198C45.5398 11.68 46.4598 10.84 46.6998 9.4C46.8198 8.8 46.7398 8.32 46.4998 7.96C46.2598 7.6 45.5798 6.4 44.6998 6.4ZM45.0198 9.48C44.8998 10.28 44.2598 10.28 43.6998 10.28H43.3798L43.6998 8.8C43.6998 8.72 43.7798 8.64 43.8598 8.64H43.9798C44.3798 8.64 44.7398 8.64 44.9398 8.88C45.0598 9 45.0598 9.2 45.0198 9.48Z"
                fill="#179BD7"
              />
              <path
                d="M52.6998 9.44H51.7398C51.6598 9.44 51.5798 9.52 51.5798 9.6L51.5398 9.84L51.4598 9.72C51.2198 9.4 50.7398 9.32 50.2598 9.32C49.0598 9.32 48.0198 10.24 47.8198 11.52C47.6998 12.16 47.8598 12.76 48.1798 13.16C48.4598 13.52 48.8998 13.68 49.4198 13.68C50.3798 13.68 50.9398 13.08 50.9398 13.08L50.8998 13.32C50.8998 13.4 50.9398 13.48 51.0198 13.48H51.8998C52.0598 13.48 52.2198 13.36 52.2598 13.2L52.9798 9.68C52.9798 9.6 52.9398 9.44 52.6998 9.44ZM51.1798 11.56C51.0598 12.16 50.5798 12.56 49.9798 12.56C49.6598 12.56 49.4198 12.48 49.2598 12.28C49.0998 12.08 49.0598 11.8 49.0998 11.48C49.1798 10.88 49.6998 10.48 50.2598 10.48C50.5798 10.48 50.7798 10.56 50.9798 10.76C51.1398 10.96 51.2198 11.24 51.1798 11.56Z"
                fill="#179BD7"
              />
              <path
                d="M54.6998 6.68L53.4198 13.56C53.4198 13.64 53.4598 13.72 53.5398 13.72H54.3798C54.5398 13.72 54.6998 13.6 54.7398 13.44L55.9798 6.56C55.9798 6.48 55.9398 6.4 55.8598 6.4H54.8198C54.7398 6.4 54.6998 6.52 54.6998 6.68Z"
                fill="#179BD7"
              />
              <path
                d="M65.6998 6.4H63.6998C63.5398 6.4 63.3798 6.52 63.3398 6.68L62.0998 13.56C62.0998 13.64 62.1398 13.72 62.2198 13.72H63.2998C63.3798 13.72 63.4598 13.64 63.4998 13.56L63.8198 11.96C63.8598 11.8 64.0198 11.68 64.1798 11.68H65.0198C66.5398 11.68 67.4598 10.84 67.6998 9.4C67.8198 8.8 67.7398 8.32 67.4998 7.96C67.2598 7.6 66.5798 6.4 65.6998 6.4ZM66.0198 9.48C65.8998 10.28 65.2598 10.28 64.6998 10.28H64.3798L64.6998 8.8C64.6998 8.72 64.7798 8.64 64.8598 8.64H64.9798C65.3798 8.64 65.7398 8.64 65.9398 8.88C66.0598 9 66.0598 9.2 66.0198 9.48Z"
                fill="#253B80"
              />
              <path
                d="M73.6998 9.44H72.7398C72.6598 9.44 72.5798 9.52 72.5798 9.6L72.5398 9.84L72.4598 9.72C72.2198 9.4 71.7398 9.32 71.2598 9.32C70.0598 9.32 69.0198 10.24 68.8198 11.52C68.6998 12.16 68.8598 12.76 69.1798 13.16C69.4598 13.52 69.8998 13.68 70.4198 13.68C71.3798 13.68 71.9398 13.08 71.9398 13.08L71.8998 13.32C71.8998 13.4 71.9398 13.48 72.0198 13.48H72.8998C73.0598 13.48 73.2198 13.36 73.2598 13.2L73.9798 9.68C73.9798 9.6 73.9398 9.44 73.6998 9.44ZM72.1798 11.56C72.0598 12.16 71.5798 12.56 70.9798 12.56C70.6598 12.56 70.4198 12.48 70.2598 12.28C70.0998 12.08 70.0598 11.8 70.0998 11.48C70.1798 10.88 70.6998 10.48 71.2598 10.48C71.5798 10.48 71.7798 10.56 71.9798 10.76C72.1398 10.96 72.2198 11.24 72.1798 11.56Z"
                fill="#253B80"
              />
              <path
                d="M75.6998 6.68L74.4198 13.56C74.4198 13.64 74.4598 13.72 74.5398 13.72H75.3798C75.5398 13.72 75.6998 13.6 75.7398 13.44L76.9798 6.56C76.9798 6.48 76.9398 6.4 76.8598 6.4H75.8198C75.7398 6.4 75.6998 6.52 75.6998 6.68Z"
                fill="#253B80"
              />
            </svg>
          </div>
        </CardFooter>
      </Card>
    </PayPalScriptProvider>
  )
}
