import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

export const firebaseConfig = {
    "projectId": "practicasdb-c3083",
    "storageBucket": "practicasdb-c3083.appspot.com",
    "apiKey": "AIzaSyCIhmoAmpBTeLMoOg97EShVqNKtPb8z9Ps",
    "authDomain": "practicasdb-c3083.firebaseapp.com"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  export const db = getFirestore();
  export const auth = getAuth(firebaseApp);
  
  // Si descomentas la siguiente línea, cuando mientras que el usuario no se desloguee expresamente o cierre el navegador, permanecerá logueado y podremos acceder a su id desde cualquier página
  setPersistence(auth, browserLocalPersistence);