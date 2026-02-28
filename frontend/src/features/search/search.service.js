// features/search/search.service.js
import { ServerApi } from "@/utils/constants";
import axios from "axios";

export const searchUsers = (text) => {
  return axios.post(
    `${ServerApi}/auth/search`,
    { text },
    { withCredentials: true },
  );
};
