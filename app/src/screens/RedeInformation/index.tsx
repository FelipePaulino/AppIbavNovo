import React, { useEffect, useState } from "react";
import { ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { DefaultContentModalComponent } from "../../components/Modal/Default";
import RequestService from "../../common/services/RequestService";

import MenuNavigation from "../../common/constants/navigation";
import FormFields from "../../common/constants/form";

import * as S from "./styles";
import { connectApi } from "../../common/services/ConnectApi";
import { IPropsAppStack } from "../../routes/AppStack/types";

export function RedeInformationScreen(this: any, { route }: any) {
    const [successModal, setSuccessModal] = useState(false);
    const [users, setUsers] = useState<any>();

    const [name, setName] = useState(route.params?.nome || "");
    const [pastor, setPastor] = useState(route.params?.pastor || "");
    const office = (route.params?.cargo === 'pastor' ? 'pastor de rede' : route.params?.cargo || '');
    const [selectDisciples, setSelectDisciples] = useState(route.params?.discipulador || "");
    const [selectNetwork, setSelectNetwork] = useState(`${route.params?.rede} - ${route.params?.pastor}` || "");
    const [selectLider, setSelectLider] = useState(`${route.params?.lider}` || "");
    const [celulas, setCelulas] = useState<any>()

    const navigation = useNavigation<IPropsAppStack>();

    const service = new RequestService();

    useEffect(() => {
        const getCelulas = async () => {
            await service.getCelulas().then((response) => {
                setCelulas(Object.values(response))
            })
        }
        getCelulas()
    }, [])

    useEffect(() => {
        const getUsers = async () => {
            await service
                .getUsers()
                .then((response) => {
                    setUsers(Object.values(response));
                })
        };
        getUsers();
    }, []);


    const submitRegister = () => {
        if (office === "pastor de rede") {
            const redeEscolhida = selectNetwork.includes('-')
            const RedeNaoAlterados = celulas.filter((item: any) => {
                return item?.rede !== route.params?.rede
            })
            const RedeAlterados = celulas.filter((item: any) => {
                return item?.rede === route.params?.rede
            })
            const alteracaoesRede = RedeAlterados.map((item: any) => {
                return {
                    ...item, rede: redeEscolhida ? selectNetwork.split('-')[0] : selectNetwork, pastor: pastor
                }
            })
            const payloadCelulas = [
                ...RedeNaoAlterados,
                ...alteracaoesRede
            ]

            connectApi.put(`/celulas.json`, payloadCelulas);
        }
        else if (office === "discipulador") {
            const RedeNaoAlterados = celulas.filter((item: any) => {
                return item?.discipulador !== route.params?.discipulador
            })
            const RedeAlterados = celulas.filter((item: any) => {
                return item?.discipulador === route.params?.discipulador
            })
            const alteracaoesRede = RedeAlterados.map((item: any) => {
                return {
                    ...item,
                    rede: selectNetwork.split('-')[0],
                    pastor: selectNetwork.split('-')[1],
                    discipulador: selectDisciples,
                    lider: selectLider
                }
            })
            const payloadCelulas = [
                ...RedeNaoAlterados,
                ...alteracaoesRede
            ]
            connectApi.put(`/celulas.json`, payloadCelulas);
        }
        else if (office === "lider de celula") {
            const RedeNaoAlterados = celulas.filter((item: any) => {
                return item?.lider !== route.params?.lider
            })
            const RedeAlterados = celulas.filter((item: any) => {
                return item?.lider === route.params?.lider
            })
            const alteracaoesRede = RedeAlterados.map((item: any) => {
                return {
                    ...item,
                    rede: selectNetwork.split('-')[0],
                    pastor: selectNetwork.split('-')[1],
                    discipulador: selectDisciples
                }
            })
            const payloadCelulas = [
                ...RedeNaoAlterados,
                ...alteracaoesRede
            ]
            connectApi.put(`/celulas.json`, payloadCelulas);
        }

    };

    const removeAdm =
        users &&
        users.filter((item: any) => {
            return (item.cargo !== 'administrador')
        });

    const usersNetwork =
        removeAdm && removeAdm.filter((item: any) => item.cargo === "pastor");

    const optionsUsersPastor = usersNetwork && usersNetwork.map((user: any) => {
        return { value: user.nome, }
    });

    const optionsNetwork =
        usersNetwork &&
        usersNetwork.map((item: any) => {
            return { value: `${item.rede} - ${item.nome}`, }
        });

    const usersDiscipulado =
        removeAdm && removeAdm.filter((item: any) => item.cargo === "discipulador");

    const optionsUsersDiscipulado =
        usersDiscipulado &&
        usersDiscipulado.map((user: any) => {
            return { value: user.nome, }
        });

    const usersLider =
        removeAdm && removeAdm.filter((item: any) => item.cargo === "lider de celula");

    const optionsUsersLider =
        usersLider &&
        usersLider.map((user: any) => {
            return { value: user.nome, }
        });

    const renderContent = () => {
        switch (office) {
            case "lider de celula":
                return (
                    <>
                        <S.GridItemFull>
                            <SelectComponent
                                label="Rede"
                                onChange={(value) => setSelectNetwork(value)}
                                selectedOption={(value) => setSelectNetwork(value)}
                                labelSelect={selectNetwork}
                                dataOptions={optionsNetwork && optionsNetwork}
                            />
                        </S.GridItemFull>
                        <S.GridItemFull>
                            <SelectComponent
                                label="Discipulado"
                                onChange={(value) => setSelectDisciples(value)}
                                selectedOption={(value) => setSelectDisciples(value)}
                                labelSelect={selectDisciples}
                                dataOptions={optionsUsersDiscipulado && optionsUsersDiscipulado}
                            />
                        </S.GridItemFull>
                        <S.GridItemFull>
                            <SelectComponent
                                label="Lider"
                                onChange={(value) => setSelectLider(value)}
                                selectedOption={(value) => setSelectLider(value)}
                                labelSelect={selectLider}
                                dataOptions={optionsUsersLider && optionsUsersLider}
                            />
                        </S.GridItemFull>
                    </>
                );
            case "discipulador":
                return (
                    <>
                        <S.GridItemFull>
                            <SelectComponent
                                label="Rede"
                                onChange={(value) => setSelectNetwork(value)}
                                selectedOption={(value) => setSelectNetwork(value)}
                                labelSelect={selectNetwork}
                                dataOptions={optionsNetwork && optionsNetwork}
                            />
                        </S.GridItemFull>
                        <S.GridItemFull>
                            <SelectComponent
                                label="Discipulado"
                                onChange={(value) => setSelectDisciples(value)}
                                selectedOption={(value) => setSelectDisciples(value)}
                                labelSelect={selectDisciples}
                                dataOptions={optionsUsersDiscipulado && optionsUsersDiscipulado}
                            />
                        </S.GridItemFull>
                    </>
                );
            case "pastor de rede":
                return (
                    <>
                        <S.GridItemFull>
                            <InputFieldComponent
                                primary
                                value={selectNetwork.split('-')[0]}
                                placeholder={`* ${FormFields.NETWORK}`}
                                onChangeText={(value) => setSelectNetwork(value)}
                                label={`* ${FormFields.NETWORK}`}
                            />
                        </S.GridItemFull>
                        <S.GridItemFull>
                            <SelectComponent
                                label="Pastor"
                                onChange={(value) => setPastor(value)}
                                selectedOption={(value) => setPastor(value)}
                                labelSelect={pastor}
                                dataOptions={optionsUsersPastor && optionsUsersPastor}
                            />
                        </S.GridItemFull>
                    </>
                );

            default:
                return;
        }
    };

    return (
        <>
            <HeaderComponent>
                <S.Division>
                    <ComeBackComponent />
                    <S.Navigation>{MenuNavigation.NETWORK}</S.Navigation>
                </S.Division>
                {/* <NotificationComponent /> */}
            </HeaderComponent>

            <ScrollView>
                <S.Container>
                    <S.Form>
                        {renderContent()}
                    </S.Form>

                    <S.FooterFields>
                        <ButtonComponent title="SALVAR INFORMAÇÕES"
                            onPress={submitRegister}
                            width='213'
                            heigth="39"
                            size="14"
                        />
                    </S.FooterFields>
                </S.Container>
            </ScrollView>

            <ModalComponent
                isVisible={successModal}
                onBackdropPress={() => {
                    setSuccessModal(false);
                    navigation.navigate("Members");
                }}
            >
                <DefaultContentModalComponent
                    data={name}
                    type="edited"
                />
            </ModalComponent>
        </>
    );
}