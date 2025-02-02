import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deposit } from "../services/TansactionService";
import { useAuth } from "../context/AuthContext";

const DepositPage = () => {
    const { state } = useAuth()
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [paymentStatus, setPaymentStatus] = useState<'checking' | 'failed' | 'successful'>('checking');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    useEffect(() => {
        if (!state.token) {
            navigate("/login");
            return;
        }
        if (token) {
            if (!state.token) {
                navigate("/login");
                return;
            }
            const checkPaymentStatus = async () => {
                try {
                    const depositCheck = await deposit((state.token) as string, token);
                    if (depositCheck.status === 200) {
                        setPaymentStatus('successful');
                    } else {
                        setPaymentStatus('failed');
                        setErrorMessage(depositCheck.message || 'Bilinmeyen bir hata oluştu');
                    }
                } catch (error) {
                    setPaymentStatus('failed');
                    setErrorMessage(error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu');
                }
            };

            checkPaymentStatus();
        }
    }, [token]);

    const handleRedirect = (path: string) => {
        navigate(path);
    };

    return (
        <div className="flex items-center justify-center bg-[#0D0F0F] min-h-[calc(100vh-7rem)]">
            <div className="bg-[#191C1D] text-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="bg-black p-5 rounded-lg text-center">
                    <h2 className="mt-4 text-lg font-semibold">Ödeme Durumu</h2>

                    {paymentStatus === 'checking' && (
                        <p className="text-gray-400 text-sm">Ödeme kontrol ediliyor...</p>
                    )}

                    {paymentStatus === 'failed' && (
                        <div className="text-red-500">
                            <p>{errorMessage || 'Ödeme başarısız oldu.'}</p>
                            <button
                                onClick={() => handleRedirect("/balance")}
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                            >
                                Hesabınıza Geri Dön
                            </button>
                        </div>
                    )}

                    {paymentStatus === 'successful' && (
                        <div className="text-green-500">
                            <p>Ödeme başarılı!</p>
                            <button
                                onClick={() => handleRedirect("/")}
                                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                            >
                                Anasayfaya Dön
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
