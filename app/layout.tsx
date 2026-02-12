import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ClientSessionProvider } from "@/components/ClientSessionProvider";

export const metadata: Metadata = {
  title: "Anti-Valentine Commission of India",
  description:
    "Official satire portal of the Anti-Valentine Commission of India under the Ministry of Emotional Independence.",
  icons: {
    icon: "/images/images.png",
    shortcut: "/images/images.png",
    apple: "/images/images.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-664BD8RWG6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-664BD8RWG6');
          `}
        </Script>
        <div className="min-h-screen bg-white">
          <ClientSessionProvider>
            <Header />
            <main className="max-w-6xl px-4 py-8 mx-auto w-full">{children}</main>
            <Footer />
          </ClientSessionProvider>
        </div>
      </body>
    </html>
  );
}
