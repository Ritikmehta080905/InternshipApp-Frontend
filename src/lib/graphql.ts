import { gql } from "@apollo/client";

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
  isFavorite?: boolean; // ✅ Updated to camelCase
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
  publishYear?: number; // ✅ Updated to camelCase
  isFavorite?: boolean; // ✅ Updated to camelCase
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
        isFavorite   # ✅ Updated to camelCase
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
      publishYear   # ✅ Updated to camelCase
      isFavorite    # ✅ Updated to camelCase
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
        isFavorite   # ✅ Updated to camelCase
      }
    }
  }
`;
