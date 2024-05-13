import React, {useState} from 'react';
import {Linking, Pressable, StyleSheet, View} from 'react-native';
import Icon from '../../assets/Icon';
import {useTheme} from '../../context/theme/useTheme';
import {useUser} from '../../context/user/useUser';
import CustomTextInput from '../common/CustomTextInput';
import CustomText from '../common/CustomText';
import Button from '../common/Button';
import {Theme} from '../../constants/Types';
import strings from '../../constants/strings.json';
import {BUTTON_TYPES} from '../../constants/Constants';

interface GithubLinkProps {
  url: string;
  onChange: (value: string) => void;
  loading: boolean;
}

export default function GithubLink({url, onChange, loading}: GithubLinkProps) {
  const {theme} = useTheme();
  const [editMode, setEditMode] = useState(false);

  const [newUrl, setNewUrl] = useState(url);

  const {isAdmin} = useUser();

  const onConfirm = () => {
    setEditMode(false);
    onChange(newUrl);
  };

  const goToLink = () => {
    if (!editMode) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles(theme).content}>
      <View style={styles(theme).mainContainer}>
        <Pressable onPress={goToLink} style={styles(theme).titleContainer}>
          <Icon
            icon={'github'}
            size={theme.sizes.extra_extra_large}
            color={theme.colors.text_color}
          />
          {editMode ? (
            <CustomTextInput
              autoFocus
              placeholder="Github URL"
              value={newUrl}
              onChangeText={value => setNewUrl(value)}
            />
          ) : (
            <CustomText title={url} type={'h2'} />
          )}
        </Pressable>
        {!editMode && isAdmin && (
          <Icon
            color={theme.colors.text_color}
            onPress={() => setEditMode(true)}
            icon={'pencil'}
            size={theme.sizes.large}
          />
        )}
      </View>
      {editMode && isAdmin && (
        <>
          <Button
            buttonStyle={styles(theme).buttonStyle}
            loading={loading}
            title={strings.save}
            onPress={() => onConfirm()}
          />
          <Button
            type={BUTTON_TYPES.outlined}
            textStyle={styles(theme).textStyle}
            buttonStyle={styles(theme).buttonStyle}
            title={strings.cancel}
            onPress={() => setEditMode(false)}
          />
        </>
      )}
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      flexDirection: 'column',
    },
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonStyle: {
      marginTop: theme.sizes.small,
    },
    textStyle: {
      color: theme.colors.negative,
    },
  });
