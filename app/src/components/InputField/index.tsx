import React, { Fragment } from "react";
import { Feather } from "@expo/vector-icons";

import { IContentInputProps } from "./types";

import * as S from "./styles";

export function InputFieldComponent({
  icon,
  value,
  placeholderTextColor,
  primary,
  label,
  showPass,
  ...rest
}: IContentInputProps) {
  return (
    <Fragment>
      {label && <S.Label>{label}</S.Label>}
      <S.Field primary={primary}>
        <S.Input primary={primary} placeholderTextColor={placeholderTextColor} value={value} {...rest} onFocus={() => true} />

        {icon && (
          <Feather onPress={showPass} name={icon} size={24} color="#fff" />
        )}
      </S.Field>
    </Fragment>
  );
}
