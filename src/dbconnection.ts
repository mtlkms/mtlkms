import * as mysql from 'mysql';
import password from './dbpwd';

const connection = mysql.createPool({
    host: 'localhost',
    user: 'cuikho210',
    password: password,
    database: 'mtlkms'
});

export default connection;