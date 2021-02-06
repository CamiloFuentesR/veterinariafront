import clienteAxios from "../../config/axios";

export const getPacienteById = async (id) =>{
     
    return  await (await clienteAxios.get(`/pacientes/${id}`)).data;
}


