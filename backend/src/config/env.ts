/**  Coneccion Local */
export const db = { 
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'onie_database',
        port: 3306
    };

/**  Coneccion Externa */
/* export const db = { 
        host: '192.168.100.32',
        user: 'onieser',
        password: 'Recanepoa*2019',
        database: 'onie_database',
        port: 4458
    }; */

/**  Carpetas a donde se guardaran los docs de las licencias */
export const upload_path = { 
      root: 'docs',
      base: '/docs',
      users: 'docs/users',
      docs_info: 'docs/oficials',
  };

/**  Llave Secreta */
export const jwtSecret = "$2a$08$VDsL7oTVrPcZpGoXdafVy.80TEgywujkesPmu3HzaHfPLDaptolVi";

/** Datos de la API */
export const API_URL = 'onie2.alinet.cu';
export const API_PORT = 4500;

/** Configuraciones de los Usuarios */
export const HISTORY_PASS = 3;
export const EXPIRED_PASS = 60;
