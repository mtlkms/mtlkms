import account from "../../model/account/account";
import validator from "../../model/validator";

interface UserData {
    username: string;
    password: string;
    name: string;
    email: string;
}

interface changeNameData {
    name: string;
    password: string;
}

interface DbResult {
    affectedRows: number;
    insertId: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
    fieldCount: number;
    serverStatus: number;
    warningCount: number;
}

class AccountController {
    constructor () {

    }

    public create (data: UserData) {
        return new Promise((resolve, reject) => {
            if (!data.name || !data.username || !data.password || !data.email) {
                reject("Invalid data");
            }
            else if (!validator.isValidName(data.name)) {
                reject("Invalid name");
            }
            else if (!validator.isValidEmail(data.email)) {
                reject("Invalid email");
            }
            else if (!validator.isValidUsername(data.username)) {
                reject("Invalid username");
            }
            else if (!validator.isValidPassword(data.password)) {
                reject("Invalid password");
            }
            
            let name = validator.htmlEncode(data.name);
            let email = validator.htmlEncode(data.email);
            let username = validator.htmlEncode(data.username);
            let password = validator.htmlEncode(data.password);
            
            account.create([name, email, username, password])
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    public async changeName (username: string, data: changeNameData) {
        if (!validator.isValidName(data.name)) {
            throw new Error("Invalid name");
        }
        else if (!validator.isValidUsername(username)) {
            throw new Error("Invalid username");
        }

        data.name = validator.htmlEncode(data.name);

        await account.changeName([data.name, username, data.password])
        .then((result: DbResult) => {
            console.log(result);
            if (result.affectedRows === 0) {
                throw new Error("Username not found or password is incorrect");
            }
            else {
                return result;
            }
        })
        .catch(err => {
            throw err;
        });
    }
}

export default new AccountController();