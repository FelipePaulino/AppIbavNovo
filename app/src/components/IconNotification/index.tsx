import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { connectApi } from "../../common/services/ConnectApi";
import { useNotification } from "../../hooks/useNotification";
import { useIsFocused } from "@react-navigation/native";
import * as S from "./styles";

interface IconNotificationProps {
  update: boolean;
  setNewNotifications: Dispatch<SetStateAction<number>>;
}

export const IconNotification = ({
  update,
  setNewNotifications,
}: IconNotificationProps) => {
  const { user: userAuth } = useAuth();
  const isFocused = useIsFocused();
  const [user, setUser] = useState<any>([]);
  const { notifications } = useNotification();
  const dataUser = user && user[0] && user[0][1];
  const [listUsers, setListUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const unreadCountVisible = notifications?.filter((item) => item.isVisible);
  const lastViewedIndex = unreadCountVisible?.findIndex(
    (notification) => notification.id === dataUser?.idNotification
  );
  const unreadCount = unreadCountVisible?.length - (lastViewedIndex + 1);
  
  useEffect(() => {
    const emailAuth = userAuth && userAuth?.email;
    const filterUser =
      listUsers &&
      listUsers?.filter((item: any) => {
        if (item[1]?.email) {
          return item[1]?.email?.trim() === emailAuth;
        }
      });
    setUser(filterUser);
    setNewNotifications(unreadCount);
  }, [listUsers, unreadCount, isFocused]);

  useEffect(() => {
    setLoading(true);
    connectApi
      .get("/users.json", undefined)
      .then((response) => {
        setListUsers(Object.entries(response.data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [update, isFocused]);

  return (
    <S.Container>
      <S.IconNotification name="notifications" size={24} />
      {!loading && unreadCount > 0 && (
        <S.NotificationIndicator>
          <S.UnreadCount>{unreadCount}</S.UnreadCount>
        </S.NotificationIndicator>
      )}
    </S.Container>
  );
};
