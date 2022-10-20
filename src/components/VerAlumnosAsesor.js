import React, {useState, useEffect, useId} from 'react'
import { Link } from 'react-router-dom'
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Indexh } from './Indexh'
import {ref, query, equalTo, orderByChild} from 'firebase/database'

const MySwal = withReactContent(Swal)


const VerAlumnosAsesor = () => {


    const [mostrar, setMostrar] = useState([])
    const userCollection = collection(db, "usuario")
    userCollection.orderByChild('rol').equalTo(useId).once("Practicante")

    const getUser = async() => {
        const data = await getDocs(userCollection)
        //console.log(data.docs);

        setMostrar(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
       // console.log(mostrar)
    }

   
    useEffect(() => {
        getUser()
    }, [])

  return (
    <div>
    <Indexh/>
    <div className='container1'>
        <div className='row'>
            <div className='col'>
                <h3 class="text-center">Alumnos registrados para realizar Practicas Profesionales</h3> <br/>
                <table class="table">
                    <thead>
                        <tr> 
                            <th>Nombre</th>
                            <th>Apellido paterno</th>
                            <th>Apellido Materno</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mostrar.map((mostrr) => (
                            <tr key={mostrr.id}>
                                    <td>{mostrr.nombre}</td>
                                    <td>{mostrr.app}</td>
                                    <td>{mostrr.apm}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    </div>
    </div>
  )
}

export default VerAlumnosAsesor