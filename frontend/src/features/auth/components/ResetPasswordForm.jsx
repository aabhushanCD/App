import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Label } from "radix-ui";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { reset } from "../auth.service";

const ResetPasswordForm = () => {
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
      const res = await reset({ id, token, form });
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
  );
};

export default ResetPasswordForm;
