import {Alert} from 'react-native';

export const showError = (errorMessage: string): void => {
  Alert.alert(errorMessage);
};
