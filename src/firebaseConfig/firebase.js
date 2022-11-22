// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from 'firebase/auth'; 


const firebaseConfig = {
  apiKey: "AIzaSyD_W94nXXPnrmngAgx8nhWxcrDwAQ7dZsI",
  authDomain: "proyectopp-adfa2.firebaseapp.com",
  projectId: "proyectopp-adfa2",
  storageBucket: "proyectopp-adfa2.appspot.com",
  messagingSenderId: "170852325619",
  appId: "1:170852325619:web:39f9a56d1363643b3aff86"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const fire1 = initializeApp(firebaseConfig);
export default fire;
export const db = getFirestore(fire);
export const storage = getStorage(fire1);