import Footer from './components/Footer'
import NavBar from './components/NavBar';
import Login from './components/Login'

import React, { useState, useEffect } from 'react';

function App() {

  const [sesionIniciada, setSesionIniciada] = useState(false);

  const cambiarSesionIniciada = (exitoLogin) => {
    setSesionIniciada(exitoLogin);
  }

  useEffect(() => {
    const tokenData = localStorage.getItem('tokenAcceso');
    if (tokenData) {
        const objToken = JSON.parse(tokenData);
        const diffMins = Math.round((((Date.now() - objToken.timestamp) % 86400000) % 3600000) / 60000);

        if (diffMins <= 60) {
          setSesionIniciada(true);
        }else {
          setSesionIniciada(false);
        }
    }
  }, [])

  const cerrarSesion = async () => {
    localStorage.setItem('tokenAcceso',null);
    setSesionIniciada(false)
  }
  const informacion = { ubicacion: "2021 IstaYA. Miami, Fl" };

  return (
    <>
        <NavBar sesionIniciada={ sesionIniciada } barCommand={ cerrarSesion } />
        { sesionIniciada ? null : <Login cambiarSesionIniciada={ cambiarSesionIniciada } /> }
        <Footer { ...informacion } />
    </>
  );
}

export default App;
