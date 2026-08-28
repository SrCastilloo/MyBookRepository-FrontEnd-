import { API_URL } from "../../../config/env";

import type {
  LoginRequest,
  LoginResponse,
  RegisterReponse,
  RegisterRequest,
} from "../types/auth.types";

type ApiErrorResponse = {
  message?: string;
  detail?: string;
  error?: string;
};

async function postJson<TRequest>(
  path: string,
  data: TRequest,
): Promise<{
  response: Response;
  body: unknown;
}> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      "No se ha podido conectar con el servidor. Comprueba tu conexión.",
    );
  }

  const responseText = await response.text();

  let body: unknown = null;

  try {
    body = responseText ? JSON.parse(responseText) : null;
  } catch {
    body = responseText;
  }

  return {
    response,
    body,
  };
}

function getBackendMessage(responseBody: unknown): string | undefined {
  if (typeof responseBody === "string" && responseBody.trim()) {
    return responseBody.trim();
  }

  if (typeof responseBody !== "object" || responseBody === null) {
    return undefined;
  }

  const apiError = responseBody as ApiErrorResponse;

  return apiError.message ?? apiError.detail ?? apiError.error;
}

export async function login(
  loginRequest: LoginRequest,
): Promise<LoginResponse> {
  const { response, body } = await postJson("/users/login", loginRequest);

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error("Introduce correctamente el correo y la contraseña.");

      case 401:
      case 403:
        throw new Error(
          "Correo o contraseña incorrectos. Revísalos e inténtalo de nuevo.",
        );

      case 429:
        throw new Error(
          "Has realizado demasiados intentos. Espera unos minutos.",
        );

      default:
        if (response.status >= 500) {
          throw new Error(
            "El servidor no está disponible. Inténtalo de nuevo más tarde.",
          );
        }

        throw new Error(
          getBackendMessage(body) ?? "No hemos podido iniciar sesión.",
        );
    }
  }

  return body as LoginResponse;
}

export async function register(
  registerRequest: RegisterRequest,
): Promise<RegisterReponse> {
  const { response, body } = await postJson(
    "/users/createUser",
    registerRequest,
  );

  if (!response.ok) {
    switch (response.status) {
      case 400:
      case 422:
        throw new Error(
          getBackendMessage(body) ??
            "Hay datos incorrectos. Revisa todos los campos.",
        );

      case 409:
        throw new Error(
          "Ya existe una cuenta registrada con ese correo electrónico.",
        );

      case 429:
        throw new Error(
          "Has realizado demasiados intentos. Espera unos minutos.",
        );

      default:
        if (response.status >= 500) {
          throw new Error(
            "El servidor no está disponible. Inténtalo de nuevo más tarde.",
          );
        }

        throw new Error(
          getBackendMessage(body) ?? "No hemos podido crear la cuenta.",
        );
    }
  }

  return body as RegisterReponse;
}
