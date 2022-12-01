import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { async } from '@firebase/util'
import IndexAsesor from './IndexAsesor';
import {TimePicker} from '@material-ui/pickers';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import './boton';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

const EditarActividad  = () => {


    const [nombreActi, setNombreActi] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [descripcion, setDescripcion] = useState ('')
    const [horaFinal, setHorafinal] = useState();
    const [estado, setEstado] = useState ('');

    console.log(horaFinal);
    console.log(estado);
    
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        
        e.preventDefault()
        const usuarion = doc(db, "actividad", id)
        const data = {nombreActi: nombreActi, descripcion: descripcion, 
            fechainicio: startDate.toString(), 
            fechafinal: startDate2.toString(),
            horaFinal: horaFinal.toString(), 
            estado: estado.toString()}

            Swal.fire({
                title: '¿Esta seguro de guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    updateDoc(usuarion, data)
                    navigate('/showActividades')
                  Swal.fire('¡Cambios guardados!', '', 'Hecho')
                } else if (result.isDenied) {
                  Swal.fire('Los cambios no se pudieron guardar', '', 'Info')
                }
              })


        

    }

    const getUserid = async (id) => {
        const usuarion = await getDoc(doc(db, "actividad", id))
        if(usuarion.exists()){

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
            <h3 class="text-center"> Editar Actividad</h3>
            <form onSubmit={update}>
            <div className='mb-3'>
                    <label className='form-label'>Actividad</label>
                    <input 
                    value={nombreActi}
                    onChange={ (e) => setNombreActi(e.target.value)}
                    type="text"
                    className='form-control'required/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Descripcion</label>
                    <input 
                    value={descripcion}
                    onChange={ (e) => setDescripcion(e.target.value)}
                    type="text"
                    className='form-control'required/>
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'>Fecha de inicio</label><br></br> 
                    <DatePicker dateFormat="dd/MM/yy" selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                    </div>

                    <div className='mb-3'>
                    <label className='form-label'> Fecha de termino</label> <br></br> 
                    <DatePicker dateFormat="dd/MM/yy" selected={startDate2} onChange={(date:Date) => setStartDate2(date)} />
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


                <button type="submit" className='btn btn-primary'>Editar</button>
            </form>
        </div>
    </div>
</div>
</div>
  )
}

export default EditarActividad