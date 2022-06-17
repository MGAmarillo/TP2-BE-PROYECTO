const conn = require('./connection');
const DATABASE = 'gym_meetings';
const PROFESORES = 'profesores';
const objectId = require('mongodb').ObjectId;

async function getAllProfesores() {
    const connectiondb = await conn.getConnection();
    const profesores = await connectiondb
                        .db(DATABASE)
                        .collection(PROFESORES)
                        .find()
                        .toArray();
    return profesores;
}

async function getProfesorById(profesorId) {
    const connectiondb = await conn.getConnection();
    const query = {_id: new objectId(profesorId)};
    const profesores = await connectiondb
                        .db(DATABASE)
                        .collection(PROFESORES)
                        .find(query)
                        .toArray();
    return profesores;
}

module.exports = {getAllProfesores, getProfesorById};