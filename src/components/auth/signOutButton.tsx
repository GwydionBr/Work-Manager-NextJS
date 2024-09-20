"use client"
import { signOut } from "next-auth/react"
import { Button } from "@nextui-org/button"
 
export default function SignOutButton() {
  return <Button onClick={() => signOut()}>Logout</Button>
}