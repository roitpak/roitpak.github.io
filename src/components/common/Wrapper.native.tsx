import React, {PropsWithChildren, ReactElement, forwardRef} from 'react';
import {Dimensions, SafeAreaView, StatusBar, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../../context/theme/useTheme';
import LinearGradient from 'react-native-linear-gradient';
import {Theme} from '../../constants/Types';

interface WrapperProps extends PropsWithChildren {
  scrollEnabled?: boolean;
  refreshControl?: ReactElement;
  //   scrollViewRef? :
}

const Wrapper = forwardRef<any, WrapperProps>(
  ({scrollEnabled, refreshControl, children}, ref) => {
    // const scrollViewRef = useRef(null);
    const {theme, isDarkMode} = useTheme();

    return (
      <SafeAreaView>
        <LinearGradient
          style={containerStyle(theme)}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={theme.colors.gradient_colors}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={
              isDarkMode ? theme.colors.grayDarker2 : theme.colors.white
            }
          />
          <KeyboardAwareScrollView
            scrollEnabled={scrollEnabled}
            ref={ref}
            refreshControl={refreshControl}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View>{children}</View>
          </KeyboardAwareScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  },
);

export default Wrapper;

const containerStyle = (theme: Theme) => ({
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  padding: theme.sizes.extra_extra_large,
});
