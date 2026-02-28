import { api } from "./api";

export const getNotifications = async () => {
  const { data } = await api.get("/notificaiton");
  return data.notifications;
};
