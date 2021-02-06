import axios from 'axios';


//aqui no se necesita un dotenv?
const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL

}); 


export default clienteAxios;