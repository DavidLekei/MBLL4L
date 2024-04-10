import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthenticationProvider from "@/api/auth/auth";
import SettingsProvider from '@/components/settings/settings'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MBLL4L",
  description: "Manitoba Lawyer Lookup For Lawyers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticationProvider>
      <SettingsProvider>
      <html lang="en">
        <body className="!min-w-full" >{children}</body>
      </html>
      </SettingsProvider>
    </AuthenticationProvider>
  );
}
