const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

type ApiErrorResponse = {
  detail?: string;
  message?: string;
};

const getErrorMessage = async (res: Response) => {
  try {
    const data = (await res.json()) as ApiErrorResponse;
    return data.detail || data.message || "Request failed";
  } catch {
    return "Request failed";
  }
};

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return (await response.json()) as T;
}

export type LoginPayload = {
  email?: string;
  phone?: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type AuthResponse = {
  message: string;
  access_token?: string;
};

export const signupRequest = (payload: SignupPayload) =>
  request<AuthResponse>("/api/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const loginRequest = (payload: LoginPayload) =>
  request<AuthResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const requestOtp = (email: string) =>
  request<AuthResponse>(`/api/v1/auth/get-otp?email=${encodeURIComponent(email)}`, {
    method: "POST",
  });

export const verifyOtpRequest = (email: string, otp: string) =>
  request<AuthResponse>(
    `/api/v1/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
    { method: "POST" }
  );

export const resetPasswordRequest = (email: string, newPassword: string) =>
  request<AuthResponse>(
    `/api/v1/auth/reset-password?email=${encodeURIComponent(email)}&new_password=${encodeURIComponent(newPassword)}`,
    { method: "POST" }
  );
