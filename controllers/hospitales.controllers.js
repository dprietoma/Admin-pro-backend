const { response } = require('express');

const Hospital = require('../models/hospital.model')

const getHospitales = async ( req, res = response ) => {

    const hospitales = await Hospital.find()
                                        .populate('usuario','nombre');

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospitales = async ( req, res = response ) => {

    const id = req.id;

    const hospital = new Hospital({
        usuario: id,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, habale con el administrador'
        })
    }
}

const actualizarHospitales = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    });
}

const borrarHospitales = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarHospitales'
    });
}


module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}