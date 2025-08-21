import "./globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";

export const metadata = {
  title: "Serein",
  description: "Two-minute micro escapes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-50">
      <body className="min-h-dvh text-slate-900 antialiased">
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
