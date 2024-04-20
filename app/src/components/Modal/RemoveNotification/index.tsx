import { RequestModalProps } from "./types";
import { ButtonComponent } from "../../Button";
import * as S from "./styles";

export function RemoveNotification({
  cancel,
  confirm,
}: RequestModalProps) {
  return (
    <S.Container>
      <S.Box>
        <S.ContainerText>
          <S.TextDelete>Você realmente deseja<S.BoldDeleteText> EXCLUIR</S.BoldDeleteText></S.TextDelete>
          <S.TextDelete>esse aviso ?</S.TextDelete>
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