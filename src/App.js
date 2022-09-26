import React, {Component, useEffect} from "react";
import "firebase/auth";
import firebase from 'firebase/compat/app'
import Show from "./components/Show";
import Create from "./components/Create"
import  Edit from "./components/Edit";
import Home from './components/Home'
import AlumnoHome from "./components/AlumnoHome";
import Iniciosesion from './components/Iniciosesion'
import { db } from './firebaseConfig/firebase'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [usuario, setUsuario] = React.useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((usuarioFirebase) => {
      console.log("ya tienes sesión iniciada con:", usuarioFirebase);
      setUsuario(usuarioFirebase);
    });
  }, []);

  return <>
    <BrowserRouter>
  
    <Routes>
          <Route path='/' element={usuario ? <Home /> : <Iniciosesion setUsuario={setUsuario} />}> </Route>
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
        </BrowserRouter>
        </>;
}

export default App;