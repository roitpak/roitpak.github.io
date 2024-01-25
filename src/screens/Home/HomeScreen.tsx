import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {dashboardScreen, loginScreen} from '../../constants/Screens';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUser} from '../../context/user/useUser';
// import authService from './appwrite/auth';

function HomeScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'grey' : 'white',
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const goToLoginScreen = () => {
    navigation.navigate(loginScreen);
  };
  const goToDashboardScreen = () => {
    navigation.navigate(dashboardScreen);
  };

  const {user} = useUser();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.highlight}>HomeScreen</Text>
      {user && <Text style={styles.highlight}>Hi {user.name}</Text>}
      {!user && <Button title="Go to login" onPress={goToLoginScreen} />}
      <Button title="Go to Dashboard" onPress={goToDashboardScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
