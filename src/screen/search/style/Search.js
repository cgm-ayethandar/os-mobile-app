import { StyleSheet } from "react-native";
import { Colors } from "../../../constant/Colors";
import { Constants } from "../../../constant/Constants";
import fonts from "../../../utils/fonts";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: Constants.headerHeight,
    marginHorizontal: 10,
    marginBottom: 45,
  },
  title: {
    marginVertical: 10,
    marginLeft: 20,
    width: "100%",
  },
  titleText: {
    ...fonts.style.regularBold,
    textAlign: "left",
    color: Colors.avocado,
  },
});

export default styles;
