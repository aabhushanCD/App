import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {  Loader } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../authContext";

const LoginForm = () => {
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
            type="password"
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

      <div className="flex justify-center flex-col items-center gap-2">
        <span>No Account?</span>
        <Button variant="outline" onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
