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
}

export default new Diary();