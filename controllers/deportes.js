const deportes = require('../data/deportes');

async function getDeportes() {
    return deportes.getAllDeportes();
}

async function getDeportesPorNombre(nombre) {
    let allDeportes = await deportes.getAllDeportes();
    return allDeportes.find(deportesAux => deportesAux.nombre === nombre);
}


module.exports = { getDeportes, getDeportesPorNombre };