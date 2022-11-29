import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import db from  '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Indexh } from './Indexh'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

const auth = getAuth(db);


    const Create = () => {
        const firestore = getFirestore(db);


        async function registrar(nombre, app, apm, email, contrasenia, rol){
    
            const infousuario = await createUserWithEmailAndPassword(
                auth, email, contrasenia).then((usuarioFirebase)=>{
                return usuarioFirebase;
            });
            console.log(infousuario.user.uid);
    
    
           const docRef = doc(firestore, `usuario/${infousuario.user.uid}`)
           setDoc(docRef, {nombre: nombre, app: app, apm: apm, email: email, conntrasenia: contrasenia, rol: rol, });
        }


    function store (e) {
        e.preventDefault();

        const nombre = e.target.elements.nombre.value;
        const app = e.target.elements.app.value;
        const apm = e.target.elements.apm.value;
        const email = e.target.elements.email.value;
        const contrasenia = e.target.elements.contrasenia.value;
        const rol = e.target.elements.rol.value;

        console.log("submit", nombre, app, apm, email, rol);

        registrar(nombre, app, apm, email, contrasenia, rol);

    }
    

  return (
    <div>
        <Indexh/>
    <div className='container1'>
        <div className='row'>
            <div className='col'>
                <h3 class="text-center"> Agregar nuevo usuario</h3>
                <br></br>
                <form onSubmit={store} class="row g-3">
                    <div className='col-8'>
                    <label className='form-label'>Nombre</label>
                    <input 
                    id = "nombre"
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='col-md-5'>
                    <label className='form-label'>Apellido paterno</label>
                    <input 
                    id = "app"
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='col-md-6'>
                    <label className='form-label'>Apellido materno</label>
                    <input 
                    id = "apm"
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='col-md-5'>
                    <label className='form-label'>Email</label>
                    <input 
                    id = "email"
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='col-md-6'>
                    <label className='form-label'>Contraseña</label>
                    <input 
                    id = "contrasenia"
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='col-3'>
                    <label className='form-label'>Tipo de usuario</label>
                    <select className='form-control' id = "rol">
                        <option id="rol">Asesor</option>
                        <option id="rol">Practicante</option>
                        </select> 
                    </div>
                    <div className='col-11'>  
                    <button type="submit" className='btn btn-primary'>Agregar</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>


    </div>
  )
}

export default Create