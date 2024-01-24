import {Client, Account, ID} from 'appwrite';
import Config from 'react-native-config';
import {User} from './types/auth';
import {Platform} from 'react-native';
import {showError} from '../helpers/errorHandler';

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
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error: unknown) {
      console.log('Appwrite service :: createAccount() ::', error);
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('An unknown error occurred');
      }
    }
  }
  async login({email, password}: User) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error: unknown) {
      console.log('Appwrite service :: login() ::', error);
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('An unknown error occurred');
      }
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error: unknown) {
      console.log('Appwrite service :: getCurrentUser() :: ', error);
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('An unknown error occurred');
      }
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error: unknown) {
      console.log('Appwrite service :: logout() :: ', error);
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('An unknown error occurred');
      }
    }
  }
}

const authService = new AuthService();

export default authService;
