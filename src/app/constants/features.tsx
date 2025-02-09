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
    desc: "Vous pourrez explorer vos biens en 3D grâce à des maquettes numériques interactives. Vivez une expérience digitale ludique et inédite pour repenser et réimaginer chaque espace de manière innovante.",
    icon: "⬢",
    color: "from-violet-500 to-green-400"
  },
  {
    title: "Gérer vos Jumeaux Numériques",
    desc: (
      <>
        Vous pourrez exploiter des informations détaillées et conformes aux normes pour visualiser, concevoir et valoriser vos projets immobiliers grâce à la{' '}
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
        Vous pourrez vous connecter à une plateforme riche en outils, services et expertises. Accédez à un réseau qui enrichit chacun de vos projets du concept à la réalisation grâce aux{' '}
        <span className="text-green-500 font-medium">Smart Contracts</span>.
      </>
    ),
    icon: "⬣",
    color: "from-violet-500 to-green-400"
  }
];