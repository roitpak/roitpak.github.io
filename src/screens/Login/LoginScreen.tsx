import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
// import authService from './appwrite/auth';

function LoginScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'grey' : 'white',
  };
  useEffect(() => {
    // authService
    //   .createAccount({
    //     email: 'roitpak@gmail.com',
    //     password: 'pakhrin132sir#',
    //     name: 'Rohit Pakhrin',
    //   })
    //   .then(userData => {
    //     console.log(userData);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  });
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.highlight}>This is a login screen </Text>
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

export default LoginScreen;
