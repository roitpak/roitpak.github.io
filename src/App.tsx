import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/Login/LoginScreen';
import {dashboardScreen, homeScreen, loginScreen} from './constants/Screens';
import HomeScreen from './screens/Home/HomeScreen';
import DashboardScreen from './screens/Dashboard/DashboardScreen';
import {ModalProvider} from './context/modal/ModalProvider';
import {UserPrvider} from './context/user/UserProvider';

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
    <ModalProvider>
      <UserPrvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName={homeScreen}>
            <Stack.Screen name={homeScreen} component={HomeScreen} />
            <Stack.Screen name={loginScreen} component={LoginScreen} />
            <Stack.Screen name={dashboardScreen} component={DashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserPrvider>
    </ModalProvider>
  );
}

export default App;
