import {Dimensions as RNDimensions, PixelRatio, Platform} from 'react-native';
// @ts-ignore
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

export const headerHeight = Platform.OS === 'android' ? 250 : 210;
export const windowHeight = RNDimensions.get('window').height;
export const windowWidth = RNDimensions.get('window').width;

export const statusBarHeight =
  Platform.OS === 'android'
    ? ExtraDimensions.get('STATUS_BAR_HEIGHT')
    : getStatusBarHeight();
export const softMenuBarHeight =
  Platform.OS === 'android'
    ? ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT')
    : getBottomSpace();
export const windowHeightWithoutBars =
  Platform.OS === 'android'
    ? windowHeight - statusBarHeight - softMenuBarHeight
    : windowHeight;

export const Dimensions = {
  statusBarHeight,
  softMenuBarHeight,
  headerHeight,
  windowHeight,
  windowWidth,
  windowHeightWithoutStatusBar:
    Platform.OS === 'android' ? windowHeight - statusBarHeight : windowHeight,
  windowHeightWithoutBars,
  windowHeightWithoutHeader:
    Platform.OS === 'ios'
      ? windowHeight - headerHeight
      : windowHeight - headerHeight - statusBarHeight,
  cameraHeight: windowHeightWithoutBars,
  fontLarge: 20 / PixelRatio.getFontScale(),
  fontBig: 18 / PixelRatio.getFontScale(),
  fontMedium: 15 / PixelRatio.getFontScale(),
  fontSmall: 12 / PixelRatio.getFontScale(),
  fontXSmall: 9 / PixelRatio.getFontScale(),
  fontXXSmall: 6 / PixelRatio.getFontScale(),
  iconLarge: 40 / PixelRatio.getFontScale(),
  iconExtraLarge: 48 / PixelRatio.getFontScale(),
  iconBig: 35 / PixelRatio.getFontScale(),
  iconMedium: 30 / PixelRatio.getFontScale(),
  iconSmall: 25 / PixelRatio.getFontScale(),
  iconXSmall: 20 / PixelRatio.getFontScale(),
  iconXXSmall: 15 / PixelRatio.getFontScale(),
  paddingBig: 10 * PixelRatio.get(),
  paddingMedium: 8 * PixelRatio.get(),
  paddingSmall: 6 * PixelRatio.get(),
  paddingXSmall: 4 * PixelRatio.get(),
  paddingXXSmall: 2 * PixelRatio.get(),
  borderXSmall: 0.5 * PixelRatio.get(),
  borderSmall: PixelRatio.get(),
  borderMedium: 1.5 * PixelRatio.get(),
  borderBig: 2 * PixelRatio.get(),
  borderLarge: 2.5 * PixelRatio.get(),
};
