import "./globals.css";
export const metadata = { title: "Serein", description: "Two-minute micro escapes." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-[#fff6f3] via-[#f1f4ff] to-[#eefaf5] min-h-screen text-slate-800">
        {children}
      </body>
    </html>
  );
}
