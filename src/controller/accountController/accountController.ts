import * as md5 from 'md5';
import * as fs from 'fs';
import account from "../../model/account/account";
import validator from "../../model/validator";
import { salt } from "../../pwd";
import { UserData, DbResult, changeNameData, changePasswordData } from "../../model/account/accountInterface";

class AccountController {
    constructor () {

    }

    private genToken (username: string, id: number) : string {
        return username + '__'  + md5(id + salt);
    }

    private hashPassword (password: string) : string {
        return md5(password + salt);
    }

    private getUsernameFromToken (token: string) : string {
        let username = token.split('__')[0];
        return username;
    }

    private matchToken (token: string, userData: UserData) : boolean {
        let userToken = this.genToken(userData.username, userData.id);
        return token === userToken;
    }

    private createAvatar (username: string) : boolean {
        // Check if user directory exists
        let userDir = './assets/users/' + username;

        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
        
        // Check if avatar exists
        let avatarPath = userDir + '/avatar.png';
        if (fs.existsSync(avatarPath)) {
            return false;
        }
        
        // Copy avatar
        let avatar = './assets/avatar.png';
        fs.copyFileSync(avatar, avatarPath);

        return true;
    }

    public async get (username: string) {
        if (!validator.isValidUsername(username)) {
            throw new Error("Invalid username");
        }

        let userData: UserData = await account.get(username);

        if (!userData) {
            throw new Error("Username not found");
        }

        return {
            name: userData.name,
            username: userData.username,
            email: userData.email
        };
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

        // Create avatar
        let isAvatarCreated = this.createAvatar(username);

        if (!isAvatarCreated) {
            console.log("Avatar already exists");
        }
        
        // Create user
        let result = await account.create([name, email, username, password])
        .then((result: DbResult) => {
            return false;
        })
        .catch(err => {
            throw err;
        });

        if (result) {
            throw result;
        }

        // Get user data
        let userData: UserData = await account.get(username);

        // Create token
        let token: string = this.genToken(username, userData.id);

        return {
            token: token,
            user: {
                name: userData.name,
                username: userData.username,
                email: userData.email,
                slogan: userData.slogan
            }
        };
    }

    public async login (data: UserData) {
        if (!data.username || !data.password) {
            throw new Error("Invalid data");
        }

        let password: string = this.hashPassword(data.password);

        // Login
        let isLogin = await account.login([data.username, password])
        .then((result: UserData) => {
            if (!result) {
                throw new Error("Username not found or password is incorrect");
            }
            else {
                return false;
            }
        })
        .catch(err => {
            throw err;
        });

        // Get user data
        if (isLogin) {
            throw isLogin;
        }
        else {
            let userData: UserData = await account.get(data.username);

            // Create token
            let token: string = this.genToken(data.username, userData.id);

            return {
                token: token,
                user: {
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    slogan: userData.slogan
                }
            };
        }
    }

    public async checkLogin (token: string) {
        let username: string = this.getUsernameFromToken(token);

        let userData = await account.get(username);

        if (!userData) {
            throw new Error("Invalid token");
        }

        if (!this.matchToken(token, userData)) {
            throw new Error("Invalid token");
        }

        return {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            slogan: userData.slogan
        };
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