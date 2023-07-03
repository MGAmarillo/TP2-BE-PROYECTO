require('dotenv').config();
const { ConnectionPoolMonitoringEvent } = require('mongodb');
const connection = require('./connection');
const profesores = require('./profesores')
const DATABASE = 'gym_meetings';
const CLASES = 'clases';
const objectId = require('mongodb').ObjectId;

async function getClases(){
    const connectiondb = await connection.getConnection();
    const clases = await connectiondb
                            .db(DATABASE)
                            .collection(CLASES)
                            .find()
                            .toArray();
    return clases;
}

async function getClasesPorDeporte(deporte){
    const clases = await getClases();
    const clasesPorDeporte = await clases.filter(c => c.deporte.nombre == deporte.nombre);
    return clasesPorDeporte;
}

async function getClasesPorProfesor(nombre,apellido){
    const clases = await getClases();
    const clasesPorProfesor = await clases.filter(c => c.profesor.nombre == nombre && c.profesor.apellido == apellido);
    return clasesPorProfesor;
}

async function addClase(clase){
    const connectiondb = await connection.getConnection();
    const idProf = clase.profesor_id;
    const clases = await  connectiondb
                            .db(DATABASE)
                            .collection(CLASES)
                            .insertOne(clase);                  
    return clase;
}

async function deleteClase(clase){
    const connectiondb = await connection.getConnection();
    const clases = await  connectiondb
                            .db(DATABASE)
                            .collection(CLASES)
                            .deleteOne(clase);
    return clases;
}

async function agregarAlumno(clase,alumno){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db(DATABASE)
        .collection(CLASES)
        .updateOne({id:clase.id},{$push:{alumnos: alumno}})    
 }

 async function retirarAlumnoDeClase(claseId, alumnoId){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
      .db(DATABASE)
      .collection(CLASES)
      .updateOne({_id:claseId}, { $pull: { alumnos: { _id: alumnoId} } });
}

module.exports = {getClases, getClasesPorDeporte, getClasesPorProfesor, addClase, deleteClase,agregarAlumno,retirarAlumnoDeClase}