import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"


export const IndexAsesor = () => {
  return (
    <div className='container-fluid'>
      <div className='row' class="d-flex">
        <div className='col-auto min-vh-100 bg-dark' id="sidebar-container" class="bg-primary">
          <ul class="nav flex-column">
            <br></br>
            <li class="nav-item">
              <a className='nav-link px-2' href='/'> <i class="bi bi-box-arrow-left" id='cerrarsesion'></i> Cerrar sesión</a>
            </li>
            <br></br>
            <li class="nav-item">
              <a className='nav-link px-2' href="/asesorHome"><i class="bi bi-house"></i>Inicio</a>
            </li>
            <li class="nav-item">
              <a className='nav-link px-2' href="/asignarActividad"><i class="bi bi-folder-plus"></i>Asignar actividad</a>
            </li>
            <li class="nav-item">
              <a className='nav-link px-2' href='/showActividades'><i class="bi bi-card-checklist"></i>Ver actividades</a>
            </li>
            <li class="nav-item">
              <a className='nav-link px-2' href='/alumnosAsesor'><i class="bi bi-person-lines-fill"></i>Ver alumnos</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default IndexAsesor;
