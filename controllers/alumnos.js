const alumnos = require('../data/alumnos');
const bcrypt = require('bcryptjs')

async function getAllAlumnos() {
    return alumnos.getAllAlumnos();
}

async function getAlumnoPorMail(mail){
    let alumnos = await getAllAlumnos();
    return alumnos.find(alumno => alumno.mail == mail);
}

async function agregarAlumno(alumno){
    let password = await bcrypt.hash(alumno.password,10);
    let nacimiento = new Date(alumno.nacimiento);
    alumno.password = password;
    alumno.nacimiento = nacimiento;
    return alumnos.agregarAlumno(alumno);
    
}

async function eliminarAlumno(mail){
    let alumnoEncontrado = await getAlumnoPorMail(mail);

    if(alumnoEncontrado != undefined){
        return alumnos.eliminarAlumno(alumnoEncontrado);
    }
    else{
        console.log("El alumno ha eliminar, no ha sido encontrado")
    }
}

async function modificarAlumno(mail, alumno){
    let nacimiento = new Date(alumno.nacimiento);
    alumno.nacimiento = nacimiento;
    return alumnos.modificarAlumno(mail, alumno);
}



module.exports = {getAllAlumnos, getAlumnoPorMail, agregarAlumno, eliminarAlumno, modificarAlumno}