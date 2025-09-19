import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/AuthStore";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { isLoading, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    const success = await register(form);
    if (success) navigate("/login");

  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 w-6x1 p-6 rounded-lg shadow-md border ">
        <div className="flex justify-center border-b-[3px] pb-2">
          <h1 className="text-xl font-bold">SignUp</h1>
        </div>

        <form className="flex flex-col gap-4" type="submit">
          <div className="flex flex-col gap-1">
            <Label>Full Name</Label>
            <Input
              placeholder="John Noe"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
            <Loader className="animate-spin ml-19" />
          ) : (
            <Button type="submit" onClick={handleSignup}>
              Submit
            </Button>
          )}
        </form>

        <div className="flex justify-center flex-col items-center gap-2 mt-4">
          <span>Already Account?</span>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
