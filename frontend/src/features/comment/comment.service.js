import { api } from "@/api/axios";

export const getAllComments = (id) => {
  return api.get(`post/getAllComments/${id}`);
};

export const editComment = (editingText, commentId) => {
  return api.put(`post/editComment/${commentId}`, { commentText: editingText });
};

export const likeComments = (id) => {
  return api.put(`/post/likeComment/${id}`);
};

export const deleteComment = (postId, commentId) => {
  return api.delete(`/post/deleteComment/${postId}/comment/${commentId}`);
};

export const sendComment = (postId, formData) => {
  return api.post(`/post/sendComment/${postId}`, formData);
};
