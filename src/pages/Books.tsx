import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_PAGINATED, BooksPaginatedResponse, Book } from "@/lib/graphql";
import BookCard from "@/components/BookCard";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

const Books = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 8;

  // ✅ CORRECT: Using snake_case variables to match GraphQL schema
  const { data, loading, error, refetch } = useQuery<{ booksPaginated: BooksPaginatedResponse }>(
    GET_BOOKS_PAGINATED,
    {
      variables: { 
        page: currentPage, 
  pageSize: pageSize,
        search 
      },
      fetchPolicy: "network-only",
    }
  );

  // Get data directly from Apollo query
  const books = data?.booksPaginated?.books || [];
  const totalCount = data?.booksPaginated?.totalCount || 0;

  // Refetch when dependencies change
  useEffect(() => {
  refetch({ page: currentPage, pageSize, search });
  }, [currentPage, search, refetch, pageSize]);

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setSearch(query);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex justify-center">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search books..." 
          defaultValue={search} 
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <ErrorMessage 
          message={error.message || "Failed to load books."} 
          onRetry={() => refetch()} 
          className="max-w-md mx-auto" 
        />
      )}

      {/* Books Grid */}
      {!loading && !error && books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && books.length === 0 && (
        <p className="text-center text-muted-foreground">
          {search ? "No books found matching your search." : "No books available."}
        </p>
      )}

      {/* Pagination */}
      {!loading && totalCount > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalItems={totalCount}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage} 
        />
      )}
    </div>
  );
};

export default Books;