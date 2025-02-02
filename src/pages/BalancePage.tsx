import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTransactions } from "../services/TansactionService";

type BalanceFormInputs = {
    amount: number;
};

const BalancePage: FC = () => {
    const { state } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<BalanceFormInputs>();
    const navigate = useNavigate();
    const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

    const [balanceHistory, setBalanceHistory] = useState([]);

    useEffect(() => {
        const fetchBalanceHistory = async () => {
          if (!state.token) {
            navigate("/login");
            return;
          }
    
          try {
            const history = await getTransactions(state.token);
            console.log("Balance history:", history);
            setBalanceHistory(history.data.transactions);
          } catch (error) {
            console.error("Error fetching transactions:", error);
          }
        };
    
        fetchBalanceHistory();
      }, [state.token, navigate]);

    const filteredHistory = balanceHistory.filter(entry => {
        if (filter === "income") return entry.amount.startsWith("+");
        if (filter === "expense") return entry.amount.startsWith("-");
        return true;
    });

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString("tr-TR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    };

    const onSubmit = (data: BalanceFormInputs) => {
        const redirectUrl = `https://banking-tr.gta.world/gateway/luKfJG6uOGyobkTjXz56mtk1FvfDLbbDNO1gaguJQUvmt4FD5MB7lskeajAfLfty/0/${data.amount}`;
        window.location.href = redirectUrl;
    };

    return (
        <div className="flex items-center justify-center bg-[#0D0F0F] min-h-[calc(100vh-7rem)]">
            <div className="bg-[#191C1D] text-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="bg-black p-5 rounded-lg text-center">
                    <img src="https://cresca.online/assets/images/logo-sm.png" alt="Logo" className="mx-auto h-12" />
                    <h2 className="mt-4 text-lg font-semibold">Bakiye Yükleme</h2>
                    <p className="text-gray-400 text-sm">Yeni bakiye ekleyin.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div>
                        <label className="text-gray-300 block mb-1">Yükleme Miktarı</label>
                        <input
                            type="number"
                            {...register("amount", { required: "Miktar gerekli", min: { value: 1, message: "Miktar 1'den büyük olmalıdır" } })}
                            className="w-full px-4 py-2 rounded bg-[#242729] text-white border border-gray-700 focus:ring-2 focus:ring-green-500"
                            placeholder="Yüklemek istediğiniz miktarı girin"
                        />
                        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                        Bakiye Yükle
                    </button>
                </form>

                {/* Filtreleme Butonları */}
                <div className="mt-4 flex space-x-2">
                    <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${filter === "all" ? "bg-gray-700" : "bg-gray-500"}`}>
                        Hepsi
                    </button>
                    <button onClick={() => setFilter("income")} className={`px-3 py-1 rounded ${filter === "income" ? "bg-green-700" : "bg-green-500"}`}>
                        Yükleme
                    </button>
                    <button onClick={() => setFilter("expense")} className={`px-3 py-1 rounded ${filter === "expense" ? "bg-red-700" : "bg-red-500"}`}>
                        Harcama
                    </button>
                </div>

                {/* Geçmiş */}
                <div className="mt-4 max-h-60 overflow-y-auto border border-gray-700 rounded-lg">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 sticky top-0">
                            <tr className="border-b border-gray-700">
                                <th className="text-left p-2">Tarih</th>
                                <th className="text-left p-2">İşlem</th>
                                <th className="text-right p-2">Miktar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistory.map(entry => (
                                <tr key={entry._id} className="border-b border-gray-700">
                                    <td className="p-2 text-gray-400">{formatDate(entry.createdAt)}</td>
                                    <td className="p-2 text-gray-500">{entry.reason === "Deposit" ? entry.reason : entry.product}</td>
                                    <td className={`p-2 text-right ${entry.reason === "Deposit" ? "text-green-500" : "text-red-500"}`}>
                                        {entry.amount}₺
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default BalancePage;
