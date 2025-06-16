import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { api } from "../../utils/api";
import { showErrorToast, showSuccessToast } from "../../utils/toaster/toast";
import { User } from "../../types/types";
import { useRouter } from "next/router";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    emailOrUsername: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Load user data from storage on app load
  useEffect(() => {
    const storedUser =
      localStorage.getItem("authUser") || sessionStorage.getItem("authUser");
    const storedToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Login Function
  const login = async (
    emailOrUsername: string,
    password: string,
    rememberMe: boolean
  ) => {
    setLoading(true);
    try {
      const response = await api.post("/authentication/login", {
        emailOrUsername,
        password,
      });
      const { data } = response;

      if (data?.data?.token && data?.data?.user) {
        if (rememberMe) {
          localStorage.setItem("authToken", data.data?.token);
          localStorage.setItem("authUser", JSON.stringify(data.data?.user));
        } else {
          sessionStorage.setItem("authToken", data.data?.token);
          sessionStorage.setItem("authUser", JSON.stringify(data.data?.user));
        }

        setUser(data.data?.user);
        showSuccessToast(response.data.message);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      console.error("Login failed:", errorMessage);
      showErrorToast(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.setItem("loggingOut", "true");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
    setUser(null);
    showSuccessToast("Logged out successfully! 🚀");
    router.push("/");
  };

  // ✅ Forgot Password Function
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://bnbapi.bnbmehomes.in/api/v1/authentication/forgot-password",
        { email }
      );
    } catch (error: any) {
      console.error(
        "Forgot password failed:",
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
