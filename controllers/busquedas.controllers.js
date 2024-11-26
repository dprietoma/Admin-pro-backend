const { response } = require('express');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const getBusquedas = async (req, res = response) => {

    const text = req.params.texto;

    const regex = RegExp( text, 'i');


    const [ usuario, medico, hospital ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        msg: 'Get Busquedas',
        usuario,
        medico,
        hospital

    })
}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const text = req.params.texto;
    const regex = RegExp( text, 'i');

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img')
            break;
        
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
            .populate('usuario', 'nombre img')


            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex })

            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Tabla no existe',
            });
    }

    res.json({
        ok: true,
        resultado: data
    });
}

module.exports = {
    getBusquedas,
    getDocumentosColeccion
}