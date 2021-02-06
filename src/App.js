import React, {  useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cita from './components/Cita';
import  EditarCita  from './components/EditarCita';
import NuevaCita from './components/NuevaCita';
import Pacientes from './components/Paciente';
import clienteAxios from './config/axios';
import { reducerContext } from './context/ReducerContext';
import { UserContext } from './context/UserContext';
async function init () {
    const cliente = await clienteAxios.get(`/pacientes/`);
    const res = await cliente.data;
    return   res; 
}
function App() {

    //State de la app
     const [citas, guardarCitas] = useState([]);   //en citas se guarda la info creada en la funcion guardar citas
    const [consultar, guardarConsultar] = useState(true);
    const [state, dispatch] = useReducer(reducerContext, [],init )

    useEffect(() => {

        if (consultar) {
            const consultarApi = async () => {
                /*   clienteAxios.get('/pacientes')
                      .then(respuesta => {
                          // colocar el resultado en el state
                          guardarCitas(respuesta.data)
                          //deshabilitar la consulta
                          guardarConsultar(false);
                      })
                      .catch(error => {
                          console.log(error)
                      })
              } */
                //con async y await
                try {
                    const pacientes = await clienteAxios.get('/pacientes')
                    const respuesta = await pacientes.data;
                    // colocar el resultado en el state
                    await guardarCitas(respuesta);
                  /*   await dispatch({
                        type:'update',
                        payload: citas
                    }) */
                    //deshabilitar la consulta
                    await guardarConsultar(false);
                } catch (error) {
                    console.log(error)
                }
            }
            consultarApi();
            
        }
    }, [consultar]);
   
    // console.log(process.env.REACT_APP_BACKEND_URL)
    
    return (

        <UserContext.Provider value={{
            citas,
            guardarCitas,
            consultar,
            guardarConsultar,
            state,
            dispatch

        }}>

        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    //si quiere enviar props tiene que mandar el component como funcion
                    component={() => <Pacientes citas={citas} />}
                />
                <Route
                    exact
                    path="/nueva"
                    component={() => <NuevaCita guardarConsultar={guardarConsultar} />}
                />
                <Route
                    exact
                    path="/editar/:id"
                    render={(props) => {
                        const cita = citas.find(cita => cita._id === props.match.params.id)
                        
                        return (
                            <EditarCita
                                cita={cita}
                                guardarConsultar={guardarConsultar}
                            />
                        )
                    }}
                />
                <Route
                    exact
                    path="/cita/:id"
                    render={(props) => {
                        const cita = citas.filter(cita => cita._id === props.match.params.id)
                        return (
                            <Cita
                                cita={cita[0]}
                                guardarConsultar={guardarConsultar}
                            />
                        )

                    }}
                />
            </Switch>
        </Router>
        </UserContext.Provider>
    );
}

export default App;
