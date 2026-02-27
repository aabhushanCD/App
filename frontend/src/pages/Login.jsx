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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
      navigate("/home");
    }
  };
  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div className="w-md p-6 rounded-lg shadow-md border  ">
        <div className="text-center border-b-[3px] pb-4">
          <h1 className="text-5xl  font-bold text-blue-900">Sign in</h1>
        </div>

        <form className="flex flex-col gap-2 mt-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="user@gmail.com"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                placeholder="**************"
                type="text"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>
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
