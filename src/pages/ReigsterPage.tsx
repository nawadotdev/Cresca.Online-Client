import RegisterForm from "../components/Auth/ReigsterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center bg-black min-h-[calc(100vh-7rem)] p-4">
      <RegisterForm redirect={"/login"} />
    </div>
  );
};

export default RegisterPage;