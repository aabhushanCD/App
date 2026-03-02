import { api } from "@/api/axios";

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

export const registerApi = (data) => {
  return api.post("/auth/register", data);
};

export const logOutApi = () => {
  return api.post("/auth/logout");
};

export const meApi = () => {
  return api.get("/auth/me");
};

export const sendPassResetMail = (data) => {
  return api.post("/auth/sendPassResetMail", data);
};

export const reset = ({ id, token, form }) => {
  return api.post(`/auth/reset/${id}/${token}`, form.password);
};
