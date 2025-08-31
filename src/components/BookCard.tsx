import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "@/lib/graphql";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { gql } from "@apollo/client";

interface BookCardProps {
  book: Book;
}

// ✅ GraphQL Mutation for toggling favorite
const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($bookId: Int!, $add: Boolean!) {
    toggleFavorite(bookId: $bookId, add: $add) {
      success
      book {
        id
        isFavorite
      }
    }
  }
`;

const BookCard = ({ book }: BookCardProps) => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(book.isFavorite || false);
  const [loading, setLoading] = useState(false);

  // ✅ Using backend mutation
  const [toggleFavorite] = useMutation<{ toggleFavorite: { success: boolean; book: Book } }>(
    TOGGLE_FAVORITE,
    {
      onCompleted: (data) => {
        if (data.toggleFavorite.success) {
          const newFav = data.toggleFavorite.book.isFavorite;
          setIsFavorite(newFav);
          toast({
            title: newFav ? "Added to favorites" : "Removed from favorites",
            description: `"${book.title}" has been ${newFav ? "added to" : "removed from"} your favorites.`,
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
          bookId: parseInt(book.id), // 👈 ensure Int type
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
