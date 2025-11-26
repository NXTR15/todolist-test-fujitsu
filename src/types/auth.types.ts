/* To send request to backend following backend format */
export interface LoginPayload {
  email: string;
  password: string;
}

/* To receive the backend payload response format */
export interface LoginResponse {
  token: string;
  customer: {
    id: string;
    fullname: string;
    birthdate: string;
    address: string;
    phoneNumber: string;
    email: string;
    role: "admin" | "customer";
  };
}

type Role = "admin" | "customer";

export interface AuthUser {
  id: string;
  fullname: string;
  email: string;
  role: Role;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}
