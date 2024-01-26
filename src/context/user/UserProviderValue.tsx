import {Models} from 'appwrite';

export interface UserProviderValue {
  user?: Models.User<Object>;
  isAdmin?: boolean;
  setLogin: () => void;
  logout: () => void;
}
