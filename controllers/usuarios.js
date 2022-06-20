const data = require('../data/usuarios');

async function getAllUsuarios() {
    return data.getAllUsuarios();
}

async function addUser(user){
    return data.addUser(user);
}

module.exports = {getAllUsuarios, addUser}