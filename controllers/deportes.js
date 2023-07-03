const deportes = require('../data/deportes');

async function getDeportes() {
    return deportes.getAllDeportes();
}

async function getDeportesPorNombre(nombre) {
    let allDeportes = await deportes.getAllDeportes();
    let deporteEncontrado = allDeportes.find(deporte=>deporte.nombre == nombre);
    
    if(deporteEncontrado == undefined){
        return "No se encontró el deporte";
    }
    else{
        return deporteEncontrado;
    }
}

async function insertDeporte(deporte){
    let allDeportes = await deportes.getAllDeportes();
    let deporteEncontrado = allDeportes.find(auxDeporte=>auxDeporte.nombre == deporte.nombre);

    if(deporteEncontrado == undefined){
        return deportes.agregarDeporte(deporte);
    }
    else{
        return "El deporte que desea agregar, ya ha sido cargado previamente."
    }
    
}

async function deleteDeporte(nombre){
    let allDeportes = await deportes.getAllDeportes();
    let deporteEncontrado = allDeportes.find(auxDeporte=>auxDeporte.nombre == nombre);

    if(deporteEncontrado != undefined){
        return deportes.eliminarDeporte(deporteEncontrado)
    }
    else{
        return "El deporte que desea eliminar, no ha sido cargado previamente."
    }
}



module.exports = { getDeportes, getDeportesPorNombre, insertDeporte, deleteDeporte};