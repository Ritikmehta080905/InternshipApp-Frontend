

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client"; // ← FIX THIS LINE
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, TOGGLE_FAVORITE } from "@/lib/graphql";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(book.isFavorite || false);
  const [loading, setLoading] = useState(false);

  // ✅ CORRECT: Using useMutation for toggle favorite
  const [toggleFavorite] = useMutation<{ toggleFavorite: { success: boolean; book: Book } }>(
    TOGGLE_FAVORITE,
    {
      onCompleted: (data) => {
        if (data.toggleFavorite.success) {
          setIsFavorite(!isFavorite);
          toast({
            title: isFavorite ? "Removed from favorites" : "Added to favorites",
            description: `"${book.title}" has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
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

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigating to detail page
    setLoading(true);

    try {
      await toggleFavorite({
        variables: { 
          bookId: book.id, 
          add: !isFavorite 
        },
      });
    } catch (err) {
      // Error handled by onError callback
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/book/${book.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 relative">
        <CardContent className="p-4">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-muted">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Cover
              </div>
            )}
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant={isFavorite ? "default" : "outline"}
            className="flex items-center gap-1 mt-2 w-full justify-center"
            onClick={handleToggleFavorite}
            disabled={loading}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Remove" : "Favorite"}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;