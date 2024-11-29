const { response } = require('express');

const Hospital = require('../models/hospital.model');


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

const actualizarHospitales = async ( req, res = response ) => {

    const id = req.params.id

    try {


        const hospitalDB = await Hospital.findById( id );

        if ( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuarioModifico: req.id
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        })
    }

   
}

const borrarHospitales = async ( req, res = response ) => {

    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById( id );
        if ( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'hospital no encontrado por id'
            });
        }
        await Hospital.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado correctamente'
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
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}