import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { defaultLocale } from '@/i18n/config';
import ThemeProvider from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import { PWAProvider } from "./components/PWA";
import { ToastProvider } from "./components/ui/Toast";

// NOTE: This root layout is used for pages NOT under [locale]/
// Pages under [locale]/ have their own layout with Header/Sidebar/Footer
// This prevents duplicate menus

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Provide default locale messages for pages not yet migrated to [locale]
  const messages = await getMessages({ locale: defaultLocale });
  
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        {/* CRITICAL: This script MUST run first, before any CSS/JS resources load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // CRITICAL: Execute synchronously before any resources load
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
                
                // Fix links IMMEDIATELY before page loads
                var isCustomDomain = !hostname.includes('github.io');
                
                // CRITICAL: Fix links IMMEDIATELY for custom domain
                // Must execute before browser starts loading resources
                if (isCustomDomain) {
                  // Intercept appendChild to fix links before they're added
                  var originalAppendChild = Node.prototype.appendChild;
                  Node.prototype.appendChild = function(child) {
                    if (child.tagName === 'LINK') {
                      var href = child.getAttribute('href');
                      if (href && href.startsWith('/darwin-MFC/')) {
                        child.setAttribute('href', href.replace('/darwin-MFC', ''));
                      }
                    }
                    if (child.tagName === 'SCRIPT') {
                      var src = child.getAttribute('src');
                      if (src && src.startsWith('/darwin-MFC/')) {
                        child.setAttribute('src', src.replace('/darwin-MFC', ''));
                      }
                    }
                    return originalAppendChild.call(this, child);
                  };
                  
                  // Fix existing links in head IMMEDIATELY (synchronous)
                  var head = document.head || document.getElementsByTagName('head')[0];
                  if (head) {
                    // Fix CSS links - remove and recreate to prevent loading
                    var cssLinks = Array.from(head.querySelectorAll('link[rel="stylesheet"]'));
                    cssLinks.forEach(function(link) {
                      var href = link.getAttribute('href');
                      if (href && href.startsWith('/darwin-MFC/')) {
                        var newHref = href.replace('/darwin-MFC', '');
                        // Remove old link
                        link.remove();
                        // Create new link with correct path
                        var newLink = document.createElement('link');
                        newLink.rel = 'stylesheet';
                        newLink.href = newHref;
                        newLink.setAttribute('data-precedence', link.getAttribute('data-precedence') || 'next');
                        head.appendChild(newLink);
                      }
                    });
                    
                    // Fix preload links
                    var preloadLinks = Array.from(head.querySelectorAll('link[rel="preload"]'));
                    preloadLinks.forEach(function(link) {
                      var href = link.getAttribute('href');
                      if (href && href.startsWith('/darwin-MFC/')) {
                        link.setAttribute('href', href.replace('/darwin-MFC', ''));
                      }
                    });
                    
                    // Fix scripts - remove and recreate IMMEDIATELY
                    // Must do this before browser starts loading them
                    var scripts = Array.from(head.querySelectorAll('script[src]'));
                    scripts.forEach(function(script) {
                      var src = script.getAttribute('src');
                      if (src && src.startsWith('/darwin-MFC/')) {
                        var newSrc = src.replace('/darwin-MFC', '');
                        var async = script.hasAttribute('async');
                        var defer = script.hasAttribute('defer');
                        var fetchPriority = script.getAttribute('fetchPriority');
                        // Remove old script BEFORE creating new one
                        script.remove();
                        // Create new script with correct path
                        var newScript = document.createElement('script');
                        newScript.src = newSrc;
                        if (async) newScript.async = true;
                        if (defer) newScript.defer = true;
                        if (fetchPriority) newScript.setAttribute('fetchPriority', fetchPriority);
                        // Insert at same position if possible, otherwise append
                        head.appendChild(newScript);
                      }
                    });
                    
                    // Also fix preload links for scripts
                    var preloadScripts = Array.from(head.querySelectorAll('link[rel="preload"][as="script"]'));
                    preloadScripts.forEach(function(link) {
                      var href = link.getAttribute('href');
                      if (href && href.startsWith('/darwin-MFC/')) {
                        link.setAttribute('href', href.replace('/darwin-MFC', ''));
                      }
                    });
                  }
                  
                  // MutationObserver as fallback for dynamically added elements
                  if (window.MutationObserver) {
                    var observer = new MutationObserver(function(mutations) {
                      mutations.forEach(function(mutation) {
                        mutation.addedNodes.forEach(function(node) {
                          if (node.nodeType === 1) {
                            if (node.tagName === 'LINK') {
                              var href = node.getAttribute('href');
                              if (href && href.startsWith('/darwin-MFC/')) {
                                node.setAttribute('href', href.replace('/darwin-MFC', ''));
                              }
                            }
                            if (node.tagName === 'SCRIPT') {
                              var src = node.getAttribute('src');
                              if (src && src.startsWith('/darwin-MFC/')) {
                                node.setAttribute('src', src.replace('/darwin-MFC', ''));
                              }
                            }
                          }
                        });
                      });
                    });
                    observer.observe(document.head, { childList: true, subtree: true });
                  }
                }
                
                // Update manifest, icon, and CSS links based on basePath
                // If custom domain is detected, remove basePath from links
                
                if (isCustomDomain) {
                  // Custom domain: remove basePath from all links IMMEDIATELY
                  // Use document.head to access elements before body loads
                  var head = document.head || document.getElementsByTagName('head')[0];
                  
                  // Fix CSS links
                  var cssLinks = head.querySelectorAll('link[rel="stylesheet"]');
                  for (var i = 0; i < cssLinks.length; i++) {
                    var link = cssLinks[i];
                    var href = link.getAttribute('href');
                    if (href && href.startsWith('/darwin-MFC/_next/')) {
                      link.setAttribute('href', href.replace('/darwin-MFC', ''));
                    }
                  }
                  
                  // Fix preload links
                  var preloadLinks = head.querySelectorAll('link[rel="preload"]');
                  for (var i = 0; i < preloadLinks.length; i++) {
                    var link = preloadLinks[i];
                    var href = link.getAttribute('href');
                    if (href && href.startsWith('/darwin-MFC/_next/')) {
                      link.setAttribute('href', href.replace('/darwin-MFC', ''));
                    }
                  }
                  
                  // Fix manifest and icons
                  var manifestLink = head.querySelector('link[rel="manifest"]');
                  if (manifestLink) {
                    var manifestHref = manifestLink.getAttribute('href');
                    if (manifestHref && manifestHref.startsWith('/darwin-MFC')) {
                      manifestLink.setAttribute('href', manifestHref.replace('/darwin-MFC', ''));
                    }
                  }
                  var appleIcon = head.querySelector('link[rel="apple-touch-icon"]');
                  if (appleIcon) {
                    var iconHref = appleIcon.getAttribute('href');
                    if (iconHref && iconHref.startsWith('/darwin-MFC')) {
                      appleIcon.setAttribute('href', iconHref.replace('/darwin-MFC', ''));
                    }
                  }
                  
                  // Fix scripts in head (they load after this script)
                  // We'll also fix them after DOM loads as fallback
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
                
                // Fix script tags after DOM loads (fallback for scripts in body)
                if (isCustomDomain) {
                  document.addEventListener('DOMContentLoaded', function() {
                    var scripts = document.querySelectorAll('script[src]');
                    for (var i = 0; i < scripts.length; i++) {
                      var script = scripts[i];
                      var src = script.getAttribute('src');
                      if (src && src.startsWith('/darwin-MFC/_next/')) {
                        script.setAttribute('src', src.replace('/darwin-MFC', ''));
                      }
                    }
                  });
                }
                
                // Register Service Worker with basePath support
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    var swPath = (isCustomDomain ? '' : basePath) + '/sw.js';
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
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
          <ToastProvider />
          <PWAProvider />
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}