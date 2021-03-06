const { Role, Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async (rol) => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la base de datos`);
}

const emailExiste = async (correo) => {
    // Verificar si correo existe
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) throw new Error(`El correo ${correo} ya existe`);
}

const existeUsuarioPorId = async (id) => {
    // Verificar si correo existe
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) throw new Error(`El id ${id} no existe`);
}

const existeCategoria = async(id) => {
    
    const categoria = await Categoria.findById(id);
    
    if(!categoria) throw new Error(`La categoria con id ${id} no existe`);

};

const existeProducto = async(id) => {
    
    const producto = await Producto.findById(id);
    
    if(!producto) throw new Error(`El producto con id ${id} no existe`);

};

const coleccionesPermitidas = (coleccion, colecciones) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida) throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);

    return true;
};

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
};