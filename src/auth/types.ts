export interface User {
  id: number;
  email: string;
  name: string;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
