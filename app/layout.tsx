import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";

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
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('app-theme');
                  // Dark mode como padrão se não houver preferência salva
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // Fallback para dark mode
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
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
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}