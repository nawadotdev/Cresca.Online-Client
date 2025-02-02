import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import BalancePage from "./pages/BalancePage";
import RegisterPage from "./pages/ReigsterPage";
import DepositPage from "./pages/DepositPage";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const { state } = useAuth();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/deposit/:token" element={ state.token ? <DepositPage /> : <Navigate to="/login" /> } />
        <Route path="/register" element={ state.token ? <Navigate to="/" /> : <RegisterPage /> } />
        <Route path="/login" element={ state.token ? <Navigate to="/" /> : <LoginPage /> } />
        <Route path="/balance" element={ state.token ? <BalancePage /> : <Navigate to="/login" /> } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
