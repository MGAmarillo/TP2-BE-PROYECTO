const deportes = require('../data/deportes');

async function getDeportes() {
    return deportes.getAllDeportes();
}

module.exports = {getDeportes};