/**
 * 
 * Ruta: /api/usuarios
 * 
 */

const { Router } = require('express');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middlewares')

const { getUsuarios, crearUsuarios, addUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');
const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();

router.get('/',validarJWT, getUsuarios);

router.post('/',
    [
        body('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        body('password', 'El Password es obligatorio').not().isEmpty(),
        body('email', 'El Email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuarios);


router.put('/:id',
    [
        validarJWT,
        body('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        body('email', 'El Email es obligatorio').isEmail(),
        body('role', 'El role es obligatorio').not().isEmpty(),
    ],
    addUsuario);

router.delete('/:id',
    validarJWT,
    borrarUsuario
);


module.exports = router;