import React, { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { DateComponent } from "../../components/Date";
import { ModalComponent } from "../../components/Modal";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputMaskComponent } from "../../components/InputMask";
import { InputFieldComponent } from "../../components/InputField";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import FormFields from "../../common/constants/form";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "../../config/firebase";
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";
import MenuNavigation from "../../common/constants/navigation";
import {
  initialValuesRequestCep,
  initialValueRegisterUser,
} from "../../common/utils/initialValues";

import {
  selectState,
  officeMembers,
  selectCivilStatus,
} from "../../common/utils/selects";

import { IDataUser } from "./types";
import IAddress from "../../types/initialValues";

import * as S from "./styles";
import { maskCep, maskEmail } from "../../common/utils/masks";
import { ErrorModalComponent } from "../../components/Modal/Error";

import { dictionary } from "../../common/utils/dictionary";

export function UserRegisterScreen() {
  const [users, setUsers] = useState([]);
  const [celulas, setCelulas] = useState([])
  const [diseble, setDiseble] = useState<any>();
  const [office, setOffice] = useState("Selecionar");
  const [showCalender, setShowCalender] = useState(false);
  const [address, setAddress] = useState<any>(initialValuesRequestCep);
  const [selectNetwork, setSelectNetwork] = useState("Selecionar");
  const [selectDisciples, setSelectDisciples] = useState("Selecionar");
  const [formValues, setFormValues] = useState<any>(initialValueRegisterUser);
  const [confirmRegisterModal, setConfirmRegisterModal] = useState(false);
  const [updateList, setUpdateList] = useState(false)
  const [errorNumberCelula, setErrorNumberCelula] = useState(false)
  const [errorEmailValidate, setErrorEmailValidate] = useState(false)

  const { state: stateReducer, dispatch } = useFormReport();
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [messageError, setMessageError] = useState<string>('')

  useEffect(() => {
    const getCelulas = async () => {
      const response = await connectApi.get("/users.json");
      const dataCelulas = await connectApi.get("/celulas.json");

      setUsers(Object.values(response.data));
      setCelulas(Object.values(dataCelulas.data))
    };
    getCelulas();
  }, [updateList]);

  const getNetwork = selectNetwork.split(" -")[0];

  const usersMinister =
    users && users.filter((minister: IDataUser) => minister.cargo === "pastor");

  const usersDisciples =
    users &&
    users.filter((discipler: IDataUser) => discipler.cargo === "discipulador");

  const disciplesFiltered =
    usersDisciples &&
    usersDisciples.filter((user: IDataUser) => user.rede === getNetwork);

  const optionsDisciples =
    disciplesFiltered &&
    disciplesFiltered.map((disc: IDataUser) => {
      return {
        value: disc.nome,
      };
    });

  const optionsNetwork =
    usersMinister &&
    usersMinister.map((pastor: IDataUser) => {
      return {
        value: `${pastor?.rede} - ${pastor?.nome}`,
      };
    });

  const handleSelectOffice = (value: string) => {
    setOffice(value);

    setSelectNetwork("Selecionar");
    setSelectDisciples("Selecionar");
  };

  const handleNetworkChange = (value: string) => {
    setSelectNetwork(value);

    setSelectDisciples("Selecionar");
  };
  const handleDisciplesChange = (value: string) => {
    setSelectDisciples(value);
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

  const showMode = () => {
    setShowCalender(true);
  };

  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || stateReducer.dateRegister;

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

  const registerUser = () => {
    const { email, password } = formValues;
    if (maskEmail(formValues.email)) {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        credentialsPost();
        setUpdateList(!updateList)
      })
      .catch((error) => {
        setMessageError(error.message)
        setErrorEmailValidate(true)
        // ..
      });
  
    }
    else{
      setErrorEmailValidate(true)
    }
  };

  const validateCell: any = celulas.length && celulas.filter((item: any) => {
    return item.numero_celula === formValues.numberCelula
  })

  const validateExistingEmail: any = users.length && users.filter((item: any) => {
    return item.email === formValues.email
  })

  const credentialsPost = () => {
    const dataLider = {
      bairro: address.bairro,
      cep: address.cep,
      cidade: address.localidade,
      data_de_nascimento: stateReducer.textRegister,
      email: formValues.email.toLowerCase(),
      endereco: address.logradouro,
      estado: address.uf ? address.uf : formValues.state,
      estado_civil: formValues.stateCivil,
      n_end: formValues.numberHouse,
      nome: formValues.name,
      status: "membro",
      telefone: formValues.phone,
    }
    try {
      if (maskEmail(formValues.email)) {
        if (office === "pastor de rede") {
          connectApi
            .post("/users.json", {
              cargo: "pastor",
              cep: address.cep,
              nome: formValues.name,
              bairro: address.bairro,
              email: formValues.email.toLowerCase(),
              estado: formValues.state ? formValues.state : '',
              rede: formValues.network,
              cidade: address.localidade,
              senha: formValues.password,
              telefone: formValues.phone,
              endereco: address.logradouro,
              numero_casa: formValues.numberHouse,
              estado_civil: formValues.stateCivil,
              data_de_nascimento: stateReducer.textRegister,
            })
            .then(() => {
              setConfirmRegisterModal(true);
              setConfirmRegisterModal(true);
              setAddress(initialValuesRequestCep);
              setOffice("");
              setSelectNetwork("Selecionar");
              setSelectDisciples("Selecionar");

              dispatch({
                type: FormReportActions.setTextRegister,
                payload: "",
              });
            });
        } else if (office === "discipulador") {
          connectApi
            .post("/users.json", {
              cargo: "discipulador",
              rede: selectNetwork.split(' -')[0],
              pastor: selectNetwork.split(' -')[1],
              cep: address.cep,
              nome: formValues.name,
              bairro: address.bairro,
              email: formValues.email.toLowerCase(),
              estado: address.uf ? address.uf : formValues.state,
              cidade: address.localidade,
              senha: formValues.password,
              telefone: formValues.phone,
              endereco: address.logradouro,
              estado_civil: formValues.stateCivil,
              numero_casa: formValues.numberHouse,
              data_de_nascimento: stateReducer.textRegister,
            })
            .then(() => {
              setConfirmRegisterModal(true);
              setConfirmRegisterModal(true);
              setAddress(initialValuesRequestCep);
              setOffice("");
              setSelectNetwork("Selecionar");
              setSelectDisciples("Selecionar");

              dispatch({
                type: FormReportActions.setTextRegister,
                payload: "",
              });
            });
        } else {
          if (validateCell.length === 0) {
            if (validateExistingEmail.length === 0) {
              connectApi.post("/users.json", {
                cargo: "lider de celula",
                rede: selectNetwork.split(' -')[0],
                pastor: selectNetwork.split(' -')[1],
                discipulador: selectDisciples,
                numero_celula: formValues.numberCelula,
                senha: formValues.password,
                ...dataLider
              }).then(() => {
                connectApi.post("/celulas.json", {
                  lider: formValues.name,
                  email: formValues.email,
                  numero_celula: formValues.numberCelula,
                  discipulador: selectDisciples,
                  pastor: selectNetwork.split('- ')[1],
                  rede: selectNetwork.split(' -')[0],
                  membros: [dataLider]
                }).then(() => {
                  setConfirmRegisterModal(true);
                  setAddress(initialValuesRequestCep);
                  setSelectNetwork("Selecionar");
                  setOffice("");

                  setSelectNetwork("Selecionar");
                  setSelectDisciples("Selecionar");

                  dispatch({
                    type: FormReportActions.setTextRegister,
                    payload: "",
                  });
                });
              });
            } 
          } else {
            setErrorNumberCelula(true)
          }
        }
      } else {
        connectApi.post("/users.json", {
          cargo: "lider de celula",
          rede: selectNetwork.split(' -')[0],
          pastor: selectNetwork.split(' - ')[1],
          discipulador: selectDisciples,
          numero_celula: formValues.numberCelula,
          senha: formValues.password,
          ...dataLider
        }).then(() => {
          connectApi.post("/celulas.json", {
            lider: formValues.name,
            email: formValues.email.toLowerCase(),
            numero_celula: formValues.numberCelula,
            discipulador: selectDisciples,
            pastor: selectNetwork.split('- ')[1],
            rede: selectNetwork.split(' -')[0],
            membros: [dataLider]
          }).then(() => {
            setConfirmRegisterModal(true);
            setAddress(initialValuesRequestCep);
            setSelectNetwork("Selecionar");
            setOffice("");

            setSelectNetwork("Selecionar");
            setSelectDisciples("Selecionar");

            dispatch({
              type: FormReportActions.setTextRegister,
              payload: "",
            });
          });
        });
        setErrorEmailValidate(true)
      }
    } catch (err) {
      throw new Error("Ops, algo deu errado!");
    }
  };

  useEffect(() => {
    if (office === "pastor de rede") {
      setDiseble(
        formValues.network === "" ||
        formValues.email === "" ||
        FormFields.PASSWORD === "" ||
        formValues.name === "" ||
        formValues.phone === ""
      );
    } else if (office === "lider de celula") {
      setDiseble(
        formValues.numberCelula === "" ||
        formValues.email === "" ||
        FormFields.PASSWORD === "" ||
        formValues.name === "" ||
        formValues.phone === "" ||
        selectDisciples === "Selecionar" ||
        selectNetwork === "Selecionar"

      );
    } else if (office === "discipulador") {
      setDiseble(
        formValues.email === "" ||
        FormFields.PASSWORD === "" ||
        formValues.name === "" ||
        formValues.phone === "" ||
        selectNetwork === "Selecionar"
      );
    }
  }, [formValues, FormFields, office, selectNetwork, selectDisciples]);

  const renderSelectsOptions = () => {
    switch (office) {
      case "discipulador":
        return (
          <S.GridSelect>
            <SelectComponent
              label="Rede"
              onChange={handleNetworkChange}
              selectedOption={handleNetworkChange}
              labelSelect={selectNetwork}
              dataOptions={optionsNetwork && optionsNetwork}
            />
          </S.GridSelect>
        );

      case "lider de celula":
        return (
          <Fragment>
            <S.GridSelect>
              <SelectComponent
                label="Rede"
                onChange={handleNetworkChange}
                selectedOption={handleNetworkChange}
                labelSelect={selectNetwork}
                dataOptions={optionsNetwork && optionsNetwork}
              />
            </S.GridSelect>
            <S.GridSelect>
              <SelectComponent
                label="Discipulado"
                onChange={handleDisciplesChange}
                selectedOption={handleDisciplesChange}
                labelSelect={selectDisciples}
                dataOptions={optionsDisciples && optionsDisciples}
                disabled={selectNetwork === 'Selecionar'}
              />
            </S.GridSelect>
          </Fragment>
        );

      default:
        return;
    }
  };

  const renderMoreInput = () => {
    switch (office) {
      case "pastor de rede":
        return (
          <InputFieldComponent
            primary
            value={formValues.network}
            placeholder={`* ${FormFields.NETWORK}`}
            onChangeText={(value) =>
              setFormValues({ ...formValues, network: value })
            }
          />
        );
      case "lider de celula":
        return (
          <InputFieldComponent
            primary
            value={formValues.numberCelula}
            placeholder={`* ${FormFields.NUMBER_CELULA}`}
            onChangeText={(value) =>
              setFormValues({ ...formValues, numberCelula: value })
            }
          />
        );

      default:
        return;
    }
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.REGISTER_USERS}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>

      <S.Main>
        <S.GridSelect>
          <SelectComponent
            label="Cargo"
            onChange={handleSelectOffice}
            selectedOption={handleSelectOffice}
            labelSelect={office}
            dataOptions={officeMembers}
          />
        </S.GridSelect>

        {renderSelectsOptions()}

        {office !== "Selecionar" && (
          <Fragment>
            {renderMoreInput()}

            <InputFieldComponent
              primary
              value={formValues.email}
              placeholder={`* ${FormFields.EMAIL}`}
              onChangeText={(value) =>
                setFormValues({ ...formValues, email: value })
              }
            />

            <InputFieldComponent
              primary
              value={formValues.password}
              placeholder={`* ${FormFields.PASSWORD}`}
              onChangeText={(value) =>
                setFormValues({ ...formValues, password: value })
              }
            />

            <InputFieldComponent
              primary
              value={formValues.name}
              placeholder={`* ${FormFields.FULL_NAME}`}
              onChangeText={(value) =>
                setFormValues({ ...formValues, name: value })
              }
            />

            <InputMaskComponent
              value={formValues.phone}
              mask="phone"
              maxLength={14}
              placeholder={`* ${FormFields.PHONE}`}
              inputMaskChange={(value: string) =>
                setFormValues({ ...formValues, phone: value })
              }
              primary
            />

            <InputMaskComponent
              value={address.cep}
              mask="cep"
              maxLength={9}
              placeholder={FormFields.CEP}
              onEndEditing={() => getAddressFromApi()}
              inputMaskChange={(value: any) =>
                setAddress((old: any) => ({
                  ...old,
                  cep: value,
                }))
              }
              primary
            />

            <S.GridForm>
              <S.GridItemLarge>
                <InputFieldComponent
                  primary
                  value={address.logradouro}
                  placeholder={
                    address.logradouro !== ""
                      ? address.logradouro
                      : FormFields.ADDRESS
                  }
                  onChangeText={(value) =>
                    setAddress((old: any) => ({
                      ...old,
                      logradouro: value,
                    }))
                  }
                />
              </S.GridItemLarge>

              <S.GridItemSmall>
                <InputFieldComponent
                  primary
                  value={formValues.numberHouse}
                  placeholder={FormFields.NUMBER}
                  onChangeText={(value) =>
                    setFormValues({ ...formValues, numberHouse: value })
                  }
                />
              </S.GridItemSmall>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address.bairro}
                  placeholder={
                    address.bairro !== "" ? address.bairro : FormFields.DISTRICT
                  }
                  onChangeText={(value) =>
                    setAddress((old: any) => ({
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
                  placeholder={
                    address.localidade !== ""
                      ? address.localidade
                      : FormFields.CITY
                  }
                  onChangeText={(value) =>
                    setAddress((old: any) => ({
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
                  onChange={(value) =>
                    setFormValues({ ...formValues, state: value })
                  }
                  selectedOption={(value) =>
                    setFormValues({ ...formValues, state: value })
                  }
                  labelSelect={
                    address.uf ? address.uf : formValues.state || "Selecione"
                  }
                  dataOptions={selectState}
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Estado Civil"
                  onChange={(value) =>
                    setFormValues({ ...formValues, stateCivil: value })
                  }
                  selectedOption={(value) =>
                    setFormValues({ ...formValues, stateCivil: value })
                  }
                  labelSelect={
                    formValues.stateCivil ? formValues.stateCivil : "Selecione"
                  }
                  dataOptions={selectCivilStatus}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <DateComponent
                  text={stateReducer.textRegister}
                  open={showMode}
                  showCalender={showCalender}
                  dataDados={stateReducer.dateRegister}
                  onChange={handleDateChange}
                  label="Data de Nascimento"
                />
              </S.GridItem>
            </S.GridForm>

            <S.FooterFields>
              <S.Required>* Campos obrigatórios</S.Required>
              <ButtonComponent
                title="Cadastrar"
                onPress={registerUser}
                width="170"
                disabled={diseble}
              />
            </S.FooterFields>
          </Fragment>
        )}
      </S.Main>

      <ModalComponent
        isVisible={confirmRegisterModal}
        onBackdropPress={() => (
          setConfirmRegisterModal(false),
          setFormValues(initialValueRegisterUser),
          navigation.goBack()
          )}
      >
        <DefaultContentModalComponent
          type="register"
          data={formValues.name}
        />
      </ModalComponent>

      <ModalComponent
        isVisible={errorNumberCelula}
        onBackdropPress={() => setErrorNumberCelula(false)}
      >
        <ErrorModalComponent
          text="Número da celula ja está sendo utilizado"
        />
      </ModalComponent>

      <ModalComponent
        isVisible={errorEmailValidate}
        onBackdropPress={() => setErrorEmailValidate(false)}
      >
        <ErrorModalComponent
          text={dictionary(messageError)}
        />
      </ModalComponent>
    </Fragment>
  );
}
