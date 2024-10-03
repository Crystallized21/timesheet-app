import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import {Toaster} from "@/components/ui/toaster";
import {NavigationMenuBar} from "@/components/NavigationMenu";


export const metadata: Metadata = {
  title: "Timesheet App",
  description: "Timesheet App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavigationMenuBar/>
            {children}
          </ThemeProvider>
        <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}