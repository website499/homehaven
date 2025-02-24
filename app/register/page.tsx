import type { Metadata } from "next"
import RegisterForm from "./register-form"

export const metadata: Metadata = {
  title: "Register - HomeHaven",
  description: "Create your HomeHaven account to start your home search journey.",
}

export default function RegisterPage() {
  return <RegisterForm />
}

