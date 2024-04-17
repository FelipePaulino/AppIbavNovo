import { useEffect, useState } from "react";
import { connectApi } from "../../common/services/ConnectApi";
import RequestService from "../../common/services/RequestService";
import { useIsFocused } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import * as S from "./styles";

interface IconNotificationProps {
  update: boolean;
}

interface Notification {
  id?: string;
}

export const IconNotification = ({ update }: IconNotificationProps) => {
  const { user: userAuth } = useAuth();
  const [notices, setNotices] = useState<Notification[]>([]);
  const [user, setUser] = useState<any>([]);
  const [listUsers, setListUsers] = useState<any>([]);
  const dataUser = user && user[0] && user[0][1];
  const serviceGet = new RequestService();
  const lastNotice = notices[notices.length - 1];
  const shouldShowNotification = lastNotice?.id !== dataUser?.idNotification;
  const isFocused = useIsFocused();

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
  }, [listUsers, isFocused]);

  useEffect(() => {
    connectApi.get("/users.json", undefined).then((response) => {
      setListUsers(Object.entries(response.data));
    });

    getNotification();
  }, [isFocused, update]);

  const getNotification = async () => {
    await serviceGet.getNotices().then((response) => {
      setNotices(Object.values(response));
    });
  };

  return (
    <S.Container>
      <S.IconNotification name="notifications" size={24} />
      {shouldShowNotification && <S.NotificationIndicator />}
    </S.Container>
  );
};
