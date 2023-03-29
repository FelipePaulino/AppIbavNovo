import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";

import { useFormReport } from "../../hooks/useFormReport";
import MenuNavigation from "../../common/constants/navigation";
import RequestService from "../../common/services/RequestService";

import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { PersonLabelComponent } from "../../components/PersonLabel";
import { ApprovalRequest } from "../../components/Modal/ApprovalRequest";
import { RequestContentModalComponent } from "../../components/Modal/Request";
import { connectApi } from "../../common/services/ConnectApi";

const loadingGif = require("../../assets/loader-two.gif");
import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";
import { ButtonComponent } from "../../components/Button";

export function ListUsersScreen() {
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalConcluded, setModalConcluded] = useState(false);
  const [celulas, setCelulas] = useState<any>()
  const [cargo, setCargo] = useState<any>()

  const service = new RequestService();

  const navigation = useNavigation<IPropsAppStack>();
  const { trigger, setTrigger } = useFormReport();
  useEffect(() => {
    const getUsers = () => {
       service
        .getUsers()
        .then((response) => {
          setUsers(response);
        })
        .finally(() => setLoading(false));
    };
    setTimeout(() => {
      getUsers();
    }, 200);
    

  }, [trigger]);

  useEffect(() => {
    const getCelulas = async () => {
      await service.getCelulas().then((response) => {
        setCelulas(Object.values(response));
      });
    };

    getCelulas();
  }, []);

  const timeModal = () => {
    setModalConcluded(true);

  };

  const deleteMember = async (name: any) => {
    let filterCelulasOther: any

    if (cargo === 'lider de celula') {
      filterCelulasOther = celulas.filter((item: any) => {
        return item.lider !== name
      })
    }

    try {
      const conection1 = cargo === 'lider de celula' ? await connectApi.put(`/celulas.json`, filterCelulasOther): []
      const conection2 = await service.deleteUser(id);
      Promise.all([conection1, conection2])
      setConfirmModal(false);
      setTimeout(timeModal, 300);
      setTrigger(!trigger);
    } catch (err) {
      alert("Houve algum problema ao excluir esse usuário");
    }
  };

  const disabledUsersAdmin = users && Object.entries(users).filter((item: any) => {
    return item[1].cargo != 'administrador'
  })

  const listUsers = users && disabledUsersAdmin?.sort(function (a: any, b: any) {
    if (a[1].nome < b[1].nome) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <Fragment>
      <HeaderComponent>
        <S.ContentHeader>
          <S.ComeBack>
            <ComeBackComponent />
            <S.Navigation>{MenuNavigation.USERS}</S.Navigation>
          </S.ComeBack>
          <ButtonComponent
            title="Cadastrar"
            onPress={() => navigation.navigate("UserRegister")}
            width="136"
            heigth="33"
            size="12"
            icon="user-plus"
            color="white"
          />
        </S.ContentHeader>
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      <ScrollView>
        <S.Container>
          {loading ? (
            <S.Loading source={loadingGif} />
          ) : (
            <Fragment>
              {listUsers.map((user: any) => {
                return (
                  <PersonLabelComponent
                    nome={user[1]?.nome}
                    key={user[1]?.nome}
                    onPress={() =>
                      navigation.navigate("UsersInformation", {
                        nome: `${user[1].nome}`,
                        telefone: `${user[1].telefone}`,
                        email: `${user[1].email}`,
                        endereco: `${user[1].endereco}`,
                        bairro: `${user[1].bairro}`,
                        cep: `${user[1].cep}`,
                        cidade: `${user[1].cidade}`,
                        estado: `${user[1].estado}`,
                        estado_civil: `${user[1].estado_civil}`,
                        data_de_nascimento: `${user[1].data_de_nascimento}`,
                        n_end: `${user[1].n_end}`,
                        id: `${user[0]}`,
                        cargo: `${user[1].cargo}`,
                        rede: `${user[1].rede}`,
                        pastor: `${user[1].pastor}`,
                        discipulador: `${user[1].discipulador}`,
                        numero_celula: `${user[1].numero_celula}`,
                        senha: `${user[1].senha}`,
                        active: setTrigger,
                      })
                    }
                    delMember={() => {
                      setConfirmModal(true),
                        setName(user[1].nome),
                        setId(user[0]);
                        setCargo(user[1].cargo)
                    }}
                  />
                );
              })}
            </Fragment>
          )}
        </S.Container>
      </ScrollView>

      <ModalComponent
        isVisible={confirmModal}
        onBackdropPress={() => setConfirmModal(false)}
      >
        <RequestContentModalComponent
          name={name}
          cancel={() => setConfirmModal(false)}
          confirm={() => {
            deleteMember(name);
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
