const express = require('express');
const { Usuario } = require('../models/Usuario');
const { validarUsuario } = require('../utils/authUtils');

const router = express.Router();

router.post('/registrar', async (request, response) => {
    console.log("Iniciando el proceso de registro.");
    try {
        const usuario = await Usuario.findOne({ cedula: request.body.cedula }).exec();
        if (!usuario) {
            console.log(`Registrando al usuario ${ request.body.nombre } con CC No. ${ request.body.cedula }.`);
            const usuario = new Usuario(request.body);
            await usuario.save();
            response.send({
                            "mensaje" :"Usuario registrado con exito."
                        });
            console.log("Usuario registrado con exito!")
        } else{
            response.send({
                            "mensaje": "Ya existe un usuario con el número de cédula."
                        });
        }
    }catch (error) {
        response.status(500).send("Ocurrió un error en la base de datos de usuarios.");
        console.log(error);
    }
});

//Autenticación de usuarios (al hacer login).
router.post('/auth', async (request, response) => {
    try {
        const { tokenRefresco, tokenAcceso } = await validarUsuario(request.body);
        console.log("Iniciando sesion.")
        response.cookie('RTC',tokenRefresco, { httpOnly: true })
                .json({
                        token: tokenAcceso
                });
    } catch (error) {
        console.log("Error al intentar iniciar sesión: ");
        console.log(error);
        response.status(403).send("Nombre de usuario o contraseña incorrecta.");
    }
});

module.exports = router;