import { useState } from 'react';

function FormPaquete(props) {
    const nuevoPaquete = {
        dia: "",
        hora: "",
        ancho: 0,
        alto: 0,
        largo: 0,
        peso: 0,
        delicado: true,
        estado: "Guardado",
        direcionRecogida: "",
        ciudadRecogida: "",
        cedulaRemitente: 0,
        nombreRemitente: "",
        direcionDestino: "",
        ciudadDestino: "",
        cedulaDestino: 0,
        nombreDestino: ""
    };

    const inicializarPaquete = (props.modo!=="nuevo" ? {...props.paquete} : nuevoPaquete);
    const [ paquete , setPaquete ] = useState(inicializarPaquete);

    const edicionPaquete = (evento) => {
        const paqueteSeleccionado = {...paquete};
        paqueteSeleccionado[evento.target.name] = evento.target.value;
        setPaquete(paqueteSeleccionado);
    }
    const onFormSubmit = (evento) => {
        evento.preventDefault();
        props.registrar(paquete);
        setPaquete(nuevoPaquete);
    }

    return (
        <form class="mx-5" onSubmit={ onFormSubmit }>
            <div className="form-group mb-2">
                <label className="control-label"><i>Dia</i></label>
                <input className="form-control" type="date"
                       name="dia" value={paquete.dia} onChange={ edicionPaquete } />
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Hora</i></label>
                <input className="form-control" type="time"
                       name="hora" value={paquete.hora} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Ancho</i></label>
                <input className="form-control" type="number"
                       name="ancho" value={paquete.ancho} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Alto</i></label>
                <input className="form-control" type="number"
                       name="alto" value={paquete.alto} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Largo</i></label>
                <input className="form-control" type="number"
                       name="largo" value={paquete.largo} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Peso</i></label>
                <input className="form-control" type="number"
                       name="peso" value={paquete.peso} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Delicado</i></label>
                <select className="form-control"
                       name="delicado" onChange={ edicionPaquete }>
                    <option>Seleccionar...</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Recoger en la direccion:</i></label>
                <input className="form-control" type="text"
                       name="direcionRecogida" value={paquete.direcionRecogida} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Recoger en la ciudad:</i></label>
                <input className="form-control" type="text"
                       name="ciudadRecogida" value={paquete.ciudadRecogida} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Cedula del remitente:</i></label>
                <input className="form-control" type="number"
                       name="cedulaRemitente" value={paquete.cedulaRemitente} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Nombre del remitente:</i></label>
                <input className="form-control" type="text"
                       name="nombreRemitente" value={paquete.nombreRemitente} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Entregar en la direccion:</i></label>
                <input className="form-control" type="text"
                       name="direcionDestino" value={paquete.direcionDestino} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Entregar en la ciudad:</i></label>
                <input className="form-control" type="text"
                       name="ciudadDestino" value={paquete.ciudadDestino} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Cedula de quien recibe:</i></label>
                <input className="form-control" type="number"
                       name="cedulaDestino" value={paquete.cedulaDestino} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group mb-2">
                <label className="control-label"><i>Nombre de quien recibe:</i></label>
                <input className="form-control" type="text"
                       name="nombreDestino" value={paquete.nombreDestino} onChange={ edicionPaquete }/>
            </div>
            <div className="form-group">
                <button className="btn btn-sm btn-primary m-2" type="submit">Guardar</button>
                <button className="btn btn-sm btn-danger" type="button" data-dismiss="modal">Cancelar</button>
            </div>
        </form>
    );
}

export default FormPaquete;