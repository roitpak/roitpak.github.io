/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import Tts from 'react-native-tts';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'grey' : 'white',
  };
  useEffect(() => {
    const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
    ee.addListener('tts-start', () => {
      console.log('I am here start');
    });
    ee.addListener('tts-finish', () => {
      console.log('I am here finish');
    });
    ee.addListener('tts-cancel', () => {
      console.log('I am here cancel');
    });

    try {
      Tts.getInitStatus().then(() => {
        Tts.speak('Hello, world!');
      });
    } catch (e) {
      console.log('Error--->', e);
    }

    return () => {
      ee.removeAllListeners('tts-start');
      ee.removeAllListeners('tts-finish');
      ee.removeAllListeners('tts-cancel');
    };
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.highlight}>Hello world</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
