import axios from "axios";
import { API_ENDPOINT } from "../../../config/apiConfig";
export const connectApi = axios.create({
  baseURL: API_ENDPOINT,
});
