import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { HeaderComponent } from "../Header";
import { ComeBackComponent } from "../ComeBack";
import { LogoComponent } from "../Logo";
import { ButtonComponent } from "../Button";
import { IPropsAppStack } from "../../routes/AppStack/types";
import RequestService from "../../common/services/RequestService";
import { connectApi } from "../../common/services/ConnectApi";
import useUserFiltered from "../../hooks/useUserFiltered";
import * as S from "./styles";

export function NoticeMessage() {
  const isFocused = useIsFocused();
  const { user } = useUserFiltered();
  const serviceGet = new RequestService();
  const [users, setUsers] = useState<any>([]);
  const [notices, setNotices] = useState<any>([]);
  const navigation = useNavigation<IPropsAppStack>();
  const userData = user && user[0] && user[0][1];

  const getUsers = async () => {
    await serviceGet.getUsers().then((response) => {
      setUsers(Object.values(response));
    });
  };

  const updateUsers = async (idParaRemover: string) => {
    if (notices && notices.length > 0) {
      const userDataIndex = notices?.findIndex(
        (notice: any) => notice?.id === userData?.idNotification
      );
      const noticeId = notices?.[userDataIndex - 1]?.id;

      if (userData?.idNotification === idParaRemover) {
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

  const getNotices = async () => {
    await serviceGet
      .getNotices()
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
      getNotices();
    } catch (err) {
      await updateUsers(idParaRemover);
      getNotices();
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
    getNotices();
  };

  useEffect(() => {
    getUsers();
    getNotices();
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
          onPress={() => navigation.navigate("AddNoticeMessage")}
          width="136"
          heigth="33"
          size="12"
          color="white"
        />
      </HeaderComponent>
      <S.Names>
        <S.Name>AVISOS</S.Name>
      </S.Names>

      <S.Content>
        {notices.length ? (
          <>
            {notices
              ?.slice()
              .reverse()
              .map((item: any) => (
                <S.Box>
                  <S.MessageContainer key={item.id}>
                    <ScrollView style={{ maxHeight: 100 }}>
                      <S.MessageText>{item.message}</S.MessageText>
                    </ScrollView>
                  </S.MessageContainer>
                  <TouchableOpacity onPress={() => removerItemPorId(item.id)}>
                    <S.Icon name="trash" />
                  </TouchableOpacity>
                  {item.isVisible ? (
                    <TouchableOpacity
                      onPress={() => updateNotices(item, false)}
                    >
                      <S.Icon name="eye" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => updateNotices(item, true)}>
                      <S.Icon name="eye-slash" />
                    </TouchableOpacity>
                  )}
                </S.Box>
              ))}
          </>
        ) : (
          <S.Text>Não há nenhuma aviso</S.Text>
        )}
      </S.Content>
    </>
  );
}
