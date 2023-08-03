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
import { ModalComponent } from "../../components/Modal";
import { DefaultContentModalComponent } from "../../components/Modal/Default";
import { useNavigation } from "@react-navigation/native";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { InputFieldComponent } from "../../components/InputField";
import { comparedDisc, comparedNames, comparedValues } from "../../common/utils/order";

export function MultiplicationRede() {

        const [celulas, setCelulas] = useState<any>([]);
        const [users, setUsers] = useState<any>([]);
        const [listMembersCelula, setListMembersCelula] = useState<any>([]);
      
        const { state, dispatch } = useFormReport();
        const { user, loading } = useUserFiltered();
        const [successModal, setSuccessModal] = useState(false);
        const navigation = useNavigation<IPropsAppStack>();
        const [novaRede, setNovaRede] = useState<string>()
      
        const [arrayEnvio, setArrayEnvio] = useState<any>()
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
      
            const getUsers = async () => {
              const response = await connectApi.get("/users.json");
              setUsers(Object.values(response.data));
            };
            getUsers();
         
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
      
        const handlePastorNovoChange = (value: string) => {
          dispatch({
            type: FormReportActions.setCelulaSelect,
            payload: value,
          });
        };
      
      
      
        // tratativas para o usuário administrador
        const redes = celulas && celulas.map((item: any) => item?.rede);
        const redesUnicas = redes.filter(function (este: any, i: any) {
          return redes.indexOf(este) === i && este;
        });
      
        const mapRedesUnicas = redesUnicas.map((item: any) => {
          return {
            value: item,
          };
        });
      
        const filterRedes = celulas.filter((item: any) => {
          return item?.rede === state.redeSelect;
        });
      
        const discipulado = filterRedes.map((item: any) => item?.discipulador);
      
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
            item?.discipulador === state.discipuladoSelect &&
            item?.rede === state.redeSelect
          );
        });
      
        const celulaAdm = filtrandoDiscipulado.map((item: any) => {
          return {
            value: `${item.numero_celula} - ${item.lider}`,
          };
        });
      
        const arrayLideres = listMembersCelula.length > 0 ? listMembersCelula  : Object.values(filterRedes)
      
        const memberMultiply = (member: any) => {
        const verifyDisc = listMembersCelula.length > 0 ? listMembersCelula : filterRedes
          const newMember = { ...member, checked: !member?.checked };
          const transformClick = verifyDisc.filter(
            (item: any) => {
              return item.discipulador !== member.discipulador;
            }
          );

          setListMembersCelula([...transformClick, newMember]);
        };
      
        const RedeNaoSelecionados = celulas.filter((item: any) => {

          return item?.rede !== state.redeSelect
        })
      
        const RedeAntiga = arrayLideres.filter((item: any) => {
          return !item.checked && item.discipulador !== state.celulaSelect
        })
      
        const discipuladoNovo = arrayLideres.filter((item: any) => {
          return item.checked || item.discipulador === state.celulaSelect
        })

        const mudandoDisc = discipuladoNovo.map((item: any) => {
          return { ...item, rede: novaRede, pastor: state.celulaSelect}
        })


      
        useEffect(() => {
          if (listMembersCelula) {
            const noChecked = mudandoDisc.map((item:any) => {
            return { ...item, checked: false}
            })
            const arrayParaEnviar: any = [...RedeNaoSelecionados, ...RedeAntiga, ...noChecked]
            setArrayEnvio(arrayParaEnviar)
          }
        }, [state.redeSelect, listMembersCelula, novaRede, state.celulaSelect]);
      
        const MultiplyRede = () => {
          const filtrandoUser = users.filter((item:any) =>{
            return item.nome === state.celulaSelect
          })
     
          const changeCargo = {...filtrandoUser[0], cargo:'pastor', pastor:filtrandoUser[0].nome, rede: novaRede}

          const RedeNaoSelecionados = users.filter((item: any) => {
            return item?.rede !== state.redeSelect
          })
          const checkedDiscs = arrayLideres.filter((item: any) => {
            return item.checked
          })

          const nomesDiscs = checkedDiscs.map((item: any) => item.discipulador)

          const RedeAntiga = users.filter((item: any) => {
            return !nomesDiscs.includes(item.discipulador) && item.nome !== state.celulaSelect && item.discipulador !== state.celulaSelect 
          })

          const discMudandoPastor = RedeAntiga.map((item: any) => {
            if(nomesDiscs.includes(item.nome) ){
                return { ...item, rede: novaRede, pastor: state.celulaSelect}
            }
          })

          const discNaoMudandoPastor = RedeAntiga.map((item: any) => {
            if(!nomesDiscs.includes(item.nome) ){
                return item
            }
          })

          const discValidos = discMudandoPastor.filter((item:any) => item)
          const discValidosRedeAntiga = discNaoMudandoPastor.filter((item:any) => item)


          const discipuladoNovo = users.filter((item: any) => {
            return nomesDiscs.includes(item.discipulador) || item.discipulador === state.celulaSelect
          })

          const mudandoDisc = discipuladoNovo.map((item: any) => {
            return { ...item, rede: novaRede, pastor: state.celulaSelect}
          })

          const arrayUserEnvio = [changeCargo, ...discValidos, ...discValidosRedeAntiga, ...mudandoDisc]

          try {
            connectApi.put(`/celulas.json`, {
              ...arrayEnvio,
            })
      
            try {
              connectApi.put(`/users.json`, {
                ...arrayUserEnvio,
              })

             setSuccessModal(true)
            } catch (err) {
              alert('Erro ao editar a Usuário')
            }
          } catch (err) {
            alert('Erro ao editar a celula')
          }
        }
      
        function compared(a: any, b: any) {
          if (a.discipulador < b.discipulador) return -1;
          if (a.discipulador > b.discipulador) return 1;
          return 0;
        }
      
        const validFormWithMembers = state.redeSelect !== 'Selecione' && novaRede && state.celulaSelect !== 'Selecione'
      



        const unicoDiscipulador = arrayLideres.filter(function (a) {
            return !this[JSON.stringify(a.discipulador)] && (this[JSON.stringify(a.discipulador)] = true);
            }, Object.create(null))

        return (
          <>
            <HeaderComponent>
              <S.ComeBack>
                <ComeBackComponent />
                <S.TitlePage>{MenuNavigation.MULTIPLICATION_REDE}</S.TitlePage>
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
                      dataOptions={mapRedesUnicas?.sort(comparedValues)}
                      selectedOption={handleRedeChange}
                      width="300"
                    />
                  </S.ContentC>
                </S.Grid>
                {/* <S.Grid>
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
                </S.Grid> */}
           <S.Grid>
              <TitleComponent title={`Rede nova*:`} small primary />
              <InputFieldComponent
                primary
                value={novaRede}
                placeholder=""
              onChangeText={(value) => setNovaRede(value)}

              />
            </S.Grid>
                <S.Grid>
                  <TitleComponent title={`Novo Pastor:`} small primary />
                  <S.ContentC>
                    <S.IconC name="user-friends" />
                    <SelectComponent
                      onChange={handlePastorNovoChange}
                      labelSelect={state.celulaSelect}
                      dataOptions={state.redeSelect && mapDiscipuladosUnicos?.sort(comparedValues)}
                      selectedOption={handlePastorNovoChange}
                      width="300"
                      disabled={state.redeSelect === "Selecione" ? true : false}
                    />
                  </S.ContentC>
                </S.Grid>
                <TitleComponent title={`DISCIPULADOS:`} small primary uppercase weight />
                <S.labelParagraph>
                  <S.Paragraph>
                    Selecione os discipulados que vão para a nova rede
                  </S.Paragraph>
                </S.labelParagraph>

                <S.Grid>
                  {state.redeSelect && unicoDiscipulador?.sort(comparedDisc).map((item: any) => {
                    if(item){
                    return (
                      <Checkbox.Item
                        key={item.nome}
                        label={item.discipulador}
                        color="red"
                        status={item.checked || state.celulaSelect !== 'Selecione' && item.discipulador === state.celulaSelect ? "checked" : "unchecked"}
                        disabled={item.lider === state.discipuladoSelect || state.celulaSelect !== 'Selecione' && item.discipulador === state.celulaSelect}
                        onPress={() => {
                          memberMultiply(item);
                        }}
                      />
                    );
                    }
                  })}
                </S.Grid>
      
      
                <ButtonComponent title="Multiplicar" onPress={() => { MultiplyRede() }} width="100%" disabled={!validFormWithMembers} />
              </S.Content>
            </ScrollView>
            <ModalComponent
              isVisible={successModal}
              onBackdropPress={() => {
                setSuccessModal(false);
                navigation.navigate("Multiplication");
              }
              }
            >
              <DefaultContentModalComponent
                type="multiplicationRede"
              />
            </ModalComponent>
          </>
        )
    
}