import { API_URL } from "../../../config/env";

import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(
  loginRequest: LoginRequest,
): Promise<LoginResponse> {
  const url = `${API_URL}/users/login`;

  console.log("URL login:", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  });

  const responseText = await response.text();

  let responseBody: unknown = null;

  try {
    responseBody = responseText ? JSON.parse(responseText) : null;
  } catch {
    responseBody = responseText;
  }

  console.log("Estado login:", response.status);
  console.log("Respuesta login:", responseBody);

  if (!response.ok) {
    const apiError = responseBody as {
      message?: string;
      error?: string;
    } | null;

    throw new Error(
      apiError?.message ??
        apiError?.error ??
        `Error al iniciar sesión (${response.status})`,
    );
  }

  return responseBody as LoginResponse;
}
