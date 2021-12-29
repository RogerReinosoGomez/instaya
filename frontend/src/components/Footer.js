import twitter from '../img/iconos/twitter.png'
import facebook from '../img/iconos/facebook.png'
import instagram from '../img/iconos/instagram.png'

import '../App.css'

let Footer = (informacion) => {
    return(
        <footer className=" footer d-flex flex-wrap justify-content-between align-items-center pt-3 mt-4 mx-5 border-top navbar navbar-fixed-bottom">
            <div className="col-md-4 d-flex align-items-center">
                <span className="text-white">&reg; { informacion.ubicacion }</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3">
                    <a href="/">
                        <img className="bi" src={ facebook } alt='facebook' width="24" height="24" />
                    </a>
                </li>
                <li className="ms-3">
                    <a href="/">
                        <img className="bi" src={ instagram } alt='instagram' width="24" height="24" />
                    </a>
                </li>
                <li className="ms-3">
                    <a href="/">
                        <img className="bi" src={ twitter } alt='twitter' width="24" height="24" />
                    </a>
                </li>
            </ul>
        </footer>
    );
}
export default Footer;
