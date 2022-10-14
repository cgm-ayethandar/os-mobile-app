import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Based on iPhone XS's scale
const widthScale = SCREEN_WIDTH / 375;
const heightScale = SCREEN_HEIGHT / 812;

export const scale = (size: number) => size * widthScale;

export const scaleHeight = (size: number) => size * heightScale;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const scaleFont = (size: number) => {
  const newSize = size * widthScale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const boxShadow = (
  color: string,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2
) => {
  return {
    elevation: radius,
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
};
