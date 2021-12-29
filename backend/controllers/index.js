const UsuariosController = require('./UsuariosController');
const PaquetesController = require('./PaquetesController');

exports.registrarControladores = (app) => {
    app.use('/usuarios', UsuariosController);
    app.use('/paquetes', PaquetesController);
}