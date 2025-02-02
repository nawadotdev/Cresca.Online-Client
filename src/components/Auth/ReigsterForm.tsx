import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { useRegister } from "../../hooks/Auth/useRegister"; // Kendi register hook'unu kullanabilirsin
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type RegisterFormInputs = {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
};

interface RegisterFormProps {
    redirect?: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ redirect }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
    const { register: registerUser, isLoading, error } = useRegister(); // register hook'unu kullanıyorsanız
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterFormInputs) => {
        const result = await registerUser(data.username, data.password, data.confirmPassword, data.firstName, data.lastName, data.phoneNumber);
        if (result) {
            if (redirect) {
                navigate(redirect);
            }
        }
    };

    // Şifre doğrulama: confirmPassword ile password karşılaştırılır
    const password = watch("password");

    return (
        <div className="flex items-center justify-center bg-[#0D0F0F] min-w-96">
            <div className="bg-[#191C1D] text-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="bg-black p-5 rounded-lg text-center">
                    <img src="https://cresca.online/assets/images/logo-sm.png" alt="Logo" className="mx-auto h-12" />
                    <h2 className="mt-4 text-lg font-semibold">Cresca'ya hoş geldin.</h2>
                    <p className="text-gray-400 text-sm">Yeni hesap oluşturun.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    {/* Kullanıcı Adı */}
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

                    {/* İsim */}
                    <div>
                        <label className="text-gray-300 block mb-1">İsim</label>
                        <input
                            type="text"
                            {...register("firstName", { required: "İsim gerekli" })}
                            className="w-full px-4 py-2 rounded bg-[#242729] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="İsminizi girin"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                    </div>

                    {/* Soyisim */}
                    <div>
                        <label className="text-gray-300 block mb-1">Soyisim</label>
                        <input
                            type="text"
                            {...register("lastName", { required: "Soyisim gerekli" })}
                            className="w-full px-4 py-2 rounded bg-[#242729] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Soyadınızı girin"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                    </div>

                    {/* Telefon Numarası */}
                    <div>
                        <label className="text-gray-300 block mb-1">Telefon Numarası</label>
                        <input
                            {...register("phoneNumber", {
                                required: "Telefon numarası gerekli",
                                pattern: {
                                    value: /^[0-9]{4,8}$/,
                                    message: "Geçerli bir telefon numarası girin"
                                }
                            })}
                            className="w-full px-4 py-2 rounded bg-[#242729] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Telefon numaranızı girin"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            }}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                    </div>

                    {/* Şifre */}
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

                    {/* Şifreyi Tekrar Girin */}
                    <div>
                        <label className="text-gray-300 block mb-1">Şifreyi Tekrar Girin</label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: "Şifreyi doğrulamanız gerekli",
                                validate: value =>
                                    value === password || "Şifreler eşleşmiyor" // Şifre doğrulama
                            })}
                            className="w-full px-4 py-2 rounded bg-[#242729] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Şifrenizi tekrar girin"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Kayıt Ol Butonu */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-500 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-green-600 transition"
                    >
                        <span>{isLoading ? "Yükleniyor..." : "Hesap Oluştur"}</span><FaUserPlus />
                    </button>

                    {/* Zaten bir hesabınız var mı? */}
                    <p className="text-gray-400 text-sm mt-2">
                        Zaten bir hesabınız var mı? <a href="/login" className="text-green-500 hover:underline">Giriş yapın</a>
                    </p>

                    {/* Hata Mesajı */}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
