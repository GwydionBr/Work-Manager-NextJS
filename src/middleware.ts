import { auth } from "@/auth"; // Importiere das auth-Objekt aus der auth.ts

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Nur Anfragen zu /time-tracker und dessen Unterrouten benötigen Authentifizierung
  if (pathname.startsWith("/time-tracker") && !req.auth) {
    // Leite zur Login-Seite um, wenn nicht authentifiziert
    const loginUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }

  // Alle anderen Routen dürfen ohne Authentifizierung passieren
  return;
});

// middleware.ts
export const config = {
  matcher: [
    "/time-tracker/:path*", // Nur Routen unter /time-tracker benötigen Authentifizierung
  ],
};
