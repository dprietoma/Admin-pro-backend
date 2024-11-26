const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const Usuario = require('../models/usuario.model');

const getUsuarios = async (req, res) => {

    const desde = Number( req.query.desde ) || 0;

    const [ usuarios, total] =  await Promise.all([
        Usuario.find({},'nombre email role google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
        // id: req.id
    })
}

const crearUsuarios = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync();

        // Generar el token -JWT
        usuario.password = bcrypt.hashSync(password, salt);


        // Guardar usuario
        await usuario.save();
        const token = await generateJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesparado... revisar logs'
        });
    }


}


const addUsuario = async (req, res = response) => {

    const id = req.params.id;
    try {

        const usuarioDB = await Usuario.findById( id );


        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por id'
            });
        }



        // Actualizaciones
        const {password,google,email, ...campos} = req.body;
        
        if (usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( id, campos, { new: true} );


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesparado... revisar logs'
        });
    }
}


const borrarUsuario = async (req, res = response) => {
    const id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( id );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por id'
            });
        }

        await Usuario.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
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
    getUsuarios,
    crearUsuarios,
    addUsuario,
    borrarUsuario
}