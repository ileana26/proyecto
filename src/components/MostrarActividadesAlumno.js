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
import storage from '../firebaseConfig/firebase'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {v4} from 'uuid';
import { getDownloadURL, listAll  } from "firebase/storage";

const MostrarActividadesAlumno = () => {


    const [alumnos, setAlumnos] = useState([]);
    const [file, setFile] = useState(null);
    const userCollection = query(collection(db, "actividad"), where("estado", "==", "Disponible"));
    const [imageUpload, setImageUpload] = useState(null);

    const getUser = async() => {
        const data = await getDocs(userCollection)
        //console.log(data.docs);

        setAlumnos(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
       // console.log(mostrar)
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();

        Swal.fire({
            title: '¿Estas seguro de subir este archivo?',
            showDenyButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                    const result = uploadFile(file);
                   console.log(result);

              Swal.fire('¡Guardado!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('El archivo no se pudo subir', '', 'info')
            }
          })

    };

    async function  uploadFile(file){
        const storage = getStorage();
    const storageRef = ref(storage, `actividades/${file.name + v4()}`);
 
    uploadBytes(storageRef, file).then(() =>{
      console.log(storageRef)

    })
}

function obtenerURL (storageRef){
  getDownloadURL(ref(storage, imageUpload))
.then((url) => {
  // `url` is the download URL for 'images/stars.jpg'

  // This can be downloaded directly:
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = (event) => {
    const blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

  // Or inserted into an <img> element
  /*const img = document.getElementById('myimg');
  img.setAttribute('src', url);*/
  console.log("url del archivo ",url)
  setImageUpload(url)
})
.catch((error) => {
  console.error(error)
});

  const storage = getStorage();
  getDownloadURL(ref(storage, 'actividades/ejemplo.pdf003ec36a-d4ca-43f2-b9f3-800851a0020a'))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
  
      // Or inserted into an <img> element
      /*const img = document.getElementById('myimg');
      img.setAttribute('src', url);*/
      console.log("url del archivo ",url)
      setImageUpload(url)
    })
    .catch((error) => {
      console.error(error)
    });
}
   /* const [alumnos, setAlumnos] = useState([]);
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
*/

  return (
    <div>
          <IndexA/>
          <div className='container1'>
        <div className='row'>
            <div className='col'>
                <h3 class="text-center">Lista de actividades</h3> <br/>
                <table class="table">
                    <thead>
                        <tr> 
                            <th>Actividad</th>
                            <th>Descripcion</th>
                            <th>Fecha limite</th>
                            <th>Accion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumno) => (
                            <tr key={alumno.id}>
                                    <td>{alumno.nombreActi}</td>
                                    <td>{alumno.descripcion}</td>
                                    <td>{alumno.fechafinal}</td>
                                 <td>   <form onSubmit={handleSubmit}>
                                    <td><input type="file" 
                                    name="" id="" 
                                    onChange={e => setFile(e.target.files[0])}
                                    className="btn btn-light" /> </td>
                                  <td>  <button className='btn btn-primary'> Subir</button> </td>
                                    </form> </td>
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

export default MostrarActividadesAlumno;