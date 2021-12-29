import React from 'react';
import instaya from '../../img/iconos/instaya.png'

import { useState } from "react";
import { IniciarSesion } from "./api";

let Login = (props) =>  {
    const [ cedula, setUsuario ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const onUsuarioChange = (evt) => {
        setUsuario(evt.target.value);
    }

    const onPasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    const onFormSubmit = async (evt) => {
        evt.preventDefault();
        console.log("Iniciando sesión...");
        const data = await IniciarSesion({
            cedula: cedula,
            password: password
        })
        if (data?.token) {
            localStorage.setItem("tokenAcceso", JSON.stringify({ token: data.token,  timestamp: Date.now() }));
            props.cambiarSesionIniciada(true);
        }else {
            setError('Nombre de usuario o contraseña incorrecta');
        }
    }

    return(
        <>
            <div className='text-center'>
                <img src={ instaya } alt='log' width="171" height="171"  />
                <h1 className =  "d-flex justify-content-center text-success">InstaYA</h1>
                <p className="d-flex justify-content-center text-success">
                    <i><strong>Empresa lider en envíos</strong></i>
                </p>
                <div className="row mt-2">
                    <div className="col-12 text-center text-danger">
                        <h5>
                            { error }
                        </h5>
                    </div>
                </div>
                <div className="col-12 col-6 d-flex justify-content-center">
                    <form onSubmit={ onFormSubmit }>
                        <div>
                            <h5 className= "text-success col-12 mb-2 md:col-2 md:mb-0">Login</h5>
                            <div className="field">
                                <div className="col-12 mb-2 md:col-2 md:mb-0">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="usuario" value={ cedula } onChange={ onUsuarioChange } placeholder='Cedula' />
                                        <label for="floatingInput">Cédula</label>
                                    </div>
                                </div>
                            </div >
                            <div className="field">
                                <div className="col-12 mb-2 md:col-2 md:mb-0">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="contrasena" value={ password } onChange={ onPasswordChange } placeholder='Password' />
                                        <label for="floatingInput">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 ">
                                <button type="submit" className="w-100 btn btn-md btn-success">Iniciar sesión</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;