const express = require('express');
const { secureInstaya } = require('../middlewares/auth');
const { Paquete } = require('../models/Paquete');

const router = express.Router();

router.get('/paquetesregistrados', secureInstaya, async (request, response) => {
    console.log("Listado de paquetes.");
    try {
        const page = Number(request.query.page);
        const limit = Number(request.query.limit);
        const datos = await Paquete.find({ cedulaRemitente: request.body.cedulaRemitente },{},{ sort: { _id:1 }, skip: ((page-1)*limit), limit: limit }).exec();
        response.send(datos);
    } catch (error) {
        console.log("Error al consultar los paquetes.");
        console.log(error);
    }
});

router.post('/registrarpaquete', secureInstaya, async (request, response) => {
    console.log("Iniciando el proceso de registro de paquete.");
    try {
        console.log("Registrando paquete...");
        const paquete = new Paquete(request.body);
        await paquete.save();
        response.send({
                        "mensaje" :"Paquete registrado con exito."
                    });
        console.log("Paquete registrado con exito!")
    }catch (error) {
        response.status(500).send("Ocurrió un error en la base de datos de usuarios.");
        console.log(error);
    }
});

router.put('/estadoCancelado', secureInstaya, async (request, response) => {
    console.log("Cancelando paquete...");
    try {
        const paquete = await Paquete.findOne({ _id: request.body._id });
        paquete.estado = "Cancelado";
        await paquete.save();
        response.json({ mensaje: "Paquete cancelado con exito." } );
    } catch (error) {
        response.sendStatus(500);
        console.log(error);
    }
});

router.put('/estadoCumplido', secureInstaya, async (request, response) => {
    console.log("Cumpliendo paquete...");
    try {
        const paquete = await Paquete.findOne({ _id: request.body._id });
        paquete.estado = "Cumplido";
        await paquete.save();
        response.json({ mensaje: "Paquete cumplido con exito." } );
    } catch (error) {
        response.sendStatus(500);
        console.log(error);
    }
});

router.put('/editar', secureInstaya, async (request, response) => {
    console.log("Actualizando datos del paquete...");
    try {
        const datosActualizados = request.body;
        await Paquete.findByIdAndUpdate(datosActualizados._id, datosActualizados);
        response.json({ mensaje: "Paquete editado con exito." } );
    } catch (error) {
        response.sendStatus(500);
        console.log(error);
    }
});

module.exports = router;