import { api } from "./api";

export const getAllFriend = () => {
  return api.get("/friend/getAllFriend/");
};

export const getAllUsers = () => {
  return api.get("/friend/getAllUsers/");
};
export const sendRequest = (id) => {
  return api.post(`/friend/sendRequest/${id}`);
};
export const acceptRequest = (id) => {
  return api.post(`/friend/acceptRequest/${id}`);
};
export const getAllRequest = () => {
  return api.get(`/friend/getAllRequest`);
};
export const getAllFriends = () => {
  return api.get(`/friend/getAllFriends`);
};
