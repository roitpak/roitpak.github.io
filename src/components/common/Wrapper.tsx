import React, {PropsWithChildren, ReactElement, forwardRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {useTheme} from '../../context/theme/useTheme';
import {Theme} from '../../constants/Types';

interface WrapperProps extends PropsWithChildren {
  scrollEnabled?: boolean;
  refreshControl?: ReactElement;
}

const Wrapper = forwardRef<any, WrapperProps>(
  ({scrollEnabled, refreshControl, children}, ref) => {
    const {isDarkMode, theme} = useTheme();
    return (
      <SafeAreaView>
        <div style={containerStyle(theme)}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={
              isDarkMode ? theme.colors.gray : theme.colors.white
            }
          />
          <ScrollView
            scrollEnabled={scrollEnabled}
            ref={ref}
            refreshControl={refreshControl}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View>{children}</View>
          </ScrollView>
        </div>
      </SafeAreaView>
    );
  },
);

export default Wrapper;

const containerStyle = (theme: Theme) => ({
  backgroundImage: `linear-gradient(to bottom right, ${theme.colors.gradient_colors[0]}, ${theme.colors.gradient_colors[1]}, ${theme.colors.gradient_colors[2]})`,
  width: Dimensions.get('window').width as number,
  height: '100%',
  padding: theme.sizes.extra_extra_large,
});
