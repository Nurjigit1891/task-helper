// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDD8j-hjtAI3yp1jitxBzggctg4hDzWC80",
  authDomain: "task-univer.firebaseapp.com",
  projectId: "task-univer",
  storageBucket: "task-univer.appspot.com",
  messagingSenderId: "722029618211",
  appId: "1:722029618211:web:e5a6fe1f02e31a56e67d96",
  measurementId: "G-YS334GJ431"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)