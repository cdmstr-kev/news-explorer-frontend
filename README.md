# News Explorer

A full-stack responsive web application that allows users to search for news articles,
bookmark their favorites, and manage their saved content. Built with React frontend
and Express backend, powered by News API and MongoDB.

## Features

- **News Search**: Search for articles by keyword from the past 7 days
- **User Authentication**: Sign up and sign in with JWT-based authentication
- **Bookmarking**: Save articles to your personal MongoDB collection
- **Saved Articles**: View and manage all your bookmarked news
- **Persistent Login**: Stay logged in across browser sessions
- **Authorization**: Users can only delete their own saved articles
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices (320px+)

## Technologies Used

### Frontend
- **React** - UI library with functional components and hooks
- **React Router (BrowserRouter)** - Client-side routing with clean URLs
- **Context API** - State management (Auth, News, Modal contexts)
- **Vite** - Build tool and dev server
- **CSS3** - Styling with BEM methodology
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend Integration
- **Express REST API** - User authentication and article management
- **MongoDB** - Database for users and saved articles
- **JWT** - Token-based authentication
- **Celebrate/Joi** - Request validation

### External APIs
- **News API** - Fetching news articles from external sources

## Architecture

This is a **full-stack application** with:
- **Frontend**: React SPA serving the user interface
- **Backend**: Express API handling authentication and data persistence
- **Database**: MongoDB storing users and saved articles

### Data Flow
1. User searches → News API (external) → Display results
2. User bookmarks article → Backend API → MongoDB
3. User views saved articles → Backend API → MongoDB → Display
4. User authentication → Backend API → JWT tokens → Persistent login

## Project Structure

