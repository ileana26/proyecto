import React, {useState, useEffect, useContext, useId, Fragment} from 'react'
import {
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { collection, getDoc, onSnapshot, setDoc, query, 
    where, orderBy, limit, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import firebase from 'firebase/compat/app'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IndexA from './IndexAlumno';

const MostrarActividadesAlumno = () => {

    const [alumnos, setAlumnos] = useState([]);
    const [nombreA, setNombre] = useState('');
    const [loading, setLoading] = useState(false);
    const [app, setApp] = useState([]);
    const [apm, setApm] = useState([]);
    const [rol, setRol] = useState('');

    useEffect(() => {
        const q = query(collection(db, "actividad"), where("estado", "==", "Disponible"));
        setLoading(true);
    
    const nom = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push(
          doc.data().nombreActi,
          doc.data().descripcion,
          doc.data().fechafinal
          );
      });
      console.log("Actividad", cities.join(", "));
      setAlumnos(cities);
          setLoading(false);
    });
    
    return () => {
      nom();
    };
    
    // eslint-disable-next-line
    }, []);


  return (
    <div>
          <IndexA/>
          <div className='container1'>
        <div className='row'>
            <div className='col'>
            <Fragment>
                <h3 class="text-center">Lista de actividades</h3> <br/>
                <table class="table">
                    <thead>
                        <tr > 
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Fecha limite</th>
                            <th></th>
                        </tr>

                        </thead>
                    <tbody>
                  {alumnos.map((alumno => (
                  <td key={alumno.id}>
                  <td>{alumno} </td>
                  </td>
                  
      )))}
    
            </tbody>
                </table>
      
    </Fragment>
            </div>

        </div>
    </div>
    </div>
  )
}


export default MostrarActividadesAlumno;