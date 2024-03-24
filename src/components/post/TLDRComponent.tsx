import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../context/theme/useTheme';
import {Theme} from '../../constants/Types';
import CustomText from '../common/CustomText';
import {useUser} from '../../context/user/useUser';
import Icon from '../../assets/Icon';
import strings from '../../constants/strings.json';
import {BUTTON_TYPES} from '../../constants/Constants';
import Button from '../common/Button';
import CustomTextInput from '../common/CustomTextInput';

interface TLDRComponentProps {
  onChange: (value: string) => void;
  content: string;
  loading: boolean;
}

const TLDRComponent = ({onChange, content, loading}: TLDRComponentProps) => {
  const {theme} = useTheme();
  const {isAdmin} = useUser();

  const [editMode, setEditMode] = useState(false);
  const [newTldr, setNewTldr] = useState(content);

  const onConfirm = () => {
    setEditMode(false);
    onChange(newTldr);
  };

  return (
    <View style={styles(theme).tldrContent}>
      <View style={styles(theme).topTitleContainer}>
        <CustomText title={'TLDR:'} type={'h1'} />
        {!editMode && isAdmin && (
          <Icon
            color={theme.colors.text_color}
            onPress={() => setEditMode(true)}
            icon={'pencil'}
            size={theme.sizes.large}
          />
        )}
      </View>
      {editMode ? (
        <CustomTextInput
          autoFocus
          multiline
          placeholder="Too Long Did'nt Read"
          value={newTldr}
          onChangeText={value => setNewTldr(value)}
        />
      ) : (
        <CustomText title={content} type={'h2'} />
      )}
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
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    tldrContent: {
      padding: theme.sizes.small,
      marginVertical: theme.sizes.medium,
      borderWidth: 1,
      borderRadius: theme.sizes.border_radius,
      borderColor: theme.colors.button_border,
    },
    topTitleContainer: {
      marginBottom: theme.sizes.small,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonStyle: {
      marginTop: theme.sizes.small,
    },
    textStyle: {
      color: theme.colors.negative,
    },
  });

export default TLDRComponent;
