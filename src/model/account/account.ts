import db from '../../dbconnection';

class Account {
    constructor () {

    }
    
    getUser(username: string) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username=?', [username])
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    create(data: Array<string>) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users(name, email, username, password) VALUES (?, ?, ?, ?)', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    changeName(data: Array<string>) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE users SET name=? WHERE username=? AND password=?', data, (err, result) => {
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