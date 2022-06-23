const clases = require('../data/clases');

async function getClases() {
    return clases.getClases();
}

async function getClasesPorDeporte(deporte){
    return clases.getClasesPorDeporte(deporte);
}

async function getClasesPorProfesor(profesor){
    return clases.getClasesPorProfesor(profesor);
}

async function addClase(clase){
    return clases.addClase(clase);
}

module.exports = {getClases, getClasesPorDeporte, getClasesPorProfesor, addClase}