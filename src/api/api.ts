import axios from "axios";

// Base URL
const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  headers: { "Content-Type": "application/json" },
});

// ---------------- SIGNUP ----------------
interface SignupData {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const res = await API.post("/signup", data);
  return res.data;
};

// ---------------- LOGIN ----------------
interface LoginData {
  identifier: string; // email or mobile
  password: string;
}

export const login = async (data: LoginData) => {
  const res = await API.post("/login", data);
  return res.data;
};

// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (email: string) => {
  const res = await API.post("/reset-password", { email });
  return res.data;
};

// ---------------- GOOGLE LOGIN ----------------
export const loginWithGoogle = async () => {
  const res = await API.get("/google-login"); // adjust endpoint if needed
  return res.data;
};
