/**
 * 
 * Ruta: /api/hospitales
 * 
 */

const { Router } = require('express');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middlewares')

const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const { getHospitales, crearHospitales, actualizarHospitales,borrarHospitales } = require('../controllers/hospitales.controllers')

const router = Router();

router.get('/', getHospitales);

router.post('/',
    [
        validarJWT,
        body('nombre').not().isEmpty().withMessage('El nombre del hospital es obligatorio'),
        validarCampos
    ],
    crearHospitales);


router.put('/:id',
    [
        validarJWT,
        body('nombre').not().isEmpty().withMessage('El nombre del hospital es obligatorio'),
        validarCampos
    ],
    actualizarHospitales);

router.delete('/:id',
    validarJWT,
    borrarHospitales
);


module.exports = router;