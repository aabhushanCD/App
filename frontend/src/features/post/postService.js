import { api } from "@/api/axios";

export const myPosts = () => {
  return api.get("post/myPost");
};

export const createPost = (data) => {
  return api.post("post/createPost", data);
};

export const getPostPagenation = (page) => {
  return api.get(`/post/getPostPagenation?limit=${3}&page=${page}`);
};

export const deletePost = (id) => {
  return api.delete(`/post/deletePost/${id}`);
};

export const like_dislikePost = (id) => {
  return api.put(`/post/like_dislikePost/${id}`);
};
