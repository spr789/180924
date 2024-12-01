"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { PaymentMethods } from "@/components/checkout/payment-methods"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalAmount, clearCart } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const handleCheckout = async (formData: any) => {
    setIsProcessing(true)
    try {
      // In a real app, you would:
      // 1. Validate the form data
      // 2. Process the payment
      // 3. Create the order in your backend
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call

      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You will receive an email confirmation shortly.",
      })

      clearCart()
      router.push("/orders")
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container max-w-6xl">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CheckoutForm onSubmit={handleCheckout} isProcessing={isProcessing} />
              <PaymentMethods />
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}