import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiClient } from "@/commons/api-client";

export function useRegister() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function register() {
    setLoading(true);
    setError(null);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.post("/api/v1/auth/register", {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const { access_token } = res.data;
      document.cookie = `access_token=${access_token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax;`;

      router.push("/reports/finance-reports");
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data?.errors;
        if (Array.isArray(errors)) {
          setError(errors.join(", "));
        } else {
          setError(err.response?.data?.error || "Something went wrong. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
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
    passwordConfirmation,
    setPasswordConfirmation,
    loading,
    error,
    setError,
    showPassword,
    setShowPassword,
    register,
  };
}
