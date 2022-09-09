// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD_W94nXXPnrmngAgx8nhWxcrDwAQ7dZsI",
  authDomain: "proyectopp-adfa2.firebaseapp.com",
  projectId: "proyectopp-adfa2",
  storageBucket: "proyectopp-adfa2.appspot.com",
  messagingSenderId: "170852325619",
  appId: "1:170852325619:web:39f9a56d1363643b3aff86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
export const db = getFirestore(app);