import axios from 'axios';
import config from '../../config/config.json';

const path = 'paquetes';

const getToken = () => {
    const tokenData = JSON.parse(localStorage.getItem("tokenAcceso"));
    return tokenData.token;
}

const ObtenerListado = async (page, limit, callback) => {
    const url = `${ config.PROTOCOL }://${ config.HOST }/${ path }/paquetesregistrados?page=${page}&limit=${limit}`;
    return await axios.get(url, { headers: { authorization: `Bearer ${ getToken() }` } })
                        .then(function (res) {
                            callback(res.data);
                        })
                        .catch(function (error) {
                           callback(error);
                           console.log(error);
                        });
}

const CrearPaquete = async (data) => {
    const url = `${ config.PROTOCOL }://${ config.HOST }/${ path }/registrarpaquete`;
    try {
        const response = await axios.post(url, data, { headers: { authorization: `Bearer ${ getToken() }` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const CancelarPaquete = async (id) => {
    const url = `${ config.PROTOCOL }://${ config.HOST }/${ path }/estadoCancelado`;
    try {
        const response = await axios.put(url, { id }, { headers: { authorization: `Bearer ${ getToken() }` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const CumplirPaquete = async (id) => {
    const url = `${ config.PROTOCOL }://${ config.HOST }/${ path }/estadoCumplido`;
    try {
        const response = await axios.put(url, { id }, { headers: { authorization: `Bearer ${ getToken() }` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const ActualizarPaquete = async (paquete) => {
    const url = `${ config.PROTOCOL }://${ config.HOST }/${ path }/editar`;
    try {
        const response = await axios.put(url, paquete, { headers: { authorization: `Bearer ${ getToken() }` } });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export {
    ObtenerListado,
    CrearPaquete,
    CancelarPaquete,
    CumplirPaquete,
    ActualizarPaquete
}