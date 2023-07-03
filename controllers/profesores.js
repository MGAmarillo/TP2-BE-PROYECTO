
const data = require('../data/profesores');
const data2 = require('../data/clases');
const data3 = require('../data/alumnos');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = `${process.env.SECRET}`;

async function getProfesores() {
    return data.getProfesores();
}

async function getProfesorById(mail){
    let profesores = await getProfesores();
    let profesorEncontrado = profesores.find(profesor=>profesor.mail == mail);
    if(profesorEncontrado == undefined){
        return "El profesor no fue encontrado."
    }
    else{
        return profesorEncontrado;
    }
}

async function addProfesor(profesor){
    let profesores = await getProfesores();
    let profesorEncontrado = profesores.find(auxProfesor=>auxProfesor.mail == profesor.mail);
    
    if(profesorEncontrado != undefined){
        return "El mail ingresado ya existe."
    }
    else{
        let password = await bcrypt.hash(profesor.password,10);
        profesor.password = password;
        return data.addProfesor(profesor);
    }
}

async function deleteProfesor(mail){
    let profesores = await getProfesores();
    let profesorEncontrado = profesores.find(auxProfesor=>auxProfesor.mail == mail);

    if(profesorEncontrado!=undefined){
        return data.eliminarProfesor(profesorEncontrado);
    }
    else{
        return "el profesor ha eliminar no fue encontrado."
    }
    
}

async function modifyProfesor(mail,profesor){
    let profesores = await getProfesores();
    let profesorEncontrado = profesores.find(auxProfesor=>auxProfesor.mail == mail);

    if(profesorEncontrado!=undefined){
        profesor.nombre = profesorEncontrado.nombre;
        profesor.apellido = profesorEncontrado.apellido;
        profesor.mail = profesorEncontrado.mail;
        profesor.dni = profesorEncontrado.dni;
        profesor.password = profesorEncontrado.password;
        return data.updateProfesor(mail, profesor);
    }
    else{
        return "el profesor a modificar no fue encontrado."
    }
}

async function crearClase(mail,clase){
    let profesores = await getProfesores();
    let clases = await data2.getClases();

    let profesorEncontrado = profesores.find(auxProfesor => auxProfesor.mail == mail);
    let claseEncontrada = clases.find(claseAux => claseAux !== clase);
    
    if(profesorEncontrado!=undefined && claseEncontrada==undefined){
        clase.profesor = profesorEncontrado;
        await data2.addClase(clase);
        return data.agregarClase(mail,clase);
    }
    else{
        return "El profesor ingresasdo no existe o la clase que desea crear ya existe."
    }
}

async function cancelarClase(mail,id){
    let profesores = await getProfesores();
    let profesorEncontrado = profesores.find(auxProfesor => auxProfesor.mail == mail);

    let allClases = await data2.getClases();
    let claseEncontrada = allClases.find(claseAux => claseAux._id == id);

    if(profesorEncontrado != undefined && claseEncontrada!=undefined){
        await data.quitarClase(mail,id);
        await claseEncontrada.alumnos.forEach(alumno => data3.quitarClase(alumno,id));
        return data2.deleteClase(claseEncontrada);
    }
    else{
        return "La clase o el profesor no se encontraron."
    }
}

async function login(mail,password){
    let allProfesores = await getProfesores();
    let profesorEncontrado = allProfesores.find(profesorAux => profesorAux.mail == mail);

    let storedPassword = profesorEncontrado.password;

    let isPasswordValid = await bcrypt.compare(password, storedPassword);

    if(isPasswordValid && profesorEncontrado!=undefined){
        const token = jwt.sign({
            storedPassword,
            mail,
            exp: Date.now() + 60 * 1000
        },secret);
        return token;
    }
    else{
        return "La contraseña o el usuario no son correctos."
    }

}



module.exports = {getProfesores, addProfesor, crearClase, getProfesorById, deleteProfesor, modifyProfesor, cancelarClase, login}
