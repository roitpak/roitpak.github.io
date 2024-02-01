import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {dashboardScreen, loginScreen} from '../../constants/Screens';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUser} from '../../context/user/useUser';
import Button from '../../components/common/Button';
import {BUTTON_TYPES} from '../../constants/Constants';
import {useTheme} from '../../context/theme/useTheme';
import Wrapper from '../../components/common/Wrapper';
import CustomText from '../../components/common/CustomText';
// import authService from './appwrite/auth';

function HomeScreen(): JSX.Element {
  const {changeTheme} = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const goToLoginScreen = () => {
    navigation.navigate(loginScreen);
  };
  const goToDashboardScreen = () => {
    navigation.navigate(dashboardScreen);
  };

  const {user} = useUser();
  console.log(styles);
  return (
    <Wrapper>
      <TouchableOpacity onPress={changeTheme}>
        <Text>Change Theme</Text>
      </TouchableOpacity>
      <CustomText bold type="h1" title="Home Screen" />
      {user && <CustomText type="h2" title={`Hi ${user.name}`} />}
      {!user && <Button title="Go to login" onPress={goToLoginScreen} />}
      <Button
        type={BUTTON_TYPES.filled}
        title="Go to Dashboard"
        onPress={goToDashboardScreen}
      />
    </Wrapper>
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
