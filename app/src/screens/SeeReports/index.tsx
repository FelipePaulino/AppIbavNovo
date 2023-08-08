import React, { Fragment, useEffect, useState } from "react";
import { DateComponent } from "../../components/Date";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from "../../components/Button";
import MenuNavigation from "../../common/constants/navigation";
import { ScrollView, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import RequestService from "../../common/services/RequestService";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import { useNavigation } from "@react-navigation/native";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { TitleComponent } from "../../components/Title";
import { SelectComponent } from "../../components/Select";
import FormFields from "../../common/constants/form";

import * as S from "./styles";
import { ModalComponent } from "../../components/Modal";
import { RequestContentModalComponent } from "../../components/Modal/Request";
import { connectApi } from "../../common/services/ConnectApi";
import { ApprovalRequest } from "../../components/Modal/ApprovalRequest";
import useUserFiltered from "../../hooks/useUserFiltered";
import { comparedValues } from "../../common/utils/order";

const loadingGif = require("../../assets/loader-two.gif");

export function SeeReports() {
  const [reports, setReports] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showCalender, setShowCalender] = useState(false);
  const [filter, setFilter] = useState<any>();
  const [relator, setRelator] = useState<any>();
  const [isVisible, setIsVisible] = useState<any>(false);
  const [modalConcluded, setModalConcluded] = useState<any>(false);
  const [idSelected, setIdSelected] = useState<any>();

  const { state, dispatch } = useFormReport();
  const navigation = useNavigation<IPropsAppStack>();
  const serviceGet = new RequestService();
  const { user } = useUserFiltered();

  const dataUser = user && user[0] && user[0][1];
  const whatIsOffice = dataUser && dataUser.cargo;
  const rede = user && user[0] && user[0][1]?.rede;
  const discipulador = user && user[0] && user[0][1]?.nome;
  const lider = user && user[0] && user[0][1]?.numero_celula;

  const getReports = async () => {
    await serviceGet.getReports().then((response) => {
      setLoading(false);
      setReports(Object.entries(response));
    });
  };

  const relatorPastor = reports?.filter((item: any) => {
    return item[1].rede === rede;
  });

  const relatorDiscipulador = reports?.filter((item: any) => {
    return item[1].discipulado.trim() === discipulador.trim();
  });

  const relatorLider = reports?.filter((item: any) => {
    return item[1].celula.includes(lider);
  });

  useEffect(() => {
    if (whatIsOffice === "administrador") {
      setFilter(reports);
    } else if (whatIsOffice === "pastor") {
      return setFilter(relatorPastor);
    } else if (whatIsOffice === "discipulador") {
      return setFilter(relatorDiscipulador);
    } else setFilter(relatorLider);
  }, [reports]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getReports();
    }, 500);
  }, []);

  useEffect(() => {
    if (!modalConcluded) {
      setTimeout(() => {
        getReports();
      }, 500);
    }
  }, [modalConcluded]);

  const actionReportId = (id: string) => {
    dispatch({
      type: FormReportActions.setReportsId,
      payload: id,
    });
    navigation.navigate("SingleReport");
  };

  //pastor

  const discipuladoPastor = relatorPastor?.map(
    (item: any) => item[1].discipulado
  );

  const discipuladoPastorUnicos = discipuladoPastor?.filter(function (
    este: any,
    i: any
  ) {
    return discipuladoPastor.indexOf(este) === i && este;
  });

  const mapDiscipuladoPastorUnicos = discipuladoPastorUnicos?.map(
    (item: any) => {
      return {
        value: item,
      };
    }
  );

  const celulasPastor = relatorPastor?.filter((item: any) => {
    return item[1].discipulado === state.discipuladoSelect;
  });

  const celulasPastorMap = celulasPastor?.map((item: any) => item[1].celula);

  const celulasUnicosPastor = celulasPastorMap?.filter(function (
    este: any,
    i: any
  ) {
    return celulasPastorMap.indexOf(este) === i;
  });

  const celulasUnicosPastorMap = celulasUnicosPastor?.map((item: any) => {
    return {
      value: item,
    };
  });
  //

  //discipulador
  const celulaDiscipulador = relatorDiscipulador?.map(
    (item: any) => item[1].celula
  );

  const celulaDiscipuladorUnicos = celulaDiscipulador?.filter(function (
    este: any,
    i: any
  ) {
    return celulaDiscipulador.indexOf(este) === i && este;
  });

  const mapCelulaDiscipuladorUnicos = celulaDiscipuladorUnicos?.map(
    (item: any) => {
      return {
        value: item,
      };
    }
  );
  //

  const whatOffice = user && user[0] && user[0][1]?.cargo;
  const redes = reports?.map((item: any) => item[1].rede);

  const redesUnicas = redes?.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i && este;
  });

  const mapRedesUnicas = redesUnicas?.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoRedes = reports?.filter((item: any) => {
    return item[1].rede === state.redeSelect;
  });
  const discipulado = filtrandoRedes?.map((item: any) => item[1].discipulado);

  const discipuladossUnicos = discipulado?.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos?.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoDiscipulado = reports?.filter((item: any) => {
    return (
      item[1].discipulado === state.discipuladoSelect &&
      item[1].rede === state.redeSelect
    );
  });
  const celula = filtrandoDiscipulado?.map((item: any) => item[1].celula);

  const celulasUnicos = celula?.filter(function (este: any, i: any) {
    return celula.indexOf(este) === i;
  });

  const mapCelulasUnicos = celulasUnicos?.map((item: any) => {
    return {
      value: item,
    };
  });

  const handleRedeChange = (value: string) => {
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: value,
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

  const handleDiscipuladoChange = (value: string) => {
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: "Selecione",
    });
  };

  const handleCelulaChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: value,
    });
  };

  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || state.date;

    setShowCalender(false);

    const tempDate = new Date(currentDate);
    const newDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    dispatch({
      type: FormReportActions.setDate,
      payload: currentDate,
    });
    dispatch({
      type: FormReportActions.setTextDate,
      payload: newDate,
    });
  };

  const submitFilter = () => {
    if (state.textDate !== "Selecione uma data") {
      if (
        state.redeSelect !== "Selecione" &&
        state.discipuladoSelect === "Selecione"
      ) {
        const filterRede = reports.filter((item: any) => {
          return (
            item[1].rede === state.redeSelect && item[1].data === state.textDate
          );
        });
        setFilter(filterRede);
      } else if (
        state.discipuladoSelect !== "Selecione" &&
        state.celulaSelect === "Selecione"
      ) {
        const filterDiscipulado = reports.filter((item: any) => {
          return (
            item[1].discipulado === state.discipuladoSelect &&
            item[1].data === state.textDate
          );
        });
        setFilter(filterDiscipulado);
      } else if (state.celulaSelect !== "Selecione") {
        const filterCelula = reports.filter((item: any) => {
          return (
            item[1].celula === state.celulaSelect &&
            item[1].data === state.textDate
          );
        });
        setFilter(filterCelula);
      } else {
        // if (whatIsOffice === 'administrador') {
        //   setFilter(reports)
        // } else if (whatIsOffice === 'pastor') {
        //   return setFilter(relatorPastor)
        // } else if (whatIsOffice === 'discipulador') {
        //   return setFilter(relatorDiscipulador)
        // } else setFilter(relatorLider)
        if (whatIsOffice === "pastor") {
          const filterDatePastor = relatorPastor.filter((item: any) => {
            return item[1].data === state.textDate;
          });
          setFilter(filterDatePastor);
        } else if (whatIsOffice === "discipulador") {
          const filterDateDiscipulador = relatorDiscipulador.filter(
            (item: any) => {
              return item[1].data === state.textDate;
            }
          );
          setFilter(filterDateDiscipulador);
        } else if (whatIsOffice === "lider de celula") {
          const filterDateLider = relatorLider.filter((item: any) => {
            return item[1].data === state.textDate;
          });
          setFilter(filterDateLider);
        } else {
          const filterDate = reports.filter((item: any) => {
            return item[1].data === state.textDate;
          });
          setFilter(filterDate);
        }
      }
    } else {
      if (
        state.redeSelect !== "Selecione" &&
        state.discipuladoSelect === "Selecione"
      ) {
        const filterRede = reports.filter((item: any) => {
          return item[1].rede === state.redeSelect;
        });
        setFilter(filterRede);
      } else if (
        state.discipuladoSelect !== "Selecione" &&
        state.celulaSelect === "Selecione"
      ) {
        const filterDiscipulado = reports.filter((item: any) => {
          return item[1].discipulado === state.discipuladoSelect;
        });
        setFilter(filterDiscipulado);
      } else {
        const filterCelula = reports.filter((item: any) => {
          return item[1].celula === state.celulaSelect;
        });
        setFilter(filterCelula);
      }
    }
    setShowFilter(false);
  };

  const cleanFilter = () => {
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
      type: FormReportActions.setTextDate,
      payload: "Selecione uma data",
    });
    dispatch({
      type: FormReportActions.setDate,
      payload: new Date(),
    });
    if (whatIsOffice === "administrador") {
      setFilter(reports);
    } else if (whatIsOffice === "pastor") {
      return setFilter(relatorPastor);
    } else if (whatIsOffice === "discipulador") {
      return setFilter(relatorDiscipulador);
    } else setFilter(relatorLider);
  };

  function compared(a: any, b: any) {
    if (a[1].data > b[1].data) return -1;
    if (a[1].data < b[1].data) return 1;
    return 0;
  }

  const deleteReport = (id: any) => {
    try {
      connectApi.delete(`/relatorios/${id}.json`);
      setIsVisible(false);
      setTimeout(() => {
        setModalConcluded(true);
      }, 500);
    } catch (err) {
      alert("Houve algum problema ao excluir esse relátorio");
    }
  };

  function compareDatesDescending(a, b) {
    const partesDaDataA = a[1].data.split("/");
    const partesDaDataB = b[1].data.split("/");
    const dataA = new Date(
      partesDaDataA[2],
      partesDaDataA[1] - 1,
      partesDaDataA[0]
    );
    const dataB = new Date(
      partesDaDataB[2],
      partesDaDataB[1] - 1,
      partesDaDataB[0]
    );
    const dateA: any = new Date(dataA);
    const dateB: any = new Date(dataB);
    return dateB - dateA;
  }

  const siderBarFilter = () => {
    if (whatOffice === "administrador") {
      return (
        <>
          <S.Grid>
            <TitleComponent title={`${FormFields.NETWORK}:`} small primary />
            <S.ContentC>
              <SelectComponent
                onChange={handleRedeChange}
                labelSelect={state.redeSelect}
                dataOptions={mapRedesUnicas?.sort(comparedValues)}
                selectedOption={handleRedeChange}
                width="100%"
              />
            </S.ContentC>
          </S.Grid>

          <S.Grid>
            <TitleComponent
              title={`${FormFields.DISCIPLESHIP}:`}
              small
              primary
            />
            <S.ContentC>
              <SelectComponent
                onChange={handleDiscipuladoChange}
                labelSelect={state.discipuladoSelect}
                dataOptions={mapDiscipuladosUnicos?.sort(comparedValues)}
                selectedOption={handleDiscipuladoChange}
                width="100%"
              />
            </S.ContentC>
          </S.Grid>

          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}:`} small primary />
            <S.ContentC>
              <SelectComponent
                onChange={handleCelulaChange}
                labelSelect={state.celulaSelect}
                dataOptions={mapCelulasUnicos?.sort(comparedValues)}
                selectedOption={handleCelulaChange}
                width="100%"
                disabled={
                  state.discipuladoSelect === "Selecione" ? true : false
                }
              />
            </S.ContentC>
          </S.Grid>
        </>
      );
    } else if (whatOffice === "pastor") {
      return (
        <>
          <S.Grid>
            <TitleComponent
              title={`${FormFields.DISCIPLESHIP}:`}
              small
              primary
            />
            <S.ContentC>
              <SelectComponent
                onChange={handleDiscipuladoChange}
                labelSelect={state.discipuladoSelect}
                dataOptions={mapDiscipuladoPastorUnicos?.sort(comparedValues)}
                selectedOption={handleDiscipuladoChange}
                width="100%"
              />
            </S.ContentC>
          </S.Grid>

          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}:`} small primary />
            <S.ContentC>
              <SelectComponent
                onChange={handleCelulaChange}
                labelSelect={state.celulaSelect}
                dataOptions={celulasUnicosPastorMap?.sort(comparedValues)}
                selectedOption={handleCelulaChange}
                width="100%"
                disabled={
                  state.discipuladoSelect === "Selecione" ? true : false
                }
              />
            </S.ContentC>
          </S.Grid>
        </>
      );
    } else if (whatOffice === "discipulador") {
      return (
        <S.Grid>
          <TitleComponent title={`${FormFields.CELULA}:`} small primary />
          <S.ContentC>
            <SelectComponent
              onChange={handleCelulaChange}
              labelSelect={state.celulaSelect}
              dataOptions={mapCelulaDiscipuladorUnicos?.sort(comparedValues)}
              selectedOption={handleCelulaChange}
              width="100%"
            />
          </S.ContentC>
        </S.Grid>
      );
    }
  };

  return (
    <Fragment>
      {showFilter && (
        <S.BgDark>
          <S.ContainerFilter open={showFilter}>
            <View>
              <S.BoxClose>
                <FontAwesome5
                  name="times-circle"
                  color="#000A3E"
                  solid
                  size={25}
                  onPress={() => setShowFilter(false)}
                />
              </S.BoxClose>
              <S.Title>
                <FontAwesome5
                  name="filter"
                  color="#000A3E"
                  solid
                  size={20}
                  onPress={() => setShowFilter(false)}
                />
                Filtro
              </S.Title>

              {siderBarFilter()}
              <S.Grid>
                <TitleComponent title="Data:" small primary />
                <S.ContentC>
                  <DateComponent
                    text={state.textDate}
                    open={() => setShowCalender(true)}
                    showCalender={showCalender}
                    dataDados={state.date}
                    onChange={handleDateChange}
                  />
                </S.ContentC>
              </S.Grid>

              <ButtonComponent
                title="FILTRAR"
                width="150"
                color="white"
                onPress={() => submitFilter()}
              />
            </View>
          </S.ContainerFilter>
        </S.BgDark>
      )}
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.SEE_REPORTS}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>
      <ScrollView>
        <S.Container>
          <S.BoxButtons>
            <ButtonComponent
              title="FILTRAR"
              width="35%"
              icon="filter"
              color="white"
              onPress={() => setShowFilter(true)}
            />
            <ButtonComponent
              title="LIMPAR FILTROS"
              width="62%"
              icon="times"
              color="white"
              onPress={() => cleanFilter()}
            />
          </S.BoxButtons>
          {loading ? (
            <S.Loading source={loadingGif}></S.Loading>
          ) : (
            <S.ListContainer>
              {filter
                ?.sort(compareDatesDescending)
                .map((item: any, index: any) => {
                  return (
                    <S.List key={index}>
                      <S.ContText>
                        <Text
                          style={{ maxWidth: "72%" }}
                          onPress={() => actionReportId(item[0])}
                        >
                          {item[1].celula} - {item[1].data}
                        </Text>
                        <S.ContainerIcons>
                          <S.Icon>
                            <FontAwesome5
                              size={18}
                              name="eye"
                              color="#000A3E"
                              style={{ padding: 5 }}
                              onPress={() => actionReportId(item[0])}
                            />
                          </S.Icon>
                          {whatOffice === "administrador" && (
                            <S.Icon>
                              <FontAwesome5
                                size={18}
                                name="trash"
                                color="#000A3E"
                                style={{ padding: 5 }}
                                onPress={() => {
                                  setIdSelected(item[0]), setIsVisible(true);
                                }}
                              />
                            </S.Icon>
                          )}
                        </S.ContainerIcons>
                      </S.ContText>
                    </S.List>
                  );
                })}
            </S.ListContainer>
          )}
        </S.Container>
      </ScrollView>
      <ModalComponent
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      >
        <RequestContentModalComponent
          type="relatório"
          name="célula"
          cancel={() => setIsVisible(false)}
          confirm={() => {
            deleteReport(idSelected);
          }}
        />
      </ModalComponent>
      <ModalComponent
        isVisible={modalConcluded}
        onBackdropPress={() => setModalConcluded(false)}
      >
        <ApprovalRequest name="CÉLULA" type="relátorio" />
      </ModalComponent>
    </Fragment>
  );
}
