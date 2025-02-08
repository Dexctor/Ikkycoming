import { Metadata } from 'next';
import Link from 'next/link';
import { COLORS } from '@/app/constants/theme';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - MyIKKI',
  description: 'Politique de confidentialité et mentions légales de MyIKKI',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/"
          className={`text-sm ${COLORS.primary.text} mb-8 inline-block hover:underline`}
        >
          ← Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">
          Politique de Confidentialité
        </h1>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2>1. Collecte des informations</h2>
            <p>
              Nous collectons les informations suivantes :
            </p>
            <ul>
              <li>Adresse email</li>
              <li>Données de navigation (cookies)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>2. Utilisation des informations</h2>
            <p>
              Les informations que nous collectons sont utilisées pour :
            </p>
            <ul>
              <li>Vous informer sur le lancement de notre plateforme</li>
              <li>Améliorer notre service</li>
              <li>Personnaliser votre expérience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. Protection des informations</h2>
            <p>
              Nous mettons en œuvre une variété de mesures de sécurité pour 
              préserver la sécurité de vos informations personnelles.
            </p>
          </section>

          <section className="mb-8">
            <h2>4. Cookies</h2>
            <p>
              Nous utilisons des cookies pour :
            </p>
            <ul>
              <li>Comprendre et enregistrer vos préférences</li>
              <li>Compiler des données sur le trafic du site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>5. Vos droits</h2>
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

          <section className="mb-8">
            <h2>6. Nous contacter</h2>
            <p>
              Pour toute question concernant cette politique ou vos données personnelles,
              contactez-nous à : <a href="mailto:privacy@myikki.com" className="text-green-400">
              privacy@myikki.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 