/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { isValidEmail } from '../../../utils/validation';
import { rateLimit } from '../../../utils/rate-limit';
import { addSubscriberToAirtable } from '../../../utils/airtable';

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    await limiter.check(request, 10); // Limite à 10 requêtes par minute par IP

    const { email, type } = await request.json();

    // Validation
    if (!email || type !== 'community') {
      return NextResponse.json(
        { error: 'Email invalide ou type incorrect' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Ajout à Airtable
    await addSubscriberToAirtable(email);

    return NextResponse.json(
      { message: 'Inscription réussie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur signup:', error);
    
    if (error instanceof Error) {
      if (error.message === 'Rate limit exceeded') {
        return NextResponse.json(
          { error: 'Trop de tentatives, veuillez réessayer plus tard' },
          { status: 429 }
        );
      }
      
      if (error.message.includes('AIRTABLE')) {
        return NextResponse.json(
          { error: 'Erreur de configuration du service' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 