import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
import { AuthProvider } from '../components/providers/AuthProvider'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrainFCK - Authentication System",
  description: "Secure authentication with email and password",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TamaguiProvider config={tamaguiConfig}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TamaguiProvider>
      </body>
    </html>
  );
}
