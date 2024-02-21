import React from 'react';
import CustomText from '../../components/common/CustomText';
import Wrapper from '../../components/common/Wrapper';
import strings from '../../constants/strings.json';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../context/theme/useTheme';
import {Theme} from '../../constants/Types';

function PrivacyScreen(): JSX.Element {
  const {theme} = useTheme();
  return (
    <Wrapper>
      <View style={styles(theme).container}>
        <CustomText type="p1" title={strings.privacyPolicy} />
      </View>
    </Wrapper>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: theme.sizes.large,
      marginBottom: theme.sizes.extra_extra_large * 5,
    },
  });
export default PrivacyScreen;
