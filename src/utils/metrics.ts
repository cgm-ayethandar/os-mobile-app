import { Dimensions, Platform } from "react-native";
import { scale } from "./mixins";

const { width, height } = Dimensions.get("window");

export const BANNER_IMAGE_RATIO = 250 / 1024;

const IS_IPHONE_X =
  Platform.OS === "ios" &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 780 ||
    width === 780 ||
    height === 812 ||
    width === 812 ||
    height === 844 ||
    width === 844 ||
    height === 896 ||
    width === 896 ||
    height === 926 ||
    width === 926);

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  unsafeBottomHeight: Platform.OS === "ios" ? (IS_IPHONE_X ? 34 : 0) : 0,
  navBarHeight: Platform.OS === "ios" ? 50 : 56,
  bannerHeight: BANNER_IMAGE_RATIO * (width < height ? width : height),
  buttonHeight: scale(48),
  recordButtonSize: scale(72),
  playButtonHeight: scale(28),
  itemHeight: scale(180),
  space: {
    s1: scale(1),
    s2: scale(2),
    s3: scale(3),
    s4: scale(4),
    s5: scale(5),
    s6: scale(6),
    s7: scale(7),
    s8: scale(8),
    s9: scale(9),
    s10: scale(10),
    s11: scale(11),
    s12: scale(12),
    s15: scale(15),
    s16: scale(16),
    s17: scale(17),
    s18: scale(18),
    s19: scale(19),
    s20: scale(20),
    s21: scale(21),
    s22: scale(22),
    s23: scale(23),
    s24: scale(24),
    s25: scale(25),
    s26: scale(26),
    s27: scale(27),
    s29: scale(29),
    s30: scale(30),
    s31: scale(31),
    s32: scale(32),
    s36: scale(36),
    s37: scale(37),
    s40: scale(40),
    s42: scale(42),
    s45: scale(45),
    s48: scale(48),
    s50: scale(50),
    s54: scale(54),
    s59: scale(59),
    s60: scale(60),
    s61: scale(61),
    s66: scale(66),
    s70: scale(70),
    s72: scale(72),
    s90: scale(90),
    s91: scale(91),
    s92: scale(92),
    s93: scale(93),
    s200: scale(200),
    s213: scale(213),
    s252: scale(252),
    s328: scale(328),
    s343: scale(343),
  },
  radius: {
    r10: scale(10),
    r20: scale(20),
  },
};

export default metrics;
