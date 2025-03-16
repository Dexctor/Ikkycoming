import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CookieBanner } from './components/CookieBanner';
import TrackingScript from "@/app/components/TrackingScript";
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

// Définir l'URL de base pour les métadonnées
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://myikki.com';

// Google Analytics ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Pixels publicitaires
const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const LINKEDIN_PIXEL_ID = process.env.NEXT_PUBLIC_LINKEDIN_PIXEL_ID;
const TWITTER_PIXEL_ID = process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID;

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

        {/* Twitter/X Pixel */}
        {TWITTER_PIXEL_ID && (
          <Script id="twitter-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              !function(e,t,n,s,u,a){
                e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},
                s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))
              }(window,document,'script');
              twq('config', '${TWITTER_PIXEL_ID}');
            `,
          }} />
        )}

        {/* Facebook Pixel */}
        {FACEBOOK_PIXEL_ID && (
          <>
            <Script id="facebook-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments);};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(n)[0];
                  s.parentNode.insertBefore(t,s)
                }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FACEBOOK_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }} />
            <noscript>
              <img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`} />
            </noscript>
          </>
        )}

        {/* LinkedIn Pixel */}
        {LINKEDIN_PIXEL_ID && (
          <>
            <Script id="linkedin-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                _linkedin_partner_id = "${LINKEDIN_PIXEL_ID}";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              `,
            }} />
            <Script id="linkedin-tracking" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);
                })(window.lintrk);
              `,
            }} />
            <noscript>
              <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PIXEL_ID}&fmt=gif`} />
            </noscript>
          </>
        )}

        {/* Préchargement optimisé de l'image du logo */}
        <link rel="preload" href="/images/logo/logo.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body className={inter.className}>
        {children}
        <CookieBanner />
        <TrackingScript />
      </body>
    </html>
  );
}
