import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: new URL("https://www.muebleriatiojaime.com/"),
  title: "Tio Jaime Muebleria",
  description: "Crea tu espacio",
  openGraph: {
    title: "Tio Jaime Muebleria",
    description: "Crea tu espacio",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
      }
    ],
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
