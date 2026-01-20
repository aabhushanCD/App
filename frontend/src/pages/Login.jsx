import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { useAuth } from "@/store/AuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailPattern.test(form.email.trim())) {
      return toast.error("Please Enter Valid Email");
    }
    if (!form.password) {
      return toast.error("Password is required");
    }
    const success = await login(form);
    if (success) {
    navigate("/home")
    }
  };
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4 w-6x1 p-6 rounded-lg shadow-md border  ">
        <div className="flex justify-center border-b-[3px] pb-2">
          <h1 className="text-xl font-semibold">Login</h1>
        </div>

        <form className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <Input
              placeholder="user@gmail.com"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Password</Label>
            <Input
              placeholder="**************"
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {isLoading ? (
            <Loader className="animate-spin m-auto " />
          ) : (
            <Button type="submit" onClick={handleLogin}>
              Submit
            </Button>
          )}
          <Link to="/forget-password" className="m-auto text-blue-600">
            Forget Password?
          </Link>
        </form>

        <div className="flex justify-center flex-col items-center gap-2">
          <span>No Account?</span>
          <Button variant="outline" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
