import {Client, Account, ID} from 'appwrite';
import Config from 'react-native-config';
import {User} from './types/auth';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(Config.ENDPOINT).setProject(Config.PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({email, password, name}: User) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({email, password}: User) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser() :: ', error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite service :: logout() :: ', error);
    }
  }
}

const authService = new AuthService();

export default authService;
