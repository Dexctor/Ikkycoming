import Airtable from 'airtable';

// Vérification des variables d'environnement avec plus de logs
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'ikki';

// Logging des valeurs (masquées pour la sécurité)
console.log('Config Airtable:', {
  apiKey: AIRTABLE_API_KEY ? '***' + AIRTABLE_API_KEY.slice(-4) : undefined,
  baseId: AIRTABLE_BASE_ID,
  tableName: AIRTABLE_TABLE_NAME
});

// Au début du fichier, après la définition des variables
console.log('Environment:', process.env.NODE_ENV);
console.log('Airtable Config:', {
  hasApiKey: !!AIRTABLE_API_KEY,
  apiKeyLength: AIRTABLE_API_KEY?.length,
  baseId: AIRTABLE_BASE_ID,
  tableName: AIRTABLE_TABLE_NAME
});

if (!AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not defined');
}

if (!AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not defined');
}

// Configuration d'Airtable
const base = new Airtable({ 
  apiKey: AIRTABLE_API_KEY,
  endpointUrl: 'https://api.airtable.com',
}).base(AIRTABLE_BASE_ID);

export const addSubscriberToAirtable = async (email: string) => {
  try {
    console.log('Starting addSubscriberToAirtable with:', {
      email,
      baseId: AIRTABLE_BASE_ID,
      tableName: AIRTABLE_TABLE_NAME
    });

    // Test de connexion à la base avec plus de détails sur l'erreur
    try {
      console.log('Tentative de connexion à Airtable...');
      const result = await base(AIRTABLE_TABLE_NAME).select().firstPage();
      console.log('Connexion à la table réussie, nombre d enregistrements:', result.length);
    } catch (e) {
      const error = e as Error;
      console.error('Erreur détaillée de connexion à la table:', {
        error,
        message: error.message,
        name: error.name,
        baseId: AIRTABLE_BASE_ID,
        tableName: AIRTABLE_TABLE_NAME
      });
      throw new Error(`AIRTABLE: Unable to connect to table - ${error.message}`);
    }

    console.log('Tentative d\'ajout à Airtable pour:', email);
    console.log('Base ID:', AIRTABLE_BASE_ID);
    console.log('Table:', AIRTABLE_TABLE_NAME);

    // Vérifier si l'email existe déjà
    const existingRecords = await base(AIRTABLE_TABLE_NAME)
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1
      })
      .firstPage();

    if (existingRecords.length > 0) {
      console.log('Email déjà existant:', email);
      throw new Error('AIRTABLE: Email already exists');
    }

    // Création du nouvel enregistrement avec uniquement les champs existants
    const records = await base(AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          'Email': email,
          'Date': new Date().toISOString()
        },
      },
    ]);
    
    console.log('Enregistrement créé avec succès:', records[0].getId());
    return records[0];
  } catch (error) {
    // Amélioration du logging d'erreur
    console.error('Erreur détaillée Airtable:', {
      error,
      baseId: AIRTABLE_BASE_ID,
      tableName: AIRTABLE_TABLE_NAME,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    if (error instanceof Error) {
      throw new Error(`AIRTABLE: ${error.message}`);
    }
    throw error;
  }
}; 