import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {adminDashboardScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './styles';
import {ParamListBase, useNavigation} from '@react-navigation/native';
// import authService from './appwrite/auth';

function LoginScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'grey' : 'white',
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [validate, setValidated] = useState(false);
  const [signupMode, setSignupMode] = useState(false);

  useEffect(() => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = signupMode
      ? /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      : /^.{8,}$/;
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setValidated(true);
    } else {
      setValidated(false);
    }
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
  }, [email, password, signupMode]);

  const onPressLogin = () => {
    navigation.navigate(adminDashboardScreen);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.header}>{signupMode ? 'Signup' : 'Login'}</Text>
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
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>
            {signupMode ? 'Already have an account?' : 'Dont have an account?'}
          </Text>
          <TouchableOpacity onPress={() => setSignupMode(!signupMode)}>
            <Text style={[styles.signupText, styles.signupTextHighlight]}>
              {signupMode ? ' Sign in' : ' Signup'}
            </Text>
          </TouchableOpacity>
        </View>
        <Button disabled={!validate} title="Login" onPress={onPressLogin} />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
