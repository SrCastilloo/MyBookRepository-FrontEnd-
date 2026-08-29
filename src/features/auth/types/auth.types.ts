export type LoginRequest = {
  //envio yo
  email: string;
  password: string;
};

export type UserResponse = {
  //respuesta del back
  id: string;
  name: string;
  lastName: string;
  email: string;
};

export type RegisterRequest = {
  name: String;
  lastName: String;
  email: String;
  password: String;
};

export type RegisterReponse = {
  id: String;
  name: String;
  lastName: String;
  email: String;
};

export type AuthUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  photoUrl?: string; //opcional porque puede que el backend no lo devuelva
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};
