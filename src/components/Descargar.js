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
import storage from '../firebaseConfig/firebase'
import { getStorage, ref, getDownloadURL, listAll, uploadBytes  } from "firebase/storage";
import {v4} from 'uuid';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { addDoc } from 'firebase/firestore';

const Descargar = () => {

    const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [file, setFile] = useState(null);
  const docCollection = collection(db, "documentos");

  const storage = getStorage();
  let arreglo = [];
  let xhr;
  
  const getDoc = async() => {
    const data = await getDocs(docCollection)

    setDocumentos(
        data.docs.map((doc) => ({...doc.data(), id:doc.id}))
    )
   // console.log(mostrar)
}

useEffect(() => {
  getDoc()
  descargarF()
}, [])

async function  uploadFile(file){
  const storage = getStorage();

 await addDoc(collection(db, "documentos"), {
  name: storage.name,
  ruta: storage.fullPath
});

}

function descargarF (urldoc){

  const storage = getStorage();
  console.log(urldoc);
  getDownloadURL(ref(storage, `actividades/${urldoc}`))
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
      setDocumentos(url)
      arreglo.push(url)

      {<a href={arreglo}></a>}
      /*{documentos.map((documento) => (
        <tr key={documento.id}>
            <td><a href= {setDocumentos(url)} download="newfilename">Download the pdf</a></td>   
        </tr>
      ))}*/
    })
    .catch((error) => {
      console.error(error)
      });

  }

    function urls(documento){
    
      return documento.name;

    }

 

  return (
    <div>
    <IndexAsesor/>
    <div className='container1'>
        <div className='row'>
            <div className='col'>
                <h3 class="text-center">Lista de actividades</h3> <br/>
                <input
        type="file"
       
      />

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
                      
                    {documentos.map((alumno) => (
                            <tr key={alumno.id}>
                                   <tr>{alumno.name}</tr>
                                    <td></td>
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

export default Descargar
