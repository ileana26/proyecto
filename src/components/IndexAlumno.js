import React from 'react'



export const IndexA = () => {
  return (

    <div>
      <div class="d-flex">
        <div id="sidebar-container" class="bg-primary">
          <div class="logo">
            <h4 class="titulo2"> <a href="/">Cerrar Sesion</a></h4>
          </div>
          <div class="menu">
            <a href="/crear" class="d-block text-light p-3">Inicio del sitio</a><br/>
          </div>
          <div class="menu">
            <a href="/showActividadesAlumnos" class="d-block text-light p-3">Actividades</a> <br/>
          </div>
          <div class="menu">
            <a href="/show" class="d-block text-light p-3">Proyectos</a> <br/>
          </div>
        </div>
    
        </div>
    </div>

  )
}
export default IndexA;
