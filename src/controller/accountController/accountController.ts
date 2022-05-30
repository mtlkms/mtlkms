import * as md5 from 'md5';
import account from "../../model/account/account";
import validator from "../../model/validator";
import salt from "../../salt";

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

interface changePasswordData {
    password: string;
    newPassword: string;
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

    public async create (data: UserData) {
        if (!data.name || !data.username || !data.password || !data.email) {
            throw new Error("Invalid data");
        }
        else if (!validator.isValidName(data.name)) {
            throw new Error("Invalid name");
        }
        else if (!validator.isValidEmail(data.email)) {
            throw new Error("Invalid email");
        }
        else if (!validator.isValidUsername(data.username)) {
            throw new Error("Invalid username");
        }
        else if (!validator.isValidPassword(data.password)) {
            throw new Error("Invalid password");
        }
        
        let name: string = validator.htmlEncode(data.name);
        let email: string = validator.htmlEncode(data.email);
        let username: string = validator.htmlEncode(data.username);

        // Hash the password
        let password: string = md5(data.password + salt);
        
        await account.create([name, email, username, password])
        .then(result => {
            return result;
        })
        .catch(err => {
            throw err;
        });
    }

    public async changeName (username: string, data: changeNameData) {
        if (!data.name || !data.password) {
            throw new Error("Invalid data");
        }
        else if (!validator.isValidName(data.name)) {
            throw new Error("Invalid name");
        }
        else if (!validator.isValidUsername(username)) {
            throw new Error("Invalid username");
        }

        let name: string = validator.htmlEncode(data.name);
        let hash: string = md5(data.password + salt);

        await account.changeName([name, username, hash])
        .then((result: DbResult) => {
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

    public async changePassword (username: string, data: changePasswordData) {
        if (!data.password || !data.newPassword) {
            throw new Error("Invalid data");
        }
        else if (!validator.isValidUsername(username)) {
            throw new Error("Invalid username");
        }
        else if (!validator.isValidPassword(data.newPassword)) {
            throw new Error("Invalid new password");
        }

        let hash = md5(data.password + salt);
        let newHash = md5(data.newPassword + salt);

        await account.changePassword([newHash, username, hash])
        .then((result: DbResult) => {
            if (result.affectedRows === 0) {
                console.error(result);
                throw new Error("Username not found or password is incorrect");
            }
            else {
                return result;
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
    }
}

export default new AccountController();