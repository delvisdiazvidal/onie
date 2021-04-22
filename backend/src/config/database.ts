import mysql from 'mysql';

import { db } from "./env";

const pool = mysql.createConnection(db);

pool.connect( (err) => {
    if (err) {
        switch (err.code) {
            case 'ENOTFOUND':
                console.error(`[ERROR] Nombre incorrecto del Servidor de la Base de Datos ${db.database}.`);
                break;
            case 'ER_ACCESS_DENIED_ERROR':
                console.error(`[ERROR] Usuario o Contraseña de la Base de Datos ${db.database} incorrectos.`);
                break;
            case 'ER_BAD_DB_ERROR':
                console.error(`[ERROR] Nombre de la Base de Datos ${db.database} incorrecto.`);
                break;
            case 'PROTOCOL_CONNECTION_LOST':
                console.error(`[ERROR] Se ha cerrado la conexión con la Base de Datos ${db.database}.`);
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error(`[ERROR] La Base de Datos ${db.database} posee muchas conexiones.`);
                break;
            case 'ECONNREFUSED':
                    console.error(`[ERROR] La conexión a la Base de Datos ${db.database} ha sido rechazada.`);
                break;
            default:
                console.error(err);
                break;
        }

    } else {
    }
        console.log(`La conexión con ${db.database} se ha realizado exitosamente!!! ID: ${pool.threadId}`);
})

export default pool;
