const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const Usuario = require('../models/usuario.model');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {


        // verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        // Generar token
        const token = await generateJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'Login exitoso',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const googleSignIn = async (req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: ':P',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }


        // Guardar usuario
        await usuario.save();

        // Generar token
        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token de google no valido'
        })
    }


}


module.exports = {
    login,
    googleSignIn
}