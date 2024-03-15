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


export default function LoginAccount() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [hasError, setHasError] = useState(false) // Add this line

    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      // Reset error state
      setError('')
      setHasError(false) // Add this line

      // Validate email and password
      if (!email || !password) {
          setError('Email and password are required.')
          setHasError(true) // Add this line
          return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
          setError('Please enter a valid email address.')
          setHasError(true) // Add this line
          return
      }

      signIn('credentials', {
          email,
          password,
          callbackUrl: '/dashboard'
      })
  }



  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
              {error && <p className="text-red-500">{error}</p>}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
              id="email" 
              type="email"
               placeholder=""
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className={hasError ? 'border-red-500' : ''}
               />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
              id="password"
               type="password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className={hasError ? 'border-red-500' : ''}
               />
            </div>
            <div className="flex items-center space-x-2">
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
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 m-2">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
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