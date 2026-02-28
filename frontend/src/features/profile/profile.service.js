import { api } from "@/api/axios";

export const updateProfile = (form) => {
  return api.put("/auth/updateProfile/", form);
};

export const addHighlight = (data) => {
  return api.post("highlight/addHighlight", data);
};

export const getHighlights = () => {
  return api.get("highlight/getHighlights/");
};
