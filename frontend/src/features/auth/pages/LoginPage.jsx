import LoginForm from "../components/LoginForm";
const Login = () => {
  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div className="w-md p-6 rounded-lg shadow-md border  ">
        <div className="text-center border-b-[3px] pb-4">
          <h1 className="text-5xl  font-bold text-blue-900">Sign in</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
