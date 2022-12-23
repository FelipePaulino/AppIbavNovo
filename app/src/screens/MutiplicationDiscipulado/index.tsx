import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import MenuNavigation from "../../common/constants/navigation";
import { ComeBackComponent } from "../../components/ComeBack";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { TitleComponent } from "../../components/Title";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import useUserFiltered from "../../hooks/useUserFiltered";
import { connectApi } from "../../common/services/ConnectApi";
import { Checkbox } from "react-native-paper";


import * as S from "./styles";
import { ButtonComponent } from "../../components/Button";
import axios from "axios";

export function MultiplicationDiscipulado() {
  const [celulas, setCelulas] = useState<any>([]);
  const [listMembersCelula, setListMembersCelula] = useState<any>([]);

  const { state, dispatch } = useFormReport();
  const { user, loading } = useUserFiltered();


  const userInfo = user && user[0][1];
  const whatOffice = userInfo && userInfo.cargo;

  useEffect(() => {
    if (whatOffice !== "lider") {
      const getCelulas = async () => {
        const response = await connectApi.get("/celulas.json");
console.log(response.data, 'response.data')
        setCelulas(Object.values(response.data));
      };
      getCelulas();
    }
  }, []);

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

  const memberMultiply = (member: any) => {
    const newMember = { ...member, checked: !member?.checked };
    const transformClick = Object.values(listMembersCelula).filter(
      (item: any) => {
        return item.nome !== member.nome;
      }
    );
    setListMembersCelula([...transformClick, newMember]);
  };

  // tratativas para o usuário administrador

  const redes = celulas.map((item: any) => item.rede);
  const redesUnicas = redes.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i && este;
  });

  const mapRedesUnicas = redesUnicas.map((item: any) => {
    return {
      value: item,
    };
  });

  const filterRedes = celulas.filter((item: any) => {
    return item.rede === state.redeSelect;
  });

  const discipulado = filterRedes.map((item: any) => item.discipulador);

  const discipuladossUnicos = discipulado.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoDiscipulado = celulas.filter((item: any) => {
    return (
      item.discipulador === state.discipuladoSelect &&
      item.rede === state.redeSelect
    );
  });

  const celulaAdm = filtrandoDiscipulado.map((item: any) => {
    return {
      value: `${item.numero_celula} - ${item.lider}`,
    };
  });

  // const discipuladosNaoSelecionados = celulas.filter((item:any) => {
  //   return item.discipulador !== state.discipuladoSelect
  // })

  // const discipuladosSelecionados = celulas.filter((item:any) => {
  //   return item.discipulador === state.discipuladoSelect
  // })

  // const removeMembersNewCelula = () => {
  //   try {
  //     connectApi.put(`/celulas.json`, {
  //       ...discipuladosSelecionados, 
  //     })
  //   } catch (err) {
  //     alert('Erro ao editar a celula')
  //   }
  // }

  function compared(a: any, b: any) {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  }

  return (
    <>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.MULTIPLICATION_DISCIPULADO}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>
      <ScrollView>
        <S.Content>
          <S.Grid>
            <TitleComponent title={`Rede`} small primary />
            <S.ContentC>
              <S.IconC name="vector-square" />
              <SelectComponent
                onChange={handleRedeChange}
                labelSelect={state.redeSelect}
                dataOptions={mapRedesUnicas}
                selectedOption={handleRedeChange}
                width="300"
              />
            </S.ContentC>
          </S.Grid>
          <S.Grid>
            <TitleComponent title={`Discipulado Atual:`} small primary />
            <S.ContentC>
              <S.IconC name="network-wired" />
              <SelectComponent
                onChange={handleDiscipuladoChange}
                labelSelect={state.discipuladoSelect}
                dataOptions={state.redeSelect && mapDiscipuladosUnicos}
                selectedOption={handleDiscipuladoChange}
                width="300"
                disabled={state.redeSelect === "Selecione" ? true : false}
              />
            </S.ContentC>
          </S.Grid>
          <S.Grid>
            <TitleComponent title={`Discipulado Novo:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <SelectComponent
                onChange={handleCelulaChange}
                labelSelect={state.celulaSelect}
                dataOptions={celulaAdm}
                selectedOption={handleCelulaChange}
                width="300"
                disabled={state.discipuladoSelect === "Selecione" ? true : false}
              />
            </S.ContentC>
          </S.Grid>
          <TitleComponent title={`CÉLULAS:`} small primary uppercase weight />
          <S.labelParagraph>
            <S.Paragraph>
              Selecione as células que vão para o novo discipulado
            </S.Paragraph>
          </S.labelParagraph>
          <S.Grid>
          {celulaAdm &&
              celulaAdm.length > 0 &&
              Object.values(celulaAdm)
                .sort(compared)
                .map((item: any) => {
                  return (
                    <Checkbox.Item
                      key={item.nome}
                      label={item.value}
                      color="red"
                      status={item.checked ? "checked" : "unchecked"}
                      disabled={state.celulaSelect.includes(item.nome)}
                      onPress={() => {
                        memberMultiply(item);
                      }}
                    />
                  );
                })}
          </S.Grid>
          <ButtonComponent title="Multiplicar" onPress={() => { }} width="100%" />
        </S.Content>
      </ScrollView>
    </>
  )
}
