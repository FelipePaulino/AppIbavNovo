import React, { useEffect, useState, Fragment } from "react";
import { ScrollView, Text } from "react-native";
import { DateComponent } from "../../components/Date";
import { TitleComponent } from "../../components/Title";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { NavigationComponent } from "../../components/Navigation";
// import { NotificationComponent } from "../../components/Notification";
import { ReportContentModalComponent } from "../../components/Modal/Report";
import { DefaultContentModalComponent } from "../../components/Modal/Default";
import { InputMaskComponent } from "../../components/InputMask";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { useNavigation } from "@react-navigation/native";

const loadingGif = require("../../assets/loader-two.gif");

import FormFields from "../../common/constants/form";
import ButtonsText from "../../common/constants/buttons";
import useUserFiltered from "../../hooks/useUserFiltered";
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";

import {comparedValues} from "../../common/utils/order"

import { IContentProps } from "./types";

import * as S from "./styles";

export function SendReportScreen() {
  const [celulas, setCelulas] = useState<any>([]);
  const [showCalender, setShowCalender] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [celulaFiltered, setCelulaFiltered] = useState<any>([]);

  const { state, dispatch } = useFormReport();
  const { user, loading } = useUserFiltered();
  const navigation = useNavigation<IPropsAppStack>();

  const weeks = [
    {value: '1° Semana'},
    {value: '2° Semana'},
    {value: '3° Semana'},
    {value: '4° Semana'},
    {value: '5° Semana'}
  ]

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleOfferChange = (value: string) => {
    dispatch({
      type: FormReportActions.setOffer,
      payload: value,
    });
  };

  const handleObservationsChange = (value: string) => {
    dispatch({
      type: FormReportActions.setObservations,
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

  const showMode = () => {
    setShowCalender(true);
  };

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

  const handleWeekChange = (value: string) => {
    dispatch({
      type: FormReportActions.setWeek,
      payload: value,
    });
  };

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

  const userInfo = user && user[0][1];
  const whatOffice = userInfo && userInfo.cargo;

  useEffect(() => {
    if (whatOffice !== "lider") {
      const getCelulas = async () => {
        const response = await connectApi.get("/celulas.json");

        setCelulas(Object.values(response.data));
      };
      getCelulas();
    }
  }, []);

  useEffect(() => {
    const filterCelulas =
      celulas &&
      celulas.filter((celula: any) => {
        if(celula){
        return celula.discipulador === userInfo.nome;
        }
      });

    setCelulaFiltered(filterCelulas);
  }, [celulas]);

  // tratativas para o usuário administrador
  const redes = celulas.map((item: any) => item && item?.rede);
  const redesUnicas = redes.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i && este;
  });

  const mapRedesUnicas = redesUnicas.map((item: any, index: any) => {
    return {
      value: item,
    };
  });

  const filtrandoRedes = celulas.filter((item: any) => {
    if(item){
    return item?.rede === state.redeSelect;
    }
  });
  const discipulado = filtrandoRedes.map((item: any) => item.discipulador?.trim());

  const discipuladossUnicos = discipulado.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoDiscipulado = celulas.filter((item: any) => {
    if(item){
    return (
      item.discipulador?.trim() === state.discipuladoSelect?.trim() &&
      item.rede === state.redeSelect
    );
    }
  });
  const celulaAdm = filtrandoDiscipulado.map((item: any) => {
    return {
      value: `${item.numero_celula} - ${item.lider}`,
    };
  });
  //

  // tratativas para o usuário pastor
  const filtrandoDiscipuladoPastor = celulas.filter((item: any) => {
    if(item){
    return item.rede === user[0][1].rede;
    }
  });

  const mapDiscipuladoPastor = filtrandoDiscipuladoPastor.map((item: any) => {
    return item?.discipulador;
  });

  const discipuladossUnicosPastor = mapDiscipuladoPastor.filter(function (
    este: any,
    i: any
  ) {
    return mapDiscipuladoPastor.indexOf(este) === i;
  });

  const mapDiscipuladossUnicosPastor = discipuladossUnicosPastor.map(
    (item: any) => {
      return {
        value: item,
      };
    }
  );
  const filtrandoDiscipuladoPastorSelect = celulas.filter((item: any) => {
    if(item){
    return item.discipulador === state.discipuladoSelect;
    }
  });

  const celulaPastor = filtrandoDiscipuladoPastorSelect.map((item: any) => {
    return {
      value: `${item.numero_celula} - ${item.lider}`,
    };
  });

  const optionsCelula =
    celulaFiltered &&
    celulaFiltered.map((celulaIdentify: IContentProps) => {
      return {
        value: `${celulaIdentify?.numero_celula} - ${celulaIdentify.lider}`,
      };
    });

  const isLider =
    whatOffice === "lider de celula"
      ? false
      : state.celulaSelect === "Selecione";

  function compared(a: any, b: any) {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  }

  const office = () => {
    switch (whatOffice) {
      case "lider":
        return (
          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}*:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <S.DescriptionC>{`${userInfo && userInfo.numero_celula} - ${
                userInfo && userInfo.rede
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
                dataOptions={optionsCelula && optionsCelula?.sort(comparedValues)}
                selectedOption={selectedOptionCelula}
                width={"85%"}
              />
            </S.ContentC>
          </S.Grid>
        );
      case "pastor":
        return (
          <>
            <S.Grid>
              <TitleComponent
                title={`${FormFields.DISCIPLESHIP}:`}
                small
                primary
              />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  onChange={handleDiscipuladoChange}
                  labelSelect={state.discipuladoSelect}
                  dataOptions={mapDiscipuladossUnicosPastor?.sort(comparedValues)}
                  selectedOption={handleDiscipuladoChange}
                  width={"85%"}
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
                  dataOptions={celulaPastor?.sort(comparedValues)}
                  selectedOption={selectedOptionCelula}
                  width={"85%"}
                />
              </S.ContentC>
            </S.Grid>
          </>
        );

      case "administrador":
        return (
          <>
            <S.Grid>
              <TitleComponent title={`${FormFields.NETWORK}*:`} small primary />
              <S.ContentC>
                <S.IconC name="vector-square" />
                <SelectComponent
                  onChange={handleRedeChange}
                  labelSelect={state.redeSelect}
                  dataOptions={mapRedesUnicas.sort(comparedValues)}
                  selectedOption={handleRedeChange}
                  width={"85%"}
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent
                title={`${FormFields.DISCIPLESHIP}*:`}
                small
                primary
              />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  onChange={handleDiscipuladoChange}
                  labelSelect={state.discipuladoSelect}
                  dataOptions={state.redeSelect && mapDiscipuladosUnicos.sort(comparedValues)}
                  selectedOption={handleDiscipuladoChange}
                  width={"85%"}
                  disabled={state.redeSelect === "Selecione" ? true : false}
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.CELULA}*:`} small primary />
              <S.ContentC>
                <S.IconC name="user-friends" />
                <SelectComponent
                  onChange={handleCelulaChange}
                  labelSelect={state.celulaSelect}
                  dataOptions={celulaAdm.sort(compared)}
                  selectedOption={selectedOptionCelula}
                  width={"85%"}
                  disabled={
                    state.discipuladoSelect === "Selecione" ? true : false
                  }
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
        <ComeBackComponent />
        <NavigationComponent data office={userInfo} />
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <ScrollView>
          {userInfo && (
            <S.Content>
              <S.Form behavior="position" enabled>
                {office()}
                <S.Grid>
                  <TitleComponent
                    title={`${FormFields.OFFER}R$*:`}
                    small
                    primary
                  />
                  <S.ContentC>
                    <S.IconC name="file-invoice-dollar" />
                    <InputMaskComponent
                      value={state.offer}
                      mask="currency"
                      maxLength={14}
                      inputMaskChange={(value: string) =>
                        handleOfferChange(value)
                      }
                      primary
                      padding={1}
                      height={30}
                    />
                  </S.ContentC>
                </S.Grid>

                <S.Grid>
                  <TitleComponent
                    title={`${FormFields.DATE}*:`}
                    small
                    primary
                  />
                  <S.ContentC>
                    <DateComponent
                      text={state.textDate}
                      open={showMode}
                      showCalender={showCalender}
                      dataDados={state.date}
                      onChange={handleDateChange}
                    />
                  </S.ContentC>
                </S.Grid>

                <S.Grid>
                  <TitleComponent title="Semana*:" small primary />
                  <S.ContentC>
                    <SelectComponent
                      onChange={handleWeekChange}
                      labelSelect={state.week}
                      dataOptions={weeks}
                      selectedOption={handleWeekChange}
                      width="100%"
                    />
                  </S.ContentC>
                </S.Grid>

                <S.GridLeft>
                  <TitleComponent
                    title={`${FormFields.OBSERVATIONS}:`}
                    small
                    primary
                  />
                  <S.Observations
                    multiline={true}
                    onChangeText={handleObservationsChange}
                    value={state.observations}
                  />
                </S.GridLeft>

                <S.ContentButton>
                  <ButtonComponent
                    title={ButtonsText.REPORT}
                    onPress={handleOpenModal}
                    disabled={
                      isLider ||
                      state.textDate === "Selecione uma data" ||
                      state.week === "Selecione uma semana" ||
                      state.offer === "" ||
                      state.presencaCelula.length === 0 ||
                      state.presencaCulto.length === 0
                        ? true
                        : false
                    }
                  />
                </S.ContentButton>
              </S.Form>
            </S.Content>
          )}
        </ScrollView>
      )}
      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ReportContentModalComponent
          handleCloseModal={setModalVisible}
          data={user}
          setSendModal={setSendModal}
        />
      </ModalComponent>

      <ModalComponent
        isVisible={sendModal}
        onBackdropPress={() => {
          setSendModal(false);
          navigation.navigate("Home");
        }}
      >
        <DefaultContentModalComponent type="sendReport" />
      </ModalComponent>
    </Fragment>
  );
}
