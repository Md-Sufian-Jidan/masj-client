import type { Metadata } from "next";
import { Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "MASJ MART",
  description: "A complete ecommerce platform",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${merriweather.className} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
      >
        <Providers>
          <TooltipProvider>
            <Toaster richColors position="top-center" />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
