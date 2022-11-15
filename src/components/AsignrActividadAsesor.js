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
import {DatePicker, TimePicker} from '@material-ui/pickers';

const db2 = getFirestore(db);

const AsignrActividadAsesor = () => {

  const [nombreActi, setNombreActi] = useState('')
  const [descripcion, setDescripcion] = useState ('')
  const [fechainicio, setFechainicio] = useState(new Date());
  const [fechafinal, setFechafinal] = useState(new Date());
  const [horaFinal, setHorafinal] = useState();
  const [estado, setEstado] = useState ('')
  console.log(fechainicio);
  console.log(fechafinal);
 
  const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
         try {
      const usuarion = doc(db2, "actividad")
        const data = {nombreActi: nombreActi, descripcion: descripcion, fechainicio: fechainicio, fechafinal: fechafinal, horaFinal: horaFinal, 
          estado: estado}
        await addDoc(usuarion, data)
        navigate('/asesorHome')
    }
  catch{

  }
}

    const getUserid = async (id) => {
        const usuarion = await getDoc(doc(db, "actividad", id))
        if(usuarion.exists()){
            console.log(usuarion.data)
            setNombreActi(usuarion.data().nombreActi)
            setDescripcion(usuarion.data().descripcion)
            setFechainicio(usuarion.data().fechainicio)
            setFechafinal(usuarion.data().fechafinal)
            setHorafinal(usuarion.data().horaFinal)
            setEstado(usuarion.data().estado)
        }else{
            console.log('Actividad no disponible')
        }
    }

    useEffect( () => {
        getUserid(id)
    }, [])
  return (
    <div>
    <IndexAsesor/>
    <div className='container1'>
    <div className='row'>
        <div className='col'>
            <h3 class="text-center"> Agregar Actividad</h3>
            <form onSubmit={update}>
            <div className='mb-3'>
                    <label className='form-label'>Actividad</label>
                    <input 
                    value={nombreActi}
                    onChange={ (e) => setNombreActi(e.target.value)}
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Descripcion</label>
                    <input 
                    value={descripcion}
                    onChange={ (e) => setDescripcion(e.target.value)}
                    type="text"
                    className='form-control'/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Fecha de inicio</label><br></br> 
                    <DatePicker className='container-1' value={fechainicio} onChange={setFechainicio}>
                    </DatePicker>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'> Fecha de termino</label> <br></br> 
                    <DatePicker value={fechafinal} onChange={setFechafinal}>
                    </DatePicker>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Hora de termino</label><br></br> 
                    <TimePicker value={horaFinal} onChange={setHorafinal}>
                    </TimePicker>
                   
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Estado</label>
                    <form>
                       <input type="radio" name="Disponible" value={estado} onChange={setEstado}/> Disponible
                       <p></p>
                       <input type="radio" name="Disponible" value={estado} onChange={setEstado}/> Cerrada
                    </form>
                    </div>
                <button type="submit" id="boton2" className='btn btn-primary'>Agregar</button>
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default AsignrActividadAsesor
