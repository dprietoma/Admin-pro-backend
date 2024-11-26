/**
 * 
 * Ruta: /api/uploads
 * 
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt.middleware');
const expressfileUpload = require('express-fileupload');

const { fileUpLoad, retornaImagen } = require('../controllers/uploads.controllers');



const router = Router();

// default options
router.use(expressfileUpload());


router.put('/:tipo/:id', validarJWT,fileUpLoad );
router.get('/:tipo/:foto', retornaImagen );


module.exports = router;