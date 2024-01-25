import {ParamListBase, useNavigation} from '@react-navigation/native';
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
import {dashboardScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './styles';
import authService from '../../appwrite/auth';
import {useModal} from '../../context/modal/useModal';
import {useUser} from '../../context/user/useUser';

function LoginScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'white' : 'white',
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [name, setName] = useState('');

  const [validated, setValidated] = useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const {openModal} = useModal();
  const {setLogin} = useUser();

  useEffect(() => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = signupMode
      ? /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      : /^.{8,}$/;
    const nameRegex = signupMode ? /.+/ : /^.*$/;
    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      nameRegex.test(name)
    ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [signupMode, email, password, name]);

  const onPressLogin = async () => {
    await authService
      .login({
        email: email,
        password: password,
      })
      .then(userData => {
        navigation.navigate(dashboardScreen);
        console.log('Appwrite Login:', userData);
        setLogin();
      })
      .catch(err => {
        if (err instanceof Error) {
          openModal({title: err.message});
        } else {
          openModal({title: 'Unknown error occurred'});
        }
      });
  };

  const onPressSignup = async () => {
    authService
      .createAccount({
        email: email,
        password: password,
        name: name,
      })
      .then(userData => {
        console.log('Appwrite sign up:', userData);
        setLogin();
        navigation.navigate(dashboardScreen);
      })
      .catch(err => {
        console.log(err);
        if (err instanceof Error) {
          openModal({title: err.message});
        } else {
          openModal({title: 'Unknown error occurred'});
        }
      });
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
        {signupMode && (
          <TextInput
            value={name}
            onChangeText={value => setName(value)}
            style={styles.input}
          />
        )}
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
        <Button
          disabled={!validated}
          title={signupMode ? 'Sign up' : 'Login'}
          onPress={signupMode ? onPressSignup : onPressLogin}
        />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
