/**
 * 
 * Ruta: /api/todo
 * 
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const { getBusquedas, getDocumentosColeccion } = require('../controllers/busquedas.controllers');

const router = Router();


router.get('/:texto', validarJWT, getBusquedas );
router.get('/coleccion/:tabla/:texto', validarJWT, getDocumentosColeccion );


module.exports = router;