import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/Login/LoginScreen';
import {
  adminDashboardScreen,
  homeScreen,
  loginScreen,
} from './constants/Screens';
import HomeScreen from './screens/Home/HomeScreen';
import AdminDashboardScreen from './screens/AdminDashboard/AdminDashboardScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const linking = {
    prefixes: ['http://localhost:19006/', 'mychat://'],
    config: {
      screens: {
        HomeScreen: '',
        loginScreen: loginScreen,
        // adminDashboardScreen: '?:id/Search',
        NotFound: '*',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName={homeScreen}>
        <Stack.Screen name={homeScreen} component={HomeScreen} />
        <Stack.Screen name={loginScreen} component={LoginScreen} />
        <Stack.Screen
          name={adminDashboardScreen}
          component={AdminDashboardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
