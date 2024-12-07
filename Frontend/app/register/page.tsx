"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone_number: "", // Added phone_number field
    password: "",
    password2: "",
    email: "", // Removed first_name and last_name fields
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await register({
        phone_number: formData.phone_number,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      }) // Ensure formData includes phone_number
      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Side */}
          <div className="p-8 md:p-12">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Create Account</h1>
                <p className="text-gray-600">Join our jewelry community</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      name="phone_number" // Added phone_number input
                      placeholder="Phone Number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus:border-red-600 px-0 placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus:border-red-600 px-0 placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus:border-red-600 px-0 placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="password2"
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.password2}
                      onChange={handleChange}
                      className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus:border-red-600 px-0 placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-red-600 hover:text-red-700 font-medium">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Gradient Side */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
              <div className="absolute inset-0 bg-[url('/auth-pattern.svg')] opacity-20" />
              <div className="relative h-full flex flex-col items-center justify-center text-white p-12">
                <div className="w-24 h-24 bg-white/20 rounded-full mb-8" />
                <h2 className="text-3xl font-bold text-center mb-4">
                  Welcome to Kushals
                </h2>
                <p className="text-center text-white/80">
                  Discover our exquisite collection of handcrafted jewelry where tradition meets contemporary design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}