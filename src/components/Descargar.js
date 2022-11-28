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
  const [imageUrls, setImageUrls] = useState([]);
  const storage = getStorage();

  const imagesListRef = ref(storage, "actividades/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `actividades/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

    /*const [imagenUpload, setImagenUpload] = useState(null);
    const storage = getStorage();
    const imageListRef = ref(storage, "actividades/")

    const descargarfile  = () => {
        const storage = getStorage();
        getDownloadURL(ref(storage, `actividades/${imagenUpload.name}`))
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
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
          })
          .catch((error) => {
            // Handle any errors
          });

    }

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImagenUpload((prev) => [...prev, url]);
                })
            })
            //console.log(response)
        });
        }, []    
        );*/

  return (
    <div>
    <IndexAsesor/>
    <div className='container1'>
        <div className='row'>
            <div className='col'>
                <h3 class="text-center">Lista de actividades</h3> <br/>
                <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url) => {
        <input type="file"> 
            {url.toString()} 
        </input>
      })}
            </div>

        </div>
    </div>
    </div>
  )
}

export default Descargar
