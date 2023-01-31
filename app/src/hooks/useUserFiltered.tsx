import { useContext } from "react";

import { FilteredContext } from "../contexts/Filtered";

export default function useUserFiltered() {
  const { loading, user, updateUsers, setUpdateUsers } = useContext(FilteredContext);

  return { loading, user, updateUsers, setUpdateUsers };
}
