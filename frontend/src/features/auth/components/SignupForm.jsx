import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../authContext";

const SignupForm = () => {
  const { isLoading, register } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    type: "",
    error: "",
  });
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      return setErrorMessage({
        type: "name",
        error: "Please, Enter All Field ! ",
      });
    }
    if (!emailPattern.test(form.email)) {
      toast.error("Please Enter Valid Email");
      return setErrorMessage({
        type: "email",
        error: "Email Invalid! ",
      });
    }
    if (!form.password.length < 7) {
      return setErrorMessage({
        type: "password",
        error: "Password must be greater than 7 ",
      });
    }

    const success = await register(form);
    if (success) {
      return navigate("/login");
    }
  };
  return (
    <form className="flex flex-col gap-4 mt-4" type="submit">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            placeholder="John Noe"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errorMessage.type === "name" && (
            <FieldDescription className={"text-red-500"}>
              * {errorMessage.error}
            </FieldDescription>
          )}
        </Field>

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
          {errorMessage.type === "email" && (
            <FieldDescription className={"text-red-500"}>
              * {errorMessage.error}
            </FieldDescription>
          )}
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
          {errorMessage.type === "password" && (
            <FieldDescription className={"text-red-500"}>
              * {errorMessage.error}
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>
      {isLoading ? (
        <Loader className="animate-spin ml-19" />
      ) : (
        <Button type="submit" onClick={handleSignup}>
          Submit
        </Button>
      )}

      <div className="flex justify-center flex-col items-center gap-2 mt-4">
        <span>Already Account?</span>
        <Button variant="outline" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
