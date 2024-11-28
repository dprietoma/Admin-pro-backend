
/**
 * 
 * Ruta: /api/auth
 * 
 */
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos.middlewares');
const { body } = require('express-validator');

const router = Router();

router.post('/',
    [
        body('password', 'El Password es obligatorio').not().isEmpty(),
        body('email', 'El Email es obligatorio').isEmail(),
        validarCampos,
    ],
    login
)

router.post('/google',
    [
        body('token', 'El Token de google es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    googleSignIn
)

module.exports = router;