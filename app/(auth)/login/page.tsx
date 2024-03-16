"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation"

export default function LoginAccount() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const isEmailValid = (email: string): boolean => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Data validation
    if (!email.trim()) {
      toast.error('Email is required.')
      return
    }

    if (!isEmailValid(email)) {
      toast.error('Please enter a valid email.')
      return
    }

    if (!password.trim()) {
      toast.error('Password is required.')
      return
    }

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (!res?.error) {
        router.push('/dashboard')
      } else {
        toast.error('Invalid email or password. Please try again.')
      }
    } catch (error: any) {
      console.error("Sign-in error:", error)
      toast.error('An error occurred during sign-in. Please try again.')
    }
  }
  

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden rounded">
      <div className="w-full m-auto bg-white lg:max-w-lg rounded">
        <Card className="rounded">
          <CardHeader className="space-y-1 rounded">
            <CardTitle className="text-2xl text-center rounded">Sign in</CardTitle>
            <CardDescription className="text-center rounded">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 rounded">
            <div className="grid gap-2 rounded">
              <Label htmlFor="email">Email</Label>
              <Input 
              id="email" 
              type="email"
               placeholder=""
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="grid gap-2 rounded">
              <Label htmlFor="password">Password</Label>
              <Input 
              id="password"
               type="password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div className="flex items-center space-x-2 rounded">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={onSubmit}>Login</Button>
          </CardFooter>
          <div className="relative mb-2 rounded">
            <div className="absolute inset-0 flex items-center rounded">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase rounded">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 m-2 rounded">
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline">
              <Icons.twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div>

          <p className="mt-2 text-xs text-center text-gray-700 mb-2">
            {" "}
            Dont have an account? <Link className="text-indigo-500 hover:underline" href="/register" />{" "}
            <span className=" text-blue-600 hover:underline">Sign up</span>
          </p>
        </Card>
      </div>
    </div>
  )
}