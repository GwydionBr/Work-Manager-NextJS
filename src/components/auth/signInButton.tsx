"use client"
import { signIn } from "next-auth/react"
import { Button } from "@nextui-org/button"

 
export default function SignInButton() {
  return (
    <Button onClick={() => signIn()}>
      Sign In
    </Button>
  )
}