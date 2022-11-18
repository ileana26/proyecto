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


const AsignrActividadAsesor = () => {

  
const db2 = getFirestore();

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

    const update = async (e) => {
      const usuarion = doc(db2, "actividad")
        const data = {nombreActi: nombreActi, descripcion: descripcion, 
          fechainicio: startDate.toString(), 
          fechafinal: startDate2.toString(),
          horaFinal: horaFinal.toString(), 
          estado: estado.toString()}
        await addDoc(usuarion, data)
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
    }, [])

    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState();
    const options = ["Disponible", "Cerrada"];

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
                    <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'> Fecha de termino</label> <br></br> 
                    <DatePicker selected={startDate2} onChange={(date:Date) => setStartDate2(date)} />
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Hora de termino</label><br></br> 
                    <TimePicker value={horaFinal} onChange={setHorafinal}>
                    </TimePicker>
                   
                    </div>

                    <div className='dropdown'>
                    <label className='form-label'>Estado de la actividad</label><br></br> 
                        <div className='dropdown-btn' onClick={(e) => setIsActive(!isActive)}>{selected}</div>
                        <span className='fas fa-caret-down'></span>
                    </div>
                    {isActive && (
                        <div className='dropdown-content'>
                            {options.map((option) => (
                                <div onClick={(e) => {
                                    setSelected(option);
                                    setEstado(option);
                                    setIsActive(false);
                                }}
                                className="dropdown-item"> 
                        {option}
                                </div>
                            ))}
                        </div>
                    )}
<br></br> 
                <button type="submit" id="boton2" className='btn btn-primary'>Agregar</button>
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default AsignrActividadAsesor
