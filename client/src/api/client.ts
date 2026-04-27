import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const USER_KEY = "sql_arena_user";
const AUTH_NOTICE_KEY = "sql_arena_auth_notice";

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const withUser = (userId) => ({
  headers: userId ? { "x-user-id": userId } : {},
});

export const unwrapData = (res) => res.data;

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const code = err?.response?.data?.code;
    if (status === 401) {
      try {
        sessionStorage.setItem(
          AUTH_NOTICE_KEY,
          code === "MISSING_USER"
            ? "Please log in to continue."
            : "Your session is no longer valid (database was likely reset). Please log in again.",
        );
      } catch {
        // ignore
      }

      try {
        localStorage.removeItem(USER_KEY);
      } catch {
        // ignore
      }

      try {
        window.dispatchEvent(new Event("sql_arena:logout"));
      } catch {
        // ignore
      }
    }

    return Promise.reject(err);
  },
);
