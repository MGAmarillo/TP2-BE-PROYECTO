require('dotenv').config();
const { ObjectId } = require('mongodb');
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

async function getClasePorId(id){
    const connectiondb = await connection.getConnection();
    const clase = await connectiondb
                            .db(DATABASE)
                            .collection(CLASES)
                            .findOne({_id: new ObjectId(id)});
    return clase;
}

async function getClasesPorDeporte(deporte){
    const clases = await getClases();
    const clasesPorDeporte = await clases.filter(c => c.deporte === deporte);
    return clasesPorDeporte;
}

async function getClasesPorProfesor(profesor){
    const clases = await getClases();
    const clasesPorProfesor = await clases.filter(c => c.profesor === profesor);
    return clasesPorProfesor;
}

async function addClase(clase){
    const connectiondb = await connection.getConnection();
    const clases = await  connectiondb
                            .db(DATABASE)
                            .collection(CLASES)
                            .insertOne(clase);                      
    return clase;
}

async function registrarAlumno(idClase, idAlumno, alumnosPorClase){
    console.log(idClase);
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
                        .db(DATABASE)
                        .collection(CLASES)
                        .updateOne({_id: new ObjectId(idClase)}, {$set: {alumnos: alumnosPorClase}});
    return result;
}

module.exports = {getClases, getClasesPorDeporte, getClasesPorProfesor, addClase, getClasePorId, registrarAlumno}