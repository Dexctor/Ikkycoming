import React from 'react';

export interface Feature {
  title: string;
  desc: React.ReactNode;
  icon: string;
  color: string;
}

export const FEATURES: Feature[] = [
  {
    title: "Explorer en 3D",
    desc: "Plongez au coeur de vos bien grâce à des maquettes numériques interactives. Vivez une expérience digitale ludique et inédite pour repenser et réimaginer chaque espace de manière innovante.",
    icon: "⬡",
    color: "from-green-400 to-violet-500"
  },
  {
    title: "Gérer vos Jumeaux Numériques",
    desc: (
      <>
        Exploiter des informations détaillées et conformes aux normes pour une visualisation, une concevoir précises et valoriser vos projets immobiliers grâce à la{' '}
        <span className="text-green-500 font-medium">Tokenisation</span>.
      </>
    ),
    icon: "⬢",
    color: "from-violet-500 to-green-400"
  },
  {
    title: "Collaborer dans notre Écosystème",
    desc: (
      <>
        Connectez-vous à une plateforme riche en outils, services et expertises. Accédez à un réseau qui enrichit chacun de vos projets du concept à la réalisation grâce aux{' '}
        <span className="text-green-500 font-medium">Smart Contracts</span>.
      </>
    ),
    icon: "⬣",
    color: "from-violet-500 to-green-400"
  }
];