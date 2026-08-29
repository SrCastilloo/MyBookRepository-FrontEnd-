export type BookState =
  | "PENDING"
  | "READING"
  | "READ";

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