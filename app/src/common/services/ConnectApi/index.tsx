import axios from "axios";
const API_ENDPOINT =
  "https://app-ibav-f06f4-default-rtdb.firebaseio.com";

export const connectApi = axios.create({
  baseURL: API_ENDPOINT,
});
