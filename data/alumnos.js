const conn = require('./connection');
const DATABASE = 'gym_meetings';
const ALUMNOS = 'alumnos';
const USUARIOS = 'users';
const objectId = require('mongodb').ObjectId;

async function getAllAlumnos(){
    const connectiondb = await conn.getConnection();
    const alumnos = await connectiondb
                        .db(DATABASE)
                        .collection(ALUMNOS)
                        .find()
                        .toArray();
    return alumnos;
}

async function agregarAlumno(alumno){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(ALUMNOS)
        .insertOne(alumno);
    return result;
}

 async function eliminarAlumno(alumno){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(ALUMNOS)
        .deleteOne(alumno)
    return result;
 }

 async function modificarAlumno(mail, alumno){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(ALUMNOS)
        .updateOne({mail: mail}, {$set: {nombre: alumno.nombre, apellido: alumno.apellido, 
            dni:alumno.dni, telefono:alumno.telefono, nacimiento:alumno.nacimiento}})
    return result;
 }

 async function anotarseEnClase(mail,clase){
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
        .db(DATABASE)
        .collection(ALUMNOS)
        .updateOne({mail:mail},{$push:{clases: clase}})
 }

 async function quitarClase(alumno, id) {
    const clientmongo = await conn.getConnection();
    const result = await clientmongo
      .db(DATABASE)
      .collection(ALUMNOS)
      .updateOne({ mail: alumno.mail }, { $pull: { clases: { _id: objectId(id) } } });
  }

module.exports = {getAllAlumnos, agregarAlumno, eliminarAlumno, modificarAlumno, anotarseEnClase, quitarClase}