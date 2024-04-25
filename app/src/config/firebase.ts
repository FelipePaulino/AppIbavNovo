import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { API_ENDPOINT } from "../config/base";

const firebaseConfig2 = {
  apiKey: "AIzaSyDtmBnzDYs3MPshWh65eH-8XuUue2Mtk7Y",
  authDomain: "app-ibav-f06f4.firebaseapp.com",
  databaseURL: API_ENDPOINT,
  projectId: "app-ibav-f06f4",
  storageBucket: "app-ibav-f06f4.appspot.com",
  messagingSenderId: "924421424445",
  appId: "1:924421424445:web:2079d39c0e428380dd3154",
};

export const firebaseConfig = {
  apiKey: "AIzaSyDtmBnzDYs3MPshWh65eH-8XuUue2Mtk7Y",
  authDomain: "app-ibav-f06f4.firebaseapp.com",
  databaseURL: API_ENDPOINT,
  projectId: "app-ibav-f06f4",
  storageBucket: "app-ibav-f06f4.appspot.com",
  messagingSenderId: "924421424445",
  appId: "1:924421424445:web:2079d39c0e428380dd3154",
};

export const app = initializeApp(firebaseConfig2);

export const storage = getStorage(app);
