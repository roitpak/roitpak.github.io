import {StyleSheet} from 'react-native';
import {Theme} from '../../constants/Types';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    titleContainer: {
      marginTop: theme.sizes.small,
      alignItems: 'flex-start',
    },
    sectionContainer: {
      marginTop: theme.sizes.large,
    },
    sectionTitle: {
      fontSize: theme.sizes.extra_large,
      fontWeight: 'bold',
    },
    sectionDescription: {
      marginTop: theme.sizes.medium,
      fontSize: theme.sizes.large,
      fontWeight: 'bold',
    },
    highlight: {
      fontWeight: 'bold',
    },
    signupTextContainer: {
      flexDirection: 'row',
      marginVertical: theme.sizes.medium,
      alignItems: 'center',
    },
    signupText: {
      fontSize: theme.sizes.medium,
    },
    signupTextHighlight: {
      fontSize: theme.sizes.medium,
      fontWeight: 'bold',
    },
    inputContainer: {
      marginTop: theme.sizes.medium,
    },
    bottomText: {
      marginTop: theme.sizes.extra_extra_large * 2,
      marginBottom: theme.sizes.extra_extra_large * 4.5,
    },
    loginContainer: {
      alignItems: 'center',
    },
  });
