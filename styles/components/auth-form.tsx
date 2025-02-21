"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import type { LoginFormData, SignupFormData } from "@/types/auth"
import { validatePassword, validateEmail } from "@/lib/auth-validation"
import { loginUser, signupUser } from "@/lib/auth-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>()

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    watch,
  } = useForm<SignupFormData>()

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      await loginUser(data)
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      // TODO: Redirect to dashboard
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true)
      await signupUser(data)
      toast({
        title: "Success",
        description: "Account created successfully",
      })
      setIsLogin(true)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">IntervuX</h1>
        <p className="text-muted-foreground">The ultimate interview platform</p>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
            <Button variant={isLogin ? "default" : "ghost"} className="relative" onClick={() => setIsLogin(true)}>
              Login
            </Button>
            <Button variant={!isLogin ? "default" : "ghost"} className="relative" onClick={() => setIsLogin(false)}>
              Sign Up
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLoginSubmit(onLoginSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  {...loginRegister("email", {
                    required: "Email is required",
                    validate: (value) => validateEmail(value) || "Please enter a valid email",
                  })}
                />
                {loginErrors.email && <p className="text-sm text-destructive">{loginErrors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  {...loginRegister("password", {
                    required: "Password is required",
                  })}
                />
                {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" {...loginRegister("rememberMe")} />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button variant="link" className="px-0">
                  Forgot password?
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSignupSubmit(onSignupSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  {...signupRegister("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {signupErrors.name && <p className="text-sm text-destructive">{signupErrors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  {...signupRegister("email", {
                    required: "Email is required",
                    validate: (value) => validateEmail(value) || "Please enter a valid email",
                  })}
                />
                {signupErrors.email && <p className="text-sm text-destructive">{signupErrors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  {...signupRegister("password", {
                    required: "Password is required",
                    validate: (value) =>
                      validatePassword(value) ||
                      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                  })}
                />
                {signupErrors.password && <p className="text-sm text-destructive">{signupErrors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  {...signupRegister("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === watch("password") || "Passwords do not match",
                  })}
                />
                {signupErrors.confirmPassword && (
                  <p className="text-sm text-destructive">{signupErrors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

