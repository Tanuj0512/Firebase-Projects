
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzPaLpcMmtmzu1UwXSGiVULtjqnTaNhGE",
  authDomain: "fir-project-19f51.firebaseapp.com",
  projectId: "fir-project-19f51",
  storageBucket: "fir-project-19f51.appspot.com",
  messagingSenderId: "1023202737149",
  appId: "1:1023202737149:web:c495b5eff0f666c8db3794",
  measurementId: "G-H8F9ET5XY9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage =getStorage(app);