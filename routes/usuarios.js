const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esRolConsulta, esRolEdicion, esRolEliminar } = require('../middlewares');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete 
    } = require('../controllers/usuarios');

const router = Router();

// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),

/* Ver usuarios */
router.get('/', [ validarJWT, esRolConsulta ], usuariosGet);

/* Registro */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 3 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ), 
    validarCampos /* retorna el mensaje de error obtenido en el proceso */
], usuariosPost);

/* Modificar usuario id */
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    esRolEdicion,
    validarCampos
], usuariosPut );

/* Eliminar usuario */
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    esRolEliminar,
    validarCampos
],usuariosDelete );

module.exports = router;