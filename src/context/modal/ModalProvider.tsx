import React, {ReactNode, useState} from 'react';
import {ModalContext} from './ModalContext';
import {ModalProps} from './Types';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../theme/useTheme';
import {Theme} from '../../constants/Types';
import Button from '../../components/common/Button';
import {BUTTON_TYPES} from '../../constants/Constants';

interface ModalProviderProps {
  children: ReactNode;
}

const defaultModalProps: ModalProps = {
  isVisible: false,
  title: 'Alert!',
};

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
  const [modalProps, setModalProps] = useState<ModalProps>(defaultModalProps);

  const openModal = (newProps: Omit<ModalProps, 'isVisible'>) => {
    setModalProps({
      ...newProps,
      isVisible: true,
    });
  };

  const closeModal = () => {
    setModalProps(prevProps => ({...prevProps, isVisible: false}));
  };
  const {theme} = useTheme();
  return (
    <ModalContext.Provider
      value={{isVisible: modalProps.isVisible, openModal, closeModal}}>
      {children}
      <Modal transparent animationType="fade" visible={modalProps.isVisible}>
        <TouchableOpacity style={styles(theme).container} onPress={closeModal}>
          <Pressable>
            <View style={styles(theme).modalContainer}>
              <View style={styles(theme).textContainer}>
                <Text style={styles(theme).titleStyle}>{modalProps.title}</Text>
                {modalProps?.subTitle && (
                  <Text style={styles(theme).subTitleStyle}>
                    {modalProps?.subTitle}
                  </Text>
                )}
              </View>
              {modalProps && modalProps?.buttons && (
                <View style={styles(theme).buttonContainer}>
                  {modalProps?.buttons.map((button, index) => (
                    <Button
                      type={BUTTON_TYPES.text}
                      key={index}
                      title={button.label}
                      onPress={button.onClick}
                    />
                  ))}
                </View>
              )}
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </ModalContext.Provider>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.modal_background_color,
    },
    modalContainer: {
      backgroundColor: theme.colors.background_color,
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: theme.sizes.border_radius,
      borderColor: theme.colors.button_border,
      borderWidth: 1,
      maxWidth: '80%',
    },
    titleStyle: {
      fontSize: theme.sizes.large,
      color: theme.colors.text_color,
      textAlign: 'center',
    },
    subTitleStyle: {
      fontSize: theme.sizes.medium,
      color: theme.colors.text_color,
      textAlign: 'center',
      marginTop: theme.sizes.small,
    },
    buttonContainer: {
      borderTopWidth: 1,
      borderColor: theme.colors.button_border,
      // flex: 1,
      alignItems: 'center',
    },
    textContainer: {
      padding: theme.sizes.large,
      paddingHorizontal: theme.sizes.extra_extra_large,
    },
    button: {},
  });
