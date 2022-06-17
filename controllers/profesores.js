const profesores = require('../data/profesores');

async function getAllProfesores() {
    return profesores.getAllProfesores();
}

async function getProfesorById(profesorId) {
    return profesores.getProfesorById();
}

module.exports = {getAllProfesores, getProfesorById}