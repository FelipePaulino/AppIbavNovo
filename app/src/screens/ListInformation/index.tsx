import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IDataUser } from "../UserRegister/types";

import FormFields from "../../common/constants/form";
import useUserFiltered from "../../hooks/useUserFiltered";
import { useFormReport } from "../../hooks/useFormReport";
import { GetStorage } from "../../common/constants/storage";
import { connectApi } from "../../common/services/ConnectApi";
import MenuNavigation from "../../common/constants/navigation";
import RequestService from "../../common/services/RequestService";
import {
  officeMembers,
  selectCivilStatus,
  selectState,
} from "../../common/utils/selects";

import { DateComponent } from "../../components/Date";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
// import { NotificationComponent } from "../../components/Notification";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import { IPropsAppStack } from "../../routes/AppStack/types";
import * as S from "./styles";

export function UsersInformationScreen(this: any, { route }: any) {
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [celulas, setCelulas] = useState<any>();
  const [members, setMembers] = useState<any>([]);
  const [successModal, setSuccessModal] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [id, setId] = useState(route.params?.id || "");
  const [cep, setCep] = useState(route.params?.cep || "");
  const [name, setName] = useState(route.params?.nome || "");
  const [city, setCity] = useState(route.params?.cidade || "");
  const [email, setEmail] = useState(route.params?.email || "");
  const [state, setState] = useState(route.params?.estado || "Selecione");
  const [nEnd, setNEnd] = useState(route.params?.n_end || "");
  const [phone, setPhone] = useState(route.params?.telefone || "");
  const [address, setAddress] = useState(route.params?.endereco || "");
  const [district, setDistrict] = useState(route.params?.bairro || "");
  const [password, setPassword] = useState(route.params?.senha || "");
  const [numberCelula, setNumberCelular] = useState(route.params?.numero_celula || "");
  const [office, setOffice] = useState(route.params?.cargo === 'pastor' ? 'pastor de rede' : route.params?.cargo || '');
  const [selectDisciples, setSelectDisciples] = useState(route.params?.discipulador || "");
  const [selectNetwork, setSelectNetwork] = useState(`${route.params?.rede} - ${route.params?.pastor}` || "");
  const [birthday, setBirthday] = useState(
    route.params?.data_de_nascimento || ""
  );
  const [civilStatus, setCivilStatus] = useState(
    route.params?.estado_civil || "Selecione"
  );
  const { user } = useUserFiltered();
  const { trigger, setTrigger } = useFormReport();

  const identifyCelula = user && user[0][1].numero_celula;
  const serviceGet = new RequestService();
  const navigation = useNavigation<IPropsAppStack>();

  useEffect(() => {
    const getCelulas = async () => {
      await serviceGet.getCelulas().then((response) => {
        setCelulas(Object.entries(response));
      });
    };

    getCelulas();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const response = await connectApi.get("/users.json");

      setUsers(Object.values(response.data));
    };
    getUsers();
  }, []);

  useEffect(() => {
    const filterMembers =
      celulas &&
      celulas.filter((item: any) => {
        return item[1].numero_celula == identifyCelula;
      });

    if (filterMembers) {
      setMembers(filterMembers);
      AsyncStorage.setItem(
        GetStorage.MEMBERS_FILTERED,
        JSON.stringify(filterMembers)
      );
    }
  }, [identifyCelula, celulas]);

  const showMode = () => {
    setShowCalender(true);
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

    setDate(currentDate);
    setBirthday(newDate);
  };

  const handleOpenModal = () => {
    setSuccessModal(true);
  };

  const submitRegister = () => {
    let payload
    const payloadDefault = {
      senha: password,
      n_end: nEnd,
      nome: name,
      telefone: phone,
      email: email,
      endereco: address,
      cep: cep,
      bairro: district,
      cidade: city,
      estado: state,
      data_de_nascimento: birthday,
      estado_civil: civilStatus,
    }

    if (office === 'lider de celula') {
      payload = {
        ...payloadDefault,
        cargo: 'lider de celular',
        discipulador: selectDisciples,
        numero_celula: numberCelula,
        rede: selectNetwork.split('-')[0],
        pastor: selectNetwork.split('-')[1],
      }
    }
    else if (office === 'discipulador') {
      payload = {
        ...payloadDefault,
        cargo: 'discipulador',
        rede: selectNetwork.split('-')[0],
        pastor: selectNetwork.split('-')[1],
      }
    }
    else {
      payload = {
        ...payloadDefault,
        rede: selectNetwork,
        cargo: 'pastor',
      }
    }

    try {
      connectApi.put(`/users/${id}.json`, payload);
      setTrigger(!trigger);
      handleOpenModal()
    } catch (err) {
      alert(err);
    }
  };

  const handleSelectOffice = (value: string) => {
    setOffice(value);
    setSelectNetwork('')
    setSelectDisciples("")
  };
  const handleNetworkChange = (value: string) => {
    setSelectNetwork(value);

    setSelectDisciples("");
  };

  const usersMinister =
    users && users.filter((minister: IDataUser) => minister.cargo === "pastor");

  const optionsNetwork =
    usersMinister &&
    usersMinister.map((pastor: IDataUser) => {
      return {
        value: `${pastor?.rede} - ${pastor?.nome}`,
      };
    });

  const handleDisciplesChange = (value: string) => {
    setSelectDisciples(value);
  };

  const usersDisciples =
    users &&
    users.filter((discipler: IDataUser) => discipler.cargo === "discipulador");

  const disciplesFiltered =
    usersDisciples &&
    usersDisciples.filter((user: IDataUser) => user.rede === selectNetwork.split(" -")[0]);

  const optionsDisciples =
    disciplesFiltered &&
    disciplesFiltered.map((disc: IDataUser) => {
      return {
        value: disc.nome,
      };
    });
  const renderSelectsOptions = () => {
    switch (office) {
      case "lider de celula":
        return (
          <>
            <S.GridItemFull>
              <SelectComponent
                label="Rede"
                onChange={handleNetworkChange}
                selectedOption={handleNetworkChange}
                labelSelect={selectNetwork ? selectNetwork : 'Selecione'}
                dataOptions={optionsNetwork && optionsNetwork}
              />
            </S.GridItemFull>
            <S.GridItemFull>
              <SelectComponent
                label="Discipulado"
                onChange={handleDisciplesChange}
                selectedOption={handleDisciplesChange}
                labelSelect={selectDisciples ? selectDisciples : 'Selecione'}
                dataOptions={optionsDisciples && optionsDisciples}
              />
            </S.GridItemFull>
            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={numberCelula === "undefined" ? FormFields.NUMBER_CELULA : numberCelula}
                placeholder={`* ${FormFields.NUMBER_CELULA}`}
                onChangeText={(value) => setNumberCelular(value)}
                label={`* ${FormFields.NUMBER_CELULA}`}
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
                onChange={handleNetworkChange}
                selectedOption={handleNetworkChange}
                labelSelect={selectNetwork ? selectNetwork : 'Selecione'}
                dataOptions={optionsNetwork && optionsNetwork}
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
                value={(selectNetwork !== "undefined" || !selectNetwork) && selectNetwork.split('-')[0]}
                placeholder={`* ${FormFields.NETWORK}`}
                onChangeText={(value) => setSelectNetwork(value)}
                label={`* ${FormFields.NETWORK}`}
              />
            </S.GridItemFull>
          </>
        );
      default:
        return;
    }
  };

  const disabledSubmit = () => {
    if (office === 'lider de celula') {
      if (!selectNetwork || !selectDisciples || numberCelula === 'undefined') {
        return true
      } else { return false }
    } else {
      if (!selectNetwork) {
        return true
      } else { return false }
    }
  }

  return (
    <>
      <HeaderComponent>
        <ComeBackComponent />
        <S.Navigation>{MenuNavigation.USERS}</S.Navigation>
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      <ScrollView>
        <S.Container>
          <S.Form>
            <S.GridItemFull>
              <SelectComponent
                label="Cargo"
                onChange={handleSelectOffice}
                selectedOption={handleSelectOffice}
                labelSelect={office}
                dataOptions={officeMembers}
              />
            </S.GridItemFull>
            {renderSelectsOptions()}
            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={email !== "undefined" && email}
                placeholder={FormFields.EMAIL}
                onChangeText={(value) => setEmail(value)}
                label="*Usu??rio"
                disabled
              />
            </S.GridItemFull>
            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={password === "undefined" ? FormFields.PASSWORD : password}
                placeholder={FormFields.PASSWORD}
                onChangeText={(value) => setPassword(value)}
                label="*Senha"
              />
            </S.GridItemFull>
            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={name !== "undefined" && name}
                placeholder={`* ${FormFields.FULL_NAME}`}
                onChangeText={(value) => setName(value)}
                label="*Nome Completo"
              />
            </S.GridItemFull>

            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={phone !== "undefined" && phone}
                placeholder={`* ${FormFields.PHONE}`}
                onChangeText={(value) => setPhone(value)}
                label="*Telefone"
              />
            </S.GridItemFull>
            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={cep !== "undefined" && cep}
                placeholder={FormFields.CEP}
                onChangeText={(value) => setCep(value)}
                label="Cep"
              />
            </S.GridItemFull>


            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address !== "undefined" && address}
                  placeholder={FormFields.ADDRESS}
                  onChangeText={(value) => setAddress(value)}
                  label="Endere??o"
                />
              </S.GridItem>

              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={nEnd !== "undefined" && nEnd}
                  placeholder={FormFields.NUMBER}
                  onChangeText={(value) => setNEnd(value)}
                  label="N??"
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={
                    district !== "undefined" && district}
                  placeholder={FormFields.DISTRICT}
                  onChangeText={(value) => setDistrict(value)}
                  label="Bairro"
                />
              </S.GridItem>

              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={city !== "undefined" && city}
                  placeholder={FormFields.CITY}
                  onChangeText={(value) => setCity(value)}
                  label="Cidade"
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <SelectComponent
                  label="Estado"
                  onChange={(labelSelect) => setState(labelSelect)}
                  selectedOption={(labelSelect) => setState(labelSelect)}
                  labelSelect={state !== "undefined" && state}
                  dataOptions={selectState}
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Estado Civil"
                  onChange={(labelSelect) => setCivilStatus(labelSelect)}
                  selectedOption={(labelSelect) => setCivilStatus(labelSelect)}
                  labelSelect={
                    civilStatus !== "undefined" && civilStatus}
                  dataOptions={selectCivilStatus}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <DateComponent
                  text={birthday}
                  open={showMode}
                  showCalender={showCalender}
                  dataDados={date}
                  onChange={handleDateChange}
                  label="Data de Nascimento"
                />
              </S.GridItem>


            </S.GridForm>
          </S.Form>

          <S.FooterFields>
            <S.Required>* Campos obrigat??rios</S.Required>
            <ButtonComponent
              title="SALVAR INFORMA????ES"
              onPress={submitRegister}
              width="213px"
              heigth="39px"
              size="14px"
              disabled={disabledSubmit()}
            />
          </S.FooterFields>
        </S.Container>
      </ScrollView>

      <ModalComponent
        isVisible={successModal}
        onBackdropPress={() => {
          setSuccessModal(false)
          navigation.navigate("ListUsers")
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
