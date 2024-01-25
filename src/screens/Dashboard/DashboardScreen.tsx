import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {useUser} from '../../context/user/useUser';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {loginScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

function DashboardScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'grey' : 'white',
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {user, logout} = useUser();
  const logUserOut = () => logout();

  const goToSign = () => navigation.navigate(loginScreen);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {user && <Text style={styles.highlight}>Hi {user.name}</Text>}
      <Button
        title={user ? 'Log Out' : 'Sign in'}
        onPress={user ? logUserOut : goToSign}
      />
      <Text style={styles.highlight}>DashboardScreen</Text>
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

export default DashboardScreen;
