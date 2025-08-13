
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/constants';

export async function GET() {
  try {
    const messagesCollection = await getCollection(COLLECTIONS.PROCESSED_MESSAGES);
    
    // Get all messages and process them in JavaScript
    const allMessages = await messagesCollection.find({}).sort({ timestamp: -1 }).toArray();
    
    console.log('Found messages:', allMessages.length);
    console.log('Sample message:', allMessages[0]);
    
    // Group messages by conversation (wa_id)
    const conversationsMap = new Map();
    
    for (const message of allMessages) {
      // Ensure we have valid message data
      if (!message.from || !message.to || !message.timestamp) {
        console.warn('Invalid message found:', message);
        continue;
      }
      
      const wa_id = message.from === '918329446654' ? message.to : message.from;
      
      if (!wa_id) {
        console.warn('Could not determine wa_id for message:', message);
        continue;
      }
      
      if (!conversationsMap.has(wa_id)) {
        // Create conversation with safe fallbacks
        const contactName = message.contact?.profile?.name || wa_id;
        
        conversationsMap.set(wa_id, {
          wa_id: wa_id,
          contact: {
            profile: { 
              name: contactName 
            },
            wa_id: wa_id
          },
          lastMessage: {
            text: message.text || { body: 'Message content not available' },
            timestamp: message.timestamp,
            isOutgoing: message.from === '918329446654',
            status: message.status || 'sent'
          },
          lastMessageTime: new Date(parseInt(message.timestamp) * 1000),
          unreadCount: 0
        });
      }
      
      // Count unread messages (incoming messages that aren't read)
      if (message.from !== '918329446654' && message.status !== 'read') {
        const conversation = conversationsMap.get(wa_id);
        if (conversation) {
          conversation.unreadCount++;
        }
      }
    }
    
    // Convert map to array and sort by last message time
    const conversations = Array.from(conversationsMap.values()).sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );

    console.log('Processed conversations:', conversations.length);
    console.log('Sample conversation:', conversations[0]);

    return NextResponse.json({ 
      conversations,
      count: conversations.length 
    });

  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations', details: error.message },
      { status: 500 }
    );
  }
}