require('dotenv').config();
const connection = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DATABASE = 'gym_meetings';
const PROFESORES = 'profesores';
const objectId = require('mongodb').ObjectId;

async function getProfesores(){
    const connectiondb = await connection.getConnection();
    const profes = await connectiondb
                            .db(DATABASE)
                            .collection(PROFESORES)
                            .find()
                            .toArray();
    return profes;
}

async function addProfesor(profesor){
    const connectiondb = await connection.getConnection();
    profesor.password = await bcrypt.hash(profesor.password, 8);
    const users = await  connectiondb
                            .db(DATABASE)
                            .collection(PROFESORES)
                            .insertOne(profesor);
    return profesor;
}

async function altaClase(clase){
    const connectiondb = await connection.getConnection();
    const profes = await connectiondb
                            .db(DATABASE)
                            .collection(PROFESORES)
    
}

async function findByCredential(mail, password){
    const connectiondb = await connection.getConnection();
    const prof = await  connectiondb
                            .db(DATABASE)
                            .collection(PROFESORES)
                            .findOne({mail: mail});
    if(!prof){
        throw new Error('Usuario o contraseña incorrectos');
    }
    
    const isMatch = await bcrypt.compare(password, prof.password);

    if(!isMatch){
        throw new Error('Usuario o contraseña incorrectos');
    }

    return prof;
}

function generatedToken(prof){
    const token = jwt.sign({_id: prof._id, mail: prof.mail}, process.env.CLAVE_SECRETA, {expiresIn: "2h"});
    return token;
}

module.exports = {addProfesor, findByCredential, generatedToken, getProfesores}