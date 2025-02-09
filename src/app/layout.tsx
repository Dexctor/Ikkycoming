import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CookieBanner } from './components/CookieBanner';

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

// Définir l'URL de base pour les métadonnées
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://myikki.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "MyIKKI - L'Immobilier Réinventé par les Jumeaux Numériques",
  description: "Découvrez MyIKKI, la première plateforme immersive qui révolutionne l'expérience immobilière. Explorez, sublimez et transformez vos espaces grâce aux jumeaux numériques.",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    title: "MyIKKI - L'Immobilier Réinventé",
    description: "Première plateforme immersive de jumeaux numériques pour l'immobilier",
    siteName: 'MyIKKI',
    images: [
      {
        url: `${BASE_URL}/images/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'MyIKKI Preview',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "MyIKKI - L'Immobilier Réinventé",
    description: "Première plateforme immersive de jumeaux numériques pour l'immobilier",
    images: [`${BASE_URL}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'bfcache-opt-in': 'true'
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Permettre le zoom pour l'accessibilité
  userScalable: true, // Permettre le zoom pour l'accessibilité
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Script Google Analytics avec consentement par défaut désactivé */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
                'cookie_flags': 'SameSite=None;Secure'
              });
              // Désactiver le consentement par défaut
              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });
              // Vérifier le consentement existant
              const consent = localStorage.getItem('cookie-consent');
              if (consent === 'accepted') {
                gtag('consent', 'update', {
                  'analytics_storage': 'granted'
                });
              }
            `,
          }}
        />
        
        {/* Préchargement optimisé de l'image du logo */}
        <link
          rel="preload"
          href="/images/logo/logo.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
          imageSrcSet="/images/logo/logo.webp?w=120 1x, /images/logo/logo.webp?w=240 2x"
          imageSizes="120px"
        />
      </head>
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
