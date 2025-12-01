import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";

export const metadata: Metadata = {
  title: "Rastreamentos Populacionais no SUS (2025) - Análise Sistêmica Q1",
  description: "Análise comparativa dos rastreamentos populacionais recomendados pelo SUS e Sociedades Médicas, com sistema completo de referências acadêmicas padrão Q1/Nature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              <div className="hidden lg:block">
                <Sidebar />
              </div>
              <main className="flex-1 overflow-x-hidden">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}