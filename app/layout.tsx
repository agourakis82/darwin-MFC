import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";
import KeyboardShortcuts from "./components/KeyboardShortcuts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Darwin MFC - Guia de Medicina de Família e Comunidade",
    template: "%s - Darwin MFC",
  },
  description: "Guia completo de Medicina de Família e Comunidade para consulta point-of-care na APS. 82 doenças, 138 medicamentos RENAME, protocolos flowchart e calculadoras clínicas com padrão acadêmico Q1. Codificação CIAP-2/CID-10.",
  keywords: [
    "medicina de família", "MFC", "APS", "atenção primária",
    "doenças", "medicamentos", "RENAME", "protocolos",
    "calculadoras médicas", "CIAP-2", "CID-10", "SUS",
    "residência médica", "genograma", "ecomapa", "SOAP"
  ],
  authors: [{ name: "Agourakis Med Research" }],
  creator: "Darwin Medical Foundation Cluster",
  publisher: "Darwin MFC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://agourakis82.github.io/darwin-MFC/",
    siteName: "Darwin MFC",
    title: "Darwin MFC - Guia de Medicina de Família e Comunidade",
    description: "Guia completo para consulta point-of-care na APS. Doenças, medicamentos, protocolos e calculadoras com padrão Q1.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Darwin MFC - Guia de Medicina de Família",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darwin MFC - Guia de MFC",
    description: "Guia completo de Medicina de Família para APS",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Darwin MFC",
  },
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  category: "medical",
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
          <KeyboardShortcuts />
          {/* Skip links for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Pular para o conteúdo principal
          </a>
          <a 
            href="#main-nav" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Pular para navegação
          </a>
          
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              <div className="hidden lg:block">
                <Sidebar />
              </div>
              <main id="main-content" className="flex-1 overflow-x-hidden" role="main" aria-label="Conteúdo principal">
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