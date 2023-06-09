import React, { useState, useEffect, Fragment } from "react";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from 'date-fns'

import { HeaderComponent } from "../../components/Header";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { PersonLabelComponent } from "../../components/PersonLabel";
import { SelectComponent } from "../../components/Select";
import { TitleComponent } from "../../components/Title";

const loadingGif = require("../../assets/loader-two.gif");

import FormFields from "../../common/constants/form";
import useUserFiltered from "../../hooks/useUserFiltered";
import { GetStorage } from "../../common/constants/storage";
import MenuNavigation from "../../common/constants/navigation";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";
import { ModalComponent } from "../../components/Modal";
import { RequestContentModalComponent } from "../../components/Modal/Request";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";
import { ApprovalRequest } from "../../components/Modal/ApprovalRequest";
import RequestService from "../../common/services/RequestService";
import { useFormReport } from "../../hooks/useFormReport";
import { IContentProps } from "../SendReport/types";

export function MembersScreen(this: any) {
  const [members, setMembers] = useState<any>([]);
  const [sendModal, setSendModal] = useState(false);
  const [modalConcluded, setModalConcluded] = useState(false);
  const [name, setName] = useState<string>();
  const [id, setId] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false)
  const [celulas, setCelulas] = useState<any>()
  const [celulaFiltered, setCelulaFiltered] = useState<any>([]);

  const { user } = useUserFiltered();
  const { state, trigger, celulaId, setTrigger, setCelulaId, dispatch } = useFormReport()
  const navigation = useNavigation<IPropsAppStack>();

  const identifyCelula = user && user[0][1].numero_celula;

  const serviceGet = new RequestService()

  const idCelula = members && members.length > 0 && Object?.entries(members[0])[0][1];

  const clean = (value: string) => {
    navigation.navigate(value)
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: 'Selecione',
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: 'Selecione',
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: 'Selecione',
    });
  }

  useEffect(() => {
    if (idCelula !== false) {
      setCelulaId(idCelula)
    }
  }, [idCelula])

  const userInfo = user && user[0][1];
  const whatOffice = userInfo && userInfo.cargo;

  const selectedOptionCelula = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectCelula,
      payload: value,
    });
  };

  const handleCelulaChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: value,
    });
  };

  useEffect(() => {
    const getCelulas = async () => {
      await serviceGet.getCelulas().then((response) => {
        setCelulas(Object.entries(response))
      })
    }
    setTimeout(() => {
      getCelulas()
    }, 500);
  }, [trigger]);

  if (whatOffice === 'lider de celula') {
    useEffect(() => {
      const filterMembers =
        celulas &&
        celulas.length > 0 &&
        celulas[1]?.filter((item: any) => {
          return item.numero_celula == identifyCelula;
        });
      if (whatOffice === "lider de celula") {
        const filterMembersCelula =
          celulas &&
          celulas.filter((item: any) => {
            return item[1].numero_celula == userInfo.numero_celula;
          });

        setMembers(filterMembersCelula);
      } else if (filterMembers) {

        setMembers(filterMembers);
        AsyncStorage.setItem(
          GetStorage.MEMBERS_FILTERED,
          JSON.stringify(filterMembers)
        );
      }
    }, [identifyCelula, celulas]);
  }

  const timeModal = () => {
    setModalConcluded(true);
  };

  const deleteMember = () => {
    try {
      connectApi.delete(`/celulas/${idCelula}/membros/${id}.json`).then(() => {
        setSendModal(false);
        setTimeout(timeModal, 300);
        setTrigger(!trigger)
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleRedeChange = (value: string) => {
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: 'Selecione',
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: 'Selecione',
    });
  };

  const handleDiscipuladoChange = (value: string) => {
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: 'Selecione',
    });
  };

  useEffect(() => {
    const filterCelulas =
      celulas &&
      celulas.length > 0 &&
      celulas[1]?.filter((celula: any) => {
        return celula.discipulador === userInfo.nome;
      });

    setCelulaFiltered(filterCelulas);
  }, [celulas]);

  // Tratativas para o usuário administrador
  const redes = celulas && celulas?.map((item: any) => (item[1].rede))

  const redesUnicas = redes && redes.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i && este;
  });

  const mapRedesUnicas = redesUnicas && redesUnicas.map((item: any) => {
    return {
      value: item
    }
  })

  const filtrandoRedes = celulas && celulas.filter((item: any) => {
    return item[1].rede === state.redeSelect
  })

  const discipulado = filtrandoRedes && filtrandoRedes.map((item: any) =>
    (item[1].discipulador))

  const discipuladossUnicos = discipulado && discipulado.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });
  
  const mapDiscipuladosUnicos = discipuladossUnicos && discipuladossUnicos.map((item: any) => {
    return {
      value: item
    }
  });

  const filtrandoDiscipulado = celulas && celulas.length > 0 && celulas?.filter((item: any) => {
    return item[1].discipulador === state.discipuladoSelect && item[1].rede === state.redeSelect
  })
  
  if (filtrandoDiscipulado && filtrandoDiscipulado.length === 0) {
    state.discipuladoSelect = state.discipuladoSelect.trim();
  }

  const celulaAdm = filtrandoDiscipulado && filtrandoDiscipulado.map((item: any) => {
    return {
      value: `${item[1].numero_celula} - ${item[1].lider}`
    }
  })

  useEffect(() => {
    if (whatOffice !== 'lider de celula') {

      const idCelulaSelect = state.celulaSelect && state.celulaSelect.split(" -")[0];

      const filterMembers =
        celulas &&
        celulas.filter((item: any) => {
          return (
            item[1].numero_celula == idCelulaSelect
          )
        });

      if (filterMembers) {
        setMembers(filterMembers);
      }

    }
  }, [celulas, state.celulaSelect, trigger])

  const newMembersList =
    members &&
      members.length > 0 &&
      members[0][1].membros ? Object.entries(members[0][1].membros).filter(
        (member: any) =>
          member.status !== "visitante"
      ) : [];

  // Tratativas para o usuário pastor

  const filtrandoDiscipuladoPastor = celulas && celulas.length > 0 && celulas?.filter((item: any) => {
    return item[1].rede === user[0][1].rede
  })

  const mapDiscipuladoPastor = filtrandoDiscipuladoPastor && filtrandoDiscipuladoPastor.map((item: any) => {
    return item[1].discipulador
  })

  const discipuladossUnicosPastor = mapDiscipuladoPastor && mapDiscipuladoPastor.filter(function (este: any, i: any) {
    return mapDiscipuladoPastor.indexOf(este) === i;
  });

  const mapDiscipuladossUnicosPastor = discipuladossUnicosPastor && discipuladossUnicosPastor.map((item: any) => {
    return {
      value: item
    }
  })

  const isDisc = user[0][1].cargo === 'discipulador' ? user[0][1].nome : state.discipuladoSelect
  const filtrandoDiscipuladoPastorSelect = celulas && celulas.length > 0 && celulas?.filter((item: any) => {
    return item[1].discipulador === isDisc
  })

  const celulaPastor = filtrandoDiscipuladoPastorSelect && filtrandoDiscipuladoPastorSelect.map((item: any) => {
    return {
      value: `${item[1].numero_celula} - ${item[1].lider}`
    }
  })

  const optionsCelula =
    celulaFiltered &&
    celulaFiltered.map((celulaIdentify: IContentProps) => {
      return {
        value: `${celulaIdentify?.numero_celula} - ${celulaIdentify.lider}`,
      };
    });

    function compared(a: any, b: any) {
      if (a[1].nome > b[1].nome) return -1;
      if (a[1].nome < b[1].nome) return 1;
      return 0;
    }

  const office = () => {
    switch (whatOffice) {
      case "lider de celula":
        return (
          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <S.DescriptionC>{`${userInfo && userInfo.numero_celula} - ${userInfo && userInfo.rede
                }`}</S.DescriptionC>
            </S.ContentC>
          </S.Grid>
        );

      case "discipulador":
        return (
          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <SelectComponent
                onChange={handleCelulaChange}
                labelSelect={state.textSelectCelula}
                dataOptions={celulaPastor && celulaPastor}
                selectedOption={selectedOptionCelula}
                width="85%"
              />
            </S.ContentC>
          </S.Grid>
        );
      case "pastor":
        return (
          <>
            <S.Grid>
              <TitleComponent title={`${FormFields.DISCIPLESHIP}:`} small primary />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  onChange={handleDiscipuladoChange}
                  labelSelect={state.discipuladoSelect}
                  dataOptions={mapDiscipuladossUnicosPastor}
                  selectedOption={handleDiscipuladoChange}
                  width="85%"
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.CELULA}:`} small primary />
              <S.ContentC>
                <S.IconC name="user-friends" />
                <SelectComponent
                  onChange={handleCelulaChange}
                  labelSelect={state.celulaSelect}
                  dataOptions={celulaPastor}
                  selectedOption={selectedOptionCelula}
                  width="85%"
                />
              </S.ContentC>
            </S.Grid>
          </>
        );

      case "administrador":
        return (
          <>
            <S.Grid>
              <TitleComponent title={`${FormFields.NETWORK}:`} small primary />
              <S.ContentC>
                <S.IconC name="vector-square" />
                <SelectComponent
                  onChange={handleRedeChange}
                  labelSelect={state.redeSelect}
                  dataOptions={mapRedesUnicas}
                  selectedOption={handleRedeChange}
                  width='85%'
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.DISCIPLESHIP}:`} small primary />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  onChange={(handleDiscipuladoChange)}
                  labelSelect={state.discipuladoSelect}
                  dataOptions={state.redeSelect && mapDiscipuladosUnicos}
                  selectedOption={handleDiscipuladoChange}
                  disabled={state.redeSelect === "Selecione" ? true : false}
                  width='85%'
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.CELULA}:`} small primary />
              <S.ContentC>
                <S.IconC name="user-friends" />
                <SelectComponent
                  onChange={handleCelulaChange}
                  labelSelect={state.celulaSelect}
                  dataOptions={celulaAdm}
                  selectedOption={selectedOptionCelula}
                  disabled={state.discipuladoSelect === "Selecione" ? true : false}
                  width='85%'
                />
              </S.ContentC>
            </S.Grid>
          </>
        );
    }
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.ContentHeader>
          <S.Division>
            <ComeBackComponent />
            <S.Navigation>{MenuNavigation.MEMBERS}</S.Navigation>
          </S.Division>
          <ButtonComponent
            title="Cadastrar"
            onPress={() => clean("Register")}
            width="136"
            heigth="33"
            size="12"
            icon="user-plus"
            color="white"
          />
        </S.ContentHeader>
      </HeaderComponent>
      <ScrollView>
        <S.Container>
          {loading ? (
            <S.Loading source={loadingGif} />
          ) : (
            <Fragment>
              {office()}
              {(state.celulaSelect !== "Selecione" || whatOffice === 'lider de celula') &&
                <>
                  {newMembersList.length > 0 ? (
                    newMembersList.sort(compared)?.map((item: any) => {
                      return (
                        <Fragment key={item[1].nome}>
                          <PersonLabelComponent
                            nome={item[1].nome}
                            status={state?.celulaSelect?.split('- ')[1] === item[1].nome ? 'lider' :item[1].status}
                            onPress={() =>
                              navigation.navigate("MemberInformation", {
                                nome: `${item[1].nome}`,
                                telefone: `${item[1].telefone}`,
                                email: `${item[1]?.email}`,
                                endereco: `${item[1].endereco}`,
                                bairro: `${item[1].bairro}`,
                                cep: `${item[1].cep}`,
                                cidade: `${item[1].cidade}`,
                                estado: `${item[1].estado}`,
                                estado_civil: `${item[1].estado_civil}`,
                                data_de_nascimento: !item[1].data_de_nascimento || item[1].data_de_nascimento.includes('/') ? item[1].data_de_nascimento : `${format(new Date(item[1].data_de_nascimento), 'dd/MM/yyyy')}`,
                                status: `${item[1].status}`,
                                n_end: `${item[1].n_end}`,
                                id: `${item[0]}`,
                                active: setTrigger
                              })
                            }
                            delMember={() => {
                              setSendModal(true),
                                setName(item[1].nome),
                                setId(item[0]);
                            }}
                          />
                        </Fragment>
                      );
                    })) : (
                    <Text>Não há membros</Text>
                  )}
                </>
              }
            </Fragment>
          )}
        </S.Container>
      </ScrollView>
      <ModalComponent
        isVisible={sendModal}
        onBackdropPress={() => setSendModal(false)}
      >
        <RequestContentModalComponent
          name={name}
          type="cadastro"
          cancel={() => setSendModal(false)}
          confirm={() => {
            deleteMember();
          }}
        />
      </ModalComponent>
      <ModalComponent
        isVisible={modalConcluded}
        onBackdropPress={() => setModalConcluded(false)}
      >
        <ApprovalRequest name={name} />
      </ModalComponent>
    </Fragment>
  );
}