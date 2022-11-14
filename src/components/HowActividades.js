import IndexAsesor from './IndexAsesor';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const ShowActividades = () => {

    const [mostrar, setMostrar] = useState([])
    const userCollection = collection(db, "actividad")

    const getUser = async() => {
        const data = await getDocs(userCollection)
        //console.log(data.docs);

        setMostrar(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
       // console.log(mostrar)
    }

    const deleteU = async (id) => {
        const userDoc = doc(db, "actividad", id)
        await deleteDoc(userDoc)
        getUser()

    }

    //alerta de eliminacion
    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteU(id)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    useEffect(() => {
        getUser()
    }, [])

  return (
    <div>
        <IndexAsesor/>
        <div className='container1'>
        <div className='row'>
            <div className='col'>
                <h3 class="text-center"> Actividades </h3> <br/>
                <table class="table">
                    <thead>
                        <tr> 
                            <th>Actividad</th>
                            <th>Descripción</th>
                            <th>Fecha de inicio</th>
                            <th>Fecha de termino</th>
                            <th>Estado</th>
                            <th>Accion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mostrar.map((mostrr) => (
                            <tr key={mostrr.id}>
                                    <td>{mostrr.nombreActi}</td>
                                    <td>{mostrr.descripcion}</td>
                                    <td>{mostrr.fechainicio}</td>
                                    <td>{mostrr.fechafinal}</td>
                                    <td>{mostrr.estado}</td>
                                    <td>
                                        <Link to={`/editarActividad/${mostrr.id}`} className="btn btn-light">Editar</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => {confirmDelete(mostrr.id)}} className="btn btn-danger"> Borrar </button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div >
                    <Link to="/crear" className='btn btn-success mt-2 mb-2'> Create</Link>
                </div>
            </div>

        </div>
    </div>
    </div>
  )
}

export default ShowActividades