import React from 'react';
import CustomText from '../../components/common/CustomText';
import Wrapper from '../../components/common/Wrapper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../constants/Types';
import Icon from '../../assets/Icon';
import {useTheme} from '../../context/theme/useTheme';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

function ContactScreen(): JSX.Element {
  const {theme} = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Wrapper>
      <View style={styles(theme).titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            icon={'arrow-left2'}
            size={theme.sizes.extra_extra_large}
            color={theme.colors.text_color}
          />
        </TouchableOpacity>
        <CustomText type="h1" title={'Contact Screen'} />
      </View>
    </Wrapper>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    titleContainer: {
      marginTop: theme.sizes.small,
      alignItems: 'flex-start',
    },
  });
export default ContactScreen;
