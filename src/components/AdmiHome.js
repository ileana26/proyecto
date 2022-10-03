import React, { Component } from 'react'
import fire from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'
import { Indexh } from './Indexh'
import AlumnoHome from './AlumnoHome';
import AsesorHome from './AsesorHome';

function AdmiHome ({usuario}) {
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
    <form class="d-flex" role="search">
    <button onClick={cerrarSesion} className="btncerrar" class="btn btn-outline-danger text-center">Cerrar Sesión</button>
    </form>
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