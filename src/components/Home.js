import React, { Component } from 'react'
import fire from '../firebaseConfig/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {Link} from "react-router-dom";
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
{usuario.rol == "Practicante" ?<AlumnoHome/> : <AsesorHome/>} 
  </div>

    );
  };
  
  export default Home;