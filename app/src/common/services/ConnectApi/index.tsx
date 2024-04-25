import axios from "axios";
import { API_ENDPOINT } from "../../../config/base";
export const connectApi = axios.create({
  baseURL: API_ENDPOINT,
});
