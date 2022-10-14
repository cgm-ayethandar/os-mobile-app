import { scaleFont } from "./mixins";
import { Colors } from "../constant/Colors";

const size = {
  big: scaleFont(24),
  medium: scaleFont(14),
  regular: scaleFont(16),
  s10: scaleFont(10),
  s12: scaleFont(12),
  s14: scaleFont(14),
  s15: scaleFont(15),
  s16: scaleFont(16),
  s18: scaleFont(18),
  s20: scaleFont(20),
  s8: scaleFont(8),
  small: scaleFont(12),
  tiny: scaleFont(10),
};

const fontWeight: {
  bold:
    | "bold"
    | "normal"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
  normal:
    | "bold"
    | "normal"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
} = {
  bold: "bold",
  normal: "normal",
};

const style = {
  bigBold: {
    color: Colors.black,
    fontSize: size.big,
    fontWeight: fontWeight.bold,
  },
  bigNormal: {
    color: Colors.black,
    fontSize: size.big,
    fontWeight: fontWeight.normal,
  },
  regularBold: {
    color: Colors.black,
    fontSize: size.regular,
    fontWeight: fontWeight.bold,
  },
  regularNormal: {
    color: Colors.black,
    fontSize: size.regular,
    fontWeight: fontWeight.normal,
  },
  mediumBold: {
    color: Colors.black,
    fontSize: size.medium,
    fontWeight: fontWeight.bold,
  },
  mediumNormal: {
    color: Colors.black,
    fontSize: size.medium,
    fontWeight: fontWeight.normal,
  },
  smallBold: {
    color: Colors.black,
    fontSize: size.small,
    fontWeight: fontWeight.bold,
  },
  smallNormal: {
    color: Colors.black,
    fontSize: size.small,
    fontWeight: fontWeight.normal,
  },
  tinyBold: {
    color: Colors.black,
    fontSize: size.tiny,
    fontWeight: fontWeight.bold,
  },
  tinyNormal: {
    color: Colors.black,
    fontSize: size.tiny,
    fontWeight: fontWeight.normal,
  },
};

export default {
  size,
  style,
};
