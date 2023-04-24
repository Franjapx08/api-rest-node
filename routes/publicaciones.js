const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esRolEliminar, esRolEdicion, esRolConsulta, esRolAgregar } = require('../middlewares');
const { existeUsuarioPorId, existePublicacionPorId } = require('../helpers/db-validators');

const { publicacionesGET,
        publicacionesPOST,
        publicacionesPUT,
        publicacionesDELETE 
    } = require('../controllers/publicaciones');

const router = Router();

/* Ver publicaciones */
router.get('/', [ validarJWT, esRolConsulta ], publicacionesGET);

/* Registrar publicacion */
router.post('/', [
    validarJWT,
    esRolAgregar,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    /* Validar usuario id */
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('usuario', 'no es un id de usuario valido').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos /* retorna el mensaje de error obtenido en el proceso */
], publicacionesPOST);

/* Modificar publicacion id */
router.put('/:id',[
    validarJWT,
    esRolEdicion,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    /* Validar id */
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existePublicacionPorId ),
    validarCampos
], publicacionesPUT );

/* Eliminar publicacion */
router.delete('/:id',[
    validarJWT,
    esRolEliminar,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existePublicacionPorId ),
    validarCampos
],publicacionesDELETE );

module.exports = router;