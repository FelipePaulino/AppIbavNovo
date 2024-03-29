import { Alert } from "react-native";
import React, { Fragment } from "react";

import { TitleComponent } from "../../Title";
import { ButtonComponent } from "../../Button";

import useUserFiltered from "../../../hooks/useUserFiltered";
import { useFormReport } from "../../../hooks/useFormReport";
import { connectApi } from "../../../common/services/ConnectApi";

import { IContentModal } from "./types";

import * as S from "./styles";

export function ReportContentModalComponent({
  handleCloseModal,
  setSendModal,
}: IContentModal) {
  const { state } = useFormReport();
  const { user } = useUserFiltered();

  const presentCL = state.presencaCelula.filter(
    (item: any) => item.celula === "P"
  );
  const presentCT = state.presencaCulto.filter(
    (item: any) => item.culto === "P"
  );

  const presentCLMembers = presentCL.filter(
    (item: any) => item.status !== "visitante"
  );
  const presentCTMembers = presentCT.filter(
    (item: any) => item.status !== "visitante"
  );

  const presentCLVisitors = presentCL.filter(
    (item: any) => item.status === "visitante"
  );
  const presentCTVisitors = presentCT.filter(
    (item: any) => item.status === "visitante"
  );
  const isLider =
    user[0][1]?.cargo === "lider de celula"
      ? `${user[0][1]?.numero_celula} - ${user[0][1]?.nome}`
      : state.celulaSelect;

  const isDisc =
    (user[0][1]?.cargo === "discipulador" && user[0][1]?.nome) ||
    (user[0][1]?.cargo === "lider de celula" && user[0][1]?.discipulador) ||
    state.discipuladoSelect;

  const isSheperd =
    user[0][1]?.cargo === "discipulador" ||
    user[0][1]?.cargo === "lider de celula" ||
    user[0][1]?.cargo === "pastor"
      ? user[0][1]?.rede
      : state.redeSelect;

  const handleSubmitForm = () => {
    try {
      const numero_celula = user && user[0][1].numero_celula;
      const oferta = state.offer;
      const data = state.textDate;
      const week = state.week;

      let presencas = [...state.members, ...state.visitors];

      const observacoes = state.observations;

      connectApi
        .post("/relatorios.json", {
          data,
          celula: isLider,
          rede: isSheperd,
          discipulado: isDisc,
          observacoes,
          oferta,
          presencas,
          semana: week,
        })
        .then(() => {
          handleCloseModal(false);
          setTimeout(() => {
            setSendModal(true);
          }, 500);
        });
    } catch (err) {
      if (err) {
        Alert.alert("Ops algo deu errado ao enviar o seu formulário!");
        handleCloseModal(false);
      }
    }
  };
  const tituloCelula = () => {
    switch (user && user[0][1].cargo) {
      case "lider":
        return (
          <S.BoxTitle>
            <TitleComponent title={`Célula: `} decoration primary weight />
            <TitleComponent
              title={`${user && user[0][1].numero_celula} - ${
                user && user[0][1].rede
              }`}
              decoration
              primary
              uppercase
              weight
            />
          </S.BoxTitle>
        );
      case "discipulador":
        return (
          <S.BoxTitle>
            <TitleComponent title={`Célula: `} decoration primary weight />
            <TitleComponent
              title={`${state.celulaSelect}`}
              decoration
              primary
              uppercase
              weight
            />
          </S.BoxTitle>
        );

      case "pastor":
        return (
          <S.BoxTitle>
            <TitleComponent title={`Célula: `} decoration primary weight />
            <TitleComponent
              title={state.celulaSelect}
              decoration
              primary
              uppercase
              weight
            />
          </S.BoxTitle>
        );

      case "administrador":
        return (
          <S.BoxTitle>
            <TitleComponent title={`Célula: `} decoration primary weight />
            <TitleComponent
              title={`${state.celulaSelect} - ${state.redeSelect}`}
              decoration
              primary
              uppercase
              weight
            />
          </S.BoxTitle>
        );
    }
  };

  return (
    <Fragment>
      <S.ContentModal>
        <S.TitleModal>Resumo do relatório</S.TitleModal>

        <S.ListModal>
          {tituloCelula()}
          <TitleComponent
            title={`Oferta: ${state.offer ? state.offer : "Nenhuma oferta!"}`}
            decoration
            primary
          />
          <TitleComponent
            title={`Data: ${state.textDate}`}
            decoration
            primary
          />
          <TitleComponent title={`Semana: ${state.week}`} decoration primary />
          <TitleComponent title="Presença:" decoration primary />
          <TitleComponent
            title={`- ${
              presentCLMembers ? presentCLMembers.length : 0
            } membros (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCTMembers ? presentCTMembers.length : 0
            } membros (culto)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCLVisitors ? presentCLVisitors.length : 0
            } Visitantes (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCTVisitors ? presentCTVisitors.length : 0
            } Visitantes (culto)`}
            decoration
            primary
          />
        </S.ListModal>
        {state.observations && (
          <S.ObservationModal>
            <TitleComponent
              title={`Observações: ${
                state.observations ? state.observations : "Nenhuma observação!"
              }`}
              decoration
              primary
            />
          </S.ObservationModal>
        )}
        <S.BoxButton>
          <ButtonComponent
            title="Cancelar"
            onPress={() => handleCloseModal(false)}
            width="130"
            size="14"
          />

          <ButtonComponent
            title="Confirmar"
            onPress={handleSubmitForm}
            width="130"
            size="14"
          />
        </S.BoxButton>
      </S.ContentModal>
    </Fragment>
  );
}
