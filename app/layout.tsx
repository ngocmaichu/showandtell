// app/layout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link href="/"   className={`nav-link${path === "/"   ? " active" : ""}`}>Random Joke</Link>
          <Link href="/card" className={`nav-link${path === "/card" ? " active" : ""}`}>Joke Card</Link>
          <Link href="/filter" className={`nav-link${path === "/filter" ? " active" : ""}`}>Filter Jokes</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}



