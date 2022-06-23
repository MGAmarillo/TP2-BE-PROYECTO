const data = require('../data/usuarios');

async function getAllUsuarios() {
    return data.getAllUsuarios();
}

async function addUser(user){
    return data.addUser(user);
}

async function getAlumnos(){
    return data.getAlumnos();
}

async function getProfesores(){
    return data.getProfesores();
}

module.exports = {getAllUsuarios, addUser, getAlumnos, getProfesores}