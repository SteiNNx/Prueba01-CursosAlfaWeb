import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBdOghGVqFXiIoIswHpViQEX1liOQf-ovg",
  authDomain: "pruebafirebasevuedesafiolatam.firebaseapp.com",
  projectId: "pruebafirebasevuedesafiolatam",
  storageBucket: "pruebafirebasevuedesafiolatam.appspot.com",
  messagingSenderId: "453686211538",
  appId: "1:453686211538:web:92aa2181e5b095ae28ce0b"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
