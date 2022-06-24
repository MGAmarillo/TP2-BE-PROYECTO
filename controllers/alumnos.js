const dataAlumnos = require('../data/alumnos');
const dataClases = require('../data/clases');
const bcrypt = require('bcrypt')

async function getAllAlumnos() {
    return dataAlumnos.getAllAlumnos();
}

async function getAlumnoPorId(id){
    return dataAlumnos.getAlumnoPorId(id);
}

async function agregarAlumno(alumno){
    let password = await bcrypt.hash(alumno.password,10);
    let nacimiento = new Date(alumno.nacimiento);
    alumno.password = password;
    alumno.nacimiento = nacimiento;
    return dataAlumnos.agregarAlumno(alumno);
    
}

async function eliminarAlumno(mail){
    let alumnoEncontrado = await getAlumnoPorMail(mail);

    if(alumnoEncontrado != undefined){
        return dataAlumnos.eliminarAlumno(alumnoEncontrado);
    }
    else{
        console.log("El alumno a eliminar, no ha sido encontrado")
    }
}

async function modificarAlumno(mail, alumno){
    let nacimiento = new Date(alumno.nacimiento);
    alumno.nacimiento = nacimiento;
    return dataAlumnos.modificarAlumno(mail, alumno);
}

async function anotarseAClase(idClase, idAlumno){
    const alu = await dataAlumnos.getAlumnoPorId(idAlumno);
    let clasesAlumno = alu.clases;
    clasesAlumno.push(idClase);
    dataAlumnos.anotarseAClase(idClase, idAlumno, clasesAlumno);

    const clas = await dataClases.getClasePorId(idClase);
    let alumnosPorClase = clas.alumnos;
    alumnosPorClase.push(idAlumno);
    console.log(alumnosPorClase);
    dataClases.registrarAlumno(idClase, idAlumno, alumnosPorClase);
}

module.exports = {getAllAlumnos, getAlumnoPorId, agregarAlumno, eliminarAlumno, modificarAlumno, anotarseAClase}