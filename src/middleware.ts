import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
  'https://myikki.io',
  'https://www.myikki.io',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
].filter(Boolean);

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, { 
      status: 403,
      statusText: 'Forbidden'
    });
  }
    
  // Vérifier si l'origine est autorisée
  const isAllowedOrigin = !origin || allowedOrigins.includes(origin)

  // Option pour retourner la réponse avec les bons headers CORS
  const responseHeaders = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin || '*' : '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }

  // Gérer les requêtes OPTIONS (preflight)
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: responseHeaders })
  }

  // Continuer avec la requête en ajoutant les headers CORS
  const response = NextResponse.next()
  
  Object.entries(responseHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*',
} 