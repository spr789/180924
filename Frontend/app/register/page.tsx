'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(formData);
      toast({
        title: 'Registration successful!',
        description: 'Your account has been created.',
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please check your information and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">
          {/* Form Side */}
          <div className="p-8 md:p-12">
            <div className="mx-auto max-w-sm">
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-2xl font-bold">Create Account</h1>
                <p className="text-gray-600">Join our jewelry community</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="rounded-none border-x-0 border-b border-t-0 bg-transparent px-0 placeholder:text-gray-500 focus:border-red-600"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="rounded-none border-x-0 border-b border-t-0 bg-transparent px-0 placeholder:text-gray-500 focus:border-red-600"
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
                      className="rounded-none border-x-0 border-b border-t-0 bg-transparent px-0 placeholder:text-gray-500 focus:border-red-600"
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
                      className="rounded-none border-x-0 border-b border-t-0 bg-transparent px-0 placeholder:text-gray-500 focus:border-red-600"
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
                      className="rounded-none border-x-0 border-b border-t-0 bg-transparent px-0 placeholder:text-gray-500 focus:border-red-600"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-medium text-red-600 hover:text-red-700"
                  >
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
              <div className="relative flex h-full flex-col items-center justify-center p-12 text-white">
                <div className="mb-8 h-24 w-24 rounded-full bg-white/20" />
                <h2 className="mb-4 text-center text-3xl font-bold">
                  Welcome to Kushals
                </h2>
                <p className="text-center text-white/80">
                  Discover our exquisite collection of handcrafted jewelry where
                  tradition meets contemporary design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
