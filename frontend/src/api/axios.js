import { ServerApi } from "@/utils/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: ServerApi,
  withCredentials: true,
});
