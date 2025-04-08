
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}


export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}


export type UserResponse = Omit<User, 'password'>;
