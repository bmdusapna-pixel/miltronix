import axios from "axios";

// ---------------- BASE AXIOS ----------------
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ---------------- CATEGORIES ----------------
export const fetchCategories = async (): Promise<any[]> => {
  const res = await API.get("/category");
  return res.data;
};

// ---------------- PRODUCTS ----------------
export const fetchProductsByCategory = async (
  categoryId: string | number
): Promise<any[]> => {
  const res = await API.get(`/products?category=${categoryId}`);
  return res.data;
};

// ---------------- AUTH ----------------
interface SignupData {
  name: string;
  email: string;
  mobile?: string;
  password: string;
}

interface LoginData {
  identifier: string; // email or mobile
  password: string;
}

// Signup
export const signup = async (data: SignupData) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};

// Login
export const login = async (data: LoginData) => {
  const res = await API.post("/auth/login", data);
  if (res.data.token) localStorage.setItem("authToken", res.data.token);
  return res.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("authToken");
};

// Get auth token
const getAuthToken = (): string | null => localStorage.getItem("authToken");

// Axios instance for authenticated requests
export const API_AUTH = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

// Fetch user profile (protected)
export const fetchUserProfile = async (): Promise<any> => {
  const token = getAuthToken();
  if (!token) throw new Error("Not authenticated");
  const res = await API_AUTH.get("/auth/profile");
  return res.data;
};

// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (email: string) => {
  const res = await API.post("/auth/reset-password", { email });
  return res.data;
};

// ---------------- GOOGLE LOGIN ----------------
// Redirect user to Google OAuth login
export const loginWithGoogle = () => {
  // This will redirect to the backend Google login endpoint
  window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google-login`;
};
