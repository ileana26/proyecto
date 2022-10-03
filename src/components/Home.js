import React, { Component } from 'react'
import fire from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'
import { Indexh } from './Indexh'
import AlumnoHome from './AlumnoHome';
import AsesorHome from './AsesorHome';
import AdmiHome from './AdmiHome';

function Home ({usuario}) {
    const cerrarSesion = () => {
      firebase.auth().signOut();
    };
  
    return (
<div>
   
  {usuario.rol == "Administrador" ?  <AdmiHome/> : <AlumnoHome/> }
  </div>

    );
  };
  
  export default Home;