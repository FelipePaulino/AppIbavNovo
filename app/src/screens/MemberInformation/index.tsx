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
import { selectCategory, selectCivilStatus, selectState } from "../../common/utils/selects";
import { connectApi } from "../../common/services/ConnectApi";
import { useFormReport } from "../../hooks/useFormReport";
import { IPropsAppStack } from "../../routes/AppStack/types";

export function MembersInformationScreen(this: any, { route }: any) {
    const [successModal, setSuccessModal] = useState(false);
    const [users, setUsers] = useState<any>();

    const [name, setName] = useState(route.params?.nome || "");
    const office = (route.params?.cargo === 'pastor' ? 'pastor de rede' : route.params?.cargo || '');
    const [selectDisciples, setSelectDisciples] = useState(route.params?.discipulador || "");
    const [selectNetwork, setSelectNetwork] = useState(`${route.params?.rede} - ${route.params?.pastor}` || "");
    const [selectLider, setSelectLider] = useState(`${route.params?.lider}` || "");
    const [celulas, setCelulas] = useState<any>()

    // const [id, setId] = useState(route.params?.id)

    // const [date, setDate] = useState(new Date())

    // const [members, setMembers] = useState<any>([]);

    // const { user } = useUserFiltered();
    const navigation = useNavigation<IPropsAppStack>();
    // const { trigger, setTrigger, celulaId } = useFormReport()

    // const identifyCelula = user && user[0][1].numero_celula;

    const service = new RequestService();


    useEffect(() => {
        const getCelulas = async () => {
            await service.getCelulas().then((response) => {
                setCelulas(Object.entries(response))
            })
        }
        getCelulas()
    }, [])

    console.log(celulas, 'celulas')

    useEffect(() => {
        const getUsers = async () => {
            await service
                .getUsers()
                .then((response) => {
                    setUsers(Object.values(response));
                    console.log(response, 'response')
                })
        };
        getUsers();
    }, []);


    const timeModal = () => {
        setSuccessModal(true);
    };

    const submitRegister = () => {
        const RedeNaoAlterados = celulas.filter((item: any) => {
            return item?.rede !== selectNetwork
        })
        const RedeAlterados = celulas.filter((item: any) => {
            return item?.rede === selectNetwork
        })
        console.log(RedeNaoAlterados, 'RedeNaoAlterados')
        console.log(RedeAlterados, 'RedeAlterados')
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
            return { value: `${item.rede} - ${item.pastor}`, }
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
                                onChange={(value) => setName(value)}
                                selectedOption={(value) => setName(value)}
                                labelSelect={name}
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
                            width='213px'
                            heigth="39px"
                            size="14px"
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