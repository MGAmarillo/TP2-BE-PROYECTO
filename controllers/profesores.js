
const data = require('../data/profesores');
const data2 = require('../data/clases');

async function getProfesores() {
    return data.getProfesores();
}

async function addProfesor(profesor){
    return data.addProfesor(profesor);
}

async function altaClase(clase, id){
    data.altaClase(clase, id);
    data2.addClase(clase, id);
}

async function getProfesorById(profesorId) {
    return data.getProfesorById();
}

module.exports = {getProfesores, addProfesor, altaClase, getProfesorById}
