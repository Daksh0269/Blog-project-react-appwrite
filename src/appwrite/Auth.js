import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite Project ID
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }) {
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        
        // Immediately log in the user
        if (userAccount) {
            return this.Login({email, password});  // 🔥 important
        }
        else return userAccount;
    } catch (error) {
        console.error("Error creating account:", error);
        return null;
    }
}

    async Login({ email, password }) {
        try {
           return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            console.error("Error logging in:", error);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error fetching current user:", error);
            return null;
        }
    }

    async logout(){
        try{
            await this.account.deleteSession('current')
        }
        catch (error) {
            console.error("Error logging out:", error);
        }
    }
    
    async loginWithGoogle() {
        try {
            await this.account.createOAuth2Session(
                'google',
                `${window.location.origin}/`,
                `${window.location.origin}/login`     
            )
        } catch (error) {
            console.log('error login in using google')
        }
    }
}

const authService = new AuthService();

export default authService;