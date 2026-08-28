const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("No se ha configurado EXPO_PUBLIC_API_URL");
}

export const API_URL = apiUrl;
