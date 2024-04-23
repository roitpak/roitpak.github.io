import {AppRegistry, Platform} from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('RohitBlog', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('RohitBlog', {
    rootTag: document.getElementById('root'),
  });
}
