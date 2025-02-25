"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import Header from "@/components/header"
import { usePathname } from "next/navigation"
import Footer from "@/components/footer";
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const route = usePathname();
  const authRoute = [
    '/login',
    '/dashboard'
  ].some(path => route.startsWith(path))

  return <NextThemesProvider {...props}>
    {!authRoute && <Header />}
    {children}
    {!authRoute && <Footer />}
    </NextThemesProvider>
}

