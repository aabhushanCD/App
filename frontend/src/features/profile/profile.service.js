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

// other user Profile to check their profile
export const getUserProfile = (id) => {
  return api.get(`profile/getUserProfile/${id}`);
};
