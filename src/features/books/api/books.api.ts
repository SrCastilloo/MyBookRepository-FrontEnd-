import { API_URL } from "@/config/env";
import { getAccessToken } from "@/services/storage/tokenStorage";

import type {
  BookResponse,
  CreateBookRequest,
  UpdateBookRequest,
} from "../types/book.types";

export async function getMyBooks(): Promise<BookResponse[]> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("La sesión no es válida. Inicia sesión nuevamente.");
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/books`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch {
    throw new Error("No se ha podido conectar con el servidor.");
  }

  if (response.status === 401) {
    throw new Error("Tu sesión ha caducado. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error("No se han podido cargar tus libros.");
  }

  return response.json() as Promise<BookResponse[]>;
}

export async function createBook(
  request: CreateBookRequest,
): Promise<BookResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("Tu sesión ha caducado. Inicia sesión nuevamente.");
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/books/createBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });
  } catch {
    throw new Error("No se ha podido conectar con el servidor.");
  }

  const responseText = await response.text();

  let responseBody: unknown = null;

  try {
    responseBody = responseText ? JSON.parse(responseText) : null;
  } catch {
    responseBody = responseText;
  }

  if (response.status === 400) {
    throw new Error("Revisa los datos introducidos del libro.");
  }

  if (response.status === 401) {
    throw new Error("Tu sesión ha caducado. Inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error("No se ha podido crear el libro. Inténtalo de nuevo.");
  }

  return responseBody as BookResponse;
}

export async function getBookById(bookId: string): Promise<BookResponse> {
  const books = await getMyBooks();

  const book = books.find((currentBook) => currentBook.id === bookId);

  if (!book) {
    throw new Error("No se ha encontrado el libro.");
  }

  return book;
}

export async function updateBook(
  bookId: string,
  request: UpdateBookRequest,
): Promise<BookResponse> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("Tu sesión ha caducado. Inicia sesión nuevamente.");
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/books/modifyBook/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });
  } catch {
    throw new Error("No se ha podido conectar con el servidor.");
  }

  const responseText = await response.text();

  let responseBody: unknown = null;

  try {
    responseBody = responseText ? JSON.parse(responseText) : null;
  } catch {
    responseBody = responseText;
  }

  if (response.status === 400) {
    throw new Error("Revisa los datos introducidos.");
  }

  if (response.status === 401) {
    throw new Error("Tu sesión ha caducado.");
  }

  if (response.status === 404) {
    throw new Error("No se ha encontrado el libro.");
  }

  if (!response.ok) {
    throw new Error("No se ha podido modificar el libro.");
  }

  return responseBody as BookResponse;
}
