import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
const Cita = (props) => {
    if (!props.cita) {
        props.history.push('/');
        return null;
    }

    //extraer por props
    const { cita: { _id, nombre, propietario, fecha, hora, telefono, sintomas } } = props;
    //elimina un registro

    const eliminarCita = id => {

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Una cita eliminada no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {

               

                //eliminado de la abse de datos
                clienteAxios.delete(`/pacientes/${id}`)
                    .then(respuesta => {
                        console.log(respuesta)
                        //estos props es enviado desde el componente padre app.js
                        props.guardarConsultar(true);
                        props.history.push('/');
                         //alerta de eliminado
                Swal.fire(
                    'Eliminado con exito!',
                    `${respuesta.data.mensaje}`,
                    'success'
                )
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })


    }

    return (
        <Fragment>
            <h1 className="my-5">Nombre cita: {nombre} </h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className=" btn btn-success text-uppercase py-2 px-5 font-weight-bold"> Volver </Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            <div className="p-5 list-group-item list-group-item-action flex-column align-item-center">
                                <div className="d-flex w-100 justify-content-between b-4">
                                    <h3 className="mb-3">Mascota: {nombre}</h3>
                                    <small className="fecha-alta">
                                        {fecha} - {hora}
                                    </small>

                                </div>

                                <p className="mb-0">
                                    {sintomas}
                                </p>
                                <div className="contacto py-3">
                                    <p>Dueño: {propietario}</p>
                                    <p>Telefono: {telefono}</p>
                                </div>
                                <div className="d-flex">
                                    <button type="button"
                                        className="text-upppercase py-2 px5 font-weight-bold btn btn-danger col"
                                        onClick={() => eliminarCita(_id)}
                                    >
                                        <i className="fa fa-minus-circle"> Eliminar</i>
                                    </button>
                                    <Link to={`/editar/${_id}`}>
                                    <button type="button"
                                        className="text-upppercase py-2 px5 font-weight-bold btn btn-warning col"
                                    >
                                        <i className="far fa-edit"> Editar</i>
                                    </button>
                                    
                                    </Link>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Fragment>

    );
}

export default withRouter(Cita);