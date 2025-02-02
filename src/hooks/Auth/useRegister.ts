import { useState } from "react";
import { registerService } from "../../services/AuthService";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (username: string, password: string, confirmPassword: string, name:string, surname:string, phone:number) => {
    setIsLoading(true);
    setError(null);

    try {
      const resp = await registerService(username, password, confirmPassword, name, surname, phone);
      setIsLoading(false);

      return resp.status === 201 ? resp.data : null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sunucu hatası oluştu");
      setIsLoading(false);
      return null;
    }
  };

  return { register, isLoading, error };
};
