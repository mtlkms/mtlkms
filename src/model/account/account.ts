import db from '../../dbconnection';
import { UserData } from './accountInterface';

class Account {
    constructor () {

    }
    
    public get(username: string) : Promise<UserData> {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users where username=?', [username], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    public getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public create(data: Array<string>) {
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

    public login(data: Array<string>) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username=? AND password=?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    public changeName(data: Array<string>) {
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

    public changePassword(data: Array<string>) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE users SET password=? WHERE username=? AND password=?', data, (err, result) => {
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