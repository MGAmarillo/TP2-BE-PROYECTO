const alumnos = require('../data/alumnos');
const clases = require('../data/clases');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

async function getAllAlumnos() {
    return alumnos.getAllAlumnos();
}

async function getAlumnoPorMail(mail){
    let alumnos = await getAllAlumnos();
    let alumnoEncontrado = alumnos.find(alumno => alumno.mail == mail);
    if(alumnoEncontrado == undefined){
        return "El alumno no fue encontrado";
    }
    else{
        return alumnoEncontrado
    }
    
}

async function agregarAlumno(alumno){
    
    let allAlumnos = await getAllAlumnos();
    let alumnoEncontrado = allAlumnos.find(auxAlumno=>auxAlumno.mail==alumno.mail);
    
    if(alumnoEncontrado != undefined){
        return "El mail ingresado ya existe.";
    }
    else{
        let password = await bcrypt.hash(alumno.password,10);
        alumno.password = password;
        return alumnos.agregarAlumno(alumno);
    }

    
    
}

async function eliminarAlumno(mail){
    let allAlumnos = await getAllAlumnos();
    let alumnoEncontrado = allAlumnos.find(auxAlumno=>auxAlumno.mail==mail);

    if(alumnoEncontrado != undefined){
        return alumnos.eliminarAlumno(alumnoEncontrado);
    }
    else{
        return "El alumno ha eliminar, no ha sido encontrado."
    }
}

async function modificarAlumno(mail, alumno){
    let allAlumnos = await getAllAlumnos();
    let alumnoEncontrado = allAlumnos.find(auxAlumno=>auxAlumno.mail==mail);

    if(alumnoEncontrado != undefined){
        alumno.nombre = alumnoEncontrado.nombre;
        alumno.apellido = alumnoEncontrado.apellido;
        alumno.mail = alumnoEncontrado.mail;
        alumno.dni = alumnoEncontrado.dni;
        alumno.password = alumnoEncontrado.password;
    }
    else{
        return "El alumno ha modificar, no ha sido encontrado."
    }

    
    return alumnos.modificarAlumno(mail, alumno);
}

async function anotarseEnClase(mail,id){
   let allAlumnos = await getAllAlumnos();
   let alumnoEncontrado = allAlumnos.find(alumnoAux => alumnoAux.mail == mail); 

   let allClases = await clases.getClases();
   let claseEncontrada = allClases.find(claseAux => claseAux._id == id);

   if(claseEncontrada != undefined && alumnoEncontrado!=undefined){
    await clases.agregarAlumno(claseEncontrada,alumnoEncontrado);
    return alumnos.anotarseEnClase(mail, claseEncontrada);
   }
   else{
    return "el alumno o la clase no fueron encontrados";
   }
}

async function cancelarClase(mail,id){
    let allAlumnos = await getAllAlumnos();
    let alumnoEncontrado = allAlumnos.find(alumnoAux => alumnoAux.mail == mail);

    let allClases = await clases.getClases();
    let claseEncontrada = allClases.find(claseAux => claseAux._id == id);

    if(claseEncontrada!=undefined && alumnoEncontrado!=undefined){
        await clases.retirarAlumnoDeClase(claseEncontrada._id,alumnoEncontrado._id)
        return alumnos.quitarClase(alumnoEncontrado,id);
    }
    else{
        return "La clase o el alumno no fueron encontrados."
    }
}

async function login(mail,password){
    let allAlumnos = await getAllAlumnos();
    let alumnoEncontrado = allAlumnos.find(alumnoAux => alumnoAux.mail == mail);

    let storedPassword = alumnoEncontrado.password;

    let isPasswordValid = await bcrypt.compare(password, storedPassword);

    if(isPasswordValid && alumnoEncontrado!=undefined){
        const token = jwt.sign({
            storedPassword,
            mail,
            exp: Date.now() + 60 * 1000
        }, secret);
        return token;
    }
    else{
        return "La contraseña o el usuario no son correctos."
    }

}






module.exports = {getAllAlumnos, getAlumnoPorMail, agregarAlumno, eliminarAlumno, modificarAlumno, anotarseEnClase, cancelarClase, login}