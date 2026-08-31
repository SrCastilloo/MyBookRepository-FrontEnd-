export type BookState = "PENDING" | "READING" | "READ";

export type BookResponse = {
  id: string;
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  price: number;
  state: BookState;
  photoUrl?: string;
};

export type CreateBookRequest = {
  title: string;
  author: string;
  pages: number;
  price: number;
  photoUrl?: string;
};

export type UpdateBookRequest = {
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  price: number;
  state: BookState;
  photoUrl: string;
};
