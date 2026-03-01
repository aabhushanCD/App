// features/search/search.service.js
import { api } from "@/api/axios";

export const searchUsers = (text) => {
  return api.post(`/auth/search`, { text });
};
