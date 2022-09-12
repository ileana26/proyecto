import React from 'react'
import './App.css'

export const Iniciosesion = () => {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-sm-4 offser-3 mt-5'>
                <div className='card pt-5'>
                    <div className='card-header'>
                      <h3 className='text-center'>Iniciar sesion</h3>
                    </div>
                    <div className='card-body'>
                    <div class="input-group mb-3">
                    <div className='input-group-prepend'> 
                    <span class="input-group-text" id="basic-addon1">
                        Nombre de Usuario</span>
                        </div>
                    <input type="text" 
                    class="form-control" 
                    placeholder="Ingresa tu nombre de usuario" aria-label="Username" 
                    aria-describedby="basic-addon2"/>
                    </div>

                    <div class="input-group mb-2">
                    <div className='input-group-prepend'> 
                    <span class="input-group-text" id="basic-addon2">Contraseña</span>
                    </div>
                    <input type="password" class="form-control" placeholder="Ingresa tu contraseña" 
                    aria-label="contrasenia" aria-describedby="basic-addon1"/>
                    </div>

                    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-info btn-lg btn-block"> Iniciar sesion</button>
                    </div>

                    </div>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Iniciosesion
