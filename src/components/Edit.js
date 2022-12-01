import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Indexh } from './Indexh'
import validator from 'validator';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export const Edit = () => {
    const [nombre, setNombre] = useState('')
    const [app, setApp] = useState ('')
    const [apm, setApm] = useState ('')
    const [nombreusuario, setNombreUsuario] = useState ('')
    const [conntrasenia, setContrasenia] = useState ('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const usuarion = doc(db, "usuario", id)
        const data = {nombre: nombre, app: app, apm: apm, nombreusuario: nombreusuario, conntrasenia: conntrasenia}

        Swal.fire({
            title: '¿Esta seguro de guardar los cambios?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                 updateDoc(usuarion, data)
                navigate('/show')
              Swal.fire('¡Cambios guardados!', '', 'Hecho')
            } else if (result.isDenied) {
              Swal.fire('Los cambios no se pudieron guardar', '', 'Info')
            }
          })

        
    }

    const getUserid = async (id) => {
        const usuarion = await getDoc(doc(db, "usuario", id))
        if(usuarion.exists()){
            console.log(usuarion.data)
            setNombre(usuarion.data().nombre)
            setApp(usuarion.data().app)
            setApm(usuarion.data().apm)
            setNombreUsuario(usuarion.data().nombreusuario)
            setContrasenia(usuarion.data().conntrasenia)
        }else{
            console.log('No existe el usuario')
        }
    }

    useEffect( () => {
        getUserid(id)
    }, [])

    const validate = (value) => {
  
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
          setErrorMessage('')
        } else {
          setErrorMessage('Contraseña débil')
          setContrasenia(value)
        }
      }


  return (
    <div>
    <Indexh/>
    <div className='container1'>
    <div className='row'>
        <div className='col'>
            <h3 class="text-center"> Editar usuario</h3>
            <form onSubmit={update}>
            <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input 
                    value={nombre}
                    onChange={ (e) => setNombre(e.target.value)}
                    type="text"
                    className='form-control'required/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Apellido paterno</label>
                    <input 
                    value={app}
                    onChange={ (e) => setApp(e.target.value)}
                    type="text"
                    className='form-control'required/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Apellido materno</label>
                    <input 
                    value={apm}
                    onChange={ (e) => setApm(e.target.value)}
                    type="text"
                    className='form-control'required/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'> Nombre de usuario</label>
                    <input 
                    value={nombreusuario}
                    onChange={ (e) => setNombreUsuario(e.target.value)}
                    type="text"
                    className='form-control' required/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Contrasenia</label>
                    <input 
                    value={conntrasenia}
                    onChange={(e) => validate(e.target.value)}
                    type="text"
                    className='form-control' required/>
                     <span style={{
          fontWeight: 'bold',
          color: 'red',
          fontSize: '15px'
        }}>{errorMessage}
        </span>
                    </div>
                <button type="submit" className='btn btn-primary'>Editar</button>
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default Edit