import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gwydion",
  description: "Portfoli Seite von Gwydion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
