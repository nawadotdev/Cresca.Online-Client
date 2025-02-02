import { useForm } from "react-hook-form";
import { FaSignInAlt } from "react-icons/fa";
import { useLogin } from "../../hooks/Auth/useLogin";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  username: string;
  password: string;
};

interface LoginFormProps {
  redirect?: string; // Define the redirect prop type
}

const LoginForm: FC<LoginFormProps> = ({ redirect }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { login, isLoading, error } = useLogin();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await login(data.username, data.password);
    if (result) {
      if (rememberMe) {
        localStorage.setItem("token", result.token);
      } else {
        sessionStorage.setItem("token", result.token);
      }
      console.log("Redirecting to", redirect);
      if (redirect) {
        navigate(redirect);
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#0D0F0F]">
      <div className="bg-[#191C1D] text-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="bg-black p-5 rounded-lg text-center">
          <img src="https://cresca.online/assets/images/logo-sm.png" alt="Logo" className="mx-auto h-12" />
          <h2 className="mt-4 text-lg font-semibold">Cresca'ya hoş geldin.</h2>
          <p className="text-gray-400 text-sm">Cresca ile devam etmek için oturum açın.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-gray-300 block mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              {...register("username", { required: "Kullanıcı adı gerekli" })}
              className="w-full px-4 py-2 rounded bg-[#242729] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Kullanıcı adınızı girin"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="text-gray-300 block mb-1">Şifre</label>
            <input
              type="password"
              {...register("password", { required: "Şifre gerekli" })}
              className="w-full px-4 py-2 rounded bg-[#242729] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Şifrenizi girin"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Beni Hatırla */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="rememberMe" className="w-4 h-4 accent-green-500" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <label htmlFor="rememberMe" className="text-gray-400 text-sm">Beni hatırla</label>
          </div>

          {/* Giriş Yap Butonu */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-green-600 transition"
          >
            <span>{isLoading ? "Yükleniyor..." : "Giriş yap"}</span><FaSignInAlt />
          </button> 

          {/* Bir hesabınız yok mu? */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">Bir hesabınız yok mu? <a href="/register" className="text-green-500">Hemen kayıt ol
            </a></p>
          </div>

          {/* Hata Mesajı */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
