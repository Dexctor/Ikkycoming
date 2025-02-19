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

// Google Analytics ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
    index: false,
    follow: false,
  },
  other: {
    'bfcache-opt-in': 'true'
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: BASE_URL,
  },
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
        
        {/* Google Analytics (ajouté seulement si GA_ID est défini) */}
        {GA_ID && (
          <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Préchargement optimisé de l'image du logo */}
        <link
          rel="preload"
          href="/images/logo/logo.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
