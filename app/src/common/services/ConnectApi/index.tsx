import axios from "axios";
import { API_ENDPOINT } from "../../../config/api";
export const connectApi = axios.create({
  baseURL: API_ENDPOINT,
});
