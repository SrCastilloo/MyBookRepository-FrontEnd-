import { API_URL } from "@/config/env";
import { getAccessToken } from "@/services/storage/tokenStorage";

import type { BookResponse } from "../types/book.types";

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
