const { Schema, model } = require('mongoose');

const paqueteSchema = new Schema({
    dia: {
        type: String,
        required: [true, 'La fecha es obligatoria.']
    },
    hora: {
        type: String,
        required: [true, 'La hora es obligatoria.']
    },
    ancho: {
        type: Number,
        required: [true, 'La dimension ancho es obligatoria.']
    },
    alto: {
        type: Number,
        required: [true, 'La dimension alto es obligatoria.']
    },
    largo: {
        type: Number,
        required: [true, 'La dimension largo es obligatoria.']
    },
    peso: {
        type: Number,
        required: [true, 'El peso es obligatoria.']

    },
    delicado: {
        type: Boolean,
        required: [true, 'El cuidado es obligatoria.']
    },
    estado: {
        type: String,
        default: "Guardado",
        required: [true, 'El cuidado es obligatoria.']
    },
    direcionRecogida: {
        type: String,
        required: [true, 'La dirección origen es obligatoria.']
    },
    ciudadRecogida: {
        type: String,
        required: [true, 'La ciudad origen es obligatoria.']
    },
    cedulaRemitente: {
        type: Number,
        required: [true, 'La cedula del remitente es obligatoria.']
    },
    nombreRemitente: {
        type: String,
        max: [50, 'La longitud del campo supera lo permitido (50)'],
        required: [true, 'El nombre completo es obligatorio.']
    },
    direcionDestino: {
        type: String,
        required: [true, 'La dirección destino es obligatoria.']
    },
    ciudadDestino: {
        type: String,
        required: [true, 'La ciudad origen es obligatoria.']
    },
    cedulaDestino: {
        type: Number,
        required: [true, 'La cedula del receptor es obligatoria.']
    },
    nombreDestino: {
        type: String,
        max: [50, 'La longitud del campo supera lo permitido (50)'],
        required: [true, 'El nombre del receptor es obligatorio.']
    }
},
{
    collection: 'Paquetes',
    versionKey: false
});

exports.Paquete = model('Paquete', paqueteSchema);