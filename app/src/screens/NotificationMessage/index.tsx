import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { LogoComponent } from "../../components/Logo";
import { ButtonComponent } from "../../components/Button";
import { IPropsAppStack } from "../../routes/AppStack/types";
import RequestService from "../../common/services/RequestService";
import { connectApi } from "../../common/services/ConnectApi";
import useUserFiltered from "../../hooks/useUserFiltered";
import { ModalComponent } from "../../components/Modal";
import { RemoveNotification } from "../../components/Modal/RemoveNotification";
import * as S from "./styles";

export function NotificationMessage() {
  const isFocused = useIsFocused();
  const { user } = useUserFiltered();
  const serviceGet = new RequestService();
  const [users, setUsers] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [notices, setNotices] = useState<any>([]);
  const navigation = useNavigation<IPropsAppStack>();
  const userData = user && user[0] && user[0][1];
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selecteditem, setSelecteditem] = useState<any>();

  const getUsers = async () => {
    await serviceGet.getUsers().then((response) => {
      const allUsers = Object.values(response);
      const currentUser = allUsers.find(
        (user: any) =>
          user?.email?.toLowerCase() === userData.email.toLowerCase()
      );
      setUsers(allUsers);
      setCurrentUser(currentUser);
    });
  };
  const updateUsers = async (idParaRemover: string) => {
    if (notices && notices.length > 0) {
      const userDataIndex = notices?.findIndex(
        (notice: any) => notice?.id === userData?.idNotification
      );
      const noticeId = notices?.[userDataIndex - 1]?.id;
      if (currentUser?.idNotification === idParaRemover) {
        const filterOtherUsers = users.filter((item: any) => {
          if (item) {
            return item.email?.toLowerCase() !== userData?.email?.toLowerCase();
          }
        });
        const updatedUser = { ...userData, idNotification: noticeId };

        filterOtherUsers?.push(updatedUser);

        const payload = { ...filterOtherUsers };
        connectApi.put(`/users.json`, payload);
      }
    }
  };

  const getNotifications = async () => {
    await serviceGet
      .getNotifications()
      .then((response) => {
        setNotices(Object.values(response));
      })
      .catch(() => {
        setNotices([]);
      });
  };

  const removerItemPorId = async (idParaRemover: string) => {
    const updatedNotices = notices.filter(
      (item: { id: string }) => item.id !== idParaRemover
    );
    try {
      await updateUsers(idParaRemover);
      await connectApi.put("/avisos.json", updatedNotices);
      getNotifications();
    } catch (err) {
      await updateUsers(idParaRemover);
      getNotifications();
    }
  };

  const updateNotices = async (notice: any, isVisible: boolean) => {
    const updatedNotices = notices.map((item: any) => {
      if (item.id === notice?.id) {
        return { ...item, isVisible };
      }
      return item;
    });

    const payload = { ...updatedNotices };
    await connectApi.put(`/avisos.json`, payload);
    getNotifications();
  };

  useEffect(() => {
    getUsers();
    getNotifications();
  }, [isFocused]);

  return (
    <>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>
        <ButtonComponent
          title="Novo Aviso"
          onPress={() => navigation.navigate("NewNotificationMessage")}
          width="136"
          heigth="33"
          size="12"
          color="white"
        />
      </HeaderComponent>
      <S.Names>
        <S.Name>AVISOS</S.Name>
      </S.Names>
      <ScrollView>
        <S.Content>
          {notices.length ? (
            <>
              {notices
                ?.slice()
                .reverse()
                .map((item: any) => (
                  <S.Box key={item.id}>
                    <S.MessageContainer>
                      <S.MessageText>{item.message}</S.MessageText>
                    </S.MessageContainer>
                    <S.BoxButton>
                      {item.isVisible ? (
                        <TouchableOpacity
                          onPress={() => updateNotices(item, false)}
                        >
                          <S.Icon name="eye" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => updateNotices(item, true)}
                        >
                          <S.Icon name="eye-slash" />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          setSelecteditem(item)
                          setOpenConfirmModal(true)
                        }}
                      >
                        <S.Icon name="trash" />
                      </TouchableOpacity>
                    </S.BoxButton>
                  </S.Box>
                ))}
            </>
          ) : (
            <S.Text>Não há nenhuma aviso</S.Text>
          )}
        </S.Content>
      </ScrollView>
      <ModalComponent
        isVisible={openConfirmModal}
        onBackdropPress={() => setOpenConfirmModal(false)}
      >
        <RemoveNotification
          cancel={() => setOpenConfirmModal(false)}
          confirm={() => {
            removerItemPorId(selecteditem.id)
            setOpenConfirmModal(false)
          }}
        />
      </ModalComponent>
    </>
  );
}
