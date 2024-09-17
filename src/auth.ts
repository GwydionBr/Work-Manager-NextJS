
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // Autorisierungs-Callback
    authorized: async ({ auth }) => {
      // Überprüfe, ob ein Benutzer authentifiziert ist (token vorhanden)
      return !!auth; // Wenn token existiert, ist der Benutzer eingeloggt
    },
  },
  trustHost: true, // Vertrauenswürdige Hosts erlauben (für Entwicklungszwecke)
})