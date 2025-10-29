import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/AuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ServerApi } from "@/constants";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailPattern.test(form.email)) {
      return toast.error("Please Enter Valid Email");
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`${ServerApi}/auth/sendPassResetMail`, {
        email: form.email,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went Wrong!", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 w-6x1 p-6 rounded-lg shadow-md border ">
        <div className="flex justify-center border-b-[3px] pb-2">
          <h1 className="text-xl font-semibold">Forget Password</h1>
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

          {isLoading ? (
            <Loader className="animate-spin ml-19" />
          ) : (
            <Button type="submit" onClick={handleLogin}>
              {isLoading ? <Loader className="animate-spin" /> : "Reset"}
            </Button>
          )}
        </form>
        <Link to="/login" className="m-auto text-blue-600">
          Back to Login?
        </Link>
        <div className="flex justify-center flex-col items-center  ">
          <span>No Account?</span>
          <Button variant="outline" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
