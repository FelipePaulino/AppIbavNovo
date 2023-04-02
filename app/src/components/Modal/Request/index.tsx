import { Alert, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { RequestModalProps } from "./types";

import * as S from "./styles";
import { ButtonComponent } from "../../Button";

export function RequestContentModalComponent({
  name,
  cancel,
  confirm,
  type
}: RequestModalProps) {
  return (
    <S.Container>
      <S.Box>
        <S.ContainerText>
          <S.TextDelete>Você realmente deseja<S.BoldDeleteText> EXCLUIR</S.BoldDeleteText></S.TextDelete>
          <S.TextDelete>o {type} de</S.TextDelete>
          <S.BoldTextBlue>{name}?</S.BoldTextBlue>
          <S.TextDelete>essa ação não tem volta.</S.TextDelete>
        </S.ContainerText>
        <S.ContainerButton>
            
          <ButtonComponent title="CANCELAR" onPress={cancel} width='105' heigth='33' size='12'/>
          <ButtonComponent title="CONFIRMAR" onPress={confirm} width='105' heigth='33' size='12'/>
        </S.ContainerButton>
      </S.Box>
    </S.Container>
  );
}