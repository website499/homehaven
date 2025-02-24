import type { Metadata } from "next"
import LoginForm from "./login-form"

export const metadata: Metadata = {
  title: "Login - HomeHaven",
  description: "Log in to your HomeHaven account to manage your properties and applications.",
}

export default function LoginPage() {
  return <LoginForm />
}

