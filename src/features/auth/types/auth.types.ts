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
