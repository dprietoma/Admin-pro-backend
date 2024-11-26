const { response } = require('express');

const Medico = require('../models/medico.model')

const getMedicos = async ( req, res = response ) => {


    const medicos = await Medico.find()
    .populate('usuario','nombre')
    .populate('hospital','nombre')

    res.json({
        ok: true,
        medicos
    });
}

const crearMedicos = async ( req, res = response )  => {

    const id = req.id;

    const medico = new Medico({
        usuario: id,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear un nuevo médico, contacte con el administrador',
        })
    }

}   

const actualizarMedeicos = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarMedeicos'
    });
}

const borrarMedicos = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarMedicos'
    });
}


module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedeicos,
    borrarMedicos
}