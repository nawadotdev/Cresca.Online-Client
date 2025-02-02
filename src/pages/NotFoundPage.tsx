import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center bg-[#0D0F0F] h-screen">
      <div className="bg-[#191C1D] text-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="bg-black p-5 rounded-lg">
          <h2 className="mt-4 text-lg font-semibold">404 - Sayfa Bulunamadı</h2>
          <p className="text-gray-400 text-sm mt-2">Aradığınız sayfa mevcut değil.</p>
        </div>

        <Link to="/" className="mt-6 inline-block">
          <button className="bg-green-500 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 hover:bg-green-600 transition">
            <span>Anasayfaya Dön</span> <FaHome />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;