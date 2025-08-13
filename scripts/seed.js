
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'whatsapp';

async function seed() {
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Create indexes for better performance
    const messagesCollection = db.collection('processed_messages');
    
    await messagesCollection.createIndex({ id: 1 }, { unique: true });
    await messagesCollection.createIndex({ timestamp: -1 });
    await messagesCollection.createIndex({ from: 1, to: 1 });
    await messagesCollection.createIndex({ 'contact.wa_id': 1 });
    
    console.log('Database indexes created successfully');
    
    // Optional: Insert sample data
    const sampleMessages = [
      {
        id: 'sample_msg_1',
        from: '919937320320',
        to: '918329446654',
        text: { body: 'Hello! This is a sample message.' },
        type: 'text',
        timestamp: Math.floor(Date.now() / 1000).toString(),
        status: 'delivered',
        contact: {
          profile: { name: 'Sample User' },
          wa_id: '919937320320'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    for (const message of sampleMessages) {
      await messagesCollection.replaceOne(
        { id: message.id },
        message,
        { upsert: true }
      );
    }
    
    console.log('Sample data inserted successfully');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

if (require.main === module) {
  seed();
}

module.exports = seed;