import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from  '../firebaseConfig/firebase'
import { async } from '@firebase/util'


const Create = () => {

    const [nombre, setNombre] = useState ('')
    const [app, setApp] = useState ('')
    const [apm, setApm] = useState ('')
    const [nombreusuario, setNombreUsuario] = useState ('')
    const [contrasenia, setContrasenia] = useState ('')
    const navigate = useNavigate()

    const usuarioCollection = collection(db, "usuario")

    const store = async(e) =>{
        e.preventDefault()
        await addDoc (usuarioCollection, {nombre: nombre, app: app, apm: apm, nombreusuario: nombreusuario, contrasenia: contrasenia})
        navigate('/')
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h3 class="text-center"> Crear nuevo usuario</h3>
                <form onSubmit={store}>
                    <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input 
                    value={nombre}
                    onChange={ (e) => setNombre(e.target.value)}
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Apellido paterno</label>
                    <input 
                    value={app}
                    onChange={ (e) => setApp(e.target.value)}
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Apellido materno</label>
                    <input 
                    value={apm}
                    onChange={ (e) => setApm(e.target.value)}
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'> Nombre de usuario</label>
                    <input 
                    value={nombreusuario}
                    onChange={ (e) => setNombreUsuario(e.target.value)}
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Contrasenia</label>
                    <input 
                    value={contrasenia}
                    onChange={ (e) => setContrasenia(e.target.value)}
                    type="text"
                    className='form-control'/>
                    </div>

                    <button type="submit" className='btn btn-primary'>Agregar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create