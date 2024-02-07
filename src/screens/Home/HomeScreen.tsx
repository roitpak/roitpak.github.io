import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import strings from '../../constants/strings.json';
import {Theme} from '../../constants/Types';
import portrait from '../../assets/img/portrait.png';

function HomeScreen(): JSX.Element {
  const {isDarkMode, changeTheme, theme} = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const goToLoginScreen = () => {
    navigation.navigate(loginScreen);
  };
  const goToDashboardScreen = () => {
    navigation.navigate(dashboardScreen);
  };

  const {user} = useUser();
  return (
    <Wrapper>
      <View style={styles(theme).container}>
        <CustomText title={strings.name} type="h1" />
        <TouchableOpacity onPress={changeTheme}>
          <CustomText type="h2" title={isDarkMode ? 'Light>' : 'Dark>'} />
        </TouchableOpacity>
      </View>
      <View style={styles(theme).imageTextContainer}>
        <View style={styles(theme).textContainer}>
          <CustomText type="p1" title={strings.introMessage1} />
          <CustomText type="h1" title={`${strings.name},`} />
          <CustomText bold type="p1" title={strings.introMessage2} />
        </View>
        <Image
          style={
            Platform.OS === 'web' ? styles(theme).imageWeb : styles(theme).image
          }
          source={portrait}
        />
      </View>
      <CustomText
        style={styles(theme).introMessageStyle}
        type="p1"
        title={strings.introParagraph}
      />
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
const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageTextContainer: {
      flexDirection: 'row',
      marginTop: theme.sizes.large,
      marginBottom: theme.sizes.extra_small,
    },
    textContainer: {
      flex: 0.6,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    imageWeb: {
      flex: 1,
      height: 300,
      resizeMode: 'contain',
      alignSelf: 'flex-end',
    },
    introMessageStyle: {
      textAlign: 'justify',
    },
  });

export default HomeScreen;
