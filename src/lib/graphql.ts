import { gql } from "@apollo/client"; // ← ADD THIS IMPORT

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
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
}

// Queries - MUST USE GQL TAG
export const GET_BOOKS_PAGINATED = gql`
  query GetBooksPaginated($page: Int!, $pageSize: Int!, $search: String) {
    booksPaginated(page: $page, pageSize: $pageSize, search: $search) {
      books {
        id
        title
        author
        coverImage
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
      }
    }
  }
`;