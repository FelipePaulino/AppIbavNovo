import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { TitleComponent } from "../../Title";
import useUserFiltered from "../../../hooks/useUserFiltered";
import RequestService from "../../../common/services/RequestService";
import { connectApi } from "../../../common/services/ConnectApi";
import * as S from "./styles";

interface Notification {
  id?: string;
  message?: string;
  isVisible?: boolean;
}

interface Props {
  data: Notification[];
  newNotifications: number;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationContentModalComponent({
  data,
  newNotifications,
  setShowNotification,
}: Props) {
  const [users, setUsers] = useState<any>([]);
  const { user } = useUserFiltered();
  const userData = user && user[0] && user[0][1];
  const serviceGet = new RequestService();
  const lastDataId = data && data.length > 0 ? data[data.length - 1].id : null;

  const getUsers = async () => {
    await serviceGet.getUsers().then((response) => {
      setUsers(Object.values(response));
    });
  };

  const updateUsers = () => {
    const filterOtherUsers = users.filter((item: any) => {
      if (item) {
        return item.email?.toLowerCase() !== userData?.email?.toLowerCase();
      }
    });
    const updatedUser = { ...userData, idNotification: lastDataId };
    filterOtherUsers.push(updatedUser);

    const payload = { ...filterOtherUsers };
    connectApi.put(`/users.json`, payload);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users.length && userData && userData?.idNotification !== lastDataId) {
      updateUsers();
    }
  }, [userData, data, users]);

  return (
    <S.Background>
      <S.Heading>
        <S.Close name="close" onPress={() => setShowNotification(false)} />
      </S.Heading>

      <ScrollView style={{ paddingHorizontal: 10 }}>
        {data ? (
          <Fragment>
            {data
              ?.slice()
              .reverse()
              .map((item, index: number) => {
                const isHighlighted =
                  newNotifications > 0 && index < newNotifications;
                return (
                  <>
                    {item.isVisible && (
                      <S.ContentInfo key={item.id}>
                        <S.Line isHighlighted={isHighlighted} />
                        <S.Info>
                          <S.InfoText>{item.message}</S.InfoText>
                        </S.Info>
                      </S.ContentInfo>
                    )}
                  </>
                );
              })}
          </Fragment>
        ) : (
          <S.InfoNotResults>
            <TitleComponent title="Não há nenhuma notificação" large weight />
          </S.InfoNotResults>
        )}
      </ScrollView>
    </S.Background>
  );
}
