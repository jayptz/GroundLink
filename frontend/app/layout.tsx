import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "GroundLink - AI Agent for House and Construction",
  description: "AI agent for around the House and Construction needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
