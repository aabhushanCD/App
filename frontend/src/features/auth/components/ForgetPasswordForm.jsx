import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sendPassResetMail } from "../auth.service";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const ForgetPasswordForm = () => {
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
      const res = await sendPassResetMail(form);
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
    <form className="flex flex-col gap-2 mt-4">
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

      {isLoading ? (
        <Loader className="animate-spin ml-19" />
      ) : (
        <Button type="submit" onClick={handleLogin}>
          {isLoading ? <Loader className="animate-spin" /> : "Reset"}
        </Button>
      )}

      <Link
        to="/login"
        className="w-full flex justify-center p-3 text-blue-600"
      >
        <span> Back to Login ?</span>
      </Link>
      <div className="flex justify-center flex-col items-center  ">
        <span>No Account?</span>
        <Button variant="outline" onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
