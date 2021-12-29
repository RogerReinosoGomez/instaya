import Paquete from '../Paquete';
import FormPaquete from '../FormPaquete'
import Paginator from '../Paginator'
import { Modal, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import {
    ObtenerListado,
    CrearPaquete,
    CancelarPaquete,
    ActualizarPaquete
} from './api';

let TablaPaquetes = () => {
    const [ vPaquetes, setvPaquetes ] = useState([]);
    const [ pagina, setPagina ] = useState(1);
    const [ refrescar, setRefrescar ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(true);
    const [ elementosTotales, setElementosTotales ] = useState(0);
    const [ esError, setEsError ] = useState(false);
    const [ mensaje, setMensaje ] = useState('');

    const limite = 10;

    const parametros = {
        titulo: "",
        mostrar: false,
        modo: "nuevo",
        paquete: null,
        agregarPaquete: null
    };

    const [ parametrosModal, setParametrosModal ] = useState(parametros);

    useEffect(function () {
        console.log('Enviando petición...');
        setShowLoading(true);
        ObtenerListado(pagina, limite, function (responseData) {
            console.log(responseData);
            setShowLoading(false);
            if (responseData?.data) {
                setvPaquetes(responseData.data);
                setElementosTotales(responseData.count);
            }
        });
    }, [pagina, limite, refrescar]);

    const onRefrescar = function () {
        setRefrescar(true);
    }

    const onPrevio = function () {
        if (pagina >=2) {
            setPagina(pagina-1);
        }
    }
    const onSiguiente = function () {
        if (pagina < (elementosTotales/limite)) {
            setPagina(pagina+1);
        }
    }
    const onPaginaNueva = function(event) {
        if (Number(event.target.value) >=1 && 
           (Number(event.target.value) <= Number(elementosTotales/limite))) {
            setPagina(event.target.value);
        }
    }

    const onRegistrarPaquete = (event) => {
        event.preventDefault();
        const nuevoParametroModal = { ...parametrosModal };
        nuevoParametroModal.modo = "nuevo";
        nuevoParametroModal.mostrar = true;
        nuevoParametroModal.titulo = "Registrar Paquete";
        nuevoParametroModal.agregarPaquere = onNuevoPaquete;
        nuevoParametroModal.paquete = null;
        setParametrosModal(nuevoParametroModal);
        setShowLoading(false);
    }

    const onEditarPaquete = (parametro) => {
        const nuevoParametroModal = { ...parametrosModal };
        nuevoParametroModal.modo = "editar";
        nuevoParametroModal.mostrar = true;
        nuevoParametroModal.titulo = "Editar Paquete";
        nuevoParametroModal.agregarUsuario = onActualizarPaquete;
        nuevoParametroModal.usuario = parametro;
        setParametrosModal(nuevoParametroModal);
    }

    const cerrarModal = () => {
        const nuevoParametroModal = { ...parametrosModal };
        nuevoParametroModal.mostrar = false;
        setParametrosModal(nuevoParametroModal);
    }

    const onNuevoPaquete = async (nuevoPaquete) => {
        setShowLoading(true);
        const responseData = await CrearPaquete(nuevoPaquete);
        if (responseData) {
            setEsError(false);
            setMensaje('Se guardó el paquete exitosamente.');
            setRefrescar(!refrescar);
        } else {
            setEsError(true);
            setMensaje('Ocurrió un error al intentar registrar el paquete Intente nuevamente o contacte a soporte técnico.');
        }
        setShowLoading(false);
    }

    const onActualizarPaquete = async (usuarioActualizdo) => {
        setShowLoading(true);
        const responseData = await ActualizarPaquete(usuarioActualizdo);
        if (responseData) {
            setEsError(false);
            setMensaje('Se actualizó la informaciíon del paquete exitosamente.');
            setRefrescar(!refrescar);
        } else {
            setEsError(true);
            setMensaje('Ocurrió un error al intentar actualizar el paquete. Intente nuevamente o contacte a soporte técnico.');
        }
        setShowLoading(false);
    }

    const onCancelarPaquete = async (_id) => {
        const responseData = await CancelarPaquete(_id);
        if (responseData) {
            setRefrescar(!refrescar);
        } else {
            console.log('Ocurrió un error al intentar cancelar el paquete. Intente nuevamente o contacte a soporte técnico.');
        }
    }

    const listaPaquetes = vPaquetes.map((paquete) => <Paquete key = { paquete._id }
                                                cancelarPaquete = { onCancelarPaquete }
                                                editarPaquete = { onEditarPaquete }
                                                { ...vPaquetes }/>);

    return(
        <div className="container-fluid px-5" >
            <div className="card mt-5 mx-5">
                <div className="card-body">
                    <button className="btn btn-outline-primary float-sm-end ml-1" onClick={ onRefrescar } >
                            Actualizar Lista
                    </button>
                    <button id="btnRegistrarNov" className="btn btn-sm btn-primary float-end"
                        onClick={ onRegistrarPaquete }>Registrar Paquete</button>
                    <h4>Historial de Paquetes</h4>
                </div>
            </div>
            <div class = "mx-5">
                <table class="table caption-top bg-white">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Guia</th>
                            <th scope="col">Dia y Hora</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Remitente</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { showLoading ? <div className="col-sm-12 text-center">
                                            <Spinner animation="border" variant="primary" />
                                        </div>:
                                        <div className="list-group mt-2">{ listaPaquetes }</div> }
                    </tbody>
                </table>
            </div>
            <Paginator pagina= { pagina } onPrevio= { onPrevio }
                    onSiguiente= { onSiguiente } onPaginaNueva={ onPaginaNueva } />

            <Modal show={ parametrosModal.mostrar } onHide={ cerrarModal }>
                <Modal.Header closeButton>
                    <Modal.Title>{ parametrosModal.titulo }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormPaquete modo={ parametrosModal.modo }
                                cerrar={ cerrarModal }
                                registrar={ parametrosModal.agregarPaquete }
                                paquete={ parametrosModal.paquete } />
                </Modal.Body>
                <Modal.Footer>
                        { esError ? <label className="text-danger">{ mensaje }</label> : <label className="text-success">{ mensaje }</label> }
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TablaPaquetes;