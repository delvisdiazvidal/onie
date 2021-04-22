import { db } from "./env";

const errorMessage = (err: any) => {
    if (err) {
        switch (err.code) {
            case 'ENOTFOUND':
                console.error(`[ERROR] Nombre incorrecto del Servidor de la Base de Datos ${db.database}.`);
                return `Nombre incorrecto del Servidor de la Base de Datos.`;
            case 'ER_ACCESS_DENIED_ERROR':
                console.error(`[ERROR] Usuario o Contraseña de la Base de Datos ${db.database} incorrectos.`);
                return `Usuario o Contraseña de la Base de Datos incorrectos.`;
            case 'ER_BAD_DB_ERROR':
                console.error(`[ERROR] Nombre de la Base de Datos ${db.database} incorrecto.`);
                return `Nombre de la Base de Datos incorrecto.`;
            case 'PROTOCOL_CONNECTION_LOST':
                console.error(`[ERROR] Se ha cerrado la conexión con la Base de Datos ${db.database}.`);
                return `Se ha cerrado la conexión con la Base de Datos.`;
            case 'ER_CON_COUNT_ERROR':
                console.error(`[ERROR] La Base de Datos ${db.database} posee muchas conexiones.`);
                return `La Base de Datos posee muchas conexiones.`;
            case 'ECONNREFUSED':
                console.error(`[ERROR] La conexión a la Base de Datos ${db.database} ha sido rechazada.`);
                return `La conexión a la Base de Datos ha sido rechazada.`;
            case 'ER_PARSE_ERROR':
                console.error(`[ERROR] Ha ocurrido un Error en la Petición a la Base de Datos ${db.database}.`);
                return `Ha ocurrido un Error en la Petición a la Base de Datos.`;
            default:
                console.error(err);
                return "Ha ocurrido un error en su peticion";
        }

    } else return "Ha ocurrido un error en su peticion";
}

export default errorMessage;