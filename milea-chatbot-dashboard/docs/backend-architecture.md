I'll analyze the Milea Chatbot backend architecture and create a comprehensive overview with a visual diagram. Based on the files provided, this appears to be a Node.js backend system for a winery chatbot with several integrated services.

# Milea Chatbot Backend Architecture

## Overview

The Milea Chatbot Backend is a Node.js-based application that provides AI-assisted customer service for a winery. The system integrates with various services like Commerce7 (winery management software), OpenAI, Twilio (SMS), and uses a retrieval-augmented generation (RAG) system to provide accurate information about wines, visiting details, and wine club memberships.

## Architecture Diagram

```
MILEA CHATBOT BACKEND
│
├── 📁 server.js                     # Main entry point
│
├── 📁 routes/                      # API Endpoints
│   ├── auth.js                     # Authentication routes
│   ├── chat.js                     # Basic chat functionality
│   ├── rag.js                      # RAG-enhanced chat
│   ├── clubSignup.js               # Wine club signup
│   ├── commerce7.js                # Commerce7 integration
│   ├── customers.js                # Customer management
│   ├── businessInfo.js             # Business details
│   ├── subscribe.js                # Mailing list subscription
│   ├── twilio.js                   # SMS functionality
│   └── feedbackRoutes.js           # User feedback handling
│
├── 📁 services/                    # Business Logic
│   ├── 📁 rag/                     # RAG System
│   │   ├── ragService.js           # Main RAG entry point
│   │   ├── queryClassifier.js      # Query type detection
│   │   ├── contextAssembler.js     # Context retrieval
│   │   ├── responseGenerator.js    # Response generation
│   │   ├── cacheManager.js         # Response caching
│   │   ├── conversationTracking.js # Multi-turn conversation
│   │   └── 📁 domains/             # Domain-specific handlers
│   │       ├── wineHandler.js      # Wine queries
│   │       ├── clubHandler.js      # Wine club queries
│   │       ├── visitingHandler.js  # Visiting queries
│   │       └── ...
│   │
│   ├── twilioService.js            # SMS messaging
│   ├── commerce7Service.js         # Commerce7 integration
│   ├── businessHoursService.js     # Business hours info
│   └── loyaltyService.js           # Customer loyalty program
│
├── 📁 scripts/                     # Utility Scripts
│   ├── syncCommerce7Products.js    # Sync wine data
│   ├── initializeKnowledgeBase.js  # Setup knowledge base
│   ├── scheduledTasks.js           # Scheduled jobs
│   └── ...
│
├── 📁 config/                      # Configuration
│   ├── commerce7.js                # Commerce7 API config
│   └── openai.js                   # OpenAI API config
│
├── 📁 utils/                       # Utilities
│   ├── vectorStore.js              # Vector database interaction
│   ├── commerce7Auth.js            # Commerce7 authentication
│   ├── documentProcessor.js        # Document processing
│   └── logger.js                   # Logging utility
│
└── 📁 knowledge/                   # Knowledge Base
    ├── wine/                       # Wine information
    ├── club/                       # Wine club details
    ├── visiting/                   # Visiting information
    └── ...
```

## Core Components

### 1. RAG (Retrieval-Augmented Generation) System

The heart of the chatbot is the RAG system that provides accurate answers to customer queries:

- **Query Classification**: Determines what type of query the user is asking (wine, club, visiting, etc.)
- **Context Assembly**: Retrieves relevant information from the knowledge base
- **Domain-Specific Handlers**: Custom logic for different query types
- **Response Generation**: Creates human-like responses using OpenAI
- **Caching**: Stores responses to improve performance
- **Conversation Tracking**: Maintains context across multiple interactions

### 2. Knowledge Base Management

The system maintains an up-to-date knowledge base about wines, events, and services:

- **Commerce7 Sync**: Regularly pulls product information from Commerce7
- **Document Processing**: Converts product data to structured markdown
- **Vector Storage**: Maintains embeddings for semantic search
- **Scheduled Updates**: Ensures information stays current

### 3. Communication Channels

The backend supports multiple communication channels:

- **API Endpoints**: For web and mobile applications
- **SMS Integration**: Via Twilio for text message interactions
- **Socket.IO**: For real-time chat functionality

### 4. Business Integration

The system integrates with various business systems:

- **Commerce7**: For wine inventory, customer data, and club memberships
- **Business Hours**: Provides current opening times
- **Customer Management**: Handles customer profiles and loyalty points

## Data Flow

1. **User Query** → The user sends a message via the chat interface or SMS
2. **Query Classification** → The system determines the query type
3. **Knowledge Retrieval** → Relevant information is retrieved from the vector database
4. **Domain Processing** → The appropriate domain handler processes the query
5. **Response Generation** → The system generates a natural language response
6. **Response Delivery** → The response is sent back to the user

## Key Technologies

- **Node.js & Express**: Backend framework
- **MongoDB**: For feedback and operational data
- **ChromaDB**: Vector database for RAG system
- **OpenAI**: Natural language processing
- **Commerce7 API**: Winery management system integration
- **Twilio**: SMS messaging
- **Socket.IO**: Real-time communication

## Scheduled Tasks

The system runs several scheduled tasks to maintain data freshness:

- **Product Sync**: Daily updates from Commerce7
- **Knowledge Base Initialization**: Rebuilds the vector database
- **Vector Store Maintenance**: Optimizes the search index

## Security Considerations

- **Auth Middleware**: Protects sensitive endpoints
- **Token-Based Authentication**: For customer-specific operations
- **Environment Variables**: For sensitive credentials
- **Error Handling**: Comprehensive error management

This architecture provides a robust foundation for the Milea Chatbot, allowing it to deliver accurate information to customers while maintaining integration with business systems.