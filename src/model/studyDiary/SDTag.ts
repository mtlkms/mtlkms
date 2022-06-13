import db from '../../dbconnection';
import { DbResult, SDTagData } from './SDInterface';

class SDTag {
    public getTag(id: number): Promise<SDTagData> {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM sdtags WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    public getAll(userID: number): Promise<Array<SDTagData>> {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM sdtags where user=? order by time_total desc', [userID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public create(data: Array<string>): Promise<DbResult> {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO sdtags(name, icon, bg_color, text_color, user) VALUES (?, ?, ?, ?, ?)', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public update(data: Array<string>): Promise<DbResult> {
        return new Promise((resolve, reject) => {
            db.query('UPDATE sdtags SET name = ?, icon = ?, bg_color = ?, text_color = ? WHERE id = ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public delete(id: number): Promise<DbResult> {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM sdtags WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default new SDTag();