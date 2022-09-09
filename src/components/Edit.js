import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { async } from '@firebase/util'

export const Edit = () => {
    const [nombre, setNombre] = useState('')
    const [app, setApp] = useState ('')
    const [apm, setApm] = useState ('')
    const [nombreusuario, setNombreUsuario] = useState ('')
    const [contrasenia, setContrasenia] = useState ('')
    
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const usuarion = doc(db, "usuario", id)
        const data = {nombre: nombre, app: app, apm: apm, nombreusuario: nombreusuario, contrasenia: contrasenia}
        await updateDoc(usuarion, data)
        navigate('/')
    }

    const getUserid = async (id) => {
        const usuarion = await getDoc(doc(db, "usuario", id))
        if(usuarion.exists()){
            console.log(usuarion.data)
            setNombre(usuarion.data().nombre)
            setApp(usuarion.data().app)
            setApm(usuarion.data().apm)
            setNombreUsuario(usuarion.data().nombreusuario)
            setContrasenia(usuarion.data().contrasenia)
        }else{
            console.log('No existe el usuario')
        }
    }

    useEffect( () => {
        getUserid(id)
    }, [])

  return (
    <div className='container'>
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
                <button type="submit" className='btn btn-primary'>Editar</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default Edit