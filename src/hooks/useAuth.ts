import { useMutation } from "@tanstack/react-query";
import { login, logout, register } from "@/services/authApi";
import { LoginRequest, RegisterRequest } from "@/types/api";
import { getAuthToken } from "@/services/api";

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
  });
}

export function useLogout() {
  return logout;
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}
