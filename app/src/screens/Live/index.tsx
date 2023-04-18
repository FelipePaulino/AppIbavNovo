import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
// import { NotificationComponent } from "../../components/Notification";
import { SelectedMenuComponent } from "../../components/SelectedMenu";
import axios from "axios";

const loadingGif = require("../../assets/loader-two.gif");

import { useAuth } from "../../hooks/useAuth";
import useUserFiltered from "../../hooks/useUserFiltered";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";

import Iframe from 'react-iframe'
export function LiveScreen() {
    const [idVideo, setIdVideo] = useState(``)
    useEffect(() => {
        axios.get('https://app-ibav-f06f4-default-rtdb.firebaseio.com/live.json')
            .then(function (response) {
                setIdVideo(response?.data)
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [])
    console.log(idVideo[1], 'idVideo')
    const { signOut } = useAuth();
    const { loading, user, updateUsers, setUpdateUsers } = useUserFiltered();
    const navigation = useNavigation<IPropsAppStack>();
    const dataUser = user && user[0] && user[0][1];
    const whatIsOffice = dataUser && dataUser.cargo;

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
        setUpdateUsers(!updateUsers)
        signOut()
    }
    const [a, setA] = useState()

    return (
        <S.Container source={require("../../assets/background.png")}>
            <ScrollView>

                <S.Heading>
                    <LogoComponent />
                </S.Heading>
                <S.Heading2>
                    <TitleComponent title="Veja nosso culto" uppercase large weight />
                </S.Heading2>
                <S.Box>
                    <Iframe url={`https://www.youtube.com/embed/${idVideo[1]}`}
                        width="90%"
                        height="320px"
                        id=""
                        className=""
                        display="block"
                        position="relative" />

                    <S.Adress>Cultos aos domingos às 9hs e 18h00</S.Adress>

                    <S.Adress>Local: Rua Fioravante Zampol, 290, Centro, Ribeirão Pires - SP</S.Adress>
                </S.Box>
            </ScrollView>

        </S.Container>
    );
}
