import React from 'react';
import {ModalProvider} from './context/modal/ModalProvider';
import {UserPrvider} from './context/user/UserProvider';
import MainStackScreen from './navigation/MainStackScreen';
import {ThemeProvider} from './context/theme/ThemeProvider';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <ModalProvider>
        <UserPrvider>
          <MainStackScreen />
        </UserPrvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
