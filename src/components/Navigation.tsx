import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="border-b border-border bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <BookOpen className="h-6 w-6" />
            Library
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground shadow-elegant' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Books
            </Link>
            
            <Link
              to="/favorites"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/favorites') 
                  ? 'bg-primary text-primary-foreground shadow-elegant' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Heart className="h-4 w-4" />
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;