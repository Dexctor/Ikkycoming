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
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link 
          href="/"
          className="group flex items-center gap-2 text-sm text-zinc-400 mb-16 w-fit hover:text-white transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Retour à l'accueil
        </Link>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-16 pb-8 border-b border-zinc-800/50">
          Politique de Confidentialité
        </h1>

        <div className="space-y-10 prose prose-invert max-w-none">
          <p className="text-sm text-emerald-400/80 mb-12 font-medium">
            Dernière mise à jour : 08 février 2025
          </p>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">1. Introduction</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Bienvenue sur MyIKKI (ci-après « le Site »).
              </p>
              <p className="leading-relaxed">
                Dans le cadre de notre projet en développement, nous collectons certaines données personnelles,
                notamment les adresses e-mail des personnes souhaitant être informées de nos avancées.
              </p>
              <p className="leading-relaxed">
                Nous nous engageons à protéger vos données personnelles et à respecter les obligations légales en
                vigueur, notamment :
              </p>
              <ul className="space-y-2 text-zinc-400 list-disc pl-6">
                <li className="pl-2">Le Règlement Général sur la Protection des Données (RGPD) (UE) 2016/679</li>
                <li className="pl-2">Le Règlement MiCA (Markets in Crypto-Assets Regulation) concernant les actifs numériques en Europe</li>
                <li className="pl-2">Les directives de l'Autorité des Marchés Financiers (AMF) en France</li>
              </ul>
              <p className="leading-relaxed">
                Cette politique vise à vous informer sur la manière dont nous collectons, utilisons et protégeons vos
                données.
              </p>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">2. Responsable du traitement</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">Le responsable du traitement des données collectées sur ce site est :</p>
              <p className="leading-relaxed font-medium text-zinc-200">myikki.io / du porteur du projet Abel LEBAS</p>
              <p className="leading-relaxed">
                Email de contact : <a href="mailto:contact@myikki.io" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">contact@myikki.io</a>
              </p>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">3. Données collectées</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">Nous collectons uniquement les informations suivantes :</p>
              <p className="leading-relaxed font-medium text-emerald-400">
                ✅ Adresse e-mail (fournie volontairement via notre formulaire d'inscription).
              </p>
              <p className="leading-relaxed">
                Nous ne collectons aucune donnée sensible, aucune donnée bancaire, ni aucune information sans votre consentement explicite.
              </p>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">4. Finalités du traitement</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">Les informations collectées sont utilisées uniquement pour les finalités suivantes :</p>
              <ul className="space-y-2 text-zinc-400 list-disc pl-6">
                <li className="pl-2">Envoyer des informations sur l'évolution du projet de cryptomonnaie</li>
                <li className="pl-2">Communiquer sur des événements, actualités ou opportunités liées au projet</li>
                <li className="pl-2">Répondre aux demandes de contact des personnes intéressées</li>
              </ul>
              <p className="leading-relaxed">ℹ️ Nous ne revendons, ne louons et ne partageons pas vos données avec des tiers sans votre consentement.</p>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">5. Protection des informations</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Nous mettons en œuvre une variété de mesures de sécurité pour 
                préserver la sécurité de vos informations personnelles.
              </p>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">6. Cookies</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Nous utilisons des cookies pour :
              </p>
              <ul className="space-y-2 text-zinc-400 list-disc pl-6">
                <li className="pl-2">Comprendre et enregistrer vos préférences</li>
                <li className="pl-2">Compiler des données sur le trafic du site</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">7. Vos droits</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="space-y-2 text-zinc-400 list-disc pl-6">
                <li className="pl-2">Droit d'accès à vos données</li>
                <li className="pl-2">Droit de rectification</li>
                <li className="pl-2">Droit à l'effacement</li>
                <li className="pl-2">Droit à la limitation du traitement</li>
                <li className="pl-2">Droit à la portabilité</li>
              </ul>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">8. Nous contacter</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Pour toute question concernant cette politique ou vos données personnelles,
                contactez-nous à : <a 
                  href="mailto:privacy@myikki.com" 
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  privacy@myikki.com
                </a>
              </p>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">9. Modification de la politique de confidentialité</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment,
                notamment en cas d'évolution réglementaire.
              </p>
              <p className="mt-6 text-emerald-400/80 font-medium">
                ℹ️ Dernière mise à jour : 08 février 2025
              </p>
            </div>
          </section>

          <section className="mb-16 p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">Formulaire d'inscription</h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed font-medium text-emerald-400">
                ✔ "En renseignant votre adresse e-mail, vous acceptez de recevoir des communications liées
                à notre projet. Vous pouvez vous désinscrire à tout moment via le lien présent dans nos emails ou en nous contactant."
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 