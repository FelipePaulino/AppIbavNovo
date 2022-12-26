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
  disabled,
  ...rest
}: IContentInputProps) {
  return (
    <Fragment>
      {label && <S.Label>{label}</S.Label>}
      <S.Field primary={primary} disabled={disabled}>
        <S.Input primary={primary} placeholderTextColor={placeholderTextColor} value={value} {...rest} onFocus={() => true} disabled={disabled} />

        {icon && (
          <Feather onPress={showPass} name={icon} size={24} color="#fff" />
        )}
      </S.Field>
    </Fragment>
  );
}
