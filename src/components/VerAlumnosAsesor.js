import React, {useState, useEffect, useContext, useId, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { collection, getDoc, onSnapshot, setDoc, serverTimestamp, query, 
    where, orderBy, limit, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IndexAsesor from './IndexAsesor';
import {ref, equalTo, orderByChild} from 'firebase/database'
import { v4 as uuidv4 } from 'uuid';
import { authContext } from '../contexts/authContext';


const MySwal = withReactContent(Swal)


const VerAlumnosAsesor = () => {
    const userCollection = collection(db, "usuario")
    const [alumnos, setAlumnos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [app, setApp] = useState('');
    const [apm, setApm] = useState('');
    const [rol, setRol] = useState('');


    useEffect(() => {
        const q = query(
            userCollection, where('rol', '==', 'Practicante') );
          const unsub = onSnapshot(userCollection, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            setAlumnos(items);
          });
          return () => {
            unsub();
          };
      
          // eslint-disable-next-line
        }, []);
      
    

  return (
    <div>
    <IndexAsesor/>
    <div className='container1'>
        <div className='row'>
            <div className='col'>
                <h3 class="text-center">Alumnos registrados para realizar Practicas Profesionales</h3> <br/>
                <Fragment>
                <table class="table">
                    <thead>
                        <tr> 
                            <th>Nombre</th>
                            <th>Apellido paterno</th>
                            <th>Apellido Materno</th>
                            <th>Accion</th>
                            <th></th>
                        </tr>

                        </thead>
                    <tbody>
                    {alumnos.map((alumno) => (
        <tr key={alumno.id}>
          <td>{alumno.nombre}</td>
          <td>{alumno.app}</td>
          <td>{alumno.apm}</td>
          <td>{alumno.rol}</td>
          </tr>
      ))}
            </tbody>
                </table>
      
    </Fragment>
            </div>

        </div>
    </div>
    </div>
  )
}

export default VerAlumnosAsesor