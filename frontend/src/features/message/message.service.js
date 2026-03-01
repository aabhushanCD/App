import { api } from "@/api/axios";

export const getMessage = (id) => {
  return api.get(`/message/${id}`);
};
export const messageSentTo = (id, data) => {
  return api.post(`/message/sent/to/${id}`, data);
};
