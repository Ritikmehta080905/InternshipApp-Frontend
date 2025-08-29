import { useState, useEffect } from 'react';
import { getFavorites, removeFromFavorites } from '@/lib/favorites';
import { Book } from '@/lib/graphql';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favoriteBooks = getFavorites();
    setFavorites(favoriteBooks);
  };

  const handleRemoveFavorite = (book: Book) => {
    removeFromFavorites(book.id);
    setFavorites(prev => prev.filter(fav => fav.id !== book.id));
    toast({
      title: "Removed from favorites",
      description: `"${book.title}" has been removed from your favorites.`,
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-24 h-24 bg-gradient-subtle rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              No Favorites Yet
            </h1>
            <p className="text-muted-foreground">
              Start building your personal library by adding books to your favorites
            </p>
          </div>
          <Link to="/">
            <Button className="bg-gradient-warm hover:opacity-90">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Heart className="h-8 w-8 text-primary fill-current" />
          My Favorites
        </h1>
        <p className="text-lg text-muted-foreground">
          {favorites.length} book{favorites.length !== 1 ? 's' : ''} in your collection
        </p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((book) => (
          <Card 
            key={book.id} 
            className="group h-full bg-gradient-card shadow-card hover:shadow-book transition-all duration-300"
          >
            <CardContent className="p-0 relative">
              {/* Remove Button */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveFavorite(book)}
                className="absolute top-2 right-2 z-10 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Remove from favorites"
              >
                <Trash2 className="h-3 w-3" />
              </Button>

              <Link to={`/book/${book.id}`}>
                {/* Book Cover */}
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg bg-gradient-subtle">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    by {book.author}
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Browse More Books */}
      <div className="text-center pt-8">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Browse More Books
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Favorites;