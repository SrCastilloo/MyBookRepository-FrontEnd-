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

export type LoginResponse = {
  //respuesta del back
  accessToken: string;
  user: UserResponse;
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
