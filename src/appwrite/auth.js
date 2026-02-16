import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

export class AuthService{
    
client = new Client();
account;

// run autometically when we create a new object of this class
constructor(){
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
}
// create a new account
async createAccount({email, password, name}){
    try {
        const userAccount = await this.account.create(
            ID.unique(),
            email,
            password,
            name
        );
        if(userAccount){ 
            console.log(userAccount);
            // return the login method
            return this.login({email, password});
        }else{
            return userAccount;
        }
        
        
    } catch (error) {
        throw error;
    
        
    }


}

async login({email, password}){
    try {
        const userLogin = await this.account.createEmailSession(email, password);
        return userLogin;
    } catch (error) {
        throw error;
    }

    
        
}

async getCurrentUser(){
    try {
        const currentUser = await this.account.get();
        return currentUser;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async logout(){
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        console.log(error);
    }
}

}

const authService = new AuthService();

export default authService;
