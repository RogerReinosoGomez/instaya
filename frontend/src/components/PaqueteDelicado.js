let PaqueteDelicado = (props) => {
    return (
        props.delicado?
            <span className="badge rounded-pill bg-warning">Delicado</span>
            :<span className="badge rounded-pill bg-secondary">No delicado</span>
    );
}

export default PaqueteDelicado;
