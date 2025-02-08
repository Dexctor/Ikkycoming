import { Metadata } from 'next';
import Link from 'next/link';
import { COLORS } from '@/app/constants/theme';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - MyIKKI',
  description: 'Politique de confidentialité et mentions légales de MyIKKI',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link 
          href="/"
          className="group flex items-center gap-2 text-sm text-zinc-400 mb-12 w-fit hover:text-white transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-bold text-white mb-12 border-b border-zinc-800 pb-6">
          Politique de Confidentialité
        </h1>

        <div className="prose prose-invert max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-li:text-zinc-300">
          <section className="mb-12 p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
            <h2 className="text-2xl mt-0">1. Collecte des informations</h2>
            <p>
              Nous collectons les informations suivantes :
            </p>
            <ul>
              <li>Adresse email</li>
              <li>Données de navigation (cookies)</li>
            </ul>
          </section>

          <section className="mb-12 p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
            <h2 className="text-2xl mt-0">2. Utilisation des informations</h2>
            <p>
              Les informations que nous collectons sont utilisées pour :
            </p>
            <ul>
              <li>Vous informer sur le lancement de notre plateforme</li>
              <li>Améliorer notre service</li>
              <li>Personnaliser votre expérience</li>
            </ul>
          </section>

          <section className="mb-12 p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
            <h2 className="text-2xl mt-0">3. Protection des informations</h2>
            <p>
              Nous mettons en œuvre une variété de mesures de sécurité pour 
              préserver la sécurité de vos informations personnelles.
            </p>
          </section>

          <section className="mb-12 p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
            <h2 className="text-2xl mt-0">4. Cookies</h2>
            <p>
              Nous utilisons des cookies pour :
            </p>
            <ul>
              <li>Comprendre et enregistrer vos préférences</li>
              <li>Compiler des données sur le trafic du site</li>
            </ul>
          </section>

          <section className="mb-12 p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
            <h2 className="text-2xl mt-0">5. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul>
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
            </ul>
          </section>

          <section className="mb-12 p-6 rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
            <h2 className="text-2xl mt-0">6. Nous contacter</h2>
            <p>
              Pour toute question concernant cette politique ou vos données personnelles,
              contactez-nous à : <a 
                href="mailto:privacy@myikki.com" 
                className="text-green-400 hover:text-green-300 transition-colors no-underline"
              >
                privacy@myikki.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 