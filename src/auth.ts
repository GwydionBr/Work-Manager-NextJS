import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "../drizzle/schema"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter( db ),
  providers: [GitHub, Google], 
   
})