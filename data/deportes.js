const conn = require('./connection');
const DATABASE = 'gym_meetings';
const DEPORTES = 'deportes';
const objectId = require('mongodb').ObjectId;

async function getAllDeportes(){
    const connectiondb = await conn.getConnection();
    const deportes = await connectiondb
                        .db(DATABASE)
                        .collection(DEPORTES)
                        .find()
                        .toArray();
    return deportes;
}

module.exports = {getAllDeportes}