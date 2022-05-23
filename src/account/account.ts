import db from '../dbconnection';

class Account {
    constructor () {

    }

    create(data: Array<string>) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users(name, email, username, password) SET (?, ?, ?, ?)', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default new Account();