import {Client, Account, ID} from 'appwrite';
import Config from 'react-native-config';
import {User} from './types/auth';
import {Platform} from 'react-native';

const myConfig = Platform.OS === 'web' ? process.env : Config;
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(myConfig.REACT_APP_ENDPOINT)
      .setProject(myConfig.REACT_APP_PROJECT_ID);
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
        await this.login({email, password});
        return this.createVerification();
      } else {
        return userAccount;
      }
    } catch (error: unknown) {
      console.log('Appwrite service :: createAccount() ::', error);
      throw error;
    }
  }
  async login({email, password}: User) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error: unknown) {
      console.log('Appwrite service :: login() ::', error);
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error: unknown) {
      console.log('Appwrite service :: getCurrentUser() :: ', error);
      throw error;
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
      console.log('Appwrite service :: logout() : Sessions deleted');
    } catch (error: unknown) {
      console.log('Appwrite service :: logout() :: ', error);
      throw error;
    }
  }
  async createVerification() {
    try {
      return await this.account.createVerification(
        'https://rohitpakhrin.com.np/verify',
      );
    } catch (error: unknown) {
      console.log('Appwrite service :: createVerification() :: ', error);
      throw error;
    }
  }

  async verifyUser(userId: string, secret: string) {
    try {
      return await this.account.updateVerification(userId, secret);
    } catch (error: unknown) {
      console.log('Appwrite service :: createVerification() :: ', error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
