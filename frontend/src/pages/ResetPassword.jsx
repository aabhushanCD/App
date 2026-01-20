import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "lucide-react";

import axios from "axios";
import { ServerApi } from "@/constants";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "" });
  const [isLoading, setIsLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { id, token } = useParams();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(`${ServerApi}/auth/reset/${id}/${token}`, {
        newPass: form.password,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
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
          <h1 className="text-xl font-semibold">Reset Password</h1>
        </div>
        <form className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label>New Password</Label>
            <Input
              placeholder="*************"
              type="password"
              name="password"
              value={form.password}
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
      </div>
    </div>
  );
};

export default ResetPassword;
