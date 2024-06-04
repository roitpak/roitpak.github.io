import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  addPostScreen,
  contactScreen,
  dashboardScreen,
  homeScreen,
  loginScreen,
  privacyScreen,
  verificationEmailScreen,
} from '../constants/Screens';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import PostInfoScreen from '../screens/Post/PostContentScreen';
import {headerHidden} from './navigationsoptions';
import PrivacyScreen from '../screens/Privacy/PrivacyScreen';
import ContactScreen from '../screens/Contact/ContactScreen';
import strings from '../constants/strings.json';
import EmailVerificationScreen from '../screens/EmailVerification/EmailVerificationScreen';

const Stack = createNativeStackNavigator();

function MainStackScreen(): JSX.Element {
  const linking = {
    prefixes: ['http://localhost:3000/', 'http://rohitpakhrin.com.np/'],
    config: {
      screens: {
        dashboardScreen: '',
        homeScreen: 'myself',
        loginScreen: loginScreen,
        // adminDashboardScreen: '?:id/Search',
        NotFound: '*',
      },
    },
  };
  return (
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) =>
          `${options?.title ?? route?.name} - ${strings.name}`,
      }}
      linking={linking}>
      <Stack.Navigator
        screenOptions={headerHidden}
        initialRouteName={dashboardScreen}>
        <Stack.Screen name={dashboardScreen} component={DashboardScreen} />
        <Stack.Screen name={homeScreen} component={HomeScreen} />
        <Stack.Screen name={loginScreen} component={LoginScreen} />
        <Stack.Screen name={addPostScreen} component={PostInfoScreen} />
        <Stack.Screen name={privacyScreen} component={PrivacyScreen} />
        <Stack.Screen name={contactScreen} component={ContactScreen} />
        <Stack.Screen
          name={verificationEmailScreen}
          component={EmailVerificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackScreen;
