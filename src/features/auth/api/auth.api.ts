import { API_URL } from "../../../config/env";

import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(
  loginRequest: LoginRequest,
): Promise<LoginResponse> {
  const url = `${API_URL}/users/login`;

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

  if (response.status === 401)
    throw new Error(
      "Correo o contraseña incorrectos. Revísalo " + " e inténtalo de nuevo",
    );

  if (!response.ok) {
    throw new Error(
      " No hemos podido iniciar sesión. " + "Inténtalo de nuevo más tarde",
    );
  }

  /*
    throw new Error(
      apiError?.message ??
        apiError?.error ??
        `Error al iniciar sesión (${response.status})`,
    );
    */

  return responseBody as LoginResponse;
}
