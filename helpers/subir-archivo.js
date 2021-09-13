const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ['png', 'jpeg', 'jpg', 'pdf'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombre = archivo.name.split('.');
        const extension = nombre[nombre.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida, solo se permiten ${extensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                return reject(err);
            }
            resolve(nombreTemp);
        });
    });
};

module.exports = {
    subirArchivo
};