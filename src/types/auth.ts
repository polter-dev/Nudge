export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  authenticated: boolean;
  university: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
}
