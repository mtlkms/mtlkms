import diary from '../../model/studyDiary/diary';
import accountController from '../../controller/accountController/accountController';
import { DbResult, SDTagData, diaryData } from '../../model/studyDiary/SDInterface';
import { UserData } from '../../model/account/accountInterface';

class DiaryController {
    public async create(token: string, data: diaryData) {
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

    public async getLearningDiary(token: string) {
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

    public async stopLearningDiary(token: string, data: diaryData) {
        // Check if the user is logged in
        let userData: UserData = await accountController.getUserDataFromToken(token);

        // Update
        
    }
}

export default new DiaryController();