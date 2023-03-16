import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MenuNavigation from "../../common/constants/navigation";

import { IDataProps } from "./types";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { useFormReport } from "../../hooks/useFormReport";
import { Navigation } from "./styles";

export function NavigationComponent({ data, members, visitors, office }: IDataProps) {
  const navigation = useNavigation<IPropsAppStack>();

  const { state } = useFormReport();
  const disableNavegation = state.celulaSelect === 'Selecione' 
const isLider = office?.cargo === 'lider de celula' ? false : disableNavegation

  return (
    <Fragment>
      {data && (
        <Fragment>
          <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
            <Navigation
              style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
            >
              {MenuNavigation.DATA}
            </Navigation>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MembersReport")}
            disabled={isLider}>
            <Navigation disabled={isLider}>{MenuNavigation.MEMBERS}</Navigation>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("VisitorsReport")}
            disabled={isLider}>
            <Navigation disabled={isLider}>{MenuNavigation.VISITORS}</Navigation>
          </TouchableOpacity>
        </Fragment>
      )}

      {members && (
        <Fragment>
          <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
            <Navigation>{MenuNavigation.DATA}</Navigation>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("MembersReport")}
          >
            <Navigation
              style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
            >
              {MenuNavigation.MEMBERS}
            </Navigation>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("VisitorsReport")}
          >
            <Navigation>{MenuNavigation.VISITORS}</Navigation>
          </TouchableOpacity>
        </Fragment>
      )}

      {visitors && (
        <Fragment>
          <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
            <Navigation>{MenuNavigation.DATA}</Navigation>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("MembersReport")}
          >
            <Navigation>{MenuNavigation.MEMBERS}</Navigation>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("VisitorsReport")}
          >
            <Navigation
              style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
            >
              {MenuNavigation.VISITORS}
            </Navigation>
          </TouchableOpacity>
        </Fragment>
      )}
    </Fragment>
  );
}
