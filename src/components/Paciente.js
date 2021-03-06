import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ContenidoPaciente } from './ContenidoPaciente';

const Pacientes = ({citas}) => {  //desde props se extraen los atributos 
    /* if(citas.length === 0) return null;
    console.log(citas) */
    return (
        <Fragment>
            <h1 className="my-5">Administrador de Pacientes</h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/nueva'} className=" btn btn-success text-uppercase py-2 px-5 font-weight-bold"> Crear Cita</Link>

                    </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            {citas.map(cita => (
                                <ContenidoPaciente
                                    key={cita._id}
                                    {...cita}
                                />
                                
                                
                               
                            ) )}
                        </div>

                    </div>

                </div>
            </div>
        </Fragment>
      );
}
 
export default withRouter(Pacientes);