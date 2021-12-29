import axios from 'axios';
import config from '../../config/config.json';

const path = 'usuarios';

const IniciarSesion = async (data) => {
    const url = `${ config.PROTOCOL }://${ config.HOST }/${ path }/auth`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { IniciarSesion };