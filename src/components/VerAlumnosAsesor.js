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
import IndexAsesor from './IndexAsesor';
import {ref, equalTo, orderByChild} from 'firebase/database'
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../contexts/auth';


const MySwal = withReactContent(Swal)


const VerAlumnosAsesor = () => {

    const [alumnos, setAlumnos] = useState([]);
    const [nombreA, setNombre] = useState('');
    const [loading, setLoading] = useState(false);
    const [app, setApp] = useState([]);
    const [apm, setApm] = useState([]);
    const [rol, setRol] = useState('');

    //const colletionRef = collection(db, 'usuario');


  useEffect(() => {
    const q = query(collection(db, "usuario"), where("rol", "==", "Practicante"));
    setLoading(true);

const nom = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(
      doc.data().nombre,
      doc.data().app,
      doc.data().apm,
      doc.data().rol
      
      );
  });
  console.log("nombre", cities.join(", "));
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
    <IndexAsesor/>
    <div className='container1'>
        <div className='row'>
            <div className='col'>
            <Fragment>
                <h3 class="text-center">Alumnos registrados para realizar Practicas Profesionales</h3> <br/>
                <table class="table">
                    <thead>
                        <tr > 
                            <th>Nombre</th>
                            <th>Apellido paterno</th>
                            <th>Apellido Materno</th>
                            <th>Rol</th>
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

export default VerAlumnosAsesor