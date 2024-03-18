import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers/providers";
import ToasterProvider from "@/components/ToasterProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RD Realty Development Corporation",
  description: "RD Realty Property Management System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider
      attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
       <Providers>
        <ToasterProvider />
        {children}
        </Providers>
        </ThemeProvider>
        <SpeedInsights />
        </body>
    </html>
  );
}
