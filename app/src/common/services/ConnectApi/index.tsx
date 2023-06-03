import axios from "axios";
//HOMOLOGAÇÃO
// const api = 'https://app-homologacao-a6b59-default-rtdb.firebaseio.com'

//PROD
const api = 'https://app-ibav-f06f4-default-rtdb.firebaseio.com'

export const connectApi = axios.create({
  baseURL: api,
});
