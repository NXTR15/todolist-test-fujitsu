import type { LoginPayload, LoginResponse } from "../types/auth.types";
import { api } from "../utils/api.config";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  // Send request and store the response to a variable (first one is the endpoint, second is the body)
  const response = await api.post("/auth/login", payload);

  // Return acquired response in format of LoginResponse object
  return response.data;
}
