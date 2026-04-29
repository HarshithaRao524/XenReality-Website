import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "YourCompany — AI-powered Operations Platform",
    template: "%s | YourCompany",
  },
  description:
    "One platform to improve safety, productivity, and profitability of your operations.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "YourCompany",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
