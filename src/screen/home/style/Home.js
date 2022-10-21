import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import { Constants } from "../../../constant/Constants";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.headerHeight,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  footerHeader: {
    ...fonts.style.regularNormal,
    color: Colors.avocado,
  },
});

export default styles;
