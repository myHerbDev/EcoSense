"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TreesIcon as Tree, CreditCard, Check } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentComplete: (amount: number, trees: number) => void
}

export function PaymentModal({ isOpen, onClose, onPaymentComplete }: PaymentModalProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(10)
  const [trees, setTrees] = useState(2)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount)
    // Calculate trees based on amount ($5 per tree)
    setTrees(Math.floor(newAmount / 5))
  }

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      handleAmountChange(value)
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces every 4 digits
    const value = e.target.value.replace(/\s/g, "")
    const formattedValue = value
      .replace(/[^\d]/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim()

    setCardDetails({ ...cardDetails, number: formattedValue })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format expiry as MM/YY
    const value = e.target.value.replace(/[^\d]/g, "")
    let formattedValue = value

    if (value.length > 2) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`
    }

    setCardDetails({ ...cardDetails, expiry: formattedValue })
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "").slice(0, 3)
    setCardDetails({ ...cardDetails, cvc: value })
  }

  const handleSubmit = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep(3) // Move to success step

      // Reset form for next time
      setTimeout(() => {
        onPaymentComplete(amount, trees)
        setStep(1)
        setAmount(10)
        setTrees(2)
        setCardDetails({
          number: "",
          name: "",
          expiry: "",
          cvc: "",
        })
      }, 2000)
    }, 1500)
  }

  const isFormValid = () => {
    return (
      cardDetails.number.replace(/\s/g, "").length === 16 &&
      cardDetails.name.length > 3 &&
      cardDetails.expiry.length === 5 &&
      cardDetails.cvc.length === 3
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Plant Trees</DialogTitle>
              <DialogDescription>Choose an amount to contribute to global reforestation efforts.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Tree className="h-6 w-6 text-primary" />
                <span className="text-lg font-medium">{trees} trees</span>
              </div>

              <RadioGroup defaultValue="10" className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem
                    value="5"
                    id="amount-5"
                    className="peer sr-only"
                    onClick={() => handleAmountChange(5)}
                  />
                  <Label
                    htmlFor="amount-5"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-xl font-bold">$5</span>
                    <span className="text-xs">1 tree</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="10"
                    id="amount-10"
                    className="peer sr-only"
                    onClick={() => handleAmountChange(10)}
                    defaultChecked
                  />
                  <Label
                    htmlFor="amount-10"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-xl font-bold">$10</span>
                    <span className="text-xs">2 trees</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="25"
                    id="amount-25"
                    className="peer sr-only"
                    onClick={() => handleAmountChange(25)}
                  />
                  <Label
                    htmlFor="amount-25"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-xl font-bold">$25</span>
                    <span className="text-xs">5 trees</span>
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="custom-amount">Custom Amount</Label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0">$</span>
                  <Input
                    id="custom-amount"
                    type="number"
                    min="5"
                    value={amount}
                    onChange={handleCustomAmount}
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground">$5 plants one tree</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => setStep(2)}>Continue to Payment</Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>Enter your payment information to complete your contribution.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between mb-2 p-3 bg-primary/10 rounded-md">
                <div className="flex items-center gap-2">
                  <Tree className="h-5 w-5 text-primary" />
                  <span className="font-medium">{trees} trees</span>
                </div>
                <span className="font-bold">${amount}</span>
              </div>

              <RadioGroup defaultValue="card" className="mb-4" onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label htmlFor="payment-card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={handleCardNumberChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={handleExpiryChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" value={cardDetails.cvc} onChange={handleCvcChange} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={!isFormValid() || isProcessing}>
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">
                      <CreditCard className="h-4 w-4" />
                    </span>
                    Processing...
                  </>
                ) : (
                  <>Pay ${amount}</>
                )}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Successful</DialogTitle>
              <DialogDescription>Thank you for your contribution to reforestation efforts!</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p className="text-center text-muted-foreground mb-4">
                Your contribution of ${amount} will help plant {trees} trees, offsetting approximately {trees * 48} kg
                of CO2 annually.
              </p>
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/20 p-3 rounded-md">
                <Tree className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-medium">{trees} trees will be planted</span>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
