
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/constants';
import { Message } from '@/types/message';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const wa_id = searchParams.get('wa_id');
    
    if (!wa_id) {
      return NextResponse.json(
        { error: 'wa_id parameter is required' },
        { status: 400 }
      );
    }

    const messagesCollection = await getCollection(COLLECTIONS.PROCESSED_MESSAGES);
    
    const messages = await messagesCollection
      .find({
        $or: [
          { from: wa_id },
          { to: wa_id }
        ]
      })
      .sort({ timestamp: 1 })
      .toArray();

    // Transform messages to include isOutgoing flag
    const transformedMessages = messages.map(msg => ({
      ...msg,
      isOutgoing: msg.from === '918329446654'
    }));

    return NextResponse.json({ 
      messages: transformedMessages,
      count: transformedMessages.length 
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, wa_id } = await request.json();
    
    if (!message || !wa_id) {
      return NextResponse.json(
        { error: 'Message and wa_id are required' },
        { status: 400 }
      );
    }

    const messagesCollection = await getCollection(COLLECTIONS.PROCESSED_MESSAGES);
    
    const newMessage: any = {
      ...message,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await messagesCollection.insertOne(newMessage);
    
    return NextResponse.json({ 
      success: true, 
      messageId: result.insertedId,
      message: newMessage
    });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}