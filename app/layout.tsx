import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ClientSessionProvider } from "@/components/ClientSessionProvider";

export const metadata: Metadata = {
  title: "Anti-Valentine Commission of India",
  description:
    "Official satire portal of the Anti-Valentine Commission of India under the Ministry of Emotional Independence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
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
