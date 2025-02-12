/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { isValidEmail } from '../../../utils/validation';
import { rateLimit } from '../../../utils/rate-limit';
import { addSubscriberToAirtable } from '../../../utils/airtable';
import { sanitizeEmail, isValidUserType } from '../../../utils/validation';
import { headers } from 'next/headers';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

// Liste des origines autorisées
const allowedOrigins = [
  'https://myikki.io',
  'https://www.myikki.io',
  'http://localhost:3000'
];

export async function POST(request: Request) {
  const headersList = headers();
  const referer = headersList.get('referer');
  
  // Vérifiez que la requête vient de votre site
  if (!referer || !allowedOrigins.some(origin => referer.startsWith(origin))) {
    return NextResponse.json(
      { error: 'Invalid referer' },
      { status: 403 }
    );
  }

  try {
    // Vérification de l'origine de manière plus flexible
    const origin = request.headers.get('origin');
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Origine non autorisée' },
        { 
          status: 403,
          headers: {
            'Access-Control-Allow-Origin': allowedOrigins.join(', '),
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    // Limite plus stricte : 5 requêtes par minute par IP
    await limiter.check(request, 5);

    const { email, type } = await request.json();
    
    // Sanitize email avant validation
    const sanitizedEmail = sanitizeEmail(email);

    // Validation plus stricte
    if (!email || !isValidUserType(type)) {
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

    try {
      await addSubscriberToAirtable(email);
      
      return NextResponse.json(
        { message: 'Inscription réussie' },
        { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        // Gestion des emails en double
        if (error.message.includes('Email already exists')) {
          return NextResponse.json(
            { 
              error: 'Email déjà inscrit',
              details: 'Cette adresse email est déjà enregistrée.'
            },
            { status: 409 }
          );
        }
        
        // Autres erreurs Airtable
        if (error.message.includes('AIRTABLE')) {
          return NextResponse.json(
            { 
              error: 'Service temporairement indisponible',
              details: 'Impossible de traiter votre inscription pour le moment. Veuillez réessayer plus tard.'
            },
            { status: 503 }
          );
        }
      }
      
      // Erreurs inattendues
      console.error('Erreur inattendue:', error);
      return NextResponse.json(
        { 
          error: 'Erreur inattendue',
          details: 'Une erreur est survenue lors de votre inscription. Veuillez réessayer plus tard.'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erreur signup détaillée:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    if (error instanceof Error) {
      if (error.message === 'Rate limit exceeded') {
        return NextResponse.json(
          { error: 'Trop de tentatives, veuillez réessayer plus tard' },
          { status: 429 }
        );
      }
      
      if (error.message.includes('AIRTABLE')) {
        // Message d'erreur plus détaillé pour le débogage
        return NextResponse.json(
          { 
            error: 'Erreur de configuration du service',
            details: error.message
          },
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

// Ajouter le gestionnaire OPTIONS pour le preflight CORS
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400' // 24 heures
    }
  });
} 