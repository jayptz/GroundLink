import type { Metadata } from "next";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "GroundLink - Field Operations",
  description: "Real-time field operations management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = getSession(cookieStore);

  return (
    <html lang="en">
      <body className="min-h-screen bg-black">
        <Navigation session={session} />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
