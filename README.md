# News Explorer

A responsive web application that allows users to search for news articles, 
bookmark their favorites, and manage their saved content. Built with React 
and powered by the News API.

## Features

- **News Search**: Search for articles by keyword from the past 7 days
- **User Authentication**: Sign up and sign in to save articles
- **Bookmarking**: Save articles to your personal collection
- **Saved Articles**: View and manage all your bookmarked news
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices (320px+)

## Technologies Used

### Frontend
- **React** - UI library with functional components and hooks
- **React Router** - Client-side routing
- **Context API** - State management (Auth, News, Modal contexts)
- **Vite** - Build tool and dev server
- **CSS3** - Styling with BEM methodology
- **JavaScript (ES6+)** - Modern JavaScript features

### APIs
- **News API** - Fetching news articles
- **Custom Auth API** - User authentication (simulated with localStorage)

## Project Structure

```
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
│   ├── Modal/
│   └── ...
├── contexts/        # React Context providers
│   ├── AuthContext.jsx
│   ├── ModalContext.jsx
│   └── NewsContext.jsx
├── hooks/           # Custom React hooks
├── utils/           # Helper functions and API calls
└── vendor/          # Fonts and normalize.css
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- News API key (get one at [newsapi.org](https://newsapi.org))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/news-explorer-frontend.git
cd news-explorer-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_NEWS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Search for News**: Enter a keyword in the search bar on the home page
2. **Sign Up**: Create an account to save articles
3. **Bookmark Articles**: Click the bookmark icon on any article (requires login)
4. **View Saved Articles**: Navigate to "Saved articles" to see your bookmarks
5. **Delete Bookmarks**: Remove articles from your saved collection


BEM (Block Element Modifier) methodology is used for CSS class naming.

## Key Features Implementation

### State Management
- **Context API** used to eliminate prop drilling
- Three separate contexts for separation of concerns:
    - `AuthContext` - User authentication state
    - `NewsContext` - News articles and bookmarks
    - `ModalContext` - Modal window states

### Custom Hooks
- `useForm` - Form validation and state management
- `useModalClose` - Click outside and ESC key modal closing

### Data Persistence
- User authentication state saved to localStorage
- Bookmarked articles saved to localStorage
- Automatic state rehydration on page refresh

## Future Enhancements

- Backend API integration for user authentication
- Database storage for bookmarks
- Article sharing functionality
- Advanced search filters
- User profile customization


## Acknowledgments

- Developed as part of the TripleTen Web Development Bootcamp
- News data provided by [News API](https://newsapi.org)
- Design specifications by TripleTen

## Github Pages Link
https://cdmstr-kev.github.io/news-explorer-frontend/#/


## Project Pitch Video
Check out [this video](https://drive.google.com/file/d/1CkxiE9jcWrMfEarvQbQvEdjjFGufmsa8/view?usp=drive_link), 
where I describe my project and some challenges I faced while building it.

