
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'whatsapp';

const dataFiles = [
  'conversation_1_message_1.json',
  'conversation_1_message_2.json',
  'conversation_1_status_1.json',
  'conversation_1_status_2.json',
  'conversation_2_message_1.json',
  'conversation_2_message_2.json',
  'conversation_2_status_1.json',
  'conversation_2_status_2.json'
];

async function processData() {
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const messagesCollection = db.collection('processed_messages');
    
    // Process each data file
    for (const fileName of dataFiles) {
      const filePath = path.join(__dirname, '..', 'data', fileName);
      
      if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${fileName}, skipping...`);
        continue;
      }
      
      console.log(`Processing ${fileName}...`);
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const payload = JSON.parse(fileContent);
      
      // Process the webhook payload
      for (const entry of payload.metaData.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            const { messages, statuses, contacts } = change.value;
            
            // Process messages
            if (messages) {
              for (const message of messages) {
                const contact = contacts?.find(c => c.wa_id === message.from);
                
                const processedMessage = {
                  id: message.id,
                  from: message.from,
                  to: change.value.metadata.display_phone_number,
                  text: message.text,
                  type: message.type,
                  timestamp: message.timestamp,
                  status: 'delivered',
                  isOutgoing: message.from === '918329446654',
                  contact: contact,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                };

                await messagesCollection.replaceOne(
                  { id: message.id },
                  processedMessage,
                  { upsert: true }
                );
                
                console.log(`  Processed message: ${message.id}`);
              }
            }
            
            // Process status updates
            if (statuses) {
              for (const status of statuses) {
                const result = await messagesCollection.updateOne(
                  { 
                    $or: [
                      { id: status.id },
                      { meta_msg_id: status.meta_msg_id }
                    ]
                  },
                  { 
                    $set: { 
                      status: status.status,
                      updatedAt: new Date()
                    }
                  }
                );
                
                if (result.modifiedCount > 0) {
                  console.log(`  Updated status for message: ${status.id} -> ${status.status}`);
                }
              }
            }
          }
        }
      }
    }
    
    console.log('All sample data processed successfully!');
    
    // Display summary
    const totalMessages = await messagesCollection.countDocuments();
    console.log(`Total messages in database: ${totalMessages}`);
    
  } catch (error) {
    console.error('Error processing data:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

if (require.main === module) {
  processData();
}

module.exports = processData;