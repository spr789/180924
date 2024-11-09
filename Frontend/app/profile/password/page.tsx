"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

export default function ChangePasswordPage() {
  const { changePassword } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await changePassword(formData)
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      })
      setFormData({
        old_password: "",
        new_password1: "",
        new_password2: "",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to change password. Please check your current password and try again.",
        variant: "destructive",
      })
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
      <main className="min-h-screen py-16">
        <div className="container max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold mb-6">Change Password</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="old_password">Current Password</Label>
                  <Input
                    id="old_password"
                    name="old_password"
                    type="password"
                    value={formData.old_password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="new_password1">New Password</Label>
                  <Input
                    id="new_password1"
                    name="new_password1"
                    type="password"
                    value={formData.new_password1}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="new_password2">Confirm New Password</Label>
                  <Input
                    id="new_password2"
                    name="new_password2"
                    type="password"
                    value={formData.new_password2}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}