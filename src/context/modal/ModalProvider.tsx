import React, {ReactNode, useState} from 'react';
import {ModalContext} from './ModalContext';
import {ModalProps} from './Types';
import {
  Button,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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

  return (
    <ModalContext.Provider
      value={{isVisible: modalProps.isVisible, openModal, closeModal}}>
      {children}
      <Modal transparent animationType="fade" visible={modalProps.isVisible}>
        <TouchableOpacity
          onPress={closeModal}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable>
            <View style={{height: 200, width: 200, backgroundColor: 'red'}}>
              <Text style={{fontSize: 50}}>{modalProps.title}</Text>
              {modalProps?.text && (
                <Text style={{fontSize: 20}}>{modalProps?.text}</Text>
              )}
              {modalProps &&
                modalProps?.buttons &&
                modalProps?.buttons.map((button, index) => (
                  <Button
                    key={index}
                    title={button.label}
                    onPress={button.onClick}
                  />
                ))}
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </ModalContext.Provider>
  );
};
