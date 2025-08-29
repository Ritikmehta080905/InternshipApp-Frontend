# 📚 Internship App - Frontend

A modern, responsive frontend application built with **Vite + React + TypeScript + Tailwind CSS** for managing and browsing books. Features a clean UI with GraphQL integration and a comprehensive component library.

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui component library
- **GraphQL Client**: Apollo Client
- **State Management**: React Hooks + Local Storage
- **Package Manager**: npm

## ✨ Features

- 📖 Book browsing and search functionality
- ❤️ Favorites management with local storage
- 📱 Fully responsive design
- 🎨 Modern UI with accessible components
- 🔍 Advanced search and filtering
- 📄 Pagination for large datasets
- 🚀 Fast and optimized performance

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ritikmehta080905/InternshipApp-Frontend.git
   cd InternshipApp-Frontend

   Install dependencies

bash
npm install
Set up environment variables

bash
# Create .env file in root directory
VITE_GRAPHQL_API_URL=your_graphql_api_url_here
Start development server

bash
npm run dev
📦 Available Scripts
npm run dev - Start development server

npm run build - Build for production

npm run preview - Preview production build

npm run lint - Run ESLint

npm run type-check - Run TypeScript type checking

🏗️ Project Structure
text
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── BookCard.tsx    # Book display component
│   ├── SearchBar.tsx   # Search functionality
│   └── Navigation.tsx  # Main navigation
├── pages/              # Page components
│   ├── Books.tsx       # Books listing page
│   ├── BookDetail.tsx  # Book details page
│   └── Favorites.tsx   # Favorites page
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── apollo.ts       # Apollo Client configuration
│   ├── graphql.ts      # GraphQL queries
│   └── utils.ts        # Helper functions
└── styles/             # Global styles
🌐 API Integration
This frontend connects to a Django GraphQL backend with:

Book data fetching
Search and filter operations
User favorites synchronization
Real-time data updates

🎨 UI/UX Features
Responsive Design: Mobile-first approach
Dark/Light Mode: Ready for theme implementation
Accessibility: WCAG compliant components
Loading States: Skeleton loaders and spinners
Error Handling: User-friendly error messages



📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Developer
Ritik Mehta

GitHub: @Ritikmehta080905

Portfolio:https://my-portfolio-c61d0.web.app/


