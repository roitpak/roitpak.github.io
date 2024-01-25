import {Models} from 'appwrite';

export interface UserProviderValue {
  user?: Models.User<Object>;
  setLogin: () => void;
  logout: () => void;
}
