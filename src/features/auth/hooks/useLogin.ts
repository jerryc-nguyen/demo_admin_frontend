import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/commons/api-client";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function login() {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.post("/api/v1/auth/login", { email, password });
      const { access_token } = res.data;
      document.cookie = `access_token=${access_token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax;`;

      router.push("/reports/finance-reports");
      router.refresh();
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.join(", "));
      } else {
        setError(err.response?.data?.error || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    setError,
    showPassword,
    setShowPassword,
    login,
  };
}
