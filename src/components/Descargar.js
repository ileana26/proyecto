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

const Descargar = () => {

  const [imageUpload, setImageUpload] = useState(null);


  function descargarF (){

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

  useEffect(() => {
descargarF()
  })


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
      <button > Upload Image</button>
    
      <div>
      <a href={imageUpload} download="newfilename">Download the pdf</a>
        <img id="myimg"></img>
      </div>
            </div>

        </div>
    </div>
    </div>
  )
}

export default Descargar
