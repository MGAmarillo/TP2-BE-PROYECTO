
const dataProf = require('../data/profesores');
const dataClases = require('../data/clases');

async function getProfesores() {
    return dataProf.getProfesores();
}

async function addProfesor(profesor){
    return dataProf.addProfesor(profesor);
}

async function altaClase(clase, id){
    const prof = await getProfesorById(id);
    console.log(prof);
    let clasesProf = prof.clases;
    console.log(clasesProf);
    clasesProf.push(clase);
    dataProf.altaClase(clase, id, clasesProf);
    dataClases.addClase(clase, id);
}

async function getProfesorById(id) {
    return dataProf.getProfesorById(id);
}

module.exports = {getProfesores, addProfesor, altaClase, getProfesorById}
