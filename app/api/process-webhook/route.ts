
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/constants';
import { WhatsAppWebhookPayload } from '@/types/webhook';
import { Message } from '@/types/message';

export async function POST(request: NextRequest) {
  try {
    const payload: WhatsAppWebhookPayload = await request.json();
    
    const messagesCollection = await getCollection(COLLECTIONS.PROCESSED_MESSAGES);
    
    for (const entry of payload.metaData.entry) {
      for (const change of entry.changes) {
        if (change.field === 'messages') {
          const { messages, statuses, contacts } = change.value;
          
          // Process incoming messages
          if (messages) {
            for (const message of messages) {
              const contact = contacts?.find(c => c.wa_id === message.from);
              
              const processedMessage: Message = {
                id: message.id,
                from: message.from,
                to: change.value.metadata.display_phone_number,
                text: message.text,
                type: message.type as any,
                timestamp: message.timestamp,
                status: 'delivered',
                isOutgoing: false,
                contact: contact,
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              // Insert or update message
              await messagesCollection.replaceOne(
                { id: message.id },
                processedMessage,
                { upsert: true }
              );
            }
          }
          
          // Process status updates
          if (statuses) {
            for (const status of statuses) {
              // Update message status
              await messagesCollection.updateOne(
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
            }
          }
        }
      }
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}