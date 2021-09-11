const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');
const router = Router();

// Obtener las productos
router.get('/', obtenerProductos);

// Obtener producto por id
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);

// Crear una producto - privado - tiene que tener token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría no es un id de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);

// Actualizar una producto - privado - tiene que tener token valido
router.put('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto);

// Eliminar una Producto - privado - tiene que tener token valido
router.delete('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);

module.exports = router;