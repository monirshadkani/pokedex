import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PokemonTypesProvider } from "@/contexts/PokemonTypesContextProvider";
import { PokemonProvider } from "@/contexts/PokemonContextProvider";
import { Providers } from "@/contexts/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "A simple Pokédex application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <Providers>
          <PokemonTypesProvider>
            <PokemonProvider>
              <main className="container mx-auto px-4 py-8 max-w-7xl">
                {children}
              </main>
            </PokemonProvider>
          </PokemonTypesProvider>
        </Providers>
      </body>
    </html>
  );
}
