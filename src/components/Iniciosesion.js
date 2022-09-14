import React, {Component} from 'react'
import { db } from '../firebaseConfig/firebase'
import firebase from 'firebase/compat/app'

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

<form >
        <label htmlFor="email"> Correo </label>
        <input type="email" id="email"
        ref={this.usuario} />
        <label htmlFor="password"> Contraseña </label>
        <input type="password" id="password" 
        ref={this.password}/>
      <button type="submit" onClick={this.login}>Iniciar sesion
      </button>
</form>
</div>
  );
}
}
