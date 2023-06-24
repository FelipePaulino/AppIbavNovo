import axios from "axios";
//HOMOLOGAÇÃO
const api = 'https://app-homologacao-a6b59-default-rtdb.firebaseio.com'
//const apiRelatorios = 'https://api-ibav-development.onrender.com'

//PROD
const apiRelatorios = 'https://api-ibav-production.onrender.com'
//const api = 'https://app-ibav-f06f4-default-rtdb.firebaseio.com'

export const connectApi = axios.create({
  baseURL: api,
});

export const connectApiRelatorios = axios.create({
  baseURL: apiRelatorios,
});
