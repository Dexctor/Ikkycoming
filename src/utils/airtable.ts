import Airtable from 'airtable';

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not defined');
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not defined');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

  export const addSubscriberToAirtable = async (email: string) => {
    try {
      const records = await base('ikki').create([
        {
          fields: {
            'Email': email,
            'Date': new Date().toISOString()
          },
        },
      ]);
      
      return records[0];
    } catch (error) {
      console.error('Erreur Airtable:', error);
      if (error instanceof Error) {
        throw new Error(`AIRTABLE: ${error.message}`);
      }
      throw error;
    }
  }; 