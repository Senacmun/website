import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyNavbarHandler from "@/components/StickyNavbarHandler";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SenaMUN V",
  description: "Venha conhecer nossa simulação!",
  icons: {
    icon: "/logo-senamun.png",
    shortcut: "/logo-senamun.png",
    apple: "/logo-senamun.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />
</head>
      <body className={poppins.className}>
        <ThemeProvider>
          <StickyNavbarHandler />
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}