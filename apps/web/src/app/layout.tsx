"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/cadastro";

  useEffect(() => {
    // Check authentication on mount and route change
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token && !isAuthPage) {
      router.push("/login");
    }
  }, [isAuthPage, router]);

  return (
    <html lang="pt">
      <body className={`${inter.className} bg-background text-text-main antialiased flex h-screen overflow-hidden`}>
        {!isAuthPage && <Sidebar />}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
