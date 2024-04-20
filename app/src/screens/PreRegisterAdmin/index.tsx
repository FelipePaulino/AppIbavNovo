import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import { useAuth } from "../../hooks/useAuth";
import { useFormReport } from "../../hooks/useFormReport";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { FormReportActions } from "../../contexts/FormReport";

import useUserFiltered from "../../hooks/useUserFiltered";
import { useNotification } from "../../hooks/useNotification";
import { IconNotification } from "../../components/IconNotification";
import NotificationContentModalComponent from "../../components/Modal/Notifications";
import * as S from "./styles";

export function PreRegisterAdminScreen() {
  const { dispatch } = useFormReport();
  const { signOut } = useAuth();
  const { updateUsers, setUpdateUsers } = useUserFiltered();
  const {
    notifications,
    newNotifications,
    showNotification,
    openNotification,
    setNewNotifications,
    setShowNotification,
  } = useNotification();

  const navigation = useNavigation<IPropsAppStack>();

  const clean = (value: string) => {
    navigation.navigate(value);
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: "Selecione",
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: "Selecione",
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: "Selecione",
    });
  };

  const logout = () => {
    signOut()
    setUpdateUsers(!updateUsers)
  }

  return (
    <Fragment>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>

        <S.Buttons>
          <TouchableOpacity onPress={openNotification}>
            <IconNotification
              setNewNotifications={setNewNotifications}
              update={showNotification}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={logout}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>
      {showNotification ? (
        <NotificationContentModalComponent
          newNotifications={newNotifications}
          data={notifications}
          setShowNotification={setShowNotification}
        />
      ) : (
        <S.Content>
          <S.Names>
            <TitleComponent title="Cadastro" medium uppercase primary weight />
          </S.Names>

          <S.ContentOptions>
            <SelectedMenuComponent
              icon={<S.RegisterIcon name="user-plus" />}
              title="Membros/Visitante"
              onPress={() => clean("Register")}
            />
            <SelectedMenuComponent
              icon={<S.UserGridIcon name="network-wired" />}
              title="Usuário/Rede"
              onPress={() => navigation.navigate("UserRegister")}
            />
          </S.ContentOptions>
        </S.Content>
      )}
    </Fragment>
  );
}
