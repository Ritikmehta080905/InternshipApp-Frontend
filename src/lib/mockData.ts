import { Book, BookDetail, BooksPaginatedResponse } from './graphql';

// Mock book data for demonstration
const mockBooks: BookDetail[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway.",
    publish_year: 1925,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
  },
  {
    id: "2", 
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch.",
    publish_year: 1960,
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop"
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell", 
    description: "A dystopian social science fiction novel about totalitarian control and surveillance in a future society.",
    publish_year: 1949,
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop"
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel about Elizabeth Bennet and her complex relationship with the proud Mr. Darcy.",
    publish_year: 1813,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop"
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A controversial coming-of-age novel following teenager Holden Caulfield's experiences in New York City.",
    publish_year: 1951,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
  },
  {
    id: "6",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "The first book in the beloved Harry Potter series, introducing the young wizard and his magical world.",
    publish_year: 1997,
    coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop"
  },
  {
    id: "7",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description: "An epic high fantasy adventure following Frodo Baggins on his quest to destroy the One Ring.",
    publish_year: 1954,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop"
  },
  {
    id: "8",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "The prequel to The Lord of the Rings, following Bilbo Baggins on his unexpected adventure.",
    publish_year: 1937,
    coverImage: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop"
  },
  {
    id: "9",
    title: "Dune",
    author: "Frank Herbert",
    description: "A science fiction epic set on the desert planet Arrakis, following Paul Atreides and his journey.",
    publish_year: 1965,
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop"
  },
  {
    id: "10",
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    description: "A series of fantasy novels set in the magical land of Narnia, accessed through a wardrobe.",
    publish_year: 1950,
    coverImage: "https://images.unsplash.com/photo-1616627561797-ae012c62ff0b?w=400&h=600&fit=crop"
  },
  {
    id: "11",
    title: "Brave New World",
    author: "Aldous Huxley",
    description: "A dystopian novel about a futuristic society controlled through technology and conditioning.",
    publish_year: 1932,
    coverImage: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop"
  },
  {
    id: "12",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    description: "A bildungsroman following the emotional and spiritual development of the titular character.",
    publish_year: 1847,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
  },
  {
    id: "13",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    description: "A dark tale of passion and revenge set on the Yorkshire moors.",
    publish_year: 1847,
    coverImage: "https://images.unsplash.com/photo-1544716278-e513176f20a5?w=400&h=600&fit=crop"
  },
  {
    id: "14",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    description: "A philosophical novel about a young man whose portrait ages while he remains youthful.",
    publish_year: 1890,
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop"
  },
  {
    id: "15",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    description: "A dystopian novel about a future society where books are banned and burned.",
    publish_year: 1953,
    coverImage: "https://images.unsplash.com/photo-1535905557558-afc4877cdf3f?w=400&h=600&fit=crop"
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockFetchBooksPaginated = async (
  page: number,
  pageSize: number,
  search?: string
): Promise<BooksPaginatedResponse> => {
  await delay(500); // Simulate network delay
  
  let filteredBooks = mockBooks;
  
  // Filter by search term
  if (search && search.trim()) {
    const searchLower = search.toLowerCase();
    filteredBooks = mockBooks.filter(book => 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  }
  
  // Paginate
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  
  return {
    total: filteredBooks.length,
    books: paginatedBooks.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.coverImage
    }))
  };
};

export const mockFetchBookById = async (id: string): Promise<BookDetail | null> => {
  await delay(300); // Simulate network delay
  
  const book = mockBooks.find(book => book.id === id);
  return book || null;
};