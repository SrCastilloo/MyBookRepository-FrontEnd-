/*
guarda la información del usuario que ha iniciado sesión 
y permite que cualquier pantalla o componente 
de la app acceda a esos datos (o los modifique)
al instante, sin tener que pasar la información 
manualmente de un archivo a otro.
*/

import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import type { AuthUser } from "../types/auth.types";

type AuthContextValue = {
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [currentUser, setCurrentUser] =
    useState<AuthUser | null>(null);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider",
    );
  }

  return context;
}