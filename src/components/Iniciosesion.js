import React, {Component} from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {Link} from "react-router-dom";
import  db  from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'
import imagen from './img/iniciosesion.jpg'

import './App.css'

const auth = getAuth(db);
var Error = "";

function Iniciosesion() {

   function iniciarSesion( email, password){
      return signInWithEmailAndPassword(auth, email, password)
      
    }

  function onSubmit() {

      const db = getFirestore();
      const user = auth.currentUser;
      console.log("uiddd" + user.uid);

      if (user !== null) {

          const docRef = doc(db, "usuario", user.uid);

          getDoc(docRef).then((doc) => {
              console.log(doc.data(), doc.data().correo, doc.data().rol);
              const roldata = doc.data().rol;
              if (roldata === "Administrador") {
                 window.location.href = "/AdmiHome";
              } else if (roldata === "Practicante") {
                  window.location.href="/AlumnoHome";
              } else if (roldata === "Asesor") {
                  window.location.href = "/AsesorHome";
              } else {
          
                  
              }
          })
      }
  }

  async function submitHandler(e) {
      e.preventDefault();

      const email = e.target.elements.email.value;
      const pass = e.target.elements.password.value;
      console.log("submit", email, pass);

      await iniciarSesion(email, pass).then(() => {
          onSubmit()
      }).catch(error => {
          console.log("entramos al catch, error: ", error)
          switch (error.code) {
              case 'auth/invalid-email':
                  console.log();
                  Error = "Email invalido";
                 
                  break;

              case 'auth/user-disabled':
                  console.log("Este usuario ha sido desabilitado");
                  Error = "Este usuario ha sido desabilitado";
                 
                  break;

              case 'auth/user-not-found':
                  console.log("Usuario no encontrado");
                  Error = "Usuario no encontrado";
                
                  break;

              case 'auth/wrong-password':
                  console.log("Contraseña incorrecta");
               
                  break;

              default:
                  
                  break;
          }
      })

  }

    return (
    <div>
<div className='container'>
  <div class="col-sm-6">
<div class="card text-center" >
  <div class="card-header">
  <img className='inicio' src={imagen}/>
    <p className='titulo1'>Inicio de Sesión </p>
  </div>
  <div class="card-body">
  <form className="formulario" onSubmit={submitHandler} >
  <div class="mb-3">
        <label htmlFor="email" class="form-label"> Correo electronico:</label> <br/>
        <input type="email" id="email" name="email" class="form-control" aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">  
        <label htmlFor="password" class="form-label"> Contraseña </label> <br/>
        <input type="password" id="password" class="form-control" /> <br/>
        <input type="submit" className="fadeIn fourth" value="Entrar" />
    </div>
</form>
  </div>
</div>
</div> </div>
</div>
  );

}
export default Iniciosesion
