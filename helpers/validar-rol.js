
const validarRolAcceso = (rol = '') => {
    let testRol = rol.toUpperCase();
    let roles = ["ROL_BASICO","ROL_MEDIO","ROL_MEDIO_ALTO","ROL_ALTO_MEDIO","ROL_ALTO"];
    let flag = 0;
    roles.forEach(e => {
        if(testRol != e){
            flag += 1
        }
    });
    if( flag >= roles.length ){
        return false;
    }
    return true;
}

module.exports = {
    validarRolAcceso
}

