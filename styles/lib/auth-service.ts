import type { LoginFormData, SignupFormData, AuthResponse } from "@/types/auth"

// TODO: Replace with actual database connection
const MOCK_DB = new Map<string, { name: string; email: string; password: string }>()

export async function loginUser(data: LoginFormData): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // TODO: Replace with actual database query
  const user = MOCK_DB.get(data.email)

  if (!user || user.password !== data.password) {
    throw new Error("Invalid email or password")
  }

  return {
    success: true,
    message: "Login successful",
  }
}

export async function signupUser(data: SignupFormData): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // TODO: Replace with actual database query
  if (MOCK_DB.has(data.email)) {
    throw new Error("Email already exists")
  }

  MOCK_DB.set(data.email, {
    name: data.name,
    email: data.email,
    password: data.password,
  })

  return {
    success: true,
    message: "Account created successfully",
  }
}

