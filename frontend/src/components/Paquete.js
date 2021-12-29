import PaqueteDelicado from './PaqueteDelicado';

let Paquete = ({ cancelarPaquete, editarPaquete, ...props }) => {

    const onCancelarPaquete = (event) => {
        event.preventDefault();
        cancelarPaquete(props._id);
    }
    const onEditarPaquete = (event) => {
        event.preventDefault();
        editarPaquete(props);
    }
    return(
        <tr>
            <th scope="row" class="align-middle">{ props._id }</th>
            <td>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-1 me-auto">
                            <div class="fw-bold">{ props.dia }</div>
                            { props.hora }
                        </div>
                        <span><PaqueteDelicado status = { props.delicado } /></span>
                    </li>
                </ul>
            </td>
            <td class="align-middle">
                <p>
                    { props.alto },
                    { props.largo },
                    { props.peso }
                </p>
                <span className="badge rounded-pill bg-warning">{ props.estado }</span>
            </td>
            <td>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-1 me-auto">
                            <div class="fw-bold">{ props.cedulaRemitente }, { props.nombreRemitente }</div>
                            { props.direcionRecogida }, { props.ciudadRecogida }
                        </div>
                    </li>
                </ul>
            </td>
            <td>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-1 me-auto">
                            <div class="fw-bold">{ props.cedulaDestino }, { props.nombreDestino }</div>
                            { props.direcionDestino }, { props.ciudadDestino }
                        </div>
                    </li>
                </ul>
            </td>
            <td class="align-middle">
                <div class="ms-1 me-auto">
                    <div>
                        <span className="badge bg-danger" type="button"
                                onClick={ onCancelarPaquete }>Cancelar</span>
                    </div>
                    <div>
                        <span className="badge bg-warning" type="button"
                                onClick={ onEditarPaquete }>Editar</span>
                    </div>
                </div>
            </td>
        </tr>
    );
}
export default Paquete;
