import db from '../../dbconnection';
import { DbResult, diaryData } from './SDInterface';

class Diary {
    public create(data: Array<string>): Promise<DbResult> {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO diaries(sdtag, user) VALUES (?, ?)', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public getDiary(id: number): Promise<diaryData> {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM diaries WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    public getLearningDiary(user: string): Promise<diaryData> {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM diaries WHERE user = ? AND is_learning = 1', [user], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    public stopLearningDiary(data: Array<string>): Promise<DbResult> {
        return new Promise((resolve, reject) => {
            db.query('UPDATE diaries SET is_learning = 0, stop_at = current_timestamp(), log = ? WHERE id = ? AND user = ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default new Diary();