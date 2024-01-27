import React from 'react';
import {ModalProvider} from './context/modal/ModalProvider';
import {UserPrvider} from './context/user/UserProvider';
import MainStackScreen from './navigation/MainStackScreen';

function App(): JSX.Element {
  return (
    <ModalProvider>
      <UserPrvider>
        <MainStackScreen />
      </UserPrvider>
    </ModalProvider>
  );
}

export default App;
