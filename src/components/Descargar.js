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

const Descargar = () => {

    const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const docCollection = collection(db, "documentos");

  const storage = getStorage();
  
  function listAll() {
   
  
    // [START storage_list_all]
    // Create a reference under which you want to list
    var listRef = ref('actividades/');
   
  
    // Find all the prefixes and items.
    listRef.listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
    // [END storage_list_all]
  }
  
  function listPaginate() {

    // [START storage_list_paginate]
    async function pageTokenExample(){
      // Create a reference under which you want to list
  
      var listRef = ref('actividades/');
  
      // Fetch the first page of 100.
      var firstPage = await listRef.list({ maxResults: 100});
  
      // Use the result.
      // processItems(firstPage.items)
      // processPrefixes(firstPage.prefixes)
  
      // Fetch the second page if there are more elements.
      if (firstPage.nextPageToken) {
        var secondPage = await listRef.list({
          maxResults: 100,
          pageToken: firstPage.nextPageToken,
        });
        // processItems(secondPage.items)
        // processPrefixes(secondPage.prefixes)
      }
    }
    // [END storage_list_paginate]
  }

  function listAll(folder){

    var listRef = storage.child(folder);
    

    listRef.listAll().then((res) => {
      res.prefixes.forEach((folderRef) => {
        res.items.forEach((itemRef) => {
          console.log("iten ref: " + itemRef);
          itemRef.getDownloadURL().then((url) => {
            console.log("download url: " + url);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    })
  }

  useEffect(() => {
    listAll()
}, [])

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
