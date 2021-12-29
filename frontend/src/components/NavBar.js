import instaya from '../img/iconos/instaya.png'

let NavBar = (props) => {

    const onBarCommand = async () => {
      props.barCommand();
    };

    return (
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mx-5 mb-4 border-bottom sticky-top">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <img className="bi" src={ instaya } alt='log' width="40" height="40" />
            </a>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li>
                    <a href="none" className="nav-link px-2 link-light"> </a>
                </li>
                <li>
                    <a href="none" className="nav-link px-2 link-light"> </a>
                </li>
                <li>
                    <a href="none" className="nav-link px-2 link-light"> </a>
                </li>
                <li>
                    <a href="none" className="nav-link px-2 link-light"> </a>
                </li>
            </ul>
            <div className="col-md-3 text-end">
                <form className="d-flex">
                    { props.sesionIniciada ? <button className="btn btn-outline-primary me-2" type="submit" onClick={  onBarCommand }>Salir</button> : null }
                </form>
            </div>
        </header>
    );
}

export default NavBar;