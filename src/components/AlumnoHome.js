import React, { Component } from 'react'
import fire from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'
import IndexA from './IndexAlumno';
import facultad from './img/facultad.jpg'
import archivo from './img/archivo.jpg'
import veractividades from './img/veractividades.png'

const AlumnoHome = () => {
    const cerrarSesion = () => {
      firebase.auth().signOut();
    };
  
    return (
<div>
    <IndexA/>
        <div className='container2'>

        <nav class="navbar bg-light">
  <div class="container-fluid">
    <a class="navbar-brand"></a>
  </div>
</nav>

    <div class="card">
  <div class="card-body">
  <h3 class="text-center"> Bienvenido alumno </h3>
  </div>

</div>
<p></p>
<img src={facultad} width="100%" alt="..."/>

<div class="card">
  <div class="card-body">
  <p></p>  
  <h3 class="text-center"> Practicas Profesionales </h3>
  </div>

</div>
<p></p>
<div>
<div class="card">
  <div className="actividades" class="card-body">

    <section className='actividades'>
    <div class="card-body">
    <a href="/showActividadesAlumnos"> 
    <h3 class="card-title">Actividades</h3>
    <img src={archivo} width="30%" alt="..."/>
    </a>
    </div>
    <div class="card-body">
    <a href="/alumnoHome"> 
    <h3 class="card-title">Proyectos</h3>
    <img src={veractividades} width="30%" alt="..."/>
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
  
  export default AlumnoHome;