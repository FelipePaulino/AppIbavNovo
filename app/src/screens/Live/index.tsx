import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { WebView } from 'react-native-webview';

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";

import axios from "axios";

import * as S from "./styles";

export function LiveScreen() {
    const [idVideo, setIdVideo] = useState('')
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
                    <WebView
                        //  scalesPageToFit={true}
                        // bounces={false}
                        // javaScriptEnabled
                        style={{ height: 289, width: 300 }}
                        source={{
                            html: `
            <iframe  width="100%" frameborder="0" hspace="0" vspace="0" marginheight="-20" marginwidth="0" height="930" src="https://www.youtube.com/embed/${idVideo[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            `,
                        }}
                    // automaticallyAdjustContentInsets={false}
                    />

                </S.Box>
            </ScrollView>
            <S.Adress>Cultos aos domingos às 9hs e 18h00</S.Adress>
            <S.Adress>Local: Rua Fioravante Zampol, 290, Centro, Ribeirão Pires - SP</S.Adress>
        </S.Container>
    );
}
