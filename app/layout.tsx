import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Darwin MFC - Guia de Medicina de Família e Comunidade",
  description: "Guia completo de Medicina de Família e Comunidade para consulta point-of-care na APS. Doenças, medicamentos, protocolos e calculadoras com padrão acadêmico Q1.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Darwin MFC",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
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
                
                // Register Service Worker
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                      console.log('ServiceWorker registered: ', registration.scope);
                    }).catch(function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                  });
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