import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Status from './enum/PostStatusEnum';
import CustomText from '../common/CustomText';
import {Theme} from '../../constants/Types';
import {useTheme} from '../../context/theme/useTheme';
import Icon from '../../assets/Icon';

interface PostStatusButtonProps {
  status: Status;
  onChange: (newStatus: Status) => void;
  loading: boolean;
}

function PostStatusButton({
  status,
  onChange,
  loading,
}: PostStatusButtonProps): JSX.Element {
  const [showList, setShowList] = useState(false);
  const {theme} = useTheme();

  const onPress = () => {
    setShowList(!showList);
  };
  const onPressOption = (option: Status) => {
    setShowList(false);
    onChange(option);
  };

  const returnIcon = (iconName: Status, light?: boolean) => {
    switch (iconName) {
      case Status.pending:
        return (
          <Icon
            style={styles(theme).icon}
            icon={'pencil'}
            size={theme.sizes.medium}
            color={light ? theme.colors.white : theme.colors.text_color}
          />
        );
      case Status.unPublished:
        return (
          <Icon
            style={styles(theme).icon}
            icon={'lock'}
            size={theme.sizes.medium}
            color={light ? theme.colors.white : theme.colors.text_color}
          />
        );
      case Status.published:
        return (
          <Icon
            style={styles(theme).icon}
            icon={'earth'}
            size={theme.sizes.medium}
            color={light ? theme.colors.white : theme.colors.text_color}
          />
        );
      case Status.expired:
        return (
          <Icon
            style={styles(theme).icon}
            icon={'clock'}
            size={theme.sizes.medium}
            color={light ? theme.colors.white : theme.colors.text_color}
          />
        );

      default:
        break;
    }
  };
  if (loading) {
    return <></>;
  }
  return (
    <View style={styles(theme).container}>
      <TouchableOpacity style={styles(theme).status} onPress={onPress}>
        <CustomText style={styles(theme).text} title={status} type={'p1'} />
        {returnIcon(status, true)}
      </TouchableOpacity>
      {showList && (
        <View>
          {status !== Status.pending && (
            <TouchableOpacity
              onPress={() => onPressOption(Status.pending)}
              style={styles(theme).optionBox}>
              <CustomText title={Status.pending} type={'p1'} />
              {returnIcon(Status.pending)}
            </TouchableOpacity>
          )}
          {status !== Status.unPublished && (
            <TouchableOpacity
              onPress={() => onPressOption(Status.unPublished)}
              style={styles(theme).optionBox}>
              <CustomText title={Status.unPublished} type={'p1'} />
              {returnIcon(Status.unPublished)}
            </TouchableOpacity>
          )}
          {status !== Status.published && (
            <TouchableOpacity
              onPress={() => onPressOption(Status.published)}
              style={styles(theme).optionBox}>
              <CustomText title={Status.published} type={'p1'} />
              {returnIcon(Status.published)}
            </TouchableOpacity>
          )}
          {status !== Status.expired && (
            <TouchableOpacity
              onPress={() => onPressOption(Status.expired)}
              style={styles(theme).optionBox}>
              <CustomText title={Status.expired} type={'p1'} />
              {returnIcon(Status.expired)}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginVertical: theme.sizes.small,
      alignItems: 'flex-start',
    },
    status: {
      backgroundColor: theme.colors.modal_background_color,
      padding: theme.sizes.small,
      borderRadius: 2,
      alignContent: 'center',
      justifyContent: 'center',
      marginRight: theme.sizes.extra_extra_small,
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      color: theme.colors.white,
    },
    optionBox: {
      backgroundColor: theme.colors.button_background,
      padding: theme.sizes.small,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.white,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    icon: {
      marginLeft: theme.sizes.extra_small,
    },
  });

export default PostStatusButton;
