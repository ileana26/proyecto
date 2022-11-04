import React, { useEffect } from 'react'
import IndexAsesor from './IndexAsesor';
import {useState} from 'react'
import db from  '../firebaseConfig/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { async } from '@firebase/util';


const AsignrActividadAsesor = () => {

  const firestore = getFirestore(db);

  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());


  async function registrar(nombreActi, descripcion, fechainicio, fechafinal){

     const docRef = doc(firestore, `actividad/${firestore.uid}`)
     setDoc(docRef, {nombreActi: nombreActi, descripcion: descripcion, fechainicio: fechainicio, fechafinal: fechafinal,});
  }


function store (e) {
  e.preventDefault();

  const nombreActi = e.target.elements.nombreActi.value;
  const descripcion = e.target.elements.descripcion.value;
  const fechainicio = e.target.elements.finicio.value;
  const fechafinal = e.target.elements.ffinal.value;

  console.log("submit", nombreActi, descripcion, fechainicio, fechafinal);

  registrar(nombreActi, descripcion, fechainicio, fechafinal);

}




     /* const [lista, setLista] = useState([]);
    const [nombreActi, setNombreActi] = useState([]);
    const [descripcion, setDescripcion] = useState([]);
    const [fechainicio, setFechainicio] = useState([]);
    const [fechafinal, setFechafinal] = useState([]);

    useEffect(() => {
      getActividad()
    },[])

    const getActividad = async () => {
      let obj;
      let lista = []
      const querySnapshot = await db.collection("actividad").get();
      querySnapshot.foreach((doc) => {
        obj = doc.data()
        obj.id = doc.id
        lista.push(obj)
      });
      setLista(lista)
    }

    const addActividad = async() => {
      const obj = {nombreActi, descripcion, fechainicio, fechafinal}
      const dbref = await db.collection("actividad").add(obj)
      console.log(dbref.id)
      clearInput()
    }

    const clearInput = () =>{
      setNombreActi('')
      setDescripcion('')
      setFechafinal('')
      setFechainicio('')
    }*/


  return (
    <div>
    <IndexAsesor/>
    <div className='container1'>
    <h3 class="text-center"> Asignar Actividad</h3>
        <br></br>
        <form form onSubmit={store}>
        <div class="mb-3">
    <label class="form-label">Nombre de la actividad</label>
    <input type="text" class="form-control" id="nombreActi" placeholder="Actividad"/>
    </div>
    
        <div class="mb-3">
    <label class="form-label">Descripción de la actividad</label>
  <textarea class="form-control" id="descripcion" rows="3" placeholder="Descripción"></textarea>
</div>

<div>
  
<label class="form-label"> Fecha de inicio de la actividad</label> 
<DatePicker
selected={startDate} onChange={(date:Date) => setStartDate(date)}
    controls={['calendar']}
    display="inline"
    id="finicio"
    touchUi={true}
 />  <p></p>

<label class="form-label"> Fecha de termino de la actividad</label>
<DatePicker
selected={startDate2} onChange={(date:Date) => setStartDate2(date)}
    controls={['calendar']}
    display="inline"
    id="ffinal"
    touchUi={true}
 />
</div>
<br></br>
<button type="submit" className='btn btn-primary'>Asignar</button>

</form>
    </div>
    </div>
  )
}

export default AsignrActividadAsesor
