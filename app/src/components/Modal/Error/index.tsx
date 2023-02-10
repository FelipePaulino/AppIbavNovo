import React, { useEffect } from "react";

import { useFormReport } from "../../../hooks/useFormReport";
import { IModalInfosProps } from "./types";

import * as S from "./styles";

export function ErrorModalComponent({
  text,
}: IModalInfosProps) {

  return (
    <S.ContentModal>
        <S.Description>
          {text}
        </S.Description>
      <S.Error name="error" />
    </S.ContentModal>
  );
}
