import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intelligent Travel",
  description: "Intelligent destination finder for travelers who seek for something special",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <footer className="text-center m-4 text-sm text-slate-500">
        Created by Faiz Firdaus - 2024</footer></body>
    </html>
  );
}
