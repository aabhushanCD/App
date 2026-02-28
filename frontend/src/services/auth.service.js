import { api } from "./api";

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

export const registerApi = (data) => {
  return api.post("/auth/post", data);
};

export const logOutApi = () => {
  return api.post("/auth/logout");
};

export const meApi = () => {
  return api.get("/auth/me");
};
