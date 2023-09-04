import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";

import { LogoComponent } from "../../components/Logo";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";

import { useAuth } from "../../hooks/useAuth";

import * as S from "./styles";
import useUserFiltered from "../../hooks/useUserFiltered";

export function Preaching() {
  const { signOut } = useAuth();
  const { updateUsers, user, setUpdateUsers } = useUserFiltered();
  const dataUser = user && user[0] && user[0][1];
 
  const logout = () => {
    setUpdateUsers(!updateUsers);
    signOut();
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>

        <S.Buttons>
          <TouchableOpacity onPress={logout}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>

    </Fragment>
  );
}
