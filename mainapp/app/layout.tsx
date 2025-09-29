import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "GroundLink App - Field Operations",
  description: "Real-time field operations management dashboard",
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = getSession(cookieStore);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navigation session={session} />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
