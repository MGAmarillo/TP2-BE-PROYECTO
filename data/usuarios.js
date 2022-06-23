require('dotenv').config();
const connection = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DATABASE = 'gym_meetings';
const USERS = 'usuarios';
const objectId = require('mongodb').ObjectId;

async function getAllUsuarios(){
    const connectiondb = await connection.getConnection();
    const users = await connectiondb
                            .db(DATABASE)
                            .collection(USERS)
                            .find()
                            .toArray();
    return users;
}

async function addUser(user){
    const connectiondb = await connection.getConnection();
    user.password = await bcrypt.hash(user.password, 8);
    const users = await  connectiondb
                            .db(DATABASE)
                            .collection(USERS)
                            .insertOne(user);
    return user;
}

async function getAlumnos(){
    const users = await getAllUsuarios();
    const alumnos = users.filter(user => user.alumno === true);
    return alumnos;
}

async function getProfesores(){
    const users = await getAllUsuarios();
    const profesores = users.filter(user => user.profesor === true);
    return profesores;
}

async function findByCredential(mail, password){
    const connectiondb = await connection.getConnection();
    const user = await  connectiondb
                            .db(DATABASE)
                            .collection(USERS)
                            .findOne({mail: mail});
    if(!user){
        throw new Error('Usuario o contraseña incorrectos');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Usuario o contraseña incorrectos');
    }

    return user;
}

function generatedToken(user){
    const token = jwt.sign({_id: user._id, mail: user.mail, profesor: user.profesor, alumno: user.alumno}, process.env.CLAVE_SECRETA, {expiresIn: "2h"});
    return token;
}

module.exports = {getAllUsuarios, addUser, findByCredential, generatedToken, getAlumnos, getProfesores}