import SDTag from '../../model/studyDiary/SDTag';
import { DbResult, SDTagData } from '../../model/studyDiary/SDInterface';
import accountController from '../../controller/accountController/accountController';

class SDTagController {
    public async getAll(): Promise<Array<SDTagData>> {
        let result: Array<SDTagData> = await SDTag.getAll();

        return result;
    }

    public async create(token: string, data: SDTagData): Promise<SDTagData> {
        // Check if the user is logged in
        await accountController.getUserDataFromToken(token);

        // Create
        let result: DbResult = await SDTag.create([data.name, data.icon, data.bg_color, data.text_color]);

        if (result.affectedRows == 0) {
            throw new Error('Tag creation failed');
        }

        return {
            id: result.insertId,
            name: data.name,
            icon: data.icon,
            bg_color: data.bg_color,
            text_color: data.text_color,
            time_today: 0,
            time_week: 0,
            time_month: 0,
            time_year: 0,
            time_total: 0
        };
    }

    public async update(token: string, data: SDTagData): Promise<SDTagData> {
        // Check if the user is logged in
        await accountController.getUserDataFromToken(token);

        // Update
        let result: DbResult = await SDTag.update([data.name, data.icon, data.bg_color, data.text_color, String(data.id)]);

        if (result.affectedRows == 0) {
            throw new Error('Tag update failed');
        }

        return {
            id: data.id,
            name: data.name,
            icon: data.icon,
            bg_color: data.bg_color,
            text_color: data.text_color,
            time_today: data.time_today,
            time_week: data.time_week,
            time_month: data.time_month,
            time_year: data.time_year,
            time_total: data.time_total
        }
    }

    public async delete(token: string, id: number): Promise<boolean> {
        // Check if the user is logged in
        await accountController.getUserDataFromToken(token);

        // Delete
        let result: DbResult = await SDTag.delete(id);

        if (result.affectedRows == 0) {
            throw new Error('Tag deletion failed');
        }

        return true;
    }
}

export default new SDTagController();