import { gql } from "@apollo/client";

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
  is_favorite?: boolean; // ✅ Added
}

export interface BooksPaginatedResponse {
  books: Book[];
  totalCount: number;
}

export interface BookDetail {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
  description?: string;
  publish_year?: number;
  is_favorite?: boolean; // ✅ Added
}

// Queries
export const GET_BOOKS_PAGINATED = gql`
  query GetBooksPaginated($page: Int!, $pageSize: Int!, $search: String) {
    booksPaginated(page: $page, pageSize: $pageSize, search: $search) {
      books {
        id
        title
        author
        coverImage
        is_favorite   # ✅ Added
      }
      totalCount
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: Int!) {
    book(id: $id) {
      id
      title
      author
      coverImage
      description
      publish_year
      is_favorite   # ✅ Added
    }
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($bookId: Int!, $add: Boolean!) {
    toggleFavorite(bookId: $bookId, add: $add) {
      success
      book {
        id
        title
        author
        coverImage
        is_favorite   # ✅ Added
      }
    }
  }
`;
