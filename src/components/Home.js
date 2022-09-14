import React, { Component } from 'react'
import fire from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'

const Home = () => {
    const cerrarSesion = () => {
      firebase.auth().signOut();
    };
  
    return (
      <div>
        <h1>Bienvenido, sesión iniciada, wapetón.</h1>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
      </div>
    );
  };
  
  export default Home;