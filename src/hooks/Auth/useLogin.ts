import { useState } from "react";
import { loginService } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuth();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const resp = await loginService(username, password);
      setIsLoading(false);
      dispatch({
        type: "LOGIN",
        payload: {
          token: resp.data.token,
        },
      })
      return resp.status === 200 ? resp.data : null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sunucu hatası oluştu");
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, error };
};
