import React from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { state, dispatch } = useAuth();
  const { token, user } = state;
  console.log("User", user);
  const handleLogout = () => {
    // Dispatch logout action
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  };

  const pages = [
    { title: "Biletler", path: "/tickets" },
    { title: "Hakkında", path: "/about" },
    { title: "İletişim", path: "/contact" },
  ]

  return (
    <header className="flex justify-between items-center p-8 shadow-lg h-12 bg-background text-white">
      <div> {/* Logo  Start*/}
        <Link to="/" className="flex items-center space-x-2 pl-4">
          <img src="https://cresca.online/assets2/image/cresca-logo.png" alt="Logo" className="h-8" />
        </Link>
      </div> {/* Logo  End*/}
      <div> {/* Pages Start */}
        <ul className="flex space-x-4">
          {pages.map((page, index) => (
            <li key={index}>
              <Link to={page.path} className="hover:text-green-500 transition">
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div> {/* Pages End*/}
      <div> {/* Auth Start*/}
        {token ? (
          <div className="flex items-center gap-4">
            <div>{/* Balance  Start*/}
              <Link to={"/balance"}>
                <div className="flex items-center space-x-2 rounded bg-green-400 py-2 p-4 justify-center cursor-pointer">
                  <span>${user?.balance || 0}</span>
                </div>
              </Link>
            </div>{/* Balance  End*/}
            <div onClick={handleLogout} className="bg-red-500 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-red-600 p-4 cursor-pointer">
              <FaSignOutAlt />
              <span>Çıkış Yap</span>
            </div>
          </div>
        ) : (
          <Link to="/login" className="w-full bg-green-500 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-green-600 p-4 cursor-pointer">
            <FaSignInAlt />
            <span>Giriş Yap</span>
          </Link>
        )}
      </div> {/* Auth End*/}
    </header>
  );
};

export default Header;