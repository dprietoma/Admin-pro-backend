
/**
 * 
 * Ruta: /api/auth
 * 
 */
const { Router } = require('express');
const { login } = require('../controllers/auth.controllers');
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

module.exports = router;