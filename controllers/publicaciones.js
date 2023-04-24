
const { response } = require('express');

const Publicacion = require('../models/publicacion');

const { validationResult } = require('express-validator');

const publicacionesGET = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    var populateQuery = [{path:'usuario', select:['nombre','rol']}];

    const [ total, publicaciones ] = await Promise.all([
        Publicacion.countDocuments(query),
        Publicacion.find(query)
            .populate(populateQuery)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        publicaciones
    });
}

const publicacionesPOST = async(req, res = response) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    const {titulo, descripcion, usuario} = req.body;
    const publicacion = new Publicacion( {titulo, descripcion, usuario /* req.usuario._id */} );

    /* Guardar en BD */
    await publicacion.save();

    res.json(publicacion);
}

const publicacionesPUT = async(req, res = response) => {

    const { id } = req.params;
    const { _id, titulo, descripcion, usuario } = req.body;
    
    const publicacion = await Publicacion.findByIdAndUpdate( id, {titulo, descripcion, usuario} );

    res.json(publicacion);
}

const publicacionesDELETE = async(req, res = response) => {
    const { id } = req.params;

    const publicacion = await Publicacion.findByIdAndUpdate( id, { estado: false } );

    res.json(publicacion);
}

module.exports = {
    publicacionesGET,
    publicacionesPOST,
    publicacionesPUT,
    publicacionesDELETE
}