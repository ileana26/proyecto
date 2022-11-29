import React from 'react'



export const IndexA = () => {
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
        <a className='nav-link px-2' href="/alumnoHome"><i class="bi bi-house"></i>Inicio</a>
      </li>
      <li class="nav-item">
        <a className='nav-link px-2' href='/showActividadesAlumnos'><i class="bi bi-card-checklist"></i>Actividades</a>
      </li>
    </ul>
  </div>
</div>
</div>

  )
}
export default IndexA;
