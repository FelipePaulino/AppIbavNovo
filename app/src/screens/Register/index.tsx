import React, { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DateComponent } from "../../components/Date";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputMaskComponent } from "../../components/InputMask";
import { InputFieldComponent } from "../../components/InputField";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import FormFields from "../../common/constants/form";
import useUserFiltered from "../../hooks/useUserFiltered";
import { useNavigation } from "@react-navigation/native";
import { useFormReport } from "../../hooks/useFormReport";
import { GetStorage } from "../../common/constants/storage";
import { FormReportActions } from "../../contexts/FormReport";
import { connectApi } from "../../common/services/ConnectApi";
import MenuNavigation from "../../common/constants/navigation";
import { initialValuesRequestCep } from "../../common/utils/initialValues";
import {
  selectState,
  selectCategory,
  selectCivilStatus,
} from "../../common/utils/selects";

const loadingGif = require("../../assets/loader-two.gif");

import IAddress from "../../types/initialValues";

import * as S from "./styles";
import { maskCep } from "../../common/utils/masks";

export function RegisterScreen() {
  const [address, setAddress] = useState(initialValuesRequestCep);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any>();
  const [celulas, setCelulas] = useState<any>([]);

  const [numberHouse, setNumberHouse] = useState("");
  const [showCalender, setShowCalender] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { user } = useUserFiltered();
  const { state, dispatch } = useFormReport();
  const navigation = useNavigation();
  const identifyCelula = user && user[0][1].numero_celula;
  const userInfo = user && user[0][1];
  const whatOffice = userInfo && userInfo.cargo;

  useEffect(() => {
    if (whatOffice !== "lider") {
      const getCelulas = async () => {
        const response = await connectApi.get("/celulas.json");

        setCelulas(Object.entries(response.data));
        setLoading(false);
      };
      getCelulas();
    }
  }, []);

  useEffect(() => {
    const filterMembers =
      celulas &&
      celulas.filter((item: any) => {
        return celulas.numero_celula === identifyCelula;
      });
    if (filterMembers) {
      setMembers(filterMembers);
      AsyncStorage.setItem(
        GetStorage.MEMBERS_FILTERED,
        JSON.stringify(filterMembers)
      );
    }
  }, [identifyCelula, celulas]);

  const submitRegister = () => {
    const { cep, bairro, localidade, logradouro, uf } = address;
    const identifyId = celulas.filter((item: any) => {
      return (
        `${item[1].numero_celula} - ${item[1].lider}` === state.celulaSelect
      );
    });

    const identifyLider = celulas.filter((item: any) => {
      return item[1].numero_celula === user[0][1].numero_celula;
    });

    const ID_CELULAS =
      whatOffice === "lider de celula" ? identifyLider[0][0] : identifyId[0][0];

    try {
      connectApi
        .post(`/celulas/${ID_CELULAS}/membros.json`, {
          nome: name,
          status: state.categorySelect,
          telefone: phone,
          email,
          endereco: logradouro,
          n_end: numberHouse,
          cep,
          bairro,
          cidade: localidade,
          estado: address.uf || state.textSelectState,
          data_de_nascimento: state.dateRegister,
          estado_civil: state.civilStatusSelect,
        })
        .then(() => {
          setName(name);
          setSuccessModal(true);

          dispatch({
            type: FormReportActions.setTextSelectCivilStatus,
            payload: "*Selecione",
          });

          dispatch({
            type: FormReportActions.setTextSelectState,
            payload: "*Selecione",
          });

          dispatch({
            type: FormReportActions.setTextSelectCategory,
            payload: "*Selecione",
          });

          dispatch({
            type: FormReportActions.setTextRegister,
            payload: "Selecione uma data",
          });
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
            type: FormReportActions.setDateRegister,
            payload: new Date(),
          });

          setPhone("");
          setEmail("");
          setNumberHouse("");
          setAddress(initialValuesRequestCep);
        });
    } catch (err) {}
  };

  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || state.dateRegister;

    setShowCalender(false);

    const tempDate = new Date(currentDate);
    const newDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    dispatch({
      type: FormReportActions.setDateRegister,
      payload: currentDate,
    });
    dispatch({
      type: FormReportActions.setTextRegister,
      payload: newDate,
    });
  };

  const showMode = () => {
    setShowCalender(true);
  };

  const handleStateChange = (value: string) => {
    dispatch({
      type: FormReportActions.setStateSelect,
      payload: value,
    });
  };

  const handleCivilStatusChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCivilStatusSelect,
      payload: value,
    });
  };

  const handleCategoryChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCategorySelect,
      payload: value,
    });
  };

  const selectedOptionState = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectState,
      payload: value,
    });
  };

  const selectedOptionCivilStatus = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectCivilStatus,
      payload: value,
    });
  };

  const selectedOptionCategory = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectCategory,
      payload: value,
    });
  };

  const getAddressFromApi = useCallback(() => {
    axios
      .get(`https://viacep.com.br/ws/${address.cep}/json/`)
      .then((response) => response.data)
      .then((data: IAddress) => {
        setAddress({
          uf: data.uf,
          ddd: data.ddd,
          gia: data.gia,
          ibge: data.ibge,
          siafi: data.siafi,
          bairro: data.bairro,
          logradouro: data.logradouro,
          localidade: data.localidade,
          complemento: data.complemento,
          cep: data.cep,
        });
      })
      .catch((err) => console.log("Erro:", err));
  }, [address.cep]);

  // tratativas para o usuário administrador
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

  const redes = celulas.map((item: any) => item[1].rede);
  const redesUnicas = redes.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i && este;
  });

  const mapRedesUnicas = redesUnicas.map((item: any) => {
    return {
      value: item,
    };
  });

  const isShepherd =
    whatOffice === "pastor"
      ? userInfo.rede
      : whatOffice === "discipulador"
      ? userInfo.rede
      : state.redeSelect;
  const isDisc =
    whatOffice === "discipulador" ? userInfo.nome : state.discipuladoSelect;

  const filtrandoRedes = celulas.filter((item: any) => {
    return item[1].rede === isShepherd;
  });
  const discipulado = filtrandoRedes.map((item: any) => {
    return item[1].discipulador;
  });
  const discipuladossUnicos = discipulado.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos && discipuladossUnicos.map((item: any) => {
    return {
      value: item.trim()
    }
  }).filter(function (este: any, i: any, array: any[]) {
    return array.findIndex((item: any) => item.value === este.value) === i;
  });

  let validaRede: any;
  let validaDisc: any;
  if (user[0][1].cargo === "discipulador") {
    validaRede = user[0][1].rede;
    validaDisc = user[0][1].nome;
  } else if (user[0][1].cargo === "pastor") {
    validaRede = user[0][1].rede;
    validaDisc = state.discipuladoSelect;
  } else {
    validaRede = state.redeSelect;
    validaDisc = state.discipuladoSelect;
  }

  const filtrandoDiscipulado = celulas.filter((item: any) => {
    return item[1].discipulador === isDisc && item[1].rede === isShepherd;
  });

  const celulaAdm = filtrandoDiscipulado.map((item: any) => {
    return {
      value: `${item[1].numero_celula} - ${item[1].lider}`,
    };
  });

  const office = () => {
    switch (whatOffice) {
      case "discipulador":
        return (
          <S.BoxSelect>
            <SelectComponent
              label="Célula"
              onChange={handleCelulaChange}
              labelSelect={state.celulaSelect}
              dataOptions={celulaAdm}
              selectedOption={selectedOptionCelula}
            />
          </S.BoxSelect>
        );

      case "pastor":
        return (
          <Fragment>
            <S.BoxSelect>
              <SelectComponent
                label="Discipulado"
                onChange={handleDiscipuladoChange}
                labelSelect={state.discipuladoSelect}
                dataOptions={state.redeSelect && mapDiscipuladosUnicos}
                selectedOption={handleDiscipuladoChange}
                disabled={state.redeSelect === "*Selecione" ? true : false}
              />
            </S.BoxSelect>

            <S.BoxSelect>
              <SelectComponent
                label="Célula"
                onChange={handleCelulaChange}
                labelSelect={state.celulaSelect}
                dataOptions={celulaAdm}
                selectedOption={selectedOptionCelula}
                disabled={
                  state.discipuladoSelect === "*Selecione" ? true : false
                }
              />
            </S.BoxSelect>
          </Fragment>
        );

      case "administrador":
        return (
          <Fragment>

            <S.BoxSelect>
              <SelectComponent
                label="Rede"
                onChange={handleRedeChange}
                labelSelect={state.redeSelect}
                dataOptions={mapRedesUnicas}
                selectedOption={handleRedeChange}
              />
            </S.BoxSelect>

            <S.BoxSelect>
              <SelectComponent
                label="Discipulado"
                onChange={handleDiscipuladoChange}
                labelSelect={state.discipuladoSelect}
                dataOptions={state.redeSelect && mapDiscipuladosUnicos}
                selectedOption={handleDiscipuladoChange}
                disabled={state.redeSelect === "*Selecione" ? true : false}
              />
            </S.BoxSelect>

            <S.BoxSelect>
              <SelectComponent
                label="Célula"
                onChange={handleCelulaChange}
                labelSelect={state.celulaSelect}
                dataOptions={celulaAdm}
                selectedOption={selectedOptionCelula}
                disabled={
                  state.discipuladoSelect === "*Selecione" ? true : false
                }
              />
            </S.BoxSelect>
          </Fragment>
        );
    }
  };
  const validacao = (cargo:string) => {
    if (cargo === "administrador") {
      if (
        state.redeSelect === "Selecione" ||
        state.celulaSelect === "Selecione" ||
        state.discipuladoSelect === "Selecione"
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (cargo === "pastor") {
      if (
        state.celulaSelect === "Selecione" ||
        state.discipuladoSelect === "Selecione"
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (cargo === "discipulador") {
      if (
        state.celulaSelect === "Selecione" 
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>
            {whatOffice
              ? MenuNavigation.REGISTER_MEMBERS
              : MenuNavigation.REGISTER}
          </S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <ScrollView>
          <S.Container>
            <S.Form>
              {office()}
              <InputFieldComponent
                primary
                value={name}
                placeholder={`* ${FormFields.FULL_NAME}`}
                onChangeText={setName}
              />
              <InputMaskComponent
                value={phone}
                mask="phone"
                maxLength={14}
                placeholder={`* ${FormFields.PHONE}`}
                inputMaskChange={(value: string) => setPhone(value)}
                primary
              />

              <InputFieldComponent
                primary
                value={email}
                placeholder={`* ${FormFields.EMAIL}`}
                onChangeText={setEmail}
              />

              <InputMaskComponent
                value={address.cep}
                mask="cep"
                maxLength={9}
                placeholder={FormFields.CEP}
                inputMaskChange={(value: string) =>
                  setAddress((old) => ({
                    ...old,
                    cep: value,
                  }))
                }
                onEndEditing={() => getAddressFromApi()}
                onChangeText={(value) =>
                  setAddress((old) => ({
                    ...old,
                    cep: maskCep(value),
                  }))
                }
                primary
              />

              <S.GridForm>
                <S.GridItemLarge>
                  <InputFieldComponent
                    primary
                    value={address.logradouro}
                    placeholder={FormFields.ADDRESS}
                    onChangeText={(value) =>
                      setAddress((old) => ({
                        ...old,
                        logradouro: value,
                      }))
                    }
                  />
                </S.GridItemLarge>

                <S.GridItemSmall>
                  <InputFieldComponent
                    primary
                    value={numberHouse}
                    placeholder={FormFields.NUMBER}
                    onChangeText={setNumberHouse}
                  />
                </S.GridItemSmall>
              </S.GridForm>

              <S.GridForm>
                <S.GridItem>
                  <InputFieldComponent
                    primary
                    value={address.bairro}
                    placeholder={FormFields.DISTRICT}
                    onChangeText={(value) =>
                      setAddress((old) => ({
                        ...old,
                        bairro: value,
                      }))
                    }
                  />
                </S.GridItem>

                <S.GridItem>
                  <InputFieldComponent
                    primary
                    value={address.localidade}
                    placeholder={FormFields.CITY}
                    onChangeText={(value) =>
                      setAddress((old) => ({
                        ...old,
                        localidade: value,
                      }))
                    }
                  />
                </S.GridItem>
              </S.GridForm>

              <S.GridForm>
                <S.GridItem>
                  <SelectComponent
                    label="Estado"
                    onChange={handleStateChange}
                    selectedOption={selectedOptionState}
                    labelSelect={
                      address.uf ? address.uf : state.textSelectState
                    }
                    dataOptions={selectState}
                    disabled={address.uf !== ""}
                  />
                </S.GridItem>

                <S.GridItem>
                  <SelectComponent
                    label="* Estado Civil"
                    onChange={handleCivilStatusChange}
                    selectedOption={selectedOptionCivilStatus}
                    labelSelect={state.textSelectCivilStatus}
                    dataOptions={selectCivilStatus}
                  />
                </S.GridItem>
              </S.GridForm>

              <S.GridForm>
                <S.GridItem>
                  <DateComponent
                    text={state.textRegister}
                    open={showMode}
                    showCalender={showCalender}
                    dataDados={state.dateRegister}
                    onChange={handleDateChange}
                    label="* Data de Nascimento"
                  />
                </S.GridItem>

                <S.GridItem>
                  <SelectComponent
                    label="Categoria"
                    onChange={handleCategoryChange}
                    selectedOption={selectedOptionCategory}
                    labelSelect={state.textSelectCategory}
                    dataOptions={selectCategory}
                  />
                </S.GridItem>
              </S.GridForm>
            </S.Form>
            <S.FooterFields>
              <S.Required>* Campos obrigatórios</S.Required>
              <ButtonComponent
                title="Cadastrar"
                onPress={submitRegister}
                width="170"
                disabled={
                  validacao(whatOffice) ||
                  state.textSelectCategory === "Selecione" ||
                  name === "" ||
                  phone === ""
                    ? true
                    : false
                }
              />
            </S.FooterFields>
          </S.Container>
        </ScrollView>
      )}

      <ModalComponent
        isVisible={successModal}
        onBackdropPress={() => (
          setName(""), setSuccessModal(false), navigation.goBack()
        )}
      >
        <DefaultContentModalComponent data={name} type="register" />
      </ModalComponent>
    </Fragment>
  );
}
