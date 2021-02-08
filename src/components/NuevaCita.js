import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';

const NuevaCita = (props) => {

    const [error, setError] = useState({
        state: false,
        msg:''
    })

    


    const [cita, guardarCita] = useState({
        nombre: '',
        propietario: '',
        fecha: '',
        hora: '',
        telefono: '',
        sintomas: ''
    });

    const {nombre,propietario,fecha,hora,telefono,sintomas} = cita;

    const formValidate = () => {
        if(nombre.trim() === ''){
            setError({
                state:true,
                msg: 'Debe ingresar nombre de la mascota'
            })
            return false;
        }else if (propietario.trim() === ''){
            setError({
                state:true,
                msg: 'Debe ingresar propietario'
            })
            return false
        }else if (fecha.trim() === ''){
            setError({
                state:true,
                msg: 'Debe ingresar fecha'
            })
            return false;
        }else if (hora.trim() === ''){
            setError({
                state:true,
                msg: 'Debe ingresar hora'
            })
            return false;
        }else if (telefono.trim() === ''){
            setError({
                state:true,
                msg: 'Debe ingresar telefono'
            })
            return false;
        }else if (sintomas.trim() === ''){
            setError({
                state:true,
                msg: 'Debe ingresar sintomas'
            })
            return false;
        }else{
            setError({
                state:false,
                msg: ''
            })
            return true;
        }
        
    }

    //le los datos del form

    const actualizarState = e => {
        /* console.log(e.target.name);
        console.log(e.target.value); */
        guardarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Enviar una peticion a la Api
    const crearNuevaCita = e => {
        
        e.preventDefault();
        
        !formValidate()
        ? console.log('error')
        :
       ( clienteAxios.post('/pacientes', cita)
            .then(respuesta => {
                console.log(respuesta)
                //estos props es enviado desde el componente padre app.js
                //se hace para que la pag se refresque automaticamente
                props.guardarConsultar(true);
                //redireccionar
                props.history.push('/');
            }))
    }
    return (

        <>
            <h1 className="my-5">Crear Nueva Cita</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className=" btn btn-success text-uppercase py-2 px-5 font-weight-bold"> Volver </Link>
                    </div>
                    {
                        error.state
                        &&
                        <div className="error col-8 mx-auto mb-5 d-flex justify-content-center">
                            <p>{error.msg}</p>
                        </div>
                    }
                    <div className="col-md-8 mx-auto ">
                        <form
                            onSubmit={crearNuevaCita}
                            className="bg-white p-5 bordered animate__animated animate__fadeIn">
                            <div className="form-group ">
                                <label htmlFor="nombre">Nombre Mascota</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nombre Mascota"
                                    onChange={actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="propietario">Nombre Propietario</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="propietario"
                                    name="propietario"
                                    placeholder="Nombre Propietario"
                                    onChange={actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input
                                    type="tel"
                                    className="form-control form-control-lg"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    onChange={actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fecha">Fecha Alta</label>
                                <input
                                    type="date"
                                    className="form-control form-control-lg"
                                    id="fecha"
                                    name="fecha"
                                    onChange={actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hora">Hora Alta</label>
                                <input
                                    type="time"
                                    className="form-control form-control-lg"
                                    id="hora"
                                    name="hora"
                                    onChange={actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sintomas">Síntomas</label>
                                <textarea
                                    className="form-control"
                                    name="sintomas"
                                    rows="6"
                                    onChange={actualizarState}
                                ></textarea>
                            </div>
                            <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Crear Cita" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(NuevaCita);