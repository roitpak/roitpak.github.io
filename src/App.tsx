import React from 'react';
import {ModalProvider} from './context/modal/ModalProvider';
import {UserPrvider} from './context/user/UserProvider';
import MainStackScreen from './navigation/MainStackScreen';
import {ThemeProvider} from './context/theme/ThemeProvider';

function App(): JSX.Element {
  return (
    <ModalProvider>
      <UserPrvider>
        <ThemeProvider>
          <MainStackScreen />
        </ThemeProvider>
      </UserPrvider>
    </ModalProvider>
  );
}

export default App;
