import diary from '../../model/studyDiary/diary';
import accountController from '../../controller/accountController/accountController';
import { DbResult, SDTagData, diaryData } from '../../model/studyDiary/SDInterface';
import { UserData } from '../../model/account/accountInterface';
import SDTag from '../../model/studyDiary/SDTag';

class DiaryController {
    public async create(token: string, data: diaryData): Promise<diaryData> {
        // Check if the user is logged in
        let userData: UserData = await accountController.getUserDataFromToken(token);

        // Create
        let result: DbResult = await diary.create([String(data.sdtag), String(userData.id)]);

        if (result.affectedRows == 0) {
            throw new Error('Diary creation failed');
        }

        return {
            id: result.insertId,
            sdtag: data.sdtag,
            user: userData.id,
            is_learning: 1,
            start_at: new Date().toISOString(),
            stop_at: '',
            log: ''
        };
    }

    public async getLearningDiary(token: string): Promise<diaryData> {
        // Check if the user is logged in
        let userData: UserData = await accountController.getUserDataFromToken(token);

        // Get
        let result: diaryData = await diary.getLearningDiary(String(userData.id));
        
        if (result) {
            return result;
        }
        else {
            throw new Error('Learning Diary not found');
        }
    }

    public async stopLearningDiary(token: string, data: diaryData): Promise<SDTagData> {
        // Check if the user is logged in
        let userData: UserData = await accountController.getUserDataFromToken(token);

        // Update Diary
        let result: DbResult = await diary.stopLearningDiary([data.log, String(data.id), String(userData.id)]);

        if (result.affectedRows == 0) {
            throw new Error('Diary update failed');
        }

        // Update tag
        let diaryData: diaryData = await diary.getDiary(data.id);

        let startTime = new Date(diaryData.start_at);
        let stopTime = new Date(diaryData.stop_at);
        let timeDiff = stopTime.getTime() - startTime.getTime();
        let timeDiffMinutes = Math.round(timeDiff / 60000);

        let tagData: SDTagData = await SDTag.getTag(diaryData.sdtag);
        
        let newTimeToday = tagData.time_today + timeDiffMinutes;
        let newTimeWeek = tagData.time_week + timeDiffMinutes;
        let newTimeMonth = tagData.time_month + timeDiffMinutes;
        let newTimeYear = tagData.time_year + timeDiffMinutes;
        let newTimeTotal = tagData.time_total + timeDiffMinutes;

        let resultTag: DbResult = await SDTag.updateTime([newTimeToday, newTimeWeek, newTimeMonth, newTimeYear, newTimeTotal, tagData.id, userData.id]);

        if (resultTag.affectedRows == 0) {
            throw new Error('Tag update failed');
        }

        let sdtag: SDTagData = await SDTag.getTag(diaryData.sdtag);

        return sdtag;
    }
}

export default new DiaryController();