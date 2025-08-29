import { Book } from "./graphql";

const FAVORITES_KEY = "favoriteBooks";

export const getFavorites = (): Book[] => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const isFavorite = (id: string): boolean => {
  return getFavorites().some(book => book.id === id);
};

export const addToFavorites = (book: Book): void => {
  const favorites = getFavorites();
  if (!favorites.some(b => b.id === book.id)) {
    favorites.push(book);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (id: string): void => {
  const favorites = getFavorites().filter(book => book.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
