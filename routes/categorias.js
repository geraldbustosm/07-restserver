const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerCategorias, crearCategoria, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');
const { existeCategoria } = require('../helpers/db-validators');
const router = Router();

// Obtener las categorias
router.get('/', obtenerCategorias);

// Obtener categoria por id
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria);

// Crear una categoria - privado - tiene que tener token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una categoria - privado - tiene que tener token valido
router.put('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

// Eliminar una categoria - privado - tiene que tener token valido
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;