const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpLoad = (req, res = response) => {


    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es valido ese tipo'
        });
    }


    // se valida que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos para subir'
        });
    }

    // Procesar una imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es valido ese tipo de archivo',
        });
    }

    // generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover Imagen
    file.mv(path,  (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // actualizar base de datos
        actualizarImagen( tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Imagen subida correctamente',
            nombreArchivo,
        })
    });
}

const retornaImagen = ( req, res = response ) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);
    
    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
    
        const pathImg = path.join( __dirname, `../uploads/no-images.jpeg`);
        res.sendFile( pathImg );
    }

}



module.exports = {
    fileUpLoad,
    retornaImagen
}