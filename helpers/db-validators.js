const { Role, Usuario, Publicacion } = require('../models');

const esRoleValido = async(rol = '') => {
    /* Validar si existe el rol */
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {
    /* Validar si existe el usuario */
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/* Productos */
const existePublicacionPorId = async( id ) => {
    const existePublicacion = await Publicacion.findById(id);
    if ( !existePublicacion.estado ) {
        throw new Error(`El id de la publicación no existe ${ id }`);
    }
} 

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existePublicacionPorId
}