src/
├── assets/          # Images and icons
├── components/      # React components
│   ├── About/
│   ├── App/
│   ├── Footer/
│   ├── Header/
│   ├── Main/
│   ├── Navigation/
│   ├── NewsCard/
│   ├── ProtectedRoute/  # HOC for route protection
│   ├── SavedNews/
│   ├── Modal/
│   └── ...
├── contexts/        # React Context providers
│   ├── AuthContext.jsx    # JWT authentication state
│   ├── ModalContext.jsx   # Modal window management
│   └── NewsContext.jsx    # News articles and backend sync
├── hooks/           # Custom React hooks
├── utils/           # Helper functions and API calls
│   ├── api.js       # Backend API integration
│   ├── auth.js      # Authentication API calls
│   ├── newsapi.js   # News API integration
│   └── helpers.js   # Utility functions
└── vendor/          # Fonts and normalize.css

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or yarn
- **News API key** (get one at [newsapi.org](https://newsapi.org))
- **Backend server running** (see [news-explorer-backend](../news-explorer-backend/README.md))

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/news-explorer-frontend.git
  cd news-explorer-frontend

  2. Install dependencies:
  npm install

  3. Create a .env file in the root directory:
  VITE_NEWS_API_KEY=your_newsapi_key_here
  VITE_BACKEND_API_URL=http://localhost:3000

  4. Start the backend server first (in separate terminal):
  cd ../news-explorer-backend
  npm start

  5. Start the frontend development server:
  npm run dev

  6. Open http://localhost:5173 in your browser

  Environment Variables

  | Variable             | Description       | Example               |
  |----------------------|-------------------|-----------------------|
  | VITE_NEWS_API_KEY    | Your News API key | abc123...             |
  | VITE_BACKEND_API_URL | Backend API URL   | http://localhost:3000 |

  Available Scripts

  - npm run dev - Start development server
  - npm run build - Build for production
  - npm run preview - Preview production build
  - npm run lint - Run ESLint
  - npm run deploy - Build and deploy

  Usage

  1. Search for News: Enter a keyword in the search bar on the home page
  2. Sign Up: Create an account with email, password, and username
  3. Sign In: Log in with your credentials (JWT token stored)
  4. Bookmark Articles: Click the bookmark icon on any article (requires login)
  5. View Saved Articles: Navigate to "Saved articles" to see your bookmarks
  6. Delete Bookmarks: Click the trash icon to remove articles from your collection
  7. Sign Out: Click sign out to end your session

  Key Features Implementation

  Authentication Flow

  - Registration: POST to /signup → Returns success message (no token)
  - Login: POST to /signin → Returns JWT token
  - Token Validation: GET to /users/me with JWT → Returns user data
  - Persistent Login: JWT stored in localStorage, validated on app mount

  State Management

  - Context API used to eliminate prop drilling
  - Three separate contexts for separation of concerns:
    - AuthContext - JWT authentication and user state
    - NewsContext - News search and saved articles from backend
    - ModalContext - Modal window states

  Backend Integration

  - Centralized API layer in utils/api.js
  - Automatic JWT token inclusion in authenticated requests
  - Error handling with proper status codes and messages
  - Data transformation between News API and backend formats

  Custom Hooks

  - useForm - Form validation and state management
  - useModalClose - Click outside and ESC key modal closing

  Protected Routes (Higher-Order Component)

  - **ProtectedRoute HOC** wraps routes requiring authentication
  - Centralizes auth logic instead of duplicating in each protected component
  - **Automatic login modal**: Opens sign-in modal when unauthorized user attempts access
  - **Loading state handling**: Shows nothing during auth check to prevent flicker
  - **Redirect on unauthorized**: Navigates to home page if user not logged in
  - **Implementation**:
    - Wraps SavedNews route in App.jsx
    - Checks `isLoggedIn` and `isLoading` from AuthContext
    - Triggers `setActiveModal("signin-modal")` via ModalContext
    - Returns `<Navigate to="/" replace />` for unauthorized users
    - Returns `children` for authenticated users

  Data Persistence

  - User accounts stored in MongoDB
  - Saved articles stored in MongoDB with user reference
  - JWT tokens in localStorage for session persistence
  - Automatic state rehydration on page refresh via token validation

  Code Quality

  - BEM methodology for CSS class naming
  - Component-based architecture with reusable components
  - Single source of truth - Backend schema standardized across app
  - Proper error boundaries and loading states

  API Endpoints Used

  Backend API

  - POST /signup - Register new user
  - POST /signin - Login user
  - GET /users/me - Get current user (authenticated)
  - GET /articles - Get user's saved articles (authenticated)
  - POST /articles - Save new article (authenticated)
  - DELETE /articles/:id - Delete saved article (authenticated)

  External API

  - News API - GET /everything - Search news articles

  Security Features

  - Password hashing with bcrypt on backend
  - JWT authentication with token validation
  - Request validation with Joi schemas
  - Authorization checks - Users can only delete their own articles
  - **Protected routes via ProtectedRoute HOC**:
    - Prevents unauthorized access to SavedNews page
    - Automatically opens login modal for unauthorized users
    - Redirects to home if not authenticated
    - Handles loading states to prevent premature redirects

  Future Enhancements

  - Article sharing functionality
  - Advanced search filters (date range, source, category)
  - User profile customization

  Development

  Backend Repository

  This frontend requires the backend server to be running.
  Backend repo: ../news-explorer-backend

  Tech Stack

  - Frontend Framework: React 18
  - Build Tool: Vite 5
  - Routing: React Router 7 (BrowserRouter)
  - HTTP Client: Fetch API
  - State Management: React Context API
  - Styling: CSS3 with BEM

  
  Acknowledgments

  - Developed as part of the TripleTen Web Development Bootcamp
  - News data provided by https://newsapi.org
  - Design specifications by TripleTen

  Live Deployment

  🌐 **Live Site**: https://newsexplorer.cdmstr.com
  🔗 **Backend API**: https://api.newsexplorer.cdmstr.com

  The application is deployed on Google Cloud Platform with:
  - Frontend: Nginx serving static React build
  - Backend: PM2 process manager with Node.js/Express
  - Database: MongoDB
  - SSL: Certbot (Let's Encrypt)

  Project Demo

  Project Pitch Video
  Check out https://drive.google.com/file/d/1CkxiE9jcWrMfEarvQbQvEdjjFGufmsa8/view?usp=drive_link, where I describe my project and some challenges I faced while building it.

  License

  This project is part of a bootcamp portfolio.