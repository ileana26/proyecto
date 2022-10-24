import React, {Component, useEffect, useState} from "react";
import "firebase/auth";
import firebase from 'firebase/compat/app'
import Show from "./components/Show";
import Create from "./components/Create"
import  Edit from "./components/Edit";
import Iniciosesion from './components/Iniciosesion'
import AlumnoHome from "./components/AlumnoHome";
import AsesorHome from "./components/AsesorHome";
import db  from './firebaseConfig/firebase'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import VerAlumnosAsesor from "./components/VerAlumnosAsesor";
import AdmiHome from "./components/AdmiHome";

const auth = getAuth(db);
const firestore = getFirestore(db);

function App() {
 
  const [usuario, setUsuario] = React.useState(null);


  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUsuario(userData);
      console.log("userData fianl", userData);
    });
  }

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuario/${uid}`);
    const docu = await getDoc(docuRef);
    const infoFinal = docu.data().rol;
    return infoFinal;
  }
  
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!usuario) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUsuario(null);
    }
  });
 

  return <>
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<Iniciosesion/>}> </Route>
          </Routes>
          <Routes>
          <Route path='/crear' element={<Create/>}> </Route>
          </Routes>
          <Routes>
          <Route path='/edit/:id' element={<Edit/>}> </Route>
          </Routes>
          <Routes>
          <Route path='/show' element={<Show/>}> </Route>
          </Routes>
          <Routes>
          <Route path='/alumnoHome' element={<AlumnoHome/>}> </Route>
          </Routes>
          <Routes>
          <Route path='/asesorHome' element={<AsesorHome/>}> </Route>
          </Routes>
          <Routes>
          <Route path='/alumnosAsesor' element={<VerAlumnosAsesor/>}> </Route>
          </Routes>
          <Routes>
          <Route path='/admiHome' element={<AdmiHome/>}> </Route>
          </Routes>
          
        </BrowserRouter>
        </>;
}

export default App;