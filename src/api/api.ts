// src/api/api.ts
import axios, { AxiosInstance, AxiosError } from "axios";

// ---------------- BASE URL ----------------
const BASE_URL =import.meta.env.VITE_BASE_URL || "https://miltronix-backend-1.onrender.com/api";

// ---------------- AXIOS INSTANCE ----------------
const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ---------------- AUTH INTERCEPTOR ----------------
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- ERROR HANDLER ----------------
const handleError = (error: AxiosError<any>): never => {
  const message =
    (error.response?.data as any)?.message ||
    error.message ||
    "Something went wrong";
  throw new Error(message);
};

// ---------------- CATEGORIES ----------------
export const fetchCategories = async () => {
  try {
    const res = await API.get("/category");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// ---------------- PRODUCTS ----------------
export const fetchProducts = async (params?: {
  categoryId?: string;
  categoryKey?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "latest" | "price_low" | "price_high";
  page?: number;
  limit?: number;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.categoryId) query.append("category", params.categoryId);
    if (params?.categoryKey) query.append("categoryKey", params.categoryKey);
    if (params?.search) query.append("search", params.search);
    if (params?.minPrice) query.append("minPrice", params.minPrice.toString());
    if (params?.maxPrice) query.append("maxPrice", params.maxPrice.toString());
    if (params?.sort) query.append("sort", params.sort);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

    const res = await API.get(`/products?${query.toString()}`);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const fetchProductById = async (productId: string) => {
  try {
    const res = await API.get(`/products/${productId}`);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// ---------------- ADMIN PRODUCT ----------------
export const createProductApi = async (data: FormData) => {
  try {
    const res = await API.post("/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateProductApi = async (id: string, data: FormData) => {
  try {
    const res = await API.put(`/products/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const deleteProductApi = async (id: string) => {
  try {
    const res = await API.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// ---------------- AUTH ----------------
export const signup = async (data: {
  fullName: string;
  email?: string;
  mobile: string;
  password: string;
}) => {
  try {
    const res = await API.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const login = async (data: { mobile: string; password: string }) => {
  try {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const verifyOtp = async (data: { mobile: string; otp: string }) => {
  try {
    const res = await API.post("/auth/verify-otp", data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const resendOtp = async (data: { mobile: string }) => {
  try {
    const res = await API.post("/auth/resend-otp", data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const forgotPassword = async (data: { mobile: string }) => {
  try {
    const res = await API.post("/auth/forgot-password", data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const verifyResetOtp = async (data: { mobile: string; otp: string }) => {
  try {
    const res = await API.post("/auth/verify-reset-otp", data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const resetPassword = async (data: { mobile: string; newPassword: string }) => {
  try {
    const res = await API.post("/auth/reset-password", data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const googleLoginApi = async (data: { idToken: string }) => {
  try {
    const res = await API.post("/auth/google-login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const loginWithGoogle = () => {
  window.location.href = `${BASE_URL}/auth/google-login`;
};

// ---------------- CART ----------------
export const addItemToCart = async (data: {
  productId: string;
  quantity: number;
  variant?: Record<string, any>;
}) => {
  try {
    const res = await API.post("/cart/add", data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const getCartItems = async () => {
  try {
    const res = await API.get("/cart");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateCartItem = async (itemId: string, data: { quantity: number }) => {
  try {
    const res = await API.put(`/cart/update/${itemId}`, data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const removeCartItem = async (itemId: string) => {
  try {
    const res = await API.delete(`/cart/delete/${itemId}`);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const mergeCart = async (
  items: { productId: string; quantity: number; variant?: Record<string, any> }[]
) => {
  try {
    const res = await API.post("/cart/merge", { items });
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// ---------------- ORDERS ----------------
export const createOrder = async (data: {
  items: { productId: string; quantity: number; price: number }[];
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
}) => {
  try {
    const res = await API.post("/orders", data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const getMyOrders = async () => {
  try {
    const res = await API.get("/orders/my-orders");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
