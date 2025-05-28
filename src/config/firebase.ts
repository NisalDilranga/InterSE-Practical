import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDBHQm2LyApsmfFWBvoJVZ222saUXL9V_E",
  authDomain: "order-management-c16e0.firebaseapp.com",
  projectId: "order-management-c16e0",
  storageBucket: "order-management-c16e0.firebasestorage.app",
  messagingSenderId: "1078138721722",
  appId: "1:1078138721722:web:728f9ac2fd1a41bf71b983",
  measurementId: "G-2NV4SRCTSD"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
