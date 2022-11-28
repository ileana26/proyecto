import React from 'react'
import IndexAsesor from './IndexAsesor';
import {useState} from 'react'
import db  from '../firebaseConfig/firebase';
import { getFirestore } from "@firebase/firestore";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom'
import { Radio, RadioGroup} from 'react-radio-group'
import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where } from "firebase/firestore";
import { useEffect } from 'react';
import {TimePicker} from '@material-ui/pickers';
import DatePicker from "react-datepicker";
import { useId } from 'react';


const db2 = getFirestore();

const AsignrActividadAsesor = () => {

  const firestore = getFirestore(db);

  async function registrar(nombreActi, descripcion, fechainicio, fechafinal, horaFinal, estado){

    const docRef = await addDoc(doc(firestore, "actividad"))
  setDoc(docRef, {nombreActi: nombreActi, descripcion: descripcion, 
    fechainicio: fechainicio.toString(), 
    fechafinal: fechafinal.toString(),
    horaFinal: horaFinal.toString(), 
    estado: estado});
  }


  const [nombreActi, setNombreActi] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [descripcion, setDescripcion] = useState ('')
    const [horaFinal, setHorafinal] = useState();
    const [estado, setEstado] = useState ('');
    
  console.log(startDate);
  console.log(startDate2);
 
  const navigate = useNavigate()
    const {id} = useParams()

    /*const addSchool = async (e) => {
      const usuarion = doc(db2, "actividad", id)
        const data = {nombreActi: nombreActi, descripcion: descripcion, 
          fechainicio: startDate.toString(), 
          fechafinal: startDate2.toString(),
          horaFinal: horaFinal.toString(), 
          estado: estado.toString()}
        await updateDoc(usuarion, data)
        navigate('/asesorHome')
}

    const getUserid = async (id) => {
        const usuarion = await getDoc(doc(db2, "actividad", id))
        if(usuarion.exists()){
            console.log(usuarion.data)
            setNombreActi(usuarion.data().nombreActi)
            setDescripcion(usuarion.data().descripcion)
            setStartDate(usuarion.data().startDate)
            setStartDate2(usuarion.data().startDate2)
            setHorafinal(usuarion.data().horaFinal)
            setEstado(usuarion.data().estado) 
        }else{
            console.log('Actividad no disponible')
        }
    }

    useEffect( () => {
        getUserid(id)
    }, [])*/


    function store (e) {
      e.preventDefault();

      const nombreActi = e.target.elements.nombreActi.value;
      const descripcion = e.target.elements.descripcion.value;
      const fechainicio = e.target.elements.fechainicio.value;
      const fechafinal = e.target.elements.fechafinal.value;
      const horaFinal = e.target.elements.horaFinal.value;
      const estado = "Disponible";

      console.log("submit",nombreActi, descripcion, fechainicio, fechafinal, horaFinal, estado);

      registrar(nombreActi, descripcion, fechainicio, fechafinal, horaFinal, estado);

  }

  return (
    <div>
    <IndexAsesor/>
    <div className='container1'>
    <div className='row'>
        <div className='col'>
            <h2 class="text-center"> Agregar actividad</h2>
            <br></br>
            <form onSubmit={store} class="row g-3">
                    <div className='col-11'>
                      <label className='form-label'>Actividad</label>
                      <input id='nombreActi' type="text" className='form-control'/>
                    </div>

                    <div className='col-11'>
                      <label className='form-label'>Descripcion</label>
                      <input id='descripcion' type="text" className='form-control'/>
                    </div>

                    <div className='col-md-4'>
                      <label className='form-label'>Fecha de inicio</label><br></br> 
                      <DatePicker id='fechainicio' selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                    </div>

                    <div className='col-md-4'>
                      <label className='form-label'> Fecha de termino</label> <br></br> 
                      <DatePicker id='fechafinal' selected={startDate2} onChange={(date:Date) => setStartDate2(date)} />
                    </div>

                    <div className='col-md-3'>
                      <label className='form-label'>Hora de termino</label><br></br> 
                      <TimePicker id='horaFinal' value={horaFinal} onChange={setHorafinal}></TimePicker>
                    </div>

                    <br></br> <br></br> <br></br> 
                    <div className='col-11'>   
                        <button type="submit" className='btn btn-primary'>Agregar</button>
                    </div>     
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default AsignrActividadAsesor
