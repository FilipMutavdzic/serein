import "./globals.css";
import Nav from "@/app/@/components/Nav";
import Footer from "@/app/@/components/Footer";

export const metadata = { title: "Serein", description: "Two-minute micro escapes." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        {/* soft blobs */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-[var(--brand-300)]" />
          <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full blur-3xl opacity-20 bg-emerald-200" />
        </div>

        <Nav />
        <main className="container-6xl py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
