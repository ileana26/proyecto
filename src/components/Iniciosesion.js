import React, {Component} from 'react'
import { db } from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'
import imagen from './img/iniciosesion.jpg'

import './App.css'

export default class Iniciosesion extends Component {

  usuario = React.createRef();
  password = React.createRef();

  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  login(e){
    e.preventDefault();
    var miusuario = this.usuario.current.value;
    var mipassword = this.password.current.value;

  firebase
  .auth()
  .signInWithEmailAndPassword(miusuario, mipassword)
  .then(u => {})
  .catch(function(error){
    console.log(error);
  });
}

signup(e){
  e.preventDefault();
    var miusuario = this.usuario.current.value;
    var mipassword = this.password.current.value;

    db
  .auth()
  .createUserWithEmailAndPassword(miusuario, mipassword)
  .then(u => {})
  .catch(function(error){
    console.log(error);
  });

}

  render () {
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
  <form >
  <div class="mb-3">
        <label htmlFor="email" class="form-label"> Correo electronico:</label> <br/>
        <input type="email" id="email"
        ref={this.usuario} class="form-control" aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">  
        <label htmlFor="password" class="form-label"> Contraseña </label> <br/>
        <input type="password" id="password" 
        ref={this.password} class="form-control" /> <br/>
      <button type="submit" onClick={this.login} class="btn btn-primary">Iniciar sesion
      </button>
    </div>
</form>
  </div>
</div>
</div> </div>
</div>
  );
}
}
