import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import Header from "@/components/header/main-header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gwydion Portfolio",
  description: "Portfolio of Gwydion Braunsdorf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/facions/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/facicons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/favicons/favicon-256x256.png"
        />
      </head>
      <body className="bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Providers>
              <Header />
              {children}
              <SpeedInsights />
              <Toaster />
            </Providers>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
