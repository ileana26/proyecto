import React from 'react'



export const IndexAsesor = () => {
  return (

    <div>
      <div class="d-flex">
        <div id="sidebar-container" class="bg-primary">
          <div class="logo">
            <h4 class="titulo2"> <a href="/">Cerrar Sesion</a></h4>
          </div>
          <div class="menu">
            <a href="/asesorHome" class="d-block text-light p-3">Inicio del sitio</a><br/>
          </div>
          <div class="menu">
            <a href="/asignarActividad" class="d-block text-light p-3">Asignar actividad</a> <br/>
          </div>
          <div class="menu">
            <a href="/showActividades" class="d-block text-light p-3">Ver actividades</a> <br/>
          </div>
          <div class="menu">
            <a href="/alumnosAsesor" class="d-block text-light p-3">Ver alumnos</a> <br/>
          </div>
        </div>
    
        </div>
    </div>

  )
}
export default IndexAsesor;
