import * as md5 from 'md5';
import account from "../../model/account/account";
import validator from "../../model/validator";
import salt from "../../salt";
import { UserData, DbResult, changeNameData, changePasswordData } from "../../model/account/accountInterface";

class AccountController {
    constructor () {

    }

    private genToken (username: string, userData: UserData) : string {
        return username + '__'  + md5(userData.id + salt);
    }

    private hashPassword (password: string) : string {
        return md5(password + salt);
    }

    private getUsernameFromToken (token: string) : string {
        let username = token.split('__')[0];
        return username;
    }

    private matchToken (token: string, username: string) : boolean {
        let usernameFromToken = this.getUsernameFromToken(token);
        return usernameFromToken === username;
    }

    public async get (username: string) {
        if (!validator.isValidUsername(username)) {
            throw new Error("Invalid username");
        }

        return await account.get(username)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw err;
        });
    }

    public async getAll () {
        return await account.getAll()
        .then(result => {
            return result;
        })
        .catch(err => {
            throw err;
        });
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
        let password: string = this.hashPassword(data.password);
        
        // Create user
        let result = await account.create([name, email, username, password])
        .then((result: DbResult) => {
            return false;
        })
        .catch(err => {
            throw err;
        });

        // Get user data
        if (result) {
            throw result;
        }
        else {
            let userData: UserData = await account.get(username);

            // Create token
            let token: string = this.genToken(username, userData);

            return {
                token: token,
                user: {
                    name: userData.name,
                    username: userData.username,
                    email: userData.email
                }
            };
        }
    }

    public async login (data: UserData) {
        if (!data.username || !data.password) {
            throw new Error("Invalid data");
        }
        else if (!validator.isValidUsername(data.username)) {
            throw new Error("Invalid username");
        }

        let password: string = md5(data.password + salt);

        return await account.login([data.username, password])
        .then((result: UserData) => {
            if (!result) {
                throw new Error("Username not found or password is incorrect");
            }
            else {
                let token = md5(result.id + salt);
                return token;
            }
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

        return await account.changeName([name, username, hash])
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

        return await account.changePassword([newHash, username, hash])
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
}

export default new AccountController();