import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFetch } from "../../hooks/useFetch";
import { GetStorage } from "../../common/constants/storage";

import { IContextProps, IProviderProps } from "./types";
import { useAuth } from "../../hooks/useAuth";

export const FilteredContext = createContext<IContextProps>(
  {} as IContextProps
);

export const FilteredProvider = ({ children }: IProviderProps) => {
  const [user, setUser] = useState(null);
  const [updateUsers, setUpdateUsers] = useState(false)

  const { data: listUsers, isFetching: loading } = useFetch("/users.json", undefined, updateUsers);
  const { user: userAuth } = useAuth();

  useEffect(() => {
    const emailAuth = userAuth && userAuth?.email;
    const filterUser =
      listUsers &&
      listUsers.filter((item: any) => {
        return item[1].email?.trim() === emailAuth;
      });

    if (filterUser && filterUser.length !== 0) {
      setUser(filterUser);
      AsyncStorage.setItem(
        GetStorage.USER_FILTERED,
        JSON.stringify(filterUser)
      );
    }
  }, [listUsers, loading, userAuth]);
  return (
    <FilteredContext.Provider value={{ user, loading, updateUsers, setUpdateUsers }}>
      {children}
    </FilteredContext.Provider>
  );
};
