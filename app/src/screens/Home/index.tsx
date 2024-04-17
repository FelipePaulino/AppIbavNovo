import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

const loadingGif = require("../../assets/loader-two.gif");

import { useAuth } from "../../hooks/useAuth";
import useUserFiltered from "../../hooks/useUserFiltered";

import { IPropsAppStack } from "../../routes/AppStack/types";

import { connectApi } from "../../common/services/ConnectApi";
import { registerForPushNotificationsAsync } from "../../components/PushNotification";
import NotificationContentModalComponent from "../../components/Modal/Notifications";
import RequestService from "../../common/services/RequestService";
import { IconNotification } from "../../components/IconNotification";
import * as S from "./styles";

export function HomeScreen() {
  const { signOut } = useAuth();
  const serviceGet = new RequestService();
  const { loading, user, updateUsers, setUpdateUsers } = useUserFiltered();
  const navigation = useNavigation<IPropsAppStack>();
  const dataUser = user && user[0] && user[0][1];
  const whatIsOffice = dataUser && dataUser.cargo;
  const [tokenStrings, setTokenStrings] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const isFocused = useIsFocused();

  const [notices, setNotices] = useState<any>();
  const getNotification = async () => {
    const { data } = await connectApi.get("/notificacao.json");
    const arrayRegister = data && Object.values(data).map((item) => item?.registro);
    setTokenStrings(arrayRegister);
  };

  const registerCellphone = (token: any) => {
    try {
      connectApi.post("/notificacao.json", {
        registro: token?.data,
        rede: dataUser?.rede,
        nome: dataUser?.nome,
      });
      //   .then(() => setSuccessModal(true));
    } catch (err) {}
  };

  useEffect(() => {
    getNotification();
    getNotifications();
  }, [dataUser, isFocused]);

  useEffect(() => {
    if (dataUser && tokenStrings) {
      registerForPushNotificationsAsync().then((token) => {
        if (!tokenStrings?.includes(token?.data)) {
          registerCellphone(token);
        }
      });
    }
  }, [tokenStrings]);

  const { dispatch } = useFormReport();
  const clean = (page: string) => {
    navigation.navigate(page);
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
    dispatch({
      type: FormReportActions.setOffer,
      payload: "",
    });
    dispatch({
      type: FormReportActions.setObservations,
      payload: "",
    });
    dispatch({
      type: FormReportActions.setTextDate,
      payload: "Selecione uma data",
    });
    dispatch({
      type: FormReportActions.setPresencaCulto,
      payload: [],
    });
    dispatch({
      type: FormReportActions.setPresencaCelula,
      payload: [],
    });
    dispatch({
      type: FormReportActions.setDate,
      payload: new Date(),
    });
    dispatch({
      type: FormReportActions.setWeek,
      payload: "Selecione uma semana",
    });
  };

  const office = () => {
    switch (whatIsOffice) {
      case "lider de celula":
        return <TitleComponent title="Lider de célula" decoration red />;

      case "discipulador":
        return <TitleComponent title="Discipulador" decoration red />;

      case "pastor":
        return <TitleComponent title="Pastor" decoration red />;
    }
  };

  const logout = () => {
    setUpdateUsers(!updateUsers);
    signOut();
  };

  const getNotifications = async () => {
    await serviceGet.getNotices().then((response) => {
      setNotices(Object.values(response));
    });
  };

  const OpenNotification = () => {
    getNotifications();
    setShowNotification(true);
  };

  return (
    <Fragment>
      <HeaderComponent>
        <LogoComponent full />
        <S.Buttons>
          <TouchableOpacity onPress={OpenNotification}>
            <IconNotification update={showNotification} />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <S.Material name="logout" size={24} />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <>
          {showNotification ? (
            <NotificationContentModalComponent
              data={notices}
              setShowNotification={setShowNotification}
            />
          ) : (
            <S.Content>
              {dataUser && (
                <Fragment>
                  <S.Names>
                    <S.Name>{dataUser.nome}</S.Name>

                    {office()}
                  </S.Names>

                  {whatIsOffice === "lider" && (
                    <S.Info>
                      <S.InfoTextTitle>Célula</S.InfoTextTitle>

                      <S.InfoTextSubtitle>{`${dataUser.numero_celula} - ${dataUser.rede}`}</S.InfoTextSubtitle>
                    </S.Info>
                  )}

                  <S.ContentOptions>
                    <SelectedMenuComponent
                      icon={<S.SendReportIcon name="document-text-sharp" />}
                      title="Entregar Relatório"
                      onPress={() => clean("SendReport")}
                    />

                    {whatIsOffice === "administrador" ? (
                      <SelectedMenuComponent
                        icon={<S.Material name="add" size={40} />}
                        title="Cadastro"
                        onPress={() => navigation.navigate("PreRegisterAdmin")}
                      />
                    ) : (
                      <SelectedMenuComponent
                        icon={<S.RegisterIcon name="user-plus" />}
                        title="Cadastrar"
                        onPress={() => navigation.navigate("Register")}
                      />
                    )}

                    {whatIsOffice === "administrador" ? (
                      <SelectedMenuComponent
                        icon={<S.Material name="format-list-bulleted" size={40} />}
                        title="Listagem"
                        onPress={() => navigation.navigate("PreListAdmin")}
                      />
                    ) : (
                      <SelectedMenuComponent
                        icon={<S.MembersIcon name="user-friends" />}
                        title="Membros"
                        onPress={() => navigation.navigate("Members")}
                      />
                    )}
                  </S.ContentOptions>

                  <S.ContentOptions>
                    <SelectedMenuComponent
                      icon={<S.ReportView name="copy" />}
                      title="Ver Relatórios Entregues"
                      onPress={() => clean("SeeReports")}
                    />
                    {whatIsOffice === "administrador" && (
                      <>
                        <SelectedMenuComponent
                          icon={<S.MultiplicationIcon name="multiplication" />}
                          title="Multiplicação"
                          onPress={() => navigation.navigate("Multiplication")}
                        />
                      </>
                    )}
                    <SelectedMenuComponent
                      icon={<S.PreachingIcon name="upload" />}
                      title="Palavra"
                      onPress={() => navigation.navigate("Preaching")}
                    />
                    {whatIsOffice === "administrador" && (
                      <>
                        <SelectedMenuComponent
                          icon={<S.MultiplicationIcon name="mail" />}
                          title="Avisos"
                          onPress={() => navigation.navigate("NoticeMessage")}
                        />
                      </>
                    )}
                  </S.ContentOptions>
                </Fragment>
              )}
            </S.Content>
          )}
        </>
      )}
    </Fragment>
  );
}
