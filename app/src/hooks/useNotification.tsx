import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import RequestService from "../common/services/RequestService";

interface Notification {
  id?: string;
  message?: string;
  isVisible?: true
}

export const useNotification = () => {
  const isFocused = useIsFocused();
  const serviceGet = new RequestService();
  const [newNotifications, setNewNotifications] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = async () => {
    try {
      const response = await serviceGet.getNotifications();
      setNotifications(Object.values(response));
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  const openNotification = () => {
    getNotifications();
    setShowNotification(true);
  };

  useEffect(() => {
    getNotifications();
  }, [isFocused]);

  return {
    notifications,
    newNotifications,
    showNotification,
    openNotification,
    setShowNotification,
    setNewNotifications,
  };
};
