const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const validarRolAcceso = require('./validar-rol');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...validarRolAcceso
}