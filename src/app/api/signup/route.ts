/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { isValidEmail, sanitizeEmail, isValidUserType } from '../../../utils/validation';
import { rateLimit } from '../../../utils/rate-limit';

const WEBHOOK_URL = process.env.GOOGLE_WEBHOOK_URL;

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per interval
});

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json();

    // Validation basique
    if (!email || !type) {
      return NextResponse.json(
        { error: 'Email et type sont requis' },
        { status: 400 }
      );
    }

    // Ici, vous pouvez :
    // 1. Sauvegarder dans une base de données
    // 2. Envoyer à un service comme Mailchimp, SendGrid, etc.
    // 3. Ou simplement logger pour le moment
    console.log('Nouvelle inscription:', { email, type });

    return NextResponse.json(
      { message: 'Inscription réussie' },
      { status: 200, headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } }
    );
  } catch (error) {
    console.error('Erreur signup:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 