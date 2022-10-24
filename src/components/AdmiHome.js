import React, { Component } from 'react'
import fire from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'
import { Indexh } from './Indexh'
import AlumnoHome from './AlumnoHome';
import AsesorHome from './AsesorHome';

const AdmiHome = () => {
  const cerrarSesion = () => {
    firebase.auth().signOut();
  };

    return (
<div>
    <Indexh/>
        <div className='container2'>

        <nav class="navbar bg-light">
  <div class="container-fluid">
    <a class="navbar-brand"></a>
  </div>
</nav>

        <div class="card">
  <div class="card-body">
  <h3 class="text-center"> Bienvenido Administrador </h3>
  </div>
</div>
     </div>
      </div>
    );
  };
  
  export default AdmiHome;