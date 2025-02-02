import LoginForm from "../components/Auth/LoginForm";


const LoginPage = () => {
  return (
    <div className="flex items-center justify-center bg-black min-h-[calc(100vh-7rem)] p-4">
      <LoginForm redirect={"/"} />
    </div>
  );
};

export default LoginPage;