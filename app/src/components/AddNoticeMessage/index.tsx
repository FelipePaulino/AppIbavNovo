import React from "react";
import { HeaderComponent } from "../Header";
import { ComeBackComponent } from "../ComeBack";
import { LogoComponent } from "../Logo";
import * as S from "./styles";

export function AddNoticeMessage() {
  return (
    <>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>
      </HeaderComponent>
    </>
  );
}
