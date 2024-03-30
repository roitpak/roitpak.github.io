import {ParamListBase, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {dashboardScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './styles';
import authService from '../../appwrite/auth';
import {useModal} from '../../context/modal/useModal';
import {useUser} from '../../context/user/useUser';
import CustomText from '../../components/common/CustomText';
import Button from '../../components/common/Button';
import {BUTTON_TYPES} from '../../constants/Constants';
import Wrapper from '../../components/common/Wrapper';
import CustomTextInput from '../../components/common/CustomTextInput';
import {useTheme} from '../../context/theme/useTheme';

function LoginScreen(): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [validated, setValidated] = useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const {openModal} = useModal();
  const {setLogin} = useUser();

  const {theme} = useTheme();

  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
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
    setLoading(true);
    await authService
      .login({
        email: email,
        password: password,
      })
      .then(() => {
        navigation.navigate(dashboardScreen);
        setLogin();
      })
      .catch(err => {
        if (err instanceof Error) {
          openModal({title: err.message});
        } else {
          openModal({title: 'Unknown error occurred'});
        }
      });
    setLoading(false);
  };

  const onPressSignup = async () => {
    setLoading(true);
    await authService
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
    setLoading(false);
  };

  return (
    <Wrapper>
      <CustomText type="h1" title={signupMode ? 'Signup' : 'Login'} />
      <View style={styles(theme).sectionContainer}>
        <CustomTextInput
          markAsRequired
          placeholder="Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <View style={styles(theme).inputContainer}>
          <CustomTextInput
            markAsRequired
            placeholder="Password"
            value={password}
            onChangeText={value => setPasswrod(value)}
            secureTextEntry
          />
        </View>
        {signupMode && (
          <CustomTextInput
            markAsRequired
            placeholder="Name"
            value={name}
            onChangeText={value => setName(value)}
          />
        )}
        <View style={styles(theme).signupTextContainer}>
          <CustomText
            type="p2"
            title={
              signupMode ? 'Already have an account?' : 'Dont have an account?'
            }
          />
          <CustomText
            onPress={() => setSignupMode(!signupMode)}
            type="p2"
            bold
            title={signupMode ? ' Sign in' : ' Signup'}
          />
        </View>
        <Button
          loading={loading}
          type={BUTTON_TYPES.filled}
          disabled={!validated}
          title={signupMode ? 'Sign up' : 'Login'}
          onPress={signupMode ? onPressSignup : onPressLogin}
        />
      </View>
    </Wrapper>
  );
}

export default LoginScreen;
