# WhatsApp Web Clone

A fully functional WhatsApp Web clone built with Next.js 14, TypeScript, MongoDB, and Socket.IO. This application processes WhatsApp Business API webhooks and provides a real-time chat interface that closely mimics the original WhatsApp Web experience.

## Live Demo

Visit the live application at: https://whats-app-web-psi.vercel.app/

## Source Code

GitHub Repository: https://github.com/unknown91tech/WhatsApp-Web

## Features

- **Authentic WhatsApp UI**: Pixel-perfect recreation of WhatsApp Web interface
- **Real-time messaging**: Live updates using Socket.IO for instant message delivery
- **Webhook processing**: Handles WhatsApp Business API webhook payloads
- **Message status tracking**: Visual indicators for sent, delivered, and read status
- **Responsive design**: Optimized for desktop, tablet, and mobile devices
- **MongoDB integration**: Efficient data storage and retrieval
- **TypeScript**: Full type safety throughout the application
- **Message sending**: Send new messages (stored in database)
- **Conversation management**: Organized chat list with unread counters

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, MongoDB
- **Real-time Communication**: Socket.IO
- **UI Components**: Radix UI, Lucide React icons
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with custom WhatsApp color scheme

## Project Structure

```
whatsapp-web-clone/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── conversations/ # Get conversations
│   │   ├── messages/      # Get/Post messages
│   │   ├── process-webhook/ # Process webhook data
│   │   └── socket/        # Socket.IO handler
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── chat/             # Chat-specific components
│   ├── sidebar/          # Sidebar components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── mongodb.ts        # MongoDB connection
│   ├── utils.ts          # Utility functions
│   ├── socket.ts         # Socket.IO client setup
│   └── constants.ts      # App constants
├── types/                # TypeScript definitions
│   ├── message.ts        # Message types
│   ├── conversation.ts   # Conversation types
│   └── webhook.ts        # Webhook payload types
├── hooks/                # Custom React hooks
│   ├── useSocket.ts      # Socket.IO hook
│   ├── useMessages.ts    # Messages management
│   └── useConversations.ts # Conversations management
└── scripts/              # Database scripts
    ├── seed.js           # Database initialization
    └── process-sample-data.js # Process sample data
```

## Installation and Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/unknown91tech/WhatsApp-Web.git
   cd WhatsApp-Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```bash
   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   MONGODB_DB=whatsapp
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Socket.IO Configuration
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
   ```

4. **Database Setup**
   - Create a MongoDB Atlas cluster
   - Update the `MONGODB_URI` in your `.env.local` file
   - Initialize the database:
   ```bash
   npm run seed
   ```

5. **Process Sample Data (Optional)**
   ```bash
   npm run process-data
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

7. **Access the Application**
   Open http://localhost:3000 in your browser

## API Endpoints

### Conversations
- `GET /api/conversations` - Retrieve all conversations with last message info
- Returns conversations grouped by user with unread counts

### Messages
- `GET /api/messages?wa_id={phone_number}` - Get messages for a specific conversation
- `POST /api/messages` - Send a new message

### Webhook Processing
- `POST /api/process-webhook` - Process WhatsApp Business API webhooks
- Handles incoming messages and status updates

### Socket.IO
- `GET /api/socket` - Initialize Socket.IO server for real-time updates

## Webhook Integration

The application processes WhatsApp Business API webhooks through the `/api/process-webhook` endpoint. It handles:

- **Incoming messages**: Stores new messages with contact information
- **Status updates**: Updates message delivery status (sent, delivered, read)
- **Real-time broadcasts**: Emits changes via Socket.IO

### Sample Webhook Payload Structure

```json
{
  "payload_type": "whatsapp_webhook",
  "metaData": {
    "entry": [{
      "changes": [{
        "field": "messages",
        "value": {
          "messages": [{
            "from": "919937320320",
            "id": "message_id",
            "timestamp": "1754400000",
            "text": { "body": "Hello!" },
            "type": "text"
          }],
          "contacts": [{
            "profile": { "name": "John Doe" },
            "wa_id": "919937320320"
          }]
        }
      }]
    }]
  }
}
```

## Real-time Features

The application uses Socket.IO for real-time functionality:

- **Live message updates**: New messages appear instantly across clients
- **Status synchronization**: Message status updates in real-time
- **Typing indicators**: Optional typing status broadcasts
- **Conversation updates**: Real-time conversation list updates

## Database Schema

### Messages Collection (`processed_messages`)

```javascript
{
  id: String,              // Unique message ID
  from: String,            // Sender phone number
  to: String,              // Recipient phone number
  text: {
    body: String           // Message content
  },
  type: String,            // Message type (text, image, etc.)
  timestamp: String,       // Unix timestamp
  status: String,          // sent, delivered, read
  isOutgoing: Boolean,     // True if sent by business
  contact: {
    profile: {
      name: String         // Contact name
    },
    wa_id: String          // Contact WhatsApp ID
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Connect the repository to your Vercel account

2. **Environment Variables**
   Set the following in Vercel dashboard:
   ```
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=whatsapp
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NEXT_PUBLIC_SOCKET_URL=https://your-app.vercel.app
   ```

3. **Deploy**
   - Vercel will automatically build and deploy your application
   - Your app will be available at the provided Vercel URL


## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Initialize database
npm run process-data # Process sample webhook data
```

## Key Features Implementation

### Message Status Indicators
- Single check mark: Message sent
- Double check mark (gray): Message delivered
- Double check mark (blue): Message read

### Responsive Design
- Mobile-first approach with responsive breakpoints
- Touch-friendly interface for mobile devices
- Sidebar overlay pattern for mobile navigation

### Real-time Updates
- Instant message delivery using WebSocket connections
- Automatic conversation list updates
- Live status indicator changes

