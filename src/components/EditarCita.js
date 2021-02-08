import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useParams, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import { getPacienteById } from './selectors/getPacienteById';

const EditarCita = (props) => {
    console.log('algo')

    const { id } = useParams();
    // const cliente = clienteAxios.get(`/pacientes/${id}`);
    // const isMounted = useRef(true);
    const res = useMemo(() => getPacienteById(id), [id])
    const [prom, setProm] = useState(props.cita || {
        _id: '',
        nombre: '',
        fecha: '',
        hora: '',
        sintomas: '',
        telefono: '',
        propietario: ''
    });
    const {nombre,propietario,fecha,hora,telefono,sintomas} = prom;

    const [error, setError] = useState({
        state: false,
        msg:''
    })
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
    async function mostrar(res) {
        setProm(await res);
        return;
    }
    //es la misma resp que usando el codigo de abajo, pero mas eficiente el codigo
    useEffect(() => {
        !props.cita
            && mostrar(res);
    }, [props.cita, res])


    // useEffect(() => {
    //     return () => {
    //         setProm({})
    //     }
    // }, [])
    // useEffect(() => {

    //     if (isMounted.current) {
    //         cliente.then(async (res) => {
    //             try {
    //                 const perro = await res.data;
    //                 await setProm(perro);
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //         })
    //     }
    //     return () => {
    //         isMounted.current = false;
    //     }
    // }, [id, cliente])

    const history = useHistory();

    function actualizarState(e) {
        setProm({
            ...prom,
            [e.target.name]: e.target.value,
        })
    }

    // Enviar una peticion a la Api
    const editarCita = e => {
        e.preventDefault();
        
        !formValidate()
        ? console.log('error')
        :
        clienteAxios.put(`/pacientes/${id}`, prom)
            .then(respuesta => {
                console.log(respuesta)
                //estos props es enviado desde el componente padre app.js
                //se hace para que la pag se refresque automaticamente
                props.guardarConsultar(true);
                //redireccionar
                history.push('/');
            })
    }
    return (
        <>
            <h1 className="my-5">Editar Cita</h1>
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
                    <div className="col-md-8 mx-auto">
                        <form
                            onSubmit={editarCita}
                            className="bg-white p-5 bordered animate__animated animate__fadeIn">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Mascota</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="nombre"
                                    name="nombre"
                                    value={prom.nombre}
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
                                    value={prom.propietario}
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
                                    value={prom.telefono}
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
                                    value={prom.fecha}
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
                                    value={prom.hora}
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sintomas">Síntomas</label>
                                <textarea
                                    className="form-control"
                                    name="sintomas"
                                    value={prom.sintomas}
                                    rows="6"
                                    onChange={actualizarState}
                                ></textarea>
                            </div>
                            <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Guardar Cita" />
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(EditarCita);