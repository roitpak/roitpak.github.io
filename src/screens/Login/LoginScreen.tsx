import {ParamListBase, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {adminDashboardScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import authService from './appwrite/auth';

function LoginScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'grey' : 'white',
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');

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

  const onPressLogin = () => {
    navigation.navigate(adminDashboardScreen);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.sectionContainer}>
        <TextInput
          value={email}
          onChangeText={value => setEmail(value)}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={value => setPasswrod(value)}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={onPressLogin} />
      </View>
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
  input: {
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    marginVertical: 5,
  },
});

export default LoginScreen;
