import React from 'react'
import IndexAsesor from './IndexAsesor';
import {useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AsignrActividadAsesor = () => {
    const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
    <IndexAsesor/>
    <div className='container1'>
    <h3 class="text-center"> Asignar Actividad</h3>
        <br></br>
        <form >
        <div class="mb-3">
    <label class="form-label">Nombre de la actividad</label>
    <input type="text" class="form-control" id="nomActividad" placeholder="Actividad"/>
    </div>
    
        <div class="mb-3">
    <label class="form-label">Descripción de la actividad</label>
  <textarea class="form-control" id="descripcion" rows="3"></textarea>
</div>

<div>
    <article>
    <section>
<label class="form-label"> Fecha de inicio de la actividad</label> <br></br>
<DatePicker
selected={startDate} onChange={(date:Date) => setStartDate(date)}
    controls={['calendar']}
    display="inline"
    touchUi={true}
 />
 </section>
<section>
<label class="form-label"> Fecha de termino de la actividad</label> <br></br>
<DatePicker
selected={startDate} onChange={(date:Date) => setStartDate(date)}
    controls={['calendar']}
    display="inline"
    touchUi={true}
 />
 </section>
 </article>
</div>


</form>
    </div>
    </div>
  )
}

export default AsignrActividadAsesor
