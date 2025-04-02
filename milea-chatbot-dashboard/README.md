# Milea Chatbot Dashboard

This is the dashboard client for the Milea Estate Vineyard Chatbot project. It provides an interface for administrators to monitor and manage the chatbot's performance, view analytics, and handle user feedback.

## Features

- User authentication (login/register)
- Dashboard overview with key metrics
- Analytics page with detailed statistics
- Feedback management system
- User profile management
- Dark mode support
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for the backend)
- Milea Chatbot Backend running on port 5000
- Milea Chatbot Frontend running on port 3000

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/milea-chatbot-dashboard.git
cd milea-chatbot-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CHATBOT_URL=http://localhost:3000
```

## Running the Application

1. Start the development server:
```bash
npm start
# or
yarn start
```

2. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React context providers
├── pages/             # Page components
│   ├── auth/         # Authentication pages
│   └── dashboard/    # Dashboard pages
├── services/         # API services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
