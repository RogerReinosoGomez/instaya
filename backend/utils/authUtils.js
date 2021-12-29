const { sign } = require('jsonwebtoken');
const { Usuario } = require('../models/Usuario');

const getTokenPair = async (usuario) => {
    const tokenAcceso = await sign(
                        {
                            _id: usuario._id,
                            cedula: usuario.cedula
                        },
                        process.env.JWT_ACCESS_SECRET,
                        {
                            expiresIn: '15m'
                        });
    const tokenRefresco = await sign(
                        {
                            _id: usuario._id,
                            cedula: usuario.cedula
                        },
                        process.env.JWT_REFRESH_SECRET,
                        {
                            expiresIn: '7d'
                        });

    console.log("Tokens generados.");

    return { tokenRefresco, tokenAcceso };
}

const validarUsuario = async (peticion) => {
    const usuario = await Usuario.findOne({ cedula: peticion.cedula });

    if (!usuario) throw new Error('Usuario o contraseña no valido.');
    console.log('Validando usuario...');
    const passwordMatch = await usuario.compararPassword(peticion.password)
    if (!passwordMatch) throw new Error('Usuario o contraseña no valido.');

    return await getTokenPair(usuario);
}

exports.validarUsuario = validarUsuario;
exports.getTokenPair = getTokenPair;