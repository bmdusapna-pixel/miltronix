// src/api/api.ts
export const BASE_URL = import.meta.env.VITE_BASE_URL;

// Type for request options
interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Generic API request function
export const apiRequest = async (endpoint: string, options: ApiOptions = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return response.json();
};

// ===================== Auth Functions =====================
export const login = async (data: { email: string; password: string }) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const signup = async (data: { name: string; email: string; password: string }) => {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
