import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import db from  '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Indexh } from './Indexh'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import validator from 'validator';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const auth = getAuth(db);
const MySwal = withReactContent(Swal)


    const Create = () => {
        const firestore = getFirestore(db);

        const [emailError, setEmailError] = useState('');
        const [errorMessage, setErrorMessage] = useState('')
        const navigate = useNavigate()


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

        Swal.fire({
            title: '¿Esta seguro de agregar este usuario?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                registrar(nombre, app, apm, email, contrasenia, rol);
              Swal.fire('¡Usuario guardado!', '', 'Hecho')
              navigate('/show')
            } else if (result.isDenied) {
              Swal.fire('El usuario no se pudo guardar', '', 'Info')
            }
          })

    }
    
//correo
    const validateEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
          setEmailError('')
        } else {
          setEmailError('Correo no valido!')
        }
      }

      //contraseña
      const validate = (value) => {
  
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
          setErrorMessage('')
        } else {
          setErrorMessage('Contraseña débil')
        }
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
                    className='form-control' required/>
                    </div>

                    <div className='col-md-5'>
                    <label className='form-label'>Apellido paterno</label>
                    <input 
                    id = "app"
                    type="text"
                    className='form-control' required/>
                    </div>

                    <div className='col-md-6'>
                    <label className='form-label'>Apellido materno</label>
                    <input 
                    id = "apm"
                    type="text"
                    className='form-control' required/>
                    </div>

                    <div className='col-md-5'>
                    <label className='form-label'>Email</label>
                    <input 
                    id = "email"
                    type="text"
                    onChange={(e) => validateEmail(e)}
                    className='form-control' required/>
                     <span style={{
                        fontWeight: 'bold',
                         color: 'red',
                         fontSize: '15px'
                        }}>{emailError}</span>
                    </div>

                    <div className='col-md-6'>
                    <label className='form-label'>Contraseña</label>
                    <input 
                    id = "contrasenia"
                    type="text"
                    onChange={(e) => validate(e.target.value)}
                    className='form-control' required/>
            <span style={{
          fontWeight: 'bold',
          color: 'red',
          fontSize: '15px'
        }}>{errorMessage}
        </span>
                    </div>

                    <div className='col-3'>
                    <label className='form-label'>Tipo de usuario</label>
                    <select className='form-control' id = "rol" required>
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