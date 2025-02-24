import "./globals.css";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Open_Sans } from 'next/font/google';


const OpenSans = Open_Sans({subsets:['latin']})
export const metadata: Metadata = {
    title: {
        template:" %s |  NEW TEMPLATE",
        default:"NEW TEMPLATE"
    },
    description: "A new Nextjs Scaffolded Template",
    icons: {
        icon: "/logo.svg",
        shortcut: "/logo.svg",
        apple: "/logo.svg",
    },
};

export const viewport:Viewport={

    width:"device-width",
    initialScale:1,
    maximumScale:1,
    userScalable:false,

}

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <SessionProvider>
                <html lang="en" suppressHydrationWarning>
                <head />
                <body className={`${OpenSans.className} bg-background font-sans antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
                </body>
                </html>
            </SessionProvider>
        </>
    );
}
