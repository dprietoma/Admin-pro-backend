/**
 * 
 * Ruta: /api/medicos
 * 
 */

const { Router } = require('express');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middlewares')

const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const { getMedicos, crearMedicos, actualizarMedeicos, borrarMedicos } = require('../controllers/medicos.controllers')

const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validarJWT,
        body('nombre').not().isEmpty().withMessage('El nombre del medico es obligatorio'),
        body('hospital', 'El hospital ID debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedicos);


router.put('/:id',
    [
    ],
    actualizarMedeicos);

router.delete('/:id',
    borrarMedicos
);


module.exports = router;