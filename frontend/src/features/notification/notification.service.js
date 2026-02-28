import { api } from "@/api/axios";

export const notification = () => {
  return api.get("notification");
};
