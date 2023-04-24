const { response } = require('express')

const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        
        next();
    }
}

const esRolEliminar = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    if ( rol !== 'ROL_ALTO' ) {
        return res.status(401).json({
            msg: `EL rol ${ nombre } no puede hacer la acción`
        });
    }

    next();
}

const esRolEdicion = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    let roles = ["ROL_ALTO_MEDIO","ROL_ALTO"];
    let flag = 0;
    console.log(rol);
    roles.forEach(e => {
        if(rol != e){
            flag += 1
        }
    });
    if ( flag >= roles.length ) {
        return res.status(401).json({
            msg: `EL rol ${ nombre } no puede hacer la acción`
        });
    }
        
    next();
}

const esRolConsulta = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    let roles = ["ROL_MEDIO","ROL_MEDIO_ALTO","ROL_ALTO_MEDIO","ROL_ALTO"];
    let flag = 0;
    roles.forEach(e => {
        if(rol != e){
            flag += 1
        }
    });
    if ( flag >= roles.length ) {
        return res.status(401).json({
            msg: `EL rol ${ nombre } no puede hacer la acción`
        });
    }

    next();
}

const esRolAgregar = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    let roles = ["ROL_MEDIO_ALTO","ROL_ALTO_MEDIO","ROL_ALTO"];
    let flag = 0;
    roles.forEach(e => {
        if(rol != e){
            flag += 1
        }
    });
    if ( flag >= roles.length ) {
        return res.status(401).json({
            msg: `EL rol ${ nombre } no puede hacer la acción`
        });
    }

    next();
}

module.exports = {
    tieneRole,
    esRolConsulta,
    esRolAgregar,
    esRolEliminar,
    esRolEdicion
}