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

const actualizarMedicos = async ( req, res = response ) => {

    const id = req.params.id

    try {
        const medicoDB = await Medico.findById( id );

        if ( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuarioModifico: req.id
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true});

        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        })
    }

}

const borrarMedicos = async ( req, res = response ) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById( id );
        if ( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'medico no encontrado por id'
            });
        }
        await Medico.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: 'Medico eliminado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesparado... revisar logs!!!!!!!'
        });
    }
}


module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}