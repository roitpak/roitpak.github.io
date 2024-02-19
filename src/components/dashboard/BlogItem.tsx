import React from 'react';
import {useTheme} from '../../context/theme/useTheme';
import CustomText from '../common/CustomText';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../constants/Types';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {addPostScreen} from '../../constants/Screens';
import {Post} from '../../appwrite/types/posts';
import {formatDate} from '../../helpers/functions';
import strings from '../../constants/strings.json';
import Icon from '../../assets/Icon';

interface AddPostModalProps {
  item: Post;
}

const BlogItem = ({item}: AddPostModalProps) => {
  const {theme} = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const onPressItem = () => {
    navigation.navigate(addPostScreen, item);
  };

  return (
    <TouchableOpacity onPress={onPressItem} style={styles(theme).container}>
      <View style={styles(theme).titleContainer}>
        <CustomText title={item?.title} type={'h1'} />
      </View>
      {item?.$createdAt && (
        <CustomText title={formatDate(new Date(item?.$createdAt))} type="p2" />
      )}
      <View style={styles(theme).categoryContainer}>
        {item?.category.map(item => (
          <View style={styles(theme).category}>
            <CustomText title={item} type="p3" />
          </View>
        ))}
      </View>
      <View style={styles(theme).continueReading}>
        <CustomText
          style={styles(theme).continueText}
          title={strings.continueReading}
          type="p3"
        />
        <Icon
          icon={'play3'}
          size={theme.sizes.small}
          color={theme.colors.button_text}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: theme.sizes.large,
    },
    titleContainer: {
      marginBottom: theme.sizes.extra_extra_small,
    },
    category: {
      padding: theme.sizes.extra_extra_small,
      borderColor: theme.colors.text_color,
      borderWidth: 1,
      borderRadius: 2,
      alignContent: 'center',
      justifyContent: 'center',
      marginRight: theme.sizes.extra_extra_small,
    },
    categoryContainer: {
      flexDirection: 'row',
      marginTop: theme.sizes.extra_extra_small,
    },
    continueReading: {
      marginTop: theme.sizes.extra_extra_small,
      flexDirection: 'row',
      alignItems: 'center',
    },
    continueText: {
      color: theme.colors.button_text,
    },
  });
export default BlogItem;
