import React, { Component } from 'react'
import fire from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'
import { Indexh } from './Indexh'
import AlumnoHome from './AlumnoHome';
import AsesorHome from './AsesorHome';
import facultad from './img/iti.jpg'
import archivo from './img/archivo.jpg'
import veractividades from './img/veractividades.png'
import usuario from './img/usuario.jpg'

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

      <p></p>
        <center><img src={facultad} width="100%" alt="..."/></center>

        <div>
        <div class="card">
          <div className="actividades" class="card-body">
            <section className='actividades'>
              <div class="card-body">
                <a href="/crear"> 
                  <h3 class="card-title">Crear usuario<p></p>
                  <i class="bi bi-person-plus" id ="index"></i></h3>
                </a>
              </div>
              <div class="card-body">
                <a href="/show"> 
                  <h3 class="card-title">Ver usuarios<p></p>
                  <i class="bi bi-person-vcard" id ="index"></i></h3>
                </a>
              </div>
            </section>
          </div>
        </div>
     </div>
      </div>
      </div>
    );
  };
  
  export default AdmiHome;