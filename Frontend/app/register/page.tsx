"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAuth } from "@/lib/api/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone_number: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Form submission started"); // Debug log for form submission start
    e.preventDefault()
    setIsLoading(true)

    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(formData.phone_number)) {
      console.log("Phone number validation failed"); // Debug log for phone number validation failure
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate password match
    if (formData.password !== formData.password2) {
      console.log("Password match validation failed"); // Debug log for password match validation failure
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      console.log("Password strength validation failed"); // Debug log for password strength validation failure
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      console.log("Attempting to register"); // Debug log for registration attempt
      await register(formData)
      console.log("Registration successful"); // Debug log for successful registration
      toast({
        title: "Registration successful",
        description: "You have successfully registered.",
      })
      router.push("/")
    } catch (error) {
      console.error('Registration error:', error); // Debug log for registration error
      // Toast is handled in useAuth hook
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Field ${e.target.name} changed to ${e.target.value}`); // Debug log for field change
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
                      name="phone_number"
                      placeholder="Phone Number (e.g. +1234567890)"
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
                      placeholder="Email Address (Optional)"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-b border-t-0 border-x-0 rounded-none focus:border-red-600 px-0 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password (min. 8 characters)"
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