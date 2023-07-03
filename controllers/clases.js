const clases = require('../data/clases');
const profesores = require('../data/profesores');

async function getClases() {
    return clases.getClases();
}

async function getClasesPorDeporte(deporte){
    let clasesFiltradas = await clases.getClasesPorDeporte(deporte);
    return clasesFiltradas;
}

async function getClasesPorProfesor(nombre,apellido){
    return clases.getClasesPorProfesor(nombre,apellido);
}

async function addClase(clase){
    return clases.addClase(clase);
}

module.exports = {getClases, getClasesPorDeporte, getClasesPorProfesor, addClase}