import React, { Component } from 'react'
import fire from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'
import IndexAsesor from './IndexAsesor';
import facultad from './img/iti.jpg'
import archivo from './img/archivo.jpg'
import veractividades from './img/veractividades.png'
import usuario from './img/usuario.jpg'

const AsesorHome = () => {
    const cerrarSesion = () => {
      firebase.auth().signOut();
    };
  
    return (
<div>
    <IndexAsesor/>
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
  <h3 class="text-center"> Bienvenido Asesor </h3>
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
    <a href="/asesorHome"> 
    <h3 class="card-title">Asignar actividades</h3>
    <img src={archivo} width="30%" alt="..."/>
    </a>
    </div>
    <div class="card-body">
    <a href="/asesorHome"> 
    <h3 class="card-title">Ver actividades</h3>
    <img src={veractividades} width="30%" alt="..."/>
    </a>
    </div>
    <div class="card-body">
    <a href="/asesorHome"> 
    <h3 class="card-title">Ver practicantes</h3>
    <img src={usuario} width="30%" alt="..."/>
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
  
  export default AsesorHome;