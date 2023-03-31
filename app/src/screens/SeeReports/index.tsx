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

const loadingGif = require("../../assets/loader-two.gif");

export function SeeReports() {
  const [reports, setReports] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showCalender, setShowCalender] = useState(false);
  const [filter, setFilter] = useState<any>();
  const [isVisible, setIsVisible] = useState<any>(false)
  const [modalConcluded, setModalConcluded] = useState<any>(false)
  const [idSelected, setIdSelected] = useState<any>()

  const { state, dispatch } = useFormReport();
  const navigation = useNavigation<IPropsAppStack>();
  const serviceGet = new RequestService();
  const { user } = useUserFiltered();

  const getReports = async () => {
    await serviceGet.getReports().then((response) => {
      setLoading(false);
      setReports(Object.entries(response));
      setFilter(Object.entries(response));
    });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getReports();
    }, 500);
  }, []);
  
  useEffect(() => {
    if(!modalConcluded){
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


const whatOffice =  user && user[0] && user[0][1]?.cargo
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
        const filterDate = reports.filter((item: any) => {
          return item[1].data === state.textDate;
        });
        setFilter(filterDate);
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
      } else if (state.discipuladoSelect !== "Selecione") {
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
    setFilter(reports);
  };

  function compared(a: any, b: any) {
    if (a[1].data > b[1].data) return -1;
    if (a[1].data < b[1].data) return 1;
    return 0;
  }

  const deleteReport = (id:any) =>{
    try{
      connectApi.delete(`/relatorios/${id}.json`)
      setModalConcluded(true)
      setIsVisible(false)
    }
    catch (err) {
      alert("Houve algum problema ao excluir esse relátorio");
    }
     
  }

  



  
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
                />{" "}
                Filtro
              </S.Title>

              <S.Grid>
                <TitleComponent
                  title={`${FormFields.NETWORK}:`}
                  small
                  primary
                />
                <S.ContentC>
                  <SelectComponent
                    onChange={handleRedeChange}
                    labelSelect={state.redeSelect}
                    dataOptions={mapRedesUnicas}
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
                    dataOptions={mapDiscipuladosUnicos}
                    selectedOption={handleDiscipuladoChange}
                    width="100%"
                    disabled={state.redeSelect === "Selecione" ? true : false}
                  />
                </S.ContentC>
              </S.Grid>

              <S.Grid>
                <TitleComponent title={`${FormFields.CELULA}:`} small primary />
                <S.ContentC>
                  <SelectComponent
                    onChange={handleCelulaChange}
                    labelSelect={state.celulaSelect}
                    dataOptions={mapCelulasUnicos}
                    selectedOption={handleCelulaChange}
                    width="100%"
                    disabled={
                      state.discipuladoSelect === "Selecione" ? true : false
                    }
                  />
                </S.ContentC>
              </S.Grid>

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
              {filter?.sort(compared).map((item: any, index: any) => {
                return (
                  <S.List key={index}>
                    <S.ContText >
                      <Text style={{maxWidth:'85%'}} onPress={() => actionReportId(item[0])}>
                        {item[1].celula} - {item[1].data}
                      </Text>
                      <S.ContainerIcons>
                        <S.Icon onPress={() => actionReportId(item[0])}>
                          <FontAwesome5 name="eye" color="#000A3E" />
                        </S.Icon>
                        {whatOffice === 'administrador' && 
                          <S.Icon >
                            <FontAwesome5 name="trash" color="#000A3E" onPress={() => {setIdSelected(item[0]), setIsVisible(true)}} />
                          </S.Icon>
                        }
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
        <ApprovalRequest name='CÉLULA' type="relátorio" />
      </ModalComponent>
    </Fragment>
  );
}
