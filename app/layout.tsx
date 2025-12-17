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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_PATH 
      ? 'https://agourakis82.github.io/darwin-MFC'
      : 'http://localhost:3000'
  ),
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
    icon: "/logos/sus-logo.svg",
    apple: "/logos/sus-logo.svg",
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
        <link rel="apple-touch-icon" href="/logos/sus-logo.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Detect basePath from current location
                var basePath = '';
                var pathname = window.location.pathname;
                var hostname = window.location.hostname;
                
                // If using custom domain, no basePath needed (files served from root)
                // Only use basePath for github.io subdirectory
                if (hostname.includes('github.io') && pathname.startsWith('/darwin-MFC')) {
                  basePath = '/darwin-MFC';
                } else if (hostname.includes('github.io') && !pathname.startsWith('/darwin-MFC')) {
                  // GitHub Pages without subdirectory in path - might need basePath
                  basePath = '/darwin-MFC';
                }
                // Custom domain (mfc.agourakis.med.br) serves from root, so basePath = ''
                
                // Update manifest, icon, and CSS links based on basePath
                // If custom domain is detected, remove basePath from links
                var isCustomDomain = !hostname.includes('github.io');
                
                if (isCustomDomain) {
                  // Custom domain: remove basePath from all links
                  var manifestLink = document.querySelector('link[rel="manifest"]');
                  if (manifestLink) {
                    var manifestHref = manifestLink.getAttribute('href');
                    if (manifestHref && manifestHref.startsWith('/darwin-MFC')) {
                      manifestLink.setAttribute('href', manifestHref.replace('/darwin-MFC', ''));
                    }
                  }
                  var appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
                  if (appleIcon) {
                    var iconHref = appleIcon.getAttribute('href');
                    if (iconHref && iconHref.startsWith('/darwin-MFC')) {
                      appleIcon.setAttribute('href', iconHref.replace('/darwin-MFC', ''));
                    }
                  }
                  // Remove basePath from CSS links
                  var cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
                  cssLinks.forEach(function(link) {
                    var href = link.getAttribute('href');
                    if (href && href.startsWith('/darwin-MFC/_next/')) {
                      link.setAttribute('href', href.replace('/darwin-MFC', ''));
                    }
                  });
                  // Remove basePath from script src attributes
                  var scripts = document.querySelectorAll('script[src]');
                  scripts.forEach(function(script) {
                    var src = script.getAttribute('src');
                    if (src && src.startsWith('/darwin-MFC/_next/')) {
                      script.setAttribute('src', src.replace('/darwin-MFC', ''));
                    }
                  });
                } else if (basePath) {
                  // GitHub Pages subdirectory: add basePath to links
                  var manifestLink = document.querySelector('link[rel="manifest"]');
                  if (manifestLink) {
                    manifestLink.setAttribute('href', basePath + '/manifest.json');
                  }
                  var appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
                  if (appleIcon) {
                    appleIcon.setAttribute('href', basePath + '/logos/sus-logo.svg');
                  }
                  // Update CSS links
                  var cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
                  cssLinks.forEach(function(link) {
                    var href = link.getAttribute('href');
                    if (href && href.startsWith('/_next/') && !href.startsWith(basePath)) {
                      link.setAttribute('href', basePath + href);
                    }
                  });
                  // Update script src attributes
                  var scripts = document.querySelectorAll('script[src]');
                  scripts.forEach(function(script) {
                    var src = script.getAttribute('src');
                    if (src && src.startsWith('/_next/') && !src.startsWith(basePath)) {
                      script.setAttribute('src', basePath + src);
                    }
                  });
                }
                
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
                
                // Register Service Worker with basePath support
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    var swPath = basePath + '/sw.js';
                    navigator.serviceWorker.register(swPath).then(function(registration) {
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