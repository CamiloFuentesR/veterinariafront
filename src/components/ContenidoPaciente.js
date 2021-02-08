import React from 'react'
import { Link } from 'react-router-dom';
import useOnScreen from '../hooks/useOnScreen';

export const ContenidoPaciente = (cita) => {

    const [setRef,visible] =  useOnScreen({threshold: .9});
    
    return (
        <>
        {
        visible?
        <Link to={`/cita/${cita._id}`}key={cita._id} className="p-5 list-group-item list-group-item-action flex-colum align-item-start animate__animated animate__fadeIn">
        <div className="d-flex w-100 justify-content-between b-4">
            <h3  className="mb-3">Mascota: {cita.nombre}</h3> 
            <small className="fecha-alta">
                {cita.fecha} - {cita.hora}
            </small>

        </div>
        
        <p className="mb-0">
            {cita.sintomas}
        </p>
        <div className="contacto py-3">
            <p>Dueño: {cita.propietario}</p>
            <p>Telefono: {cita.telefono}</p>
        </div>
        </Link>

        : <span ref={setRef}></span>
        }
        </>
        

    )
}
