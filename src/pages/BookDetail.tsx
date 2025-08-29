import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOK_BY_ID, BookDetail as BookDetailType, TOGGLE_FAVORITE } from '@/lib/graphql';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { ArrowLeft, Heart, BookOpen, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react'; // ← ADD MISSING IMPORTS

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isBookFavorite, setIsBookFavorite] = useState(false);

  // ✅ CORRECT: Using useQuery for fetching book data
  const { data, loading, error, refetch } = useQuery<{ book: BookDetailType }>(
    GET_BOOK_BY_ID,
    {
      variables: { id: id ? parseInt(id) : 0 },
      skip: !id,
    }
  );

  // ✅ CORRECT: Updated to match toggle_favorite mutation
  const [toggleFavorite] = useMutation<{ toggle_favorite: { success: boolean; book: BookDetailType } }>(
    TOGGLE_FAVORITE,
    {
      onCompleted: (data) => {
        if (data.toggle_favorite.success) {  // ← Changed to toggle_favorite
          setIsBookFavorite(!isBookFavorite);
          toast({
            title: isBookFavorite ? "Removed from favorites" : "Added to favorites",
            description: `"${data.toggle_favorite.book.title}" has been ${isBookFavorite ? "removed from" : "added to"} your favorites.`,
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  );

  // Update favorite status when data loads
  useEffect(() => {
    if (data?.book) {
      setIsBookFavorite(data.book.isFavorite || false);
    }
  }, [data]);

  const handleToggleFavorite = async () => {
    if (!data?.book) return;
    
    try {
      await toggleFavorite({
        variables: { 
          book_id: data.book.id,  // ← Correct (already snake_case)
          add: !isBookFavorite 
        },
      });
    } catch (err) {
      // Error handled by onError callback
    }
  };

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (error || !data?.book) return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <ErrorMessage message={error?.message || "Book not found."} onRetry={() => refetch()} className="max-w-md" />
        <Link to="/"><Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2"/>Back to Books</Button></Link>
      </div>
    </div>
  );

  const book = data.book;

  return (
    <div className="space-y-6">
      <Link to="/"><Button variant="outline" className="flex items-center gap-2"><ArrowLeft className="h-4 w-4"/>Back to Books</Button></Link>

      <Card className="overflow-hidden bg-gradient-card shadow-elegant">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="md:col-span-1">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gradient-subtle shadow-book">
                {book.cover_image ? (  // ← Changed to cover_image
                  <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary"><BookOpen className="h-24 w-24 text-muted-foreground" /></div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-foreground leading-tight">{book.title}</h1>
                <div className="flex items-center gap-2 text-lg text-muted-foreground"><User className="h-5 w-5"/><span>by {book.author}</span></div>
                {book.publish_year && <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4"/><span>Published in {book.publish_year}</span></div>}
              </div>

              <Button onClick={handleToggleFavorite} variant={isBookFavorite ? "default" : "outline"} className={`flex items-center gap-2 ${isBookFavorite ? "bg-gradient-warm hover:opacity-90" : "hover:bg-secondary"}`}>
                <Heart className={`h-4 w-4 ${isBookFavorite ? "fill-current" : ""}`}/> {isBookFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>

              {book.description && <div className="space-y-3"><h2 className="text-xl font-semibold text-foreground">Description</h2><p className="text-muted-foreground leading-relaxed">{book.description}</p></div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetail;