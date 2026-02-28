import { api } from "@/api/axios";

export const myPosts = () => {
  return api.get("post/myPost");
};
