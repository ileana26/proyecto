import React, {useState, useEffect, useContext, useId, Fragment} from 'react'
import {
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
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
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { addDoc } from 'firebase/firestore';
import {v4} from 'uuid';
import { listAll  } from "firebase/storage";


const MostrarActividadesAlumno = () => {


    const [alumnos, setAlumnos] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [file, setFile] = useState(null);
    const userCollection = query(collection(db, "actividad"), where("estado", "==", "Disponible"));
    const docCollection = collection(db, "documentos");
    let arreglo = [];

    const getUser = async() => {
        const data = await getDocs(userCollection)
        //console.log(data.docs);

        setAlumnos(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
       // console.log(mostrar)
    }

    const getDoc = async() => {
      const data = await getDocs(docCollection)

      setDocumentos(
          data.docs.map((doc) => ({...doc.data(), id:doc.id}))

      )
     // console.log(mostrar)
  }

    useEffect(() => {
        getUser()
      //  getDoc()
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
//////////////////////////////////////////////77
    

async function  uploadFile(file){
  const storage = getStorage();
const storageRef = ref(storage, `actividades/${file.name + v4()}`); 
 uploadBytes(storageRef, file) 

 console.log(storageRef.name)

// descargarF(storageRef.name)

 await addDoc(collection(db, "documentos"), {
  name: storageRef.name,
  ruta: storageRef.fullPath
   })

}
    
       async function descargarF (urldoc){

          console.log("recibi: " + urldoc)

          const storage = getStorage();

          await getDownloadURL(ref(storage, `actividades/${urldoc}`))
            .then((url) => {
            console.log(url)
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = (event) => {
                const blob = xhr.response;
              };
              xhr.open('GET', url);
              xhr.send();
             
              console.log("url del archivo ",url)
              setDocumentos(url)
              
             
            })
            .catch((error) => {
              console.error(error)
              });
      /*  await addDoc(collection(db, "urls"), {
          name: urls
           })*/
          
          }
        


        

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

                <table>
                {documentos.map((documento => (
                <tr key={documento.id}>
                    <tr>{descargarF(documento.name)}</tr>
                    <td><a href= "" download="newfilename">Download the pdf</a></td>
                </tr>
                )))}
                </table>
            </div>

        </div>
    </div>
    </div>
  )
}

export default MostrarActividadesAlumno;